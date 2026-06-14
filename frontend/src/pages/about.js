import Layout from "@/components/Layout";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import AnimatedText from "@/components/AnimatedText";
import { ContentPanel, PageGlow } from "@/components/HomeSection";
import {
  AvailabilityDot,
  CodeIcon,
  LocationIcon,
  UserIcon,
} from "@/components/icons/PageIcons";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import TransitionEffect from "@/components/TransitionEffect";
import { calculateExperienceDuration, formatExperienceDuration } from "@/lib/experience";
import { usePortfolio } from "@/context/PortfolioContext";

const About = () => {
  const { content } = usePortfolio();
  const { site } = content;
  const page = site.pages.about;
  const [experienceLabel, setExperienceLabel] = useState("");

  useEffect(() => {
    const duration = calculateExperienceDuration(site.experienceStartDate);
    setExperienceLabel(duration ? formatExperienceDuration(duration) : "");
  }, [site.experienceStartDate]);

  const role = page.role || site.brand || "Developer";
  const availability = page.availability || "Available for projects";

  return (
    <>
      <Head>
        <title>{page.title}</title>
        <meta name="description" content={page.description} />
      </Head>
      <TransitionEffect />
      <main className="flex w-full flex-col items-center justify-center dark:text-light">
        <Layout className="relative pt-16">
          <PageGlow />
          <AnimatedText
            text={page.headline}
            className="relative mb-16 lg:!text-5xl sm:!text-4xl xs:!text-3xl sm:mb-8"
          />

          <div className="relative grid grid-cols-3 items-stretch gap-6 lg:grid-cols-1 lg:gap-6">
            <ContentPanel
              icon={<UserIcon className="h-4 w-4 shrink-0" />}
              title={page.biographyTitle || "My Journey"}
              className="col-span-2 flex flex-col lg:col-span-1">
              <div className="flex-1 space-y-4">
                {(page.biography || []).map((paragraph, index) => (
                  <p key={index} className="text-sm leading-relaxed text-dark/75 dark:text-light/75 md:text-sm">
                    {paragraph}
                  </p>
                ))}
              </div>

              {(page.location || availability) && (
                <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 border-t border-dark/10 pt-5 text-xs text-dark/80 dark:border-light/10 dark:text-light/80">
                  {page.location ? (
                    <span className="inline-flex items-center gap-2">
                      <LocationIcon className="h-3.5 w-3.5 shrink-0 text-primary dark:text-primaryDark" />
                      {page.location}
                    </span>
                  ) : null}
                  {availability ? (
                    <span className="inline-flex items-center gap-2">
                      <AvailabilityDot />
                      {availability}
                    </span>
                  ) : null}
                </div>
              )}
            </ContentPanel>

            <ContentPanel className="col-span-1 flex flex-col items-center text-center lg:col-span-1">
              <div className="relative mx-auto mb-5 w-full max-w-[220px]">
                <div
                  className="absolute inset-0 scale-[1.06] rotate-6 rounded-2xl border-2 border-dashed border-primary/40 dark:border-primaryDark/40"
                  aria-hidden
                />
                <Image
                  src={page.profileImage}
                  alt={site.name || site.brand}
                  width={440}
                  height={440}
                  className="relative h-auto w-full rounded-2xl object-cover shadow-lg ring-1 ring-dark/10 dark:ring-light/10"
                  priority
                  sizes="(max-width: 1023px) 280px, 200px"
                />
              </div>

              <h2 className="text-lg font-bold text-dark dark:text-light">{site.name || site.brand}</h2>
              <p className="mt-1 text-sm text-dark/60 dark:text-light/60">{role}</p>

              {experienceLabel ? (
                <p className="mt-4 inline-flex items-center gap-2 text-xs text-dark/70 dark:text-light/70">
                  <CodeIcon className="h-3.5 w-3.5 shrink-0 text-primary dark:text-primaryDark" />
                  {experienceLabel}
                </p>
              ) : null}
            </ContentPanel>
          </div>

          <Skills />
          <Education />
          <Experience />
        </Layout>
      </main>
    </>
  );
};

export default About;
