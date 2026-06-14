import AnimatedText from "@/components/AnimatedText";
import ExternalLink from "@/components/ExternalLink";
import Layout from "@/components/Layout";
import TransitionEffect from "@/components/TransitionEffect";
import { ContentPanel, PageGlow } from "@/components/HomeSection";
import { CertificateIcon } from "@/components/icons/PageIcons";
import Head from "next/head";
import Image from "next/image";
import { useRef } from "react";
import { easeInOut, motion, useMotionValue } from "framer-motion";
import { usePortfolio } from "@/context/PortfolioContext";

const FramerImage = motion(Image);

const MovingImage = ({ title, img, link }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const imgRef = useRef(null);

  function handleMouse(event) {
    imgRef.current.style.display = "inline-block";
    x.set(event.pageX);
    y.set(-10);
  }

  function handleMouseLeave() {
    imgRef.current.style.display = "none";
    x.set(0);
    y.set(0);
  }

  return (
    <ExternalLink
      href={link}
      onMouseMove={link ? handleMouse : undefined}
      onMouseLeave={link ? handleMouseLeave : undefined}
      className="min-w-0 flex-1">
      <h2 className="text-base font-semibold capitalize text-dark transition-colors hover:text-primary dark:text-light dark:hover:text-primaryDark md:text-center lg:text-base md:text-sm">
        {title}
      </h2>
      {link ? (
        <FramerImage
          style={{ x, y }}
          initial={false}
          whileInView={{ opacity: 1, transition: { duration: 0.2 } }}
          viewport={{ once: true }}
          ref={imgRef}
          src={img}
          alt={title}
          width={384}
          height={256}
          className="absolute z-10 hidden h-auto w-96 rounded-lg md:!hidden"
        />
      ) : null}
    </ExternalLink>
  );
};

const Certification = ({ img, title, date, link, company }) => {
  return (
    <motion.li
      initial={false}
      whileInView={{ y: 0, transition: { duration: 0.5, ease: easeInOut } }}
      viewport={{ once: true }}
      className="relative my-3 flex w-full items-center justify-between gap-4 rounded-xl border border-dark/10 bg-dark/[0.02] p-4 transition-all duration-200 first:mt-0 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-sm dark:border-light/10 dark:bg-light/[0.03] dark:hover:border-primaryDark/30 sm:flex-col sm:items-start">
      <MovingImage title={title} img={img} link={link} />
      <div className="flex shrink-0 flex-col items-end gap-1 text-right sm:w-full sm:flex-row sm:items-center sm:justify-between">
        <span className="text-sm font-semibold text-primary dark:text-primaryDark">{company}</span>
        <span className="text-xs text-dark/60 dark:text-light/60">{date}</span>
      </div>
    </motion.li>
  );
};

const FeaturedCertification = ({ img, title, date, company, link }) => {
  return (
    <li className="relative w-full">
      <article className="relative rounded-2xl border border-primary/25 bg-light/90 p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md dark:border-primaryDark/25 dark:bg-[#141414]/90">
        <ExternalLink
          href={link}
          className={`inline-block w-full overflow-hidden rounded-xl${link ? " cursor-pointer" : ""}`}>
          <FramerImage
            src={img}
            alt={title}
            width={600}
            height={400}
            className="h-auto w-full rounded-xl ring-1 ring-dark/10 dark:ring-light/10"
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.2 }}
            priority
            sizes="(max-width: 769px) 100vw, (max-width:1200px) 50vw, 50vw"
          />
        </ExternalLink>
        <ExternalLink href={link} className="mt-4 block hover:underline">
          <h2 className="text-lg font-bold capitalize text-dark dark:text-light xs:text-base">{title}</h2>
        </ExternalLink>
        <p className="mt-1 text-sm text-dark/70 dark:text-light/70">{company}</p>
        <div className="mt-3 flex items-center justify-between gap-3">
          <span className="text-sm font-semibold text-primary dark:text-primaryDark">{date}</span>
          {link ? (
            <ExternalLink href={link} className="text-sm font-semibold text-primary hover:underline dark:text-primaryDark">
              Verify
            </ExternalLink>
          ) : null}
        </div>
      </article>
    </li>
  );
};

const Certifications = () => {
  const { content } = usePortfolio();
  const page = content.site.pages.certifications;
  const featured = content.certifications.filter((item) => item.featured);
  const listItems = content.certifications.filter((item) => !item.featured);

  return (
    <>
      <Head>
        <title>{page.title}</title>
        <meta name="description" content={page.description} />
      </Head>
      <TransitionEffect />
      <main className="mb-16 flex w-full flex-col items-center justify-center overflow-hidden dark:text-light">
        <Layout className="relative mb-32 pt-16">
          <PageGlow />
          <AnimatedText
            text={page.headline}
            className="relative mb-16 lg:!text-5xl sm:mb-8 sm:!text-4xl xs:!text-3xl"
          />

          {featured.length > 0 ? (
            <ContentPanel
              icon={<CertificateIcon className="h-4 w-4 shrink-0" />}
              title="Featured"
              className="mb-10">
              <ul className="grid grid-cols-2 gap-6 lg:gap-5 md:grid-cols-1 md:gap-y-8">
                {featured.map((cert) => (
                  <FeaturedCertification
                    key={cert.id}
                    title={cert.title}
                    company={cert.company}
                    date={cert.date}
                    link={cert.link}
                    img={cert.image}
                  />
                ))}
              </ul>
            </ContentPanel>
          ) : null}

          {listItems.length > 0 ? (
            <ContentPanel icon={<CertificateIcon className="h-4 w-4 shrink-0" />} title={page.listHeading}>
              <ul>
                {listItems.map((cert) => (
                  <Certification
                    key={cert.id}
                    title={cert.title}
                    company={cert.company}
                    date={cert.date}
                    link={cert.link}
                    img={cert.image}
                  />
                ))}
              </ul>
            </ContentPanel>
          ) : null}
        </Layout>
      </main>
    </>
  );
};

export default Certifications;
