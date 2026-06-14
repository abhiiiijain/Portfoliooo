import { getApiBaseUrl } from "@/lib/apiBaseUrl";

export default async function handler(_req, res) {
  try {
    const response = await fetch(`${getApiBaseUrl()}/api/keepalive`, { cache: "no-store" });
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      return res.status(502).json({ ok: false, error: "Backend keepalive check failed" });
    }

    return res.status(200).json(data);
  } catch {
    return res.status(502).json({ ok: false, error: "Backend keepalive check failed" });
  }
}
