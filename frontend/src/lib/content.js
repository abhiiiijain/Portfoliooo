import { normalizeFonts } from "@/lib/fonts";
import { resolveApiUrl } from "@/lib/apiBaseUrl";

export async function fetchPortfolioContent() {
  const response = await fetch(resolveApiUrl("/api/content"));

  if (!response.ok) {
    throw new Error(`Failed to fetch content (${response.status})`);
  }

  const data = await response.json();

  if (!data?.site?.name) {
    throw new Error("Portfolio content is missing site settings");
  }

  return {
    site: {
      ...data.site,
      fonts: normalizeFonts(data.site.fonts),
    },
    projects: data.projects || [],
    experience: data.experience || [],
    education: data.education || [],
    skills: data.skills,
    certifications: data.certifications || [],
  };
}
