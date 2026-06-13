import AdminLayout from "@/components/admin/AdminLayout";
import NavSettingsPanel from "@/components/admin/NavSettingsPanel";

export default function AdminNavigationPage() {
  return (
    <AdminLayout title="Navigation" subtitle="Header links and footer quick links">
      <NavSettingsPanel description="Edit title and path for each link. Order matches the site header left to right." />
    </AdminLayout>
  );
}
