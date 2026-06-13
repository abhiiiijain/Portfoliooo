import mongoose from "mongoose";
import dbConnect from "./mongodb";
import { requireAdmin } from "./auth";
import { stripPayload, toApiDoc } from "./apiDoc";

export function createCrudIndexHandler(Model, { label = "Item" } = {}) {
  return async function handler(req, res) {
    if (!requireAdmin(req, res)) return;

    try {
      await dbConnect();

      if (req.method === "GET") {
        const items = await Model.find().sort({ order: 1 }).lean();
        return res.status(200).json(items.map(toApiDoc));
      }

      if (req.method === "POST") {
        const item = await Model.create(stripPayload(req.body));
        return res.status(201).json(toApiDoc(item.toObject()));
      }

      if (req.method === "PATCH") {
        const { items } = req.body;
        if (!Array.isArray(items)) {
          return res.status(400).json({ error: "items array required" });
        }

        const updates = items.filter(({ id }) => mongoose.Types.ObjectId.isValid(id));
        if (updates.length) {
          await Promise.all(
            updates.map(({ id, order }) => Model.updateOne({ _id: id }, { $set: { order } }))
          );
        }

        const docs = await Model.find().sort({ order: 1 }).lean();
        return res.status(200).json(docs.map(toApiDoc));
      }

      return res.status(405).json({ error: "Method not allowed" });
    } catch (error) {
      console.error(`${label} error:`, error);
      return res.status(500).json({ error: error.message || "Failed to process request" });
    }
  };
}

export function createCrudIdHandler(Model, { label = "Item", runValidators = false } = {}) {
  return async function handler(req, res) {
    if (!requireAdmin(req, res)) return;

    const { id } = req.query;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid id" });
    }

    try {
      await dbConnect();

      if (req.method === "PUT") {
        const item = await Model.findByIdAndUpdate(id, stripPayload(req.body), {
          new: true,
          runValidators,
        }).lean();
        if (!item) return res.status(404).json({ error: "Not found" });
        return res.status(200).json(toApiDoc(item));
      }

      if (req.method === "DELETE") {
        const deleted = await Model.findByIdAndDelete(id);
        if (!deleted) return res.status(404).json({ error: "Not found" });
        return res.status(200).json({ success: true });
      }

      return res.status(405).json({ error: "Method not allowed" });
    } catch (error) {
      console.error(`${label} error:`, error);
      return res.status(500).json({ error: error.message || "Failed to process request" });
    }
  };
}
