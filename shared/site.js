export function normalizeNav(nav) {
  if (!nav?.length) return [];

  const items = nav
    .map((item) => ({
      href: typeof item?.href === "string" ? item.href.trim() : "",
      title: typeof item?.title === "string" ? item.title.trim() : "",
    }))
    .filter((item) => item.href.startsWith("/"))
    .map((item) => ({
      href: item.href,
      title:
        item.href === "/contact" && item.title === "Contact Us"
          ? "Contact"
          : item.title || item.href,
    }));

  return items;
}

export function normalizeFooterQuickLinks(links) {
  if (!Array.isArray(links)) return [];

  return links
    .map((link) => ({
      label: (link?.label || link?.title || "").trim(),
      href: (link?.href || "").trim(),
      external: Boolean(link?.external),
    }))
    .map((link) => ({
      ...link,
      label:
        link.href === "/contact" && link.label === "Contact Us" ? "Contact" : link.label,
    }))
    .filter((link) => link.label && link.href);
}

export function getFooterQuickLinks(footer) {
  if (!Array.isArray(footer?.quickLinks)) return [];
  return normalizeFooterQuickLinks(footer.quickLinks);
}

/** Admin only — build a draft quick-link list from navigation (not used on the public site). */
export function getDefaultFooterQuickLinks(nav, social, footer) {
  const fromNav = normalizeNav(nav).map((item) => ({
    label: item.title,
    href: item.href,
    external: false,
  }));

  if (footer?.showGithubInQuickLinks !== false && social?.github) {
    fromNav.push({ label: "GitHub", href: social.github, external: true });
  }

  return fromNav;
}

export function normalizeFooter(footer) {
  const maxProjects = Number.parseInt(footer?.maxProjects, 10);

  const normalized = {
    tagline: footer?.tagline ?? footer?.headline ?? "",
    description: footer?.description ?? "",
    quickLinksTitle: footer?.quickLinksTitle ?? "",
    projectsTitle: footer?.projectsTitle ?? "",
    showGithubInQuickLinks: footer?.showGithubInQuickLinks !== false,
    maxProjects: Number.isFinite(maxProjects) && maxProjects > 0 ? maxProjects : 0,
  };

  if (Array.isArray(footer?.quickLinks)) {
    normalized.quickLinks = normalizeFooterQuickLinks(footer.quickLinks);
  }

  return normalized;
}
