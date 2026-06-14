import { setCorsHeaders } from "../../lib/cors";
import { getUptimeSnapshot } from "../../lib/uptime";

export default function handler(req, res) {
  if (setCorsHeaders(req, res)) return;

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  return res.status(200).json(getUptimeSnapshot());
}
