import AdminLayout from "@/components/admin/AdminLayout";
import CrudList from "@/components/admin/CrudList";
import PageSettingsPanel from "@/components/admin/PageSettingsPanel";

export default function AdminCertificationsPage() {
  return (
    <AdminLayout title="Certifications" subtitle="Page copy and credentials on /certifications">
      <div className="space-y-6">
        <PageSettingsPanel sectionId="certifications" />
        <CrudList
          embedded
          title="Certifications"
          subtitle="Add, reorder, and edit certification entries"
          apiPath="/api/admin/certifications"
          emptyLabel="certification"
          subtitleField="company"
          fields={[
            { key: "title", label: "Title" },
            { key: "company", label: "Issuer" },
            { key: "date", label: "Date" },
            { key: "link", label: "Verification link" },
            { key: "image", label: "Certificate image", type: "image", folder: "portfoliooo/certifications" },
            { key: "featured", label: "Featured", type: "checkbox" },
          ]}
        />
      </div>
    </AdminLayout>
  );
}
