import React from "react";
import Layout from "./Layout";
import Link from "next/link";
import { usePortfolio } from "@/context/PortfolioContext";
import { getFooterQuickLinks } from "@portfoliooo/shared/site";

const COPYRIGHT_START_YEAR = 2023;

function FooterLinkList({ links }) {
  const validLinks = links.filter((link) => link?.href);

  if (!validLinks.length) return null;

  return (
    <ul className="mt-4 space-y-2.5">
      {validLinks.map((link) => (
        <li key={`${link.href}-${link.label}`}>
          {link.external ? (
            <Link
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-dark/70 hover:text-dark dark:text-light/75 dark:hover:text-light transition-colors">
              {link.label}
            </Link>
          ) : (
            <Link
              href={link.href}
              className="text-sm text-dark/70 hover:text-dark dark:text-light/75 dark:hover:text-light transition-colors">
              {link.label}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
}

function isPlaceholderFooterText(value) {
  const text = value?.trim().toLowerCase();
  return !text || text === "tagline" || text === "description";
}

const Footer = () => {
  const { content } = usePortfolio();
  if (!content?.site) return null;

  const { name, brand, footer } = content.site;
  const year = new Date().getFullYear();

  const quickLinks = getFooterQuickLinks(footer);

  const projectLinks =
    footer.maxProjects > 0
      ? (content.projects || []).slice(0, footer.maxProjects).map((project) => ({
          label: project.title,
          href: project.link || project.github || "/projects",
          external: Boolean(project.link || project.github),
        }))
      : [];

  return (
    <>
      <footer className="w-full border-t border-dark/10 bg-slate-100/80 text-dark backdrop-blur-sm dark:border-light/10 dark:bg-[#141414] dark:text-light transition-colors">
        <Layout className="py-12 lg:py-10 !bg-transparent">
          <div className="grid grid-cols-3 gap-8 lg:grid-cols-1 lg:gap-10">
            <div className="text-center">
              <h2 className="text-xl font-bold text-dark dark:text-light sm:text-2xl">
                {name || brand}
              </h2>
              {footer.tagline && !isPlaceholderFooterText(footer.tagline) && (
                <p className="mt-3 text-sm font-medium text-dark/90 dark:text-light/90 sm:text-base">
                  {footer.tagline}
                </p>
              )}
              {footer.description && !isPlaceholderFooterText(footer.description) && (
                <p className="mt-3 mx-auto max-w-xs text-sm leading-relaxed text-dark/60 dark:text-light/60">
                  {footer.description}
                </p>
              )}
            </div>

            <div className="text-center">
              {footer.quickLinksTitle ? (
                <h3 className="text-sm font-semibold text-dark dark:text-light">
                  {footer.quickLinksTitle}
                </h3>
              ) : null}
              <FooterLinkList links={quickLinks} />
            </div>

            <div className="text-center">
              {footer.projectsTitle ? (
                <h3 className="text-sm font-semibold text-dark dark:text-light">
                  {footer.projectsTitle}
                </h3>
              ) : null}
              <FooterLinkList links={projectLinks} />
            </div>
          </div>
        </Layout>
      </footer>

      <footer className="w-full border-t border-dark/10 bg-slate-50 text-dark dark:border-light/10 dark:bg-dark dark:text-light transition-colors">
        <Layout className="py-4 flex items-center justify-center !bg-transparent">
          <p
            className="text-sm text-dark/50 dark:text-light/50 text-center"
            suppressHydrationWarning>
            ©{COPYRIGHT_START_YEAR} – {year} {brand} · All rights reserved
          </p>
        </Layout>
      </footer>
    </>
  );
};

export default Footer;
