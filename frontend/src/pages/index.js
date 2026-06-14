import { useState } from "react";
import Layout from "@/components/Layout";
import Head from "next/head";
import Image from "next/image";
import AnimatedText from "@/components/AnimatedText";
import HomeAboutCard from "@/components/HomeAboutCard";
import FeaturedProjects from "@/components/FeaturedProjects";
import GitHubProfile from "@/components/GitHubProfile";
import Link from "next/link";
import { LinkArrow } from "@/components/Icons";
import ResumeViewerModal from "@/components/ResumeViewerModal";
import TransitionEffect from "@/components/TransitionEffect";
import { usePortfolio } from "@/context/PortfolioContext";

export default function Home() {
  const { content } = usePortfolio();
  const { site } = content;
  const page = site.pages.home;
  const [resumeOpen, setResumeOpen] = useState(false);

  return (
    <>
      <Head>
        <title>{page.title}</title>
        <meta name="description" content={page.description} />
      </Head>
      <TransitionEffect />
      <main className="text-dark w-full dark:text-light">
        <section className="relative flex min-h-[calc(100vh-5rem)] items-center overflow-hidden">
          <div className="hero-glow" aria-hidden="true">
            <div className="absolute -left-1/4 top-0 h-[480px] w-[480px] rounded-full bg-primary/10 blur-3xl dark:bg-primaryDark/10" />
            <div className="absolute -right-1/4 bottom-0 h-[360px] w-[360px] rounded-full bg-primary/5 blur-3xl dark:bg-primaryDark/5" />
          </div>

          <Layout className="relative w-full pt-0 md:pt-16 sm:pt-8">
            <div className="flex w-full items-center justify-between gap-12 lg:flex-col">
              <div className="w-1/2 lg:order-2 lg:w-full">
                <Image
                  src={page.profileImage}
                  alt={site.brand}
                  width={600}
                  height={600}
                  className="mx-auto w-full max-w-md rounded-2xl shadow-xl ring-1 ring-dark/10 dark:ring-light/10 lg:max-w-sm"
                  priority
                  sizes="(max-width: 769px) 100vw, (max-width:1200px) 50vw, 50vw"
                />
              </div>
              <div className="flex w-1/2 flex-col items-center self-center lg:order-1 lg:w-full lg:text-center">
                <AnimatedText
                  text={page.heroText}
                  className="!text-5xl !text-left xl:!text-4xl lg:!text-center lg:!text-5xl md:!text-4xl sm:!text-2xl"
                />
                <p className="my-4 max-w-xl text-base font-medium leading-relaxed text-dark/80 dark:text-light/80 md:text-sm sm:text-xs">
                  {page.intro}
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-3 self-start lg:self-center">
                  <button
                    type="button"
                    onClick={() => setResumeOpen(true)}
                    className="btn-primary text-lg md:text-base md:px-4 md:py-2">
                    Resume
                    <LinkArrow className="ml-1 w-6" />
                  </button>
                  <Link href="/contact" className="btn-secondary text-base md:text-sm">
                    Get in touch
                  </Link>
                </div>
              </div>
            </div>
          </Layout>

          <div
            className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-dark/40 dark:text-light/40 lg:flex"
            aria-hidden="true">
            <span className="text-[10px] uppercase tracking-widest">Scroll</span>
            <svg className="h-4 w-4 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </section>

        <HomeAboutCard />
        <FeaturedProjects />
        <GitHubProfile />
      </main>

      <ResumeViewerModal
        open={resumeOpen}
        url={site.resumeUrl}
        title={`${site.name || site.brand} — Resume`}
        onClose={() => setResumeOpen(false)}
      />
    </>
  );
}
