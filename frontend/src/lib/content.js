import { normalizeFonts } from "@/lib/fonts";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchPortfolioContent() {
  if (!API_URL) {
    throw new Error("NEXT_PUBLIC_API_URL is not configured");
  }

  const response = await fetch(`${API_URL}/api/content`);

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
