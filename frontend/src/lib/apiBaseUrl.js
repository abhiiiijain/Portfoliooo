function normalizeBase(url) {
  return url?.replace(/\/$/, "") || "";
}

export function getApiBaseUrl() {
  const base = normalizeBase(process.env.NEXT_PUBLIC_API_URL);
  if (!base) {
    throw new Error("NEXT_PUBLIC_API_URL is not configured");
  }
  return base;
}

/** Full backend URL for browser and SSR (separate frontend + backend deployments). */
export function resolveApiUrl(path) {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${getApiBaseUrl()}${normalized}`;
}
