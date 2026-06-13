import SiteSettings from "../models/SiteSettings";
import Project from "../models/Project";
import Experience from "../models/Experience";
import Education from "../models/Education";
import Skills from "../models/Skills";
import Certification from "../models/Certification";
import { toApiDoc } from "./apiDoc";
import { normalizeSkills } from "@portfoliooo/shared/skills";
import { normalizeSocial } from "@portfoliooo/shared/social";
import { toWhatsAppUrl } from "@portfoliooo/shared/whatsapp";
import { normalizeNav, normalizeFooter } from "@portfoliooo/shared/site";

export async function getPortfolioContent() {
  const [site, projects, experience, education, skills, certifications] =
    await Promise.all([
      SiteSettings.findOne({ key: "site" }).lean(),
      Project.find().sort({ order: 1 }).lean(),
      Experience.find().sort({ order: 1 }).lean(),
      Education.find().sort({ order: 1 }).lean(),
      Skills.findOne({ key: "skills" }).lean(),
      Certification.find().sort({ order: 1 }).lean(),
    ]);

  if (!site) return null;

  const { _id, __v, key, ...siteData } = site;

  return {
    site: {
      ...siteData,
      whatsapp: toWhatsAppUrl(siteData.whatsapp),
      social: normalizeSocial(siteData.social),
      nav: normalizeNav(siteData.nav),
      footer: normalizeFooter(siteData.footer),
    },
    projects: projects.map(toApiDoc),
    experience: experience.map(toApiDoc),
    education: education.map(toApiDoc),
    skills: normalizeSkills(skills),
    certifications: certifications.map(toApiDoc),
  };
}
