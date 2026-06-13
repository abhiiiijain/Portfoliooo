import AdminLayout from "@/components/admin/AdminLayout";
import CrudList from "@/components/admin/CrudList";

export default function AdminEducationPage() {
  return (
    <AdminLayout title="Education" subtitle="Degrees and institutions shown on the about page">
      <CrudList
        embedded
        title="Education"
        apiPath="/api/admin/education"
        emptyLabel="education entry"
        subtitleField="place"
        fields={[
          { key: "type", label: "Degree / Level" },
          { key: "trade", label: "Field" },
          { key: "time", label: "Duration" },
          { key: "place", label: "Institution" },
          { key: "info", label: "Details", type: "textarea" },
        ]}
      />
    </AdminLayout>
  );
}
