export function parseGitHubUsername(value) {
  if (!value?.trim()) return "";
  const trimmed = value.trim().replace(/\/+$/, "");
  const match = trimmed.match(/(?:https?:\/\/)?(?:www\.)?github\.com\/([^/?#]+)/i);
  if (match) return match[1];
  return trimmed.replace(/^@/, "");
}

export function toGitHubUrl(value) {
  const username = parseGitHubUsername(value);
  return username ? `https://github.com/${username}` : "";
}

export function parseLinkedInUsername(value) {
  if (!value?.trim()) return "";
  const trimmed = value.trim().replace(/\/+$/, "");
  const match = trimmed.match(
    /(?:https?:\/\/)?(?:[\w.]+\.)?linkedin\.com\/in\/([^/?#]+)/i
  );
  if (match) return match[1];
  const inMatch = trimmed.match(/^in\/([^/?#]+)/i);
  if (inMatch) return inMatch[1];
  return trimmed.replace(/^@/, "");
}

export function toLinkedInUrl(value) {
  const username = parseLinkedInUsername(value);
  return username ? `https://www.linkedin.com/in/${username}` : "";
}

export function normalizeSocial(social = {}) {
  return {
    ...social,
    github: toGitHubUrl(social.github),
    linkedin: toLinkedInUrl(social.linkedin),
  };
}
