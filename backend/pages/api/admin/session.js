import { requireAdmin } from "../../../lib/auth";
import { setCorsHeaders } from "../../../lib/cors";

export default async function handler(req, res) {
  if (setCorsHeaders(req, res)) return;

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!requireAdmin(req, res)) return;

  return res.status(200).json({ ok: true });
}
