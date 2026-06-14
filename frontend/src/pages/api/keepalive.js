import { getApiBaseUrl } from "@/lib/apiBaseUrl";

export default async function handler(_req, res) {
  try {
    const response = await fetch(`${getApiBaseUrl()}/api/health`, { cache: "no-store" });
    return res.status(response.ok ? 200 : 502).json({ ok: response.ok });
  } catch {
    return res.status(502).json({ ok: false, error: "API health check failed" });
  }
}
