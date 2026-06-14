import { useRouter } from "next/router";
import BulletsEditor from "@/components/admin/BulletsEditor";
import CrudList from "@/components/admin/CrudList";
import AdminLayout from "@/components/admin/AdminLayout";
import PageSettingsPanel from "@/components/admin/PageSettingsPanel";
import SkillsSettingsPanel from "@/components/admin/SkillsSettingsPanel";
import { aboutTabs } from "@/lib/adminSections";

const experienceFields = [
  { key: "position", label: "Position" },
  { key: "company", label: "Company" },
  { key: "companyLink", label: "Company URL" },
  { key: "time", label: "Duration" },
  { key: "address", label: "Location" },
  { key: "tech", label: "Tech stack" },
];

function AdminTabs({ tabs, active, onChange }) {
  return (
    <div className="mb-6 flex flex-wrap gap-1 border-b border-white/10 pb-1">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => onChange(tab.id)}
          className={`rounded-t-lg px-4 py-2 text-sm font-medium transition ${
            active === tab.id
              ? "bg-violet-600/20 text-violet-100 ring-1 ring-inset ring-violet-500/30"
              : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
          }`}>
          {tab.label}
        </button>
      ))}
    </div>
  );
}

export default function AdminAboutPage() {
  const router = useRouter();
  const activeTab = typeof router.query.tab === "string" ? router.query.tab : "page";
  const tab = aboutTabs.some((item) => item.id === activeTab) ? activeTab : "page";

  const setTab = (nextTab) => {
    router.replace({ pathname: "/admin/about", query: { tab: nextTab } }, undefined, {
      shallow: true,
    });
  };

  return (
    <AdminLayout title="About page" subtitle="Biography, work history, education, and skills">
      <AdminTabs tabs={aboutTabs} active={tab} onChange={setTab} />

      {tab === "page" && <PageSettingsPanel sectionId="about" />}

      {tab === "experience" && (
        <CrudList
          embedded
          title="Experience"
          subtitle="Work history entries shown on the about page"
          apiPath="/api/admin/experience"
          emptyLabel="experience"
          fields={experienceFields}
          initialForm={{ bullets: [] }}
          prepareEditForm={(item) => ({ ...item, bullets: item.bullets || [] })}
          hideDelete
          renderListItem={(item, { onEdit }) => (
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="font-semibold text-slate-100">
                  {item.position} @ {item.company}
                </p>
                <p className="text-sm text-slate-500">{item.time}</p>
              </div>
              <button
                type="button"
                onClick={onEdit}
                className="shrink-0 text-sm text-violet-400 hover:text-violet-300">
                Edit
              </button>
            </div>
          )}
          renderModalExtra={({ form, setForm }) => (
            <BulletsEditor
              value={form.bullets || []}
              onChange={(bullets) => setForm({ ...form, bullets })}
            />
          )}
        />
      )}

      {tab === "education" && (
        <CrudList
          embedded
          title="Education"
          subtitle="Degrees and institutions shown on the about page"
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
      )}

      {tab === "skills" && <SkillsSettingsPanel />}
    </AdminLayout>
  );
}
