import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { AdminPanel, AdminPanelBody, btnPrimary, inputClass } from "@/components/admin/adminUi";
import { adminFetch, adminLogin, clearAdminToken, getAdminToken } from "@/lib/adminApi";

export default function AdminLogin() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!getAdminToken()) return;

    adminFetch("/api/admin/session")
      .then((response) => {
        if (response.ok) router.replace("/admin");
        else clearAdminToken();
      })
      .catch(() => clearAdminToken());
  }, [router]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      await adminLogin(password);
      router.push("/admin");
    } catch (err) {
      setError(err.message || "Login failed");
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>CRM Login | Portfoliooo</title>
      </Head>
      <div className="min-h-screen bg-[#07070c] flex items-center justify-center p-4">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-violet-600/10 blur-3xl" />
        </div>
        <AdminPanel className="relative w-full max-w-sm">
          <AdminPanelBody>
            <div className="mb-6">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-600 text-sm font-bold">
                P
              </div>
              <h1 className="text-xl font-bold tracking-tight">Portfolio CRM</h1>
              <p className="text-slate-400 text-sm mt-1">Sign in to manage your portfolio</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <label className="block">
                <span className="text-sm font-medium text-slate-300">Password</span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Admin password"
                  required
                  className={inputClass}
                />
              </label>
              {error && <p className="text-red-400 text-sm">{error}</p>}
              <button type="submit" disabled={loading} className={`${btnPrimary} w-full`}>
                {loading ? "Signing in…" : "Sign in"}
              </button>
            </form>
          </AdminPanelBody>
        </AdminPanel>
      </div>
    </>
  );
}
