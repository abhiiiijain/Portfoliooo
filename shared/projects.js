export function parseTechTags(tech) {
  if (!tech?.trim()) return [];
  return tech
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

export function getTopSkills(skills, limit = 4) {
  if (!skills?.categories?.length) return [];

  const flat = skills.categories.flatMap((category) => category.skills || []).filter(Boolean);
  return [...new Set(flat)].slice(0, limit);
}
