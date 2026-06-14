import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import ClientDate from "@/components/admin/ClientDate";
import { dashboardLinks, iconByHref } from "@/components/admin/adminNav";
import { adminFetch } from "@/lib/adminApi";

function getInitials(name) {
  return (name || "?")
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState(null);
  const [greeting, setGreeting] = useState("Hello");

  useEffect(() => {
    adminFetch("/api/admin/stats")
      .then((r) => r.json())
      .then(setStats);
  }, []);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 17) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  }, []);

  return (
    <AdminLayout hideTitle>
      {!stats ? (
        <div className="animate-pulse space-y-8">
          <div className="h-32 rounded-2xl bg-slate-900/80" />
          <div className="grid grid-cols-2 gap-4">
            <div className="h-24 rounded-2xl bg-slate-900/80" />
            <div className="h-24 rounded-2xl bg-slate-900/80" />
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          <motion.header
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-violet-600/20 via-slate-900/80 to-fuchsia-600/10 p-8">
            <div className="absolute top-0 right-0 h-64 w-64 -translate-y-1/2 translate-x-1/4 rounded-full bg-violet-500/20 blur-3xl" />
            <div className="relative flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-medium text-violet-300">{greeting}</p>
                <h1 className="mt-1 text-2xl font-bold tracking-tight">Dashboard</h1>
                <p className="mt-2 max-w-lg text-slate-400">
                  Manage site settings, page copy, and portfolio content from one place.
                </p>
              </div>
              <Link
                href="/admin/inquiries"
                className="shrink-0 rounded-xl border border-white/10 bg-slate-900/60 px-5 py-4 transition hover:border-violet-500/30">
                <p className="text-3xl font-bold">{stats.totalLeads ?? 0}</p>
                <p className="mt-1 text-xs text-slate-400">Total inquiries</p>
              </Link>
            </div>
          </motion.header>

          <section>
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-400">
              Manage content
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {dashboardLinks.map((section, i) => (
                <motion.div
                  key={section.href}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}>
                  <Link
                    href={section.href}
                    className="group flex items-start gap-4 rounded-xl border border-white/10 bg-slate-900/40 p-4 transition hover:border-violet-500/30 hover:bg-slate-800/60">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-400 transition group-hover:text-violet-300">
                      {iconByHref[section.href]}
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium transition group-hover:text-violet-300">{section.label}</p>
                      <p className="mt-0.5 text-xs text-slate-500">{section.desc}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>

          <section>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
                Recent inquiries
              </h2>
              <Link href="/admin/inquiries" className="text-xs text-violet-400 transition hover:text-violet-300">
                View all →
              </Link>
            </div>

            <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-sm">
              {stats.recentLeads?.length ? (
                <ul className="divide-y divide-white/5">
                  {stats.recentLeads.map((lead, i) => (
                    <motion.li
                      key={lead.id}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.05 }}
                      className="flex items-center gap-4 p-4 transition hover:bg-white/[0.02]">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-gradient-to-br from-violet-500/30 to-fuchsia-500/30 text-xs font-bold text-violet-200">
                        {getInitials(lead.name)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-medium">{lead.name}</p>
                        <p className="truncate text-sm text-slate-500">{lead.email}</p>
                        {lead.phone ? (
                          <p className="truncate text-xs text-slate-600">{lead.phone}</p>
                        ) : null}
                      </div>
                      <p className="shrink-0 text-[11px] text-slate-500">
                        <ClientDate value={lead.submittedAt} />
                      </p>
                    </motion.li>
                  ))}
                </ul>
              ) : (
                <div className="p-10 text-center">
                  <p className="text-sm text-slate-400">No inquiries yet</p>
                  <p className="mt-1 text-xs text-slate-600">Messages from your contact form appear here</p>
                </div>
              )}
            </div>
          </section>
        </div>
      )}
    </AdminLayout>
  );
}
