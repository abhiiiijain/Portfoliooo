import Layout from "@/components/Layout";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import AnimatedText from "@/components/AnimatedText";
import SectionHeading from "@/components/SectionHeading";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import TransitionEffect from "@/components/TransitionEffect";
import { usePortfolio } from "@/context/PortfolioContext";

const cardClass =
  "rounded-2xl border border-dark/10 bg-light/90 dark:border-light/10 dark:bg-dark/50 p-8 lg:p-10 h-full";

function LocationIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
      />
    </svg>
  );
}

function CalendarIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
      />
    </svg>
  );
}

function CodeIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25" />
    </svg>
  );
}

const calculateExperienceDuration = (startDate) => {
  const start = new Date(startDate);
  if (Number.isNaN(start.getTime())) return null;

  const now = new Date();
  let years = now.getFullYear() - start.getFullYear();
  let months = now.getMonth() - start.getMonth();
  const dayDiff = now.getDate() - start.getDate();

  if (dayDiff < 0) months -= 1;
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  years = Math.max(0, years);
  months = Math.max(0, months);
  if (years === 0 && months === 0) return null;

  return { years, months };
};

const formatExperienceDuration = ({ years, months }) => {
  const parts = [];
  if (years > 0) parts.push(`${years} Year${years === 1 ? "" : "s"}`);
  if (months > 0) parts.push(`${months} Month${months === 1 ? "" : "s"}`);
  return `${parts.join(" ")} Experience`;
};

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
        <Layout className="pt-16">
          <AnimatedText
            text={page.headline}
            className="mb-16 lg:!text-5xl sm:!text-4xl xs:!text-3xl sm:mb-8"
          />
          <div className="grid grid-cols-3 gap-6 lg:grid-cols-1 lg:gap-8 items-stretch">
            <article className={`${cardClass} col-span-2 lg:col-span-1 flex flex-col`}>
              <SectionHeading
                title={page.biographyTitle || "My Journey"}
                variant="card"
              />

              <div className="flex-1 space-y-4">
                {(page.biography || []).map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-base leading-relaxed text-dark/70 dark:text-light/70 md:text-sm">
                    {paragraph}
                  </p>
                ))}
              </div>

              {(page.location || availability) && (
                <div className="mt-8 pt-6 border-t border-dark/10 dark:border-light/10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-dark/55 dark:text-light/55">
                  {page.location && (
                    <span className="inline-flex items-center gap-2">
                      <LocationIcon />
                      {page.location}
                    </span>
                  )}
                  {availability && (
                    <span className="inline-flex items-center gap-2">
                      <CalendarIcon />
                      {availability}
                    </span>
                  )}
                </div>
              )}
            </article>

            <aside className={`${cardClass} col-span-1 lg:col-span-1 flex flex-col items-center text-center`}>
              <div className="relative mx-auto w-full max-w-[220px] mb-6">
                <div
                  className="absolute inset-0 rounded-2xl border-2 border-dashed border-primary/50 dark:border-primaryDark/50 rotate-6 scale-[1.06]"
                  aria-hidden
                />
                <Image
                  src={page.profileImage}
                  alt={site.name || site.brand}
                  width={440}
                  height={440}
                  className="relative w-full h-auto rounded-2xl object-cover"
                  priority
                  sizes="(max-width: 1023px) 280px, 220px"
                />
              </div>

              <h2 className="text-xl font-bold text-dark dark:text-light">{site.name || site.brand}</h2>
              <p className="mt-1 text-sm text-dark/60 dark:text-light/60">{role}</p>

              {experienceLabel && (
                <p className="mt-4 inline-flex items-center gap-2 text-sm text-dark/55 dark:text-light/55">
                  <CodeIcon />
                  {experienceLabel}
                </p>
              )}
            </aside>
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
