import { inputClass } from "@/components/admin/adminUi";

function SkillsCategoriesEditor({ categories, onChange }) {
  const updateSkill = (categoryIndex, skillIndex, value) => {
    const next = categories.map((category, i) => {
      if (i !== categoryIndex) return category;
      const skills = category.skills.map((skill, j) => (j === skillIndex ? value : skill));
      return { ...category, skills };
    });
    onChange(next);
  };

  const addSkill = (categoryIndex) => {
    const next = categories.map((category, i) =>
      i === categoryIndex ? { ...category, skills: [...category.skills, ""] } : category
    );
    onChange(next);
  };

  const removeSkill = (categoryIndex, skillIndex) => {
    const next = categories.map((category, i) => {
      if (i !== categoryIndex) return category;
      const skills = category.skills.filter((_, j) => j !== skillIndex);
      return { ...category, skills: skills.length ? skills : [""] };
    });
    onChange(next);
  };

  return (
    <div className="space-y-4">
      {categories.map((category, categoryIndex) => (
        <div
          key={category.name}
          className="rounded-xl border border-slate-700 bg-slate-800/40 p-4 space-y-3">
          <h4 className="text-sm font-semibold text-slate-200">{category.name}</h4>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-400">Skills</p>
              <button
                type="button"
                onClick={() => addSkill(categoryIndex)}
                className="text-xs font-medium text-violet-400 hover:text-violet-300">
                + Add skill
              </button>
            </div>

            {category.skills.map((skill, skillIndex) => (
              <div key={skillIndex} className="flex items-center gap-2">
                <input
                  value={skill}
                  onChange={(e) => updateSkill(categoryIndex, skillIndex, e.target.value)}
                  className={`${inputClass} mt-0`}
                  placeholder={`${category.name} skill`}
                />
                <button
                  type="button"
                  onClick={() => removeSkill(categoryIndex, skillIndex)}
                  aria-label="Remove skill"
                  className="shrink-0 px-2 py-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-800 text-lg leading-none">
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default SkillsCategoriesEditor;
