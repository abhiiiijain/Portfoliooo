import { useEffect } from "react";

const INTERVAL_MS = 30_000;
const API_URL = process.env.NEXT_PUBLIC_API_URL;

function shouldKeepAlive() {
  if (!API_URL || typeof window === "undefined") return false;
  if (process.env.NODE_ENV !== "production") return false;

  try {
    const { hostname } = new URL(API_URL);
    return hostname !== "localhost" && hostname !== "127.0.0.1";
  } catch {
    return false;
  }
}

export default function BackendKeepAlive() {
  useEffect(() => {
    if (!shouldKeepAlive()) return;

    const ping = () => {
      fetch(`${API_URL}/api/health`, { cache: "no-store" }).catch(() => {});
    };

    ping();
    const id = setInterval(ping, INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  return null;
}
