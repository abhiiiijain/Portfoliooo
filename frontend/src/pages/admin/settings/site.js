import FontSettingsPanel from "@/components/admin/FontSettingsPanel";
import AdminLayout from "@/components/admin/AdminLayout";
import NavSettingsPanel from "@/components/admin/NavSettingsPanel";
import PageSettingsPanel from "@/components/admin/PageSettingsPanel";

export default function AdminSiteSettingsPage() {
  return (
    <AdminLayout
      title="Site settings"
      subtitle="Identity, contact, navigation, typography, and social profiles">
      <div className="space-y-6">
        <PageSettingsPanel sectionId="general" />
        <NavSettingsPanel description="Edit title and path for each link. Order matches the site header left to right." />
        <FontSettingsPanel />
      </div>
    </AdminLayout>
  );
}
