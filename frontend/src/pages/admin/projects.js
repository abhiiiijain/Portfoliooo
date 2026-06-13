import AdminLayout from "@/components/admin/AdminLayout";
import CrudList from "@/components/admin/CrudList";
import PageSettingsPanel from "@/components/admin/PageSettingsPanel";

export default function AdminProjectsPage() {
  return (
    <AdminLayout title="Projects" subtitle="Page copy and portfolio items on /projects">
      <div className="space-y-6">
        <PageSettingsPanel sectionId="projects" />
        <CrudList
          embedded
          title="Projects"
          subtitle="Add, reorder, and edit portfolio items"
          apiPath="/api/admin/projects"
          emptyLabel="project"
          subtitleField="type"
          fields={[
            { key: "title", label: "Title" },
            { key: "type", label: "Type" },
            { key: "tech", label: "Tech stack" },
            { key: "summary", label: "Summary", type: "textarea" },
            { key: "link", label: "Live link" },
            { key: "github", label: "GitHub link" },
            { key: "image", label: "Project image", type: "image", folder: "portfoliooo/projects" },
            { key: "featured", label: "Featured", type: "checkbox" },
          ]}
        />
      </div>
    </AdminLayout>
  );
}
