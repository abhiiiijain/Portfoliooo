import AnimatedText from "@/components/AnimatedText";
import ExternalLink from "@/components/ExternalLink";
import Layout from "@/components/Layout";
import TransitionEffect from "@/components/TransitionEffect";
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
      onMouseLeave={link ? handleMouseLeave : undefined}>
      <h2
        className="capitalize text-lg font-semibold hover:underline md:text-center lg:text-base md:text-sm
        ">
        {title}
      </h2>
      {link && (
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
          className="z-10 w-96 h-auto hidden absolute rounded-lg
        md:!hidden 
        "
        />
      )}
    </ExternalLink>
  );
};

const Certification = ({ img, title, date, link, company }) => {
  return (
    <motion.li
      initial={false}
      whileInView={{ y: 0, transition: { duration: 0.5, ease: easeInOut } }}
      viewport={{ once: true }}
      className="relative w-full p-4 py-6 my-4 rounded-xl flex items-center
    justify-between bg-light text-dark first:mt-0 border border-solid border-dark
    border-r-4 border-b-4 dark:border-light dark:bg-dark dark:text-light
    sm:flex-col flex-wrap
    ">
      <MovingImage title={title} img={img} link={link} />
      <div className="flex flex-col w-[20%] xs:justify-between xs:items-center">
        <span className="text-center text-lg text-primary font-semibold dark:text-primaryDark lg:text-lg md:text-sm ">
          {company}
        </span>
        <span className="text-center text-lg text-primary font-semibold dark:text-primaryDark lg:text-lg md:text-sm ">
          {date}
        </span>
      </div>
    </motion.li>
  );
};

const FeaturedCertification = ({ img, title, date, company, link }) => {
  return (
    <li
      className="relative col-span-1 w-full p-4 bg-light border border-solid border-dark rounded-2xl
    dark:bg-dark dark:border-light
    ">
      <div
        className="absolute top-0 -right-3 -z-10 w-[101%] h-[103%] rounded-[2rem] bg-dark
      rounded-br-3xl"
      />
      <ExternalLink
        href={link}
        className={`w-full inline-block overflow-hidden rounded-lg${link ? " cursor-pointer" : ""}`}>
        <FramerImage
          src={img}
          alt={title}
          width={600}
          height={400}
          className="w-full h-auto"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
          priority
          sizes="(max-width: 769px) 100vw,
          (max-width:1200px) 50vw,
          50vw"
        />
      </ExternalLink>
      <ExternalLink href={link}>
        <h2
          className="capitalize text-xl font-bold my-2 mt-4
        hover:underline xs:text-base
        ">
          {title}
        </h2>
      </ExternalLink>
      <p className="text-lg mb-2">{company}</p>
      <div className="flex justify-between">
        <span className="text-primary font-semibold dark:text-primaryDark">
          {date}
        </span>
        {link && (
          <ExternalLink href={link}>
            <h2
              className="text-primary font-semibold dark:text-primaryDark
        ">
              Verify
            </h2>
          </ExternalLink>
        )}
      </div>
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
        <meta name="description" content={page.description}></meta>
      </Head>
      <TransitionEffect />
      <main
        className="w-full mb-16 flex flex-col items-center justify-center overflow-hidden
      dark:text-light
      ">
        <Layout className="pt-16 mb-32">
          <AnimatedText
            text={page.headline}
            className="mb-16 lg:!text-5xl sm:mb-8 sm:!text-4xl xs:!text-3xl
          "
          />
          <ul className="grid grid-cols-2 gap-16 lg:gap-8 md:grid-cols-1 md:gap-y-16">
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

          <h2 className="font-bold text-3xl w-full text-center my-16 mt-32">
            {page.listHeading}
          </h2>

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
        </Layout>
      </main>
    </>
  );
};

export default Certifications;
