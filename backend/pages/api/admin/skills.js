import dbConnect from "../../../lib/mongodb";
import Skills from "../../../models/Skills";
import { requireAdmin } from "../../../lib/auth";
import { normalizeSkills } from "@portfoliooo/shared/skills";

export default async function handler(req, res) {
  if (!requireAdmin(req, res)) return;

  try {
    await dbConnect();

    if (req.method === "GET") {
      const skills = await Skills.findOne({ key: "skills" }).lean();
      if (!skills) return res.status(404).json({ error: "Skills not found" });
      const { _id, __v, key, ...data } = skills;
      return res.status(200).json(normalizeSkills(data) || data);
    }

    if (req.method === "PUT") {
      const normalized =
        normalizeSkills(req.body) || {
          title: req.body?.title || "Technical Skills",
          categories: [],
        };

      const existing = await Skills.findOne({ key: "skills" }).lean();

      const skills = await Skills.findOneAndReplace(
        { key: "skills" },
        {
          key: "skills",
          title: normalized.title,
          categories: normalized.categories,
          createdAt: existing?.createdAt || new Date(),
          updatedAt: new Date(),
        },
        { upsert: true, new: true, runValidators: true }
      ).lean();
      const { _id, __v, key, ...data } = skills;
      return res.status(200).json(normalizeSkills(data) || data);
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    console.error("Skills error:", error);
    return res.status(500).json({ error: "Failed to update skills" });
  }
}
