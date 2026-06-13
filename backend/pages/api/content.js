import dbConnect from "../../lib/mongodb";
import { getPortfolioContent } from "../../lib/content";
import { setCorsHeaders } from "../../lib/cors";

export default async function handler(req, res) {
  if (setCorsHeaders(req, res)) return;

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    await dbConnect();
    const content = await getPortfolioContent();

    if (!content) {
      return res.status(404).json({ error: "Content not found. Add content via the CRM dashboard." });
    }

    return res.status(200).json(content);
  } catch (error) {
    console.error("Failed to fetch content:", error);
    return res.status(500).json({ error: "Failed to fetch content" });
  }
}
