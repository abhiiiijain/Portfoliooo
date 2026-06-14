function parseAllowedOrigins() {
  const fromList = (process.env.ALLOWED_ORIGINS || "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);

  const fromFrontend = process.env.FRONTEND_URL?.trim();

  return [...new Set([...(fromFrontend ? [fromFrontend] : []), ...fromList])];
}

const allowedOrigins = parseAllowedOrigins();

function isVercelPreviewOrigin(origin) {
  if (process.env.ALLOW_VERCEL_PREVIEWS !== "true") return false;

  try {
    const { hostname, protocol } = new URL(origin);
    return protocol === "https:" && hostname.endsWith(".vercel.app");
  } catch {
    return false;
  }
}

function resolveAllowedOrigin(req) {
  const requestOrigin = req.headers.origin;
  if (!requestOrigin) return null;

  if (allowedOrigins.includes(requestOrigin)) return requestOrigin;
  if (isVercelPreviewOrigin(requestOrigin)) return requestOrigin;

  return null;
}

export function setCorsHeaders(req, res) {
  const origin = resolveAllowedOrigin(req);

  if (origin) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  } else if (req.headers.origin) {
    console.warn("CORS blocked origin:", req.headers.origin);
  } else if (!allowedOrigins.length) {
    console.warn("FRONTEND_URL / ALLOWED_ORIGINS is not set — CORS headers skipped");
  }

  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return true;
  }

  return false;
}
