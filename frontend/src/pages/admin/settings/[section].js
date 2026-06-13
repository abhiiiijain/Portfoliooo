import { useRouter } from "next/router";
import AdminLayout from "@/components/admin/AdminLayout";
import PageSettingsPanel from "@/components/admin/PageSettingsPanel";
import { siteEditorSections } from "@/lib/adminSections";

export default function AdminSiteEditor() {
  const router = useRouter();
  const section = siteEditorSections[router.query.section];

  if (!section) {
    return (
      <AdminLayout title="Settings not found" subtitle="This admin section does not exist">
        <p className="text-slate-400 text-sm">Choose a section from the sidebar.</p>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title={section.title} subtitle={section.subtitle}>
      <PageSettingsPanel sectionId={section.sectionId} />
    </AdminLayout>
  );
}
