export function paragraphsToText(paragraphs) {
  return (paragraphs || []).join("\n\n");
}

export function textToParagraphs(text) {
  return text
    .split(/\n\s*\n/)
    .map((part) => part.trim())
    .filter(Boolean);
}

export const generalFields = [
  { key: "name", label: "Full name" },
  { key: "brand", label: "Brand name" },
  { key: "logoInitials", label: "Logo initials" },
  { key: "experienceStartDate", label: "Experience start date", placeholder: "YYYY-MM-DD" },
  { key: "email", label: "Email" },
  {
    key: "whatsapp",
    label: "WhatsApp number",
    placeholder: "919588544510",
    hint: "Country code + number only. The wa.me link is added automatically.",
  },
  { key: "resumeUrl", label: "Resume URL", placeholder: "https://..." },
  {
    key: "social.github",
    label: "GitHub username",
    placeholder: "abhiiiijain",
    hint: "Username only. The github.com link is added automatically.",
  },
  {
    key: "social.linkedin",
    label: "LinkedIn username",
    placeholder: "abhiiiijain",
    hint: "Profile slug only (the part after /in/). The LinkedIn link is added automatically.",
  },
];

export const generalFieldGroups = [
  {
    title: "Identity",
    description: "Your name, brand, and logo shown across the site.",
    fields: ["name", "brand", "logoInitials", "experienceStartDate"],
  },
  {
    title: "Contact",
    description: "How visitors reach you and view your resume.",
    fields: ["email", "whatsapp", "resumeUrl"],
  },
  {
    title: "Social profiles",
    description: "Usernames used for header icons and footer links.",
    fields: ["social.github", "social.linkedin"],
  },
];

const generalFieldsByKey = Object.fromEntries(generalFields.map((field) => [field.key, field]));

export function getGeneralField(key) {
  return generalFieldsByKey[key];
}

export const pageFieldGroups = {
  home: [
    { path: "pages.home.title", label: "Page title (SEO)" },
    { path: "pages.home.description", label: "Meta description" },
    { path: "pages.home.heroText", label: "Hero headline" },
    { path: "pages.home.intro", label: "Intro paragraph", type: "textarea" },
    { path: "pages.home.profileImage", label: "Profile image", type: "image", folder: "portfoliooo/profiles" },
    { path: "pages.home.aboutTitle", label: "About section title", placeholder: "About Me" },
    {
      path: "pages.home.aboutIntro",
      label: "About section intro",
      type: "textarea",
      hint: "Short bio on the homepage About Me card. Falls back to the first About page biography paragraph if empty.",
    },
    {
      path: "pages.home.featuredProjectsTitle",
      label: "Featured projects heading",
      placeholder: "Featured Projects",
    },
    {
      path: "pages.home.showGitHubActivity",
      label: "Show GitHub Activity section",
      type: "checkbox",
      defaultTrue: true,
      hint: "Display GitHub stats and top repositories on the homepage. Requires a GitHub username in Site settings.",
    },
    {
      path: "pages.home.githubSectionTitle",
      label: "GitHub section heading",
      placeholder: "GitHub Activity",
      hint: "Uses the GitHub username from Site settings. Shows activity stats and top repositories.",
    },
  ],
  about: [
    { path: "pages.about.title", label: "Page title (SEO)" },
    { path: "pages.about.description", label: "Meta description" },
    { path: "pages.about.headline", label: "Page headline" },
    { path: "pages.about.biographyTitle", label: "Biography section title" },
    { path: "pages.about.role", label: "Job title", placeholder: "Full-Stack Developer" },
    { path: "pages.about.location", label: "Location", placeholder: "City, Country" },
    { path: "pages.about.availability", label: "Availability", placeholder: "Available for projects" },
    { path: "pages.about.profileImage", label: "Profile image", type: "image", folder: "portfoliooo/profiles" },
  ],
  projects: [
    { path: "pages.projects.title", label: "Page title (SEO)" },
    { path: "pages.projects.description", label: "Meta description" },
    { path: "pages.projects.headline", label: "Page headline" },
  ],
  certifications: [
    { path: "pages.certifications.title", label: "Page title (SEO)" },
    { path: "pages.certifications.description", label: "Meta description" },
    { path: "pages.certifications.headline", label: "Page headline" },
    { path: "pages.certifications.listHeading", label: "List section heading" },
  ],
  contact: [
    { path: "pages.contact.title", label: "Page title (SEO)" },
    { path: "pages.contact.description", label: "Meta description" },
    { path: "pages.contact.label", label: "Section label" },
    { path: "pages.contact.headline", label: "Headline" },
    { path: "pages.contact.intro", label: "Intro paragraph", type: "textarea" },
  ],
  footer: [
    {
      path: "footer.tagline",
      label: "Tagline",
      placeholder: "Full Stack Developer & Creative Technologist",
      hint: "Shown under your name in the footer.",
    },
    {
      path: "footer.description",
      label: "Description",
      type: "textarea",
      placeholder: "Building modern web experiences and innovative digital products.",
    },
    {
      path: "footer.quickLinksTitle",
      label: "Quick links heading",
      placeholder: "Quick Links",
    },
    {
      path: "footer.projectsTitle",
      label: "Projects heading",
      placeholder: "My Projects",
    },
    {
      path: "footer.maxProjects",
      label: "Max projects to list",
      placeholder: "6",
      hint: "Number of projects shown in the footer (from your projects list).",
    },
    {
      path: "footer.showGithubInQuickLinks",
      label: "Include GitHub in quick links",
      type: "checkbox",
      hint: "Used only when no custom quick links are saved. Add GitHub manually in Quick links below instead.",
    },
  ],
};

export function getNestedValue(obj, path) {
  return path.split(".").reduce((acc, key) => acc?.[key], obj);
}

export function setNestedValue(obj, path, value) {
  const keys = path.split(".");
  const next = { ...obj };
  let cursor = next;

  for (let i = 0; i < keys.length - 1; i++) {
    cursor[keys[i]] = { ...(cursor[keys[i]] || {}) };
    cursor = cursor[keys[i]];
  }

  cursor[keys[keys.length - 1]] = value;
  return next;
}
