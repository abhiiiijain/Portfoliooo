import AnimatedText from "@/components/AnimatedText";
import Layout from "@/components/Layout";
import ProjectCard from "@/components/ProjectCard";
import TransitionEffect from "@/components/TransitionEffect";
import { PageGlow } from "@/components/HomeSection";
import Head from "next/head";
import { usePortfolio } from "@/context/PortfolioContext";

export default function Projects() {
  const { content } = usePortfolio();
  const page = content.site.pages.projects;
  const projects = content.projects;
  const featuredCount = projects.filter((project) => project.featured).length;

  return (
    <>
      <Head>
        <title>{page.title}</title>
        <meta name="description" content={page.description} />
      </Head>
      <TransitionEffect />
      <main className="mb-16 flex w-full flex-col items-center justify-center dark:text-light">
        <Layout className="relative pt-16">
          <PageGlow />
          <div className="relative mb-16 sm:mb-8">
            <AnimatedText
              text={page.headline}
              className="lg:!text-5xl sm:!text-4xl xs:!text-3xl"
            />
            <p className="mt-3 text-sm text-dark/60 dark:text-light/60">
              {projects.length} project{projects.length === 1 ? "" : "s"}
              {featuredCount > 0 ? ` · ${featuredCount} featured` : ""}
            </p>
          </div>

          <div className="relative grid grid-cols-12 gap-24 gap-y-32 xl:gap-x-16 lg:gap-x-8 md:gap-y-24 sm:gap-x-0">
            {projects.map((project) => (
              <div
                key={project.id}
                className={project.featured ? "col-span-12" : "col-span-6 sm:col-span-12"}>
                <ProjectCard
                  variant={project.featured ? "featured" : "compact"}
                  title={project.title}
                  img={project.image}
                  summary={project.summary}
                  link={project.link}
                  github={project.github}
                  type={project.type}
                  tech={project.tech}
                />
              </div>
            ))}
          </div>
        </Layout>
      </main>
    </>
  );
}
