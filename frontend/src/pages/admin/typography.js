import AdminLayout from "@/components/admin/AdminLayout";
import FontSettingsPanel from "@/components/admin/FontSettingsPanel";

export default function AdminTypographyPage() {
  return (
    <AdminLayout
      title="Typography"
      subtitle="Body and heading fonts used across public pages">
      <FontSettingsPanel />
    </AdminLayout>
  );
}
