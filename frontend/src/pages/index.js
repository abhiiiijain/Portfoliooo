import { useState } from "react";
import Layout from "@/components/Layout";
import Head from "next/head";
import Image from "next/image";
import AnimatedText from "@/components/AnimatedText";
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
        <section className="flex items-center min-h-[calc(100vh-5rem)] relative">
          <Layout className="pt-0 md:pt-16 sm:pt-8 w-full">
            <div className="flex items-center justify-between w-full lg:flex-col gap-12">
              <div className="w-1/2 md:w-full">
                <Image
                  src={page.profileImage}
                  alt={site.brand}
                  width={600}
                  height={600}
                  className="w-full h-auto lg:hidden md:inline-block md:w-full rounded-2xl"
                  priority
                  sizes="(max-width: 769px) 100vw, (max-width:1200px) 50vw, 50vw"
                />
              </div>
              <div className="w-1/2 flex flex-col items-center self-center lg:w-full lg:text-center">
                <AnimatedText
                  text={page.heroText}
                  className="!text-5xl !text-left xl:!text-4xl lg:!text-center lg:!text-5xl md:!text-4xl sm:!text-2xl"
                />
                <p className="my-4 text-base font-medium text-dark/80 dark:text-light/80 md:text-sm sm:text-xs leading-relaxed">
                  {page.intro}
                </p>
                <div className="flex items-center flex-wrap gap-4 self-start mt-2 lg:self-center">
                  <button
                    type="button"
                    onClick={() => setResumeOpen(true)}
                    className="btn-primary text-lg md:text-base md:px-4 md:py-2">
                    Resume
                    <LinkArrow className="w-6 ml-1" />
                  </button>
                  <Link
                    href="/contact"
                    className="text-lg font-medium text-dark underline underline-offset-4 decoration-primary/50 hover:decoration-primary dark:text-light md:text-base">
                    Get in touch
                  </Link>
                </div>
              </div>
            </div>
          </Layout>
        </section>
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
