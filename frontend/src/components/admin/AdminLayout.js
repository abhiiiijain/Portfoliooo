import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { icons, navGroups } from "@/components/admin/adminNav";
import { adminLogout } from "@/lib/adminApi";

function isNavActive(pathname, href) {
  if (href === "/admin") return pathname === "/admin";
  if (href === "/admin/about") return pathname === "/admin/about";
  return pathname === href;
}

function SidebarNav({ onNavigate }) {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-5">
      {navGroups.map((group) => (
        <div key={group.label}>
          <p className="mb-1.5 px-3 text-[10px] font-semibold uppercase tracking-wider text-slate-600">
            {group.label}
          </p>
          <div className="flex flex-col gap-0.5">
            {group.items.map((link) => {
              const active = isNavActive(router.pathname, link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onNavigate}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all ${
                    active
                      ? "bg-violet-600/20 text-violet-100 ring-1 ring-inset ring-violet-500/30"
                      : "text-slate-400 hover:bg-white/5 hover:text-white"
                  }`}>
                  <span className={active ? "text-violet-300" : "text-slate-500"}>{link.icon}</span>
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function AdminLayout({ children, title, subtitle, hideTitle = false }) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    setSidebarOpen(false);
  }, [router.pathname]);

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [sidebarOpen]);

  const logout = async () => {
    await adminLogout();
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen bg-[#07070c] text-slate-100">
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close menu"
          className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-white/5 bg-slate-950/98 backdrop-blur-xl transition-transform duration-200 translate-x-0 lg:-translate-x-full ${
          sidebarOpen ? "lg:translate-x-0" : ""
        }`}>
        <div className="shrink-0 border-b border-white/5 p-5">
          <div className="flex items-center gap-3 px-1">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-600 text-sm font-bold shadow-lg shadow-violet-500/25">
              P
            </div>
            <div>
              <h1 className="text-base font-bold tracking-tight">Portfolio CRM</h1>
              <p className="text-[11px] text-slate-500">Content studio</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-4">
          <SidebarNav onNavigate={() => setSidebarOpen(false)} />
        </nav>

        <div className="shrink-0 space-y-0.5 border-t border-white/5 p-4">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-400 transition hover:bg-white/5 hover:text-white">
            {icons.external}
            View live site
          </Link>
          <button
            type="button"
            onClick={logout}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-400 transition hover:bg-red-500/10 hover:text-red-300">
            {icons.logout}
            Log out
          </button>
        </div>
      </aside>

      <div className="ml-64 flex min-h-screen flex-col lg:ml-0">
        <header className="sticky top-0 z-20 flex items-center gap-4 border-b border-white/5 bg-[#07070c]/90 px-4 py-3 backdrop-blur-md lg:px-5">
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={sidebarOpen}
            onClick={() => setSidebarOpen(true)}
            className="hidden rounded-lg border border-white/10 p-2 text-slate-400 transition hover:bg-white/5 hover:text-white lg:inline-flex">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
          {!hideTitle && title && (
            <div className="min-w-0 flex-1 lg:block hidden">
              <h2 className="truncate text-base font-semibold tracking-tight">{title}</h2>
              {subtitle && <p className="truncate text-xs text-slate-500">{subtitle}</p>}
            </div>
          )}
        </header>

        <main className="relative flex-1 overflow-auto">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 right-0 h-[480px] w-[480px] rounded-full bg-violet-600/8 blur-3xl" />
            <div className="absolute top-1/2 -left-20 h-[360px] w-[360px] rounded-full bg-fuchsia-600/5 blur-3xl" />
          </div>

          <div className="relative mx-auto max-w-4xl p-6 lg:p-5">
            {!hideTitle && title && (
              <header className="mb-6 lg:hidden">
                <h2 className="text-xl font-bold tracking-tight">{title}</h2>
                {subtitle && <p className="mt-1 text-sm text-slate-400">{subtitle}</p>}
              </header>
            )}
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
