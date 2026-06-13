import AnimatedText from "@/components/AnimatedText";
import Layout from "@/components/Layout";
import ProjectCard from "@/components/ProjectCard";
import TransitionEffect from "@/components/TransitionEffect";
import Head from "next/head";
import { usePortfolio } from "@/context/PortfolioContext";

export default function Projects() {
  const { content } = usePortfolio();
  const page = content.site.pages.projects;
  const projects = content.projects;

  return (
    <>
      <Head>
        <title>{page.title}</title>
        <meta name="description" content={page.description} />
      </Head>
      <TransitionEffect />
      <main className="w-full mb-16 flex flex-col items-center justify-center dark:text-light">
        <Layout className="pt-16">
          <AnimatedText
            text={page.headline}
            className="mb-16 lg:!text-5xl sm:mb-8 sm:!text-4xl xs:!text-3xl"
          />

          <div className="grid grid-cols-12 gap-24 gap-y-32 xl:gap-x-16 lg:gap-x-8 md:gap-y-24 sm:gap-x-0">
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
