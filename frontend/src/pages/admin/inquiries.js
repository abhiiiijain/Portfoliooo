import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import ClientDate from "@/components/admin/ClientDate";
import { AdminPanel, AdminPanelBody } from "@/components/admin/adminUi";
import { adminFetch } from "@/lib/adminApi";

export default function AdminInquiriesPage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    adminFetch("/api/admin/inquiries")
      .then((r) => r.json())
      .then(setItems);
  }, []);

  return (
    <AdminLayout title="Inquiries" subtitle="Messages from your contact form">
      <AdminPanel>
        <AdminPanelBody className="space-y-4">
          {items.length === 0 && (
            <p className="text-center text-sm text-slate-500 py-8">No inquiries yet.</p>
          )}
          {items.map((item) => (
            <article
              key={item.id}
              className="rounded-xl border border-white/10 bg-slate-950/40 p-5 space-y-3">
              <div>
                <p className="font-semibold text-slate-100">{item.name}</p>
                <p className="text-violet-400 text-sm">{item.email}</p>
              </div>
              {item.subject && (
                <p className="text-sm text-slate-400">
                  <span className="text-slate-500">Subject:</span> {item.subject}
                </p>
              )}
              <p className="text-sm text-slate-300 leading-relaxed">{item.message}</p>
              <p className="text-xs text-slate-500">
                <ClientDate value={item.submittedAt} format="datetime" />
              </p>
            </article>
          ))}
        </AdminPanelBody>
      </AdminPanel>
    </AdminLayout>
  );
}
