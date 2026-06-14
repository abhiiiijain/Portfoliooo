const pageEditorSections = {
  home: {
    title: "Home page",
    subtitle: "Hero, about intro, featured sections, and SEO",
    sectionId: "home",
  },
  contact: {
    title: "Contact page",
    subtitle: "Headline, intro, and SEO for /contact",
    sectionId: "contact",
  },
};

export const contentEditorSections = {
  ...pageEditorSections,
  footer: {
    title: "Footer",
    subtitle: "Tagline, headings, projects list, and GitHub toggle",
    sectionId: "footer",
  },
};

export const aboutTabs = [
  { id: "page", label: "Page copy" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
];

export const dashboardLinks = [
  {
    href: "/admin/content/home",
    label: "Home",
    desc: "Hero, intro & homepage sections",
    group: "pages",
  },
  {
    href: "/admin/about",
    label: "About",
    desc: "Bio, experience, education & skills",
    group: "pages",
  },
  {
    href: "/admin/projects",
    label: "Projects",
    desc: "Page copy & portfolio items",
    group: "pages",
  },
  {
    href: "/admin/certifications",
    label: "Certifications",
    desc: "Page copy & credentials",
    group: "pages",
  },
  {
    href: "/admin/content/contact",
    label: "Contact",
    desc: "Contact page copy & form",
    group: "pages",
  },
  {
    href: "/admin/settings/site",
    label: "Site settings",
    desc: "Identity, nav, typography & social",
    group: "site",
  },
  {
    href: "/admin/content/footer",
    label: "Footer",
    desc: "Tagline, links & projects column",
    group: "site",
  },
  {
    href: "/admin/inquiries",
    label: "Inquiries",
    desc: "Contact form messages",
    group: "inbox",
  },
];
