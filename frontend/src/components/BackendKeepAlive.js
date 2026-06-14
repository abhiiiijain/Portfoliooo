import { useEffect } from "react";
import { resolveApiUrl } from "@/lib/apiBaseUrl";

const INTERVAL_MS = 30_000;

export default function BackendKeepAlive() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;

    const ping = () => {
      fetch(resolveApiUrl("/api/health"), { cache: "no-store" }).catch(() => {});
    };

    ping();
    const id = setInterval(ping, INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  return null;
}
