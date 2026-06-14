import { buildFixedCategories } from "@portfoliooo/shared/skills";

export { buildFixedCategories };

export function createEmptySkills() {
  return {
    title: "",
    categories: buildFixedCategories([]),
  };
}

export function toEditableCategories(categories) {
  return buildFixedCategories(categories).map((category) => ({
    name: category.name,
    skills: category.skills.length ? [...category.skills] : [""],
  }));
}
