import BulletsEditor from "@/components/admin/BulletsEditor";
import CrudList from "@/components/admin/CrudList";

const fields = [
  { key: "position", label: "Position" },
  { key: "company", label: "Company" },
  { key: "companyLink", label: "Company URL" },
  { key: "time", label: "Duration" },
  { key: "address", label: "Location" },
  { key: "tech", label: "Tech stack" },
];

export default function AdminExperiencePage() {
  return (
    <CrudList
      title="Experience"
      subtitle="Work history entries shown on the about page"
      apiPath="/api/admin/experience"
      emptyLabel="experience"
      fields={fields}
      initialForm={{ bullets: [] }}
      prepareEditForm={(item) => ({ ...item, bullets: item.bullets || [] })}
      hideDelete
      renderListItem={(item, { onEdit }) => (
        <div className="flex justify-between items-start gap-2">
          <div>
            <p className="font-semibold text-slate-100">
              {item.position} @ {item.company}
            </p>
            <p className="text-slate-500 text-sm">{item.time}</p>
          </div>
          <button type="button" onClick={onEdit} className="text-violet-400 text-sm shrink-0 hover:text-violet-300">
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
  );
}
