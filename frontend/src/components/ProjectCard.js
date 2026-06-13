import { GithubIcon } from "@/components/Icons";
import ExternalLink from "@/components/ExternalLink";
import ProjectPreview from "@/components/ProjectPreview";

export default function ProjectCard({
  variant = "compact",
  type,
  title,
  summary,
  img,
  link,
  github,
  tech,
}) {
  const featured = variant === "featured";
  const visitUrl = link || github;

  const articleClass = featured
    ? `w-full flex items-center justify-between relative rounded-br-2xl
    rounded-3xl border border-solid border-dark bg-light shadow-2xl p-12
    dark:bg-dark dark:border-light
    lg:flex-col lg:p-8 xs:rounded-2xl xs:rounded-br-3xl xs:p-4`
    : `w-full flex flex-col items-center justify-center rounded-2xl
    border border-solid border-dark bg-light p-6 relative dark:bg-dark
    dark:border-light xs:p-4`;

  const shadowClass = featured
    ? `absolute top-0 -right-3 -z-10 w-[101%] h-[103%] rounded-[2.5rem] bg-dark 
        dark:bg-light rounded-br-3xl xs:-right-2 sm:h-[102%] xs:w-full xs:rounded-[1.5rem]`
    : `absolute top-0 -right-3 -z-10 w-[101%] h-[103%] rounded-[2rem] bg-dark
      rounded-br-3xl dark:bg-light md:-right-2 md:w-[101%] xs:h-[102%] xs:rounded-[1.5rem]`;

  const previewClass = featured
    ? "w-1/2 overflow-hidden rounded-lg lg:w-full"
    : "w-full overflow-hidden rounded-lg";

  const bodyClass = featured
    ? "w-1/2 flex flex-col items-start justify-between pl-6 lg:w-full lg:pl-0 lg:pt-6"
    : "w-full flex flex-col items-start justify-between mt-4";

  const typeClass = featured
    ? "text-primary font-medium text-xl dark:text-primaryDark xs:text-base"
    : "text-primary font-medium text-xl dark:text-primaryDark lg:text-lg md:text-base";

  const titleClass = featured
    ? "my-2 w-full text-left text-3xl font-bold dark:text-light sm:text-sm"
    : "my-2 w-full text-left text-2xl font-bold lg:text-xl dark:text-light sm:text-lg";

  const techClass = featured
    ? "my-2 w-full text-left text-lg font-semibold lg:text-xl dark:text-light sm:text-sm"
    : "my-2 w-full text-left text-lg font-semibold lg:text-xl dark:text-light sm:text-lg";

  return (
    <article className={articleClass}>
      <div className={shadowClass} />
      <ProjectPreview
        image={img}
        link={link}
        title={title}
        featured={featured}
        priority={featured}
        href={visitUrl}
        className={previewClass}
      />
      <div className={bodyClass}>
        <span className={typeClass}>{type}</span>
        <ExternalLink href={visitUrl} className="hover:underline underline-offset-2">
          <h2 className={titleClass}>{title}</h2>
        </ExternalLink>
        <h2 className={techClass}>Tech: {tech}</h2>
        {featured && summary && (
          <p className="my-2 font-medium text-dark dark:text-light sm:text-sm">{summary}</p>
        )}
        {(github || visitUrl) && (
          <div
            className={
              featured
                ? "mt-2 flex items-center"
                : "w-full mt-2 flex items-center justify-between"
            }>
            {github && (
              <ExternalLink href={github} className={featured ? "w-10" : "w-8 md:w-6"}>
                <GithubIcon />
              </ExternalLink>
            )}
            {visitUrl && (
              <ExternalLink
                href={visitUrl}
                className={
                  featured
                    ? "ml-4 rounded-lg bg-dark text-light p-2 px-6 text-lg font-semibold dark:bg-light dark:text-dark sm:px-4 sm:text-base"
                    : "text-lg font-semibold underline md:text-base"
                }>
                {featured ? "Visit Project" : "Visit"}
              </ExternalLink>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
