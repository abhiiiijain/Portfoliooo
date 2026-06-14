import { useEffect, useState } from "react";
import AdminModal from "@/components/admin/AdminModal";
import SkillsCategoriesEditor from "@/components/admin/SkillsCategoriesEditor";
import { AdminPanel, AdminPanelBody, btnPrimary, inputClass } from "@/components/admin/adminUi";
import { adminFetch } from "@/lib/adminApi";
import { buildFixedCategories, createEmptySkills, toEditableCategories } from "@/lib/skills";

function sanitizeCategories(categories) {
  return buildFixedCategories(
    categories.map((category) => ({
      name: category.name,
      skills: category.skills.map((skill) => skill.trim()).filter(Boolean),
    }))
  );
}

export default function SkillsSettingsPanel() {
  const [form, setForm] = useState(null);
  const [draft, setDraft] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    adminFetch("/api/admin/skills")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => setForm(data || createEmptySkills()));
  }, []);

  const openEdit = () => {
    const copy = form || createEmptySkills();
    setDraft({
      title: copy.title,
      categories: toEditableCategories(copy.categories),
    });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setDraft(null);
  };

  const save = async () => {
    const categories = sanitizeCategories(draft.categories || []);
    const skillCount = categories.reduce((sum, category) => sum + category.skills.length, 0);

    if (!draft.title?.trim()) {
      alert("Section title is required");
      return;
    }
    if (!skillCount) {
      alert("Add at least one skill across the categories");
      return;
    }

    setSaving(true);
    try {
      const response = await adminFetch("/api/admin/skills", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: draft.title.trim(),
          categories,
        }),
      });
      if (response.ok) {
        setForm(await response.json());
      }
      closeModal();
    } finally {
      setSaving(false);
    }
  };

  if (!form) {
    return <p className="text-slate-400 text-sm">Loading skills…</p>;
  }

  const skillCount =
    form.categories?.reduce((sum, category) => sum + (category.skills?.length || 0), 0) || 0;

  return (
    <>
      <AdminPanel>
        <AdminPanelBody>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-slate-400">{skillCount} skills across 4 categories</p>
            <button type="button" onClick={openEdit} className={btnPrimary}>
              Edit skills
            </button>
          </div>

          <div className="space-y-5">
            <div>
              <p className="text-sm text-slate-500">Section title</p>
              <p className="mt-0.5 font-medium text-slate-100">{form.title || "—"}</p>
            </div>

            <div className="space-y-3 border-t border-white/5 pt-2">
              {form.categories.map((category) => (
                <div key={category.name}>
                  <p className="text-sm font-medium text-slate-200">{category.name}</p>
                  <p className="mt-1 text-sm text-slate-400">
                    {category.skills.length ? category.skills.join(", ") : "No skills yet"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </AdminPanelBody>
      </AdminPanel>

      <AdminModal
        open={modalOpen}
        onClose={closeModal}
        title="Edit skills"
        onSubmit={save}
        submitting={saving}
        submitLabel="Save changes"
        panelClassName="max-w-2xl">
        {draft && (
          <>
            <label className="block">
              <span className="text-sm text-slate-400">Section title</span>
              <input
                value={draft.title || ""}
                onChange={(e) => setDraft({ ...draft, title: e.target.value })}
                className={inputClass}
                placeholder="Technical Skills"
              />
            </label>

            <SkillsCategoriesEditor
              categories={draft.categories}
              onChange={(categories) => setDraft({ ...draft, categories })}
            />
          </>
        )}
      </AdminModal>
    </>
  );
}
