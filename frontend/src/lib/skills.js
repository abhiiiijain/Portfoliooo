import { DEFAULT_SKILLS_TITLE, buildFixedCategories } from "@portfoliooo/shared/skills";

export function createEmptySkills() {
  return {
    title: DEFAULT_SKILLS_TITLE,
    categories: buildFixedCategories([]),
  };
}

export function toEditableCategories(categories) {
  return buildFixedCategories(categories).map((category) => ({
    name: category.name,
    skills: category.skills.length ? [...category.skills] : [""],
  }));
}
