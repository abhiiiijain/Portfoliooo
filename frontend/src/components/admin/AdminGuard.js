import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { adminFetch, getAdminToken } from "@/lib/adminApi";

export default function AdminGuard({ children }) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!getAdminToken()) {
      router.replace("/admin/login");
      return;
    }

    adminFetch("/api/admin/session")
      .then((response) => {
        if (response.ok) {
          setReady(true);
        } else {
          router.replace("/admin/login");
        }
      })
      .catch(() => router.replace("/admin/login"));
  }, [router]);

  if (!ready) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400">
        Loading…
      </div>
    );
  }

  return children;
}
