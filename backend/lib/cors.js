export function setCorsHeaders(req, res) {
  const origin = process.env.FRONTEND_URL;

  if (!origin) {
    console.warn("FRONTEND_URL is not set — CORS headers skipped");
  } else {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return true;
  }

  return false;
}
