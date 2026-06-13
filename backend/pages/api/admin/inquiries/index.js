import dbConnect from "../../../../lib/mongodb";
import ContactInquiry from "../../../../models/ContactInquiry";
import { requireAdmin } from "../../../../lib/auth";
import { toApiDoc } from "../../../../lib/apiDoc";

export default async function handler(req, res) {
  if (!requireAdmin(req, res)) return;

  try {
    await dbConnect();

    if (req.method === "GET") {
      const items = await ContactInquiry.find().sort({ submittedAt: -1 }).lean();
      return res.status(200).json(items.map(toApiDoc));
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
