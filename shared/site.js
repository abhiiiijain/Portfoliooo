export const DEFAULT_NAV = [
  { href: "/", title: "Home" },
  { href: "/about", title: "About" },
  { href: "/projects", title: "Projects" },
  { href: "/certifications", title: "Certifications" },
  { href: "/contact", title: "Contact Us" },
];

export const COPYRIGHT_START_YEAR = 2023;

export const DEFAULT_FOOTER = {
  tagline: "",
  description: "",
  quickLinksTitle: "Quick Links",
  projectsTitle: "My Projects",
  showGithubInQuickLinks: true,
  maxProjects: 6,
};

export function normalizeNav(nav) {
  const source = nav?.length ? nav : DEFAULT_NAV;
  const items = source
    .map((item) => ({
      href: typeof item?.href === "string" ? item.href.trim() : "",
      title: typeof item?.title === "string" ? item.title.trim() : "",
    }))
    .filter((item) => item.href.startsWith("/"))
    .map((item) => ({
      href: item.href,
      title: item.title || item.href,
    }));

  return items.length ? items : DEFAULT_NAV;
}

export function normalizeFooter(footer) {
  const maxProjects = Number.parseInt(footer?.maxProjects, 10);

  return {
    tagline: footer?.tagline ?? footer?.headline ?? "",
    description: footer?.description ?? "",
    quickLinksTitle: footer?.quickLinksTitle || DEFAULT_FOOTER.quickLinksTitle,
    projectsTitle: footer?.projectsTitle || DEFAULT_FOOTER.projectsTitle,
    showGithubInQuickLinks: footer?.showGithubInQuickLinks !== false,
    maxProjects: Number.isFinite(maxProjects) && maxProjects > 0 ? maxProjects : DEFAULT_FOOTER.maxProjects,
  };
}
