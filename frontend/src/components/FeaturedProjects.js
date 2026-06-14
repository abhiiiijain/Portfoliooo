import Image from "next/image";
import Link from "next/link";
import ExternalLink from "@/components/ExternalLink";
import { ContentPanel, HomeSection } from "@/components/HomeSection";
import { FolderIcon } from "@/components/icons/PageIcons";
import { usePortfolio } from "@/context/PortfolioContext";
import { parseTechTags } from "@portfoliooo/shared/projects";
import { isHttpUrl } from "@portfoliooo/shared/url";

function ProjectThumbnail({ image, link, title, visitUrl }) {
  const hasImage = Boolean(image?.trim());
  const embedUrl = isHttpUrl(link) ? link.trim() : null;
  const showEmbed = !hasImage && embedUrl;

  const thumb = hasImage ? (
    <Image
      src={image}
      alt={title}
      fill
      className="object-cover transition-transform duration-300 group-hover:scale-105"
      sizes="144px"
    />
  ) : showEmbed ? (
    <iframe
      src={embedUrl}
      title={`${title} live preview`}
      className="absolute inset-0 h-full w-full border-0 pointer-events-none"
      loading="lazy"
      tabIndex={-1}
    />
  ) : (
    <div className="flex h-full w-full items-center justify-center bg-dark/5 text-[10px] text-dark/40 dark:bg-light/5 dark:text-light/40">
      No preview
    </div>
  );

  const wrapper = (
    <div className="relative h-[88px] w-[132px] shrink-0 overflow-hidden rounded-lg border border-dark/10 bg-light dark:border-light/10 dark:bg-dark sm:h-24 sm:w-full">
      {thumb}
    </div>
  );

  if (!visitUrl) return wrapper;

  return (
    <ExternalLink href={visitUrl} className="group block shrink-0">
      {wrapper}
    </ExternalLink>
  );
}

function FeaturedProjectRow({ project }) {
  const visitUrl = project.link || project.github;
  const tags = parseTechTags(project.tech);

  return (
    <article className="group flex gap-4 rounded-xl border border-dark/10 bg-dark/[0.02] p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md dark:border-light/10 dark:bg-light/[0.03] dark:hover:border-primaryDark/30 sm:flex-col sm:p-3">
      <ProjectThumbnail
        image={project.image}
        link={project.link}
        title={project.title}
        visitUrl={visitUrl}
      />

      <div className="min-w-0 flex-1">
        <ExternalLink
          href={visitUrl}
          className="text-base font-bold text-dark transition-colors group-hover:text-primary dark:text-light dark:group-hover:text-primaryDark">
          {project.title}
        </ExternalLink>

        {project.summary ? (
          <p className="mt-1.5 text-sm leading-snug text-dark/65 dark:text-light/65 line-clamp-3">
            {project.summary}
          </p>
        ) : null}

        {tags.length > 0 ? (
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full bg-dark/8 px-2.5 py-0.5 text-xs font-medium text-dark/80 dark:bg-light/10 dark:text-light/80">
                {tag}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </article>
  );
}

export default function FeaturedProjects() {
  const { content } = usePortfolio();
  const home = content.site.pages.home;
  const featured = content.projects.filter((project) => project.featured);

  if (!featured.length) return null;

  const title = home.featuredProjectsTitle?.trim();
  if (!title) return null;

  return (
    <HomeSection>
      <ContentPanel
        icon={<FolderIcon className="h-4 w-4 shrink-0" />}
        title={title}
        footer={
          <div className="text-center sm:text-left">
            <Link href="/projects" className="btn-secondary">
              View all projects
            </Link>
          </div>
        }>
        <div className="space-y-3">
          {featured.map((project) => (
            <FeaturedProjectRow key={project.id} project={project} />
          ))}
        </div>
      </ContentPanel>
    </HomeSection>
  );
}
