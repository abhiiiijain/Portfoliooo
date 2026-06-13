const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default async function handler(_req, res) {
  if (!API_URL) {
    return res.status(503).json({ ok: false, error: "NEXT_PUBLIC_API_URL is not configured" });
  }

  try {
    const response = await fetch(`${API_URL}/api/health`, { cache: "no-store" });
    return res.status(response.ok ? 200 : 502).json({ ok: response.ok });
  } catch {
    return res.status(502).json({ ok: false });
  }
}
