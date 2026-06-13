export const SKILL_CATEGORY_NAMES = ["Frontend", "Backend", "Database", "Tools"];

export const DEFAULT_SKILLS_TITLE = "Technical Skills";

export function buildFixedCategories(rawCategories = []) {
  const byName = new Map();

  for (const category of rawCategories) {
    const match = SKILL_CATEGORY_NAMES.find(
      (name) => name.toLowerCase() === (category.name || "").trim().toLowerCase()
    );

    if (!match) continue;

    const existing = byName.get(match) || [];
    byName.set(match, [...existing, ...(category.skills || []).filter(Boolean)]);
  }

  return SKILL_CATEGORY_NAMES.map((name) => ({
    name,
    skills: byName.get(name) || [],
  }));
}

export function normalizeSkills(raw) {
  if (!raw?.categories?.length) return null;

  return {
    title: raw.title || DEFAULT_SKILLS_TITLE,
    categories: buildFixedCategories(raw.categories),
  };
}
