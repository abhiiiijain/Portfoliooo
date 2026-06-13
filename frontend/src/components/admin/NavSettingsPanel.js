import { useEffect, useState } from "react";
import AdminSaveBar from "@/components/admin/AdminSaveBar";
import NavEditor from "@/components/admin/NavEditor";
import { AdminPanel, AdminPanelBody, AdminStickyFooter } from "@/components/admin/adminUi";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { normalizeNav } from "@portfoliooo/shared/site";

export default function NavSettingsPanel({ description }) {
  const { site, loading, saveSite } = useSiteSettings();
  const [nav, setNav] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!site) return;
    setNav(normalizeNav(site.nav).map((item) => ({ ...item })));
  }, [site]);

  if (loading || !nav) {
    return (
      <AdminPanel>
        <AdminPanelBody>
          <div className="h-5 w-40 animate-pulse rounded bg-slate-800" />
        </AdminPanelBody>
      </AdminPanel>
    );
  }

  const handleSave = async () => {
    setSaving(true);
    try {
      await saveSite({ ...site, nav: normalizeNav(nav) });
      setSaved(true);
    } catch (error) {
      alert(error.message || "Failed to save navigation");
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminPanel>
      <AdminPanelBody>
        {description && <p className="-mt-2 text-sm text-slate-400">{description}</p>}
        <NavEditor
          items={nav}
          onChange={(next) => {
            setNav(next);
            setSaved(false);
          }}
        />
        <AdminStickyFooter>
          <AdminSaveBar saving={saving} saved={saved} onSave={handleSave} label="Save navigation" />
        </AdminStickyFooter>
      </AdminPanelBody>
    </AdminPanel>
  );
}
