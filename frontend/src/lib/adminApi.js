import { resolveApiUrl } from "@/lib/apiBaseUrl";

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

export async function adminFetch(path, options = {}) {
  const token = getAdminToken();
  const headers = {
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  let response;
  try {
    response = await fetch(resolveApiUrl(path), { ...options, headers });
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
  const response = await fetch(resolveApiUrl("/api/admin/login"), {
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
  const formData = new FormData();
  formData.append("file", file);
  formData.append("folder", folder);

  const response = await adminFetch("/api/admin/upload", {
    method: "POST",
    body: formData,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || "Upload failed");
  }

  return data;
}
