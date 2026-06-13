import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import ClientDate from "@/components/admin/ClientDate";
import { contentSections, icons } from "@/components/admin/adminNav";
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
            <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
            <div className="relative flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
              <div>
                <p className="text-violet-300 text-sm font-medium">{greeting}</p>
                <h1 className="text-2xl font-bold tracking-tight mt-1">Dashboard</h1>
                <p className="text-slate-400 mt-2 max-w-lg">
                  Jump to any section to edit page copy and content. Each area lives on its own page.
                </p>
              </div>
              <div className="flex gap-3 shrink-0">
                <Link
                  href="/admin/inquiries"
                  className="rounded-xl border border-white/10 bg-slate-900/60 px-5 py-4 hover:border-violet-500/30 transition">
                  <p className="text-3xl font-bold">{stats.totalLeads ?? 0}</p>
                  <p className="text-xs text-slate-400 mt-1">Total inquiries</p>
                </Link>
              </div>
            </div>
          </motion.header>

          <section>
            <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
              Manage content
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {contentSections.map((section, i) => (
                <motion.div
                  key={section.href}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}>
                  <Link
                    href={section.href}
                    className="group flex items-start gap-4 p-4 rounded-xl border border-white/10 bg-slate-900/40 hover:bg-slate-800/60 hover:border-violet-500/30 transition">
                    <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 group-hover:text-violet-300 transition shrink-0">
                      {section.icon}
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium group-hover:text-violet-300 transition">{section.label}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{section.desc}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: contentSections.length * 0.04 }}>
                <Link
                  href="/admin/settings/site"
                  className="group flex items-start gap-4 p-4 rounded-xl border border-white/10 bg-slate-900/40 hover:bg-slate-800/60 hover:border-violet-500/30 transition">
                  <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 group-hover:text-violet-300 transition shrink-0">
                    {icons.settings}
                  </div>
                  <div>
                    <p className="font-medium group-hover:text-violet-300 transition">Settings</p>
                    <p className="text-xs text-slate-500 mt-0.5">Name, email & social links</p>
                  </div>
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (contentSections.length + 1) * 0.04 }}>
                <Link
                  href="/admin/navigation"
                  className="group flex items-start gap-4 p-4 rounded-xl border border-white/10 bg-slate-900/40 hover:bg-slate-800/60 hover:border-violet-500/30 transition">
                  <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 group-hover:text-violet-300 transition shrink-0">
                    {icons.navigation}
                  </div>
                  <div>
                    <p className="font-medium group-hover:text-violet-300 transition">Navigation</p>
                    <p className="text-xs text-slate-500 mt-0.5">Header & footer quick links</p>
                  </div>
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (contentSections.length + 2) * 0.04 }}>
                <Link
                  href="/admin/typography"
                  className="group flex items-start gap-4 p-4 rounded-xl border border-white/10 bg-slate-900/40 hover:bg-slate-800/60 hover:border-violet-500/30 transition">
                  <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 group-hover:text-violet-300 transition shrink-0">
                    {icons.typography}
                  </div>
                  <div>
                    <p className="font-medium group-hover:text-violet-300 transition">Typography</p>
                    <p className="text-xs text-slate-500 mt-0.5">Body & heading fonts</p>
                  </div>
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (contentSections.length + 3) * 0.04 }}>
                <Link
                  href="/admin/settings/footer"
                  className="group flex items-start gap-4 p-4 rounded-xl border border-white/10 bg-slate-900/40 hover:bg-slate-800/60 hover:border-violet-500/30 transition">
                  <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 group-hover:text-violet-300 transition shrink-0">
                    {icons.footer}
                  </div>
                  <div>
                    <p className="font-medium group-hover:text-violet-300 transition">Footer</p>
                    <p className="text-xs text-slate-500 mt-0.5">Tagline, links & projects column</p>
                  </div>
                </Link>
              </motion.div>
            </div>
          </section>

          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
                Recent inquiries
              </h2>
              <Link
                href="/admin/inquiries"
                className="text-xs text-violet-400 hover:text-violet-300 transition">
                View all →
              </Link>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-sm overflow-hidden">
              {stats.recentLeads?.length ? (
                <ul className="divide-y divide-white/5">
                  {stats.recentLeads.map((lead, i) => (
                    <motion.li
                      key={lead.id}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.05 }}
                      className="flex items-center gap-4 p-4 hover:bg-white/[0.02] transition">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500/30 to-fuchsia-500/30 border border-white/10 flex items-center justify-center text-xs font-bold text-violet-200 shrink-0">
                        {getInitials(lead.name)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{lead.name}</p>
                        <p className="text-sm text-slate-500 truncate">{lead.email}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-[11px] text-slate-500">
                          <ClientDate value={lead.submittedAt} />
                        </p>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              ) : (
                <div className="p-10 text-center">
                  <p className="text-slate-400 text-sm">No inquiries yet</p>
                  <p className="text-slate-600 text-xs mt-1">Messages from your contact form appear here</p>
                </div>
              )}
            </div>
          </section>
        </div>
      )}
    </AdminLayout>
  );
}
