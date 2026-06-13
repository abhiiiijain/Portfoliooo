const API_URL = process.env.NEXT_PUBLIC_API_URL || "";
const TOKEN_KEY = "portfolio_admin_token";

export function getAdminToken() {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(TOKEN_KEY);
}

function setAdminToken(token) {
  sessionStorage.setItem(TOKEN_KEY, token);
}

export function clearAdminToken() {
  sessionStorage.removeItem(TOKEN_KEY);
}

function adminApiUrl(path) {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${API_URL}${normalized}`;
}

export async function adminFetch(path, options = {}) {
  if (!API_URL) {
    throw new Error("NEXT_PUBLIC_API_URL is not configured");
  }

  const token = getAdminToken();
  const headers = {
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  let response;
  try {
    response = await fetch(adminApiUrl(path), { ...options, headers });
  } catch {
    throw new Error("Unable to reach the API. Is the backend running?");
  }

  if (response.status === 401 && typeof window !== "undefined") {
    clearAdminToken();
    if (!window.location.pathname.startsWith("/admin/login")) {
      window.location.href = "/admin/login";
    }
  }

  return response;
}

export async function adminLogin(password) {
  if (!API_URL) {
    throw new Error("NEXT_PUBLIC_API_URL is not configured");
  }

  const response = await fetch(adminApiUrl("/api/admin/login"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password }),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || "Login failed");
  }

  if (data.token) {
    setAdminToken(data.token);
  }

  return data;
}

export async function adminLogout() {
  clearAdminToken();
}

export async function adminUploadImage(file, folder = "portfoliooo") {
  const token = getAdminToken();
  const formData = new FormData();
  formData.append("file", file);
  formData.append("folder", folder);

  const headers = {};
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(adminApiUrl("/api/admin/upload"), {
    method: "POST",
    headers,
    body: formData,
  });

  const data = await response.json().catch(() => ({}));

  if (response.status === 401) {
    clearAdminToken();
    if (typeof window !== "undefined" && !window.location.pathname.startsWith("/admin/login")) {
      window.location.href = "/admin/login";
    }
  }

  if (!response.ok) {
    throw new Error(data.error || "Upload failed");
  }

  return data;
}
