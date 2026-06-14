import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import LiIcon, { timelineAxisClass } from "./LiIcon";
import { ContentPanel } from "@/components/HomeSection";
import { BriefcaseIcon } from "@/components/icons/PageIcons";
import { usePortfolio } from "@/context/PortfolioContext";

function ExperienceBullets({ bullets }) {
  if (!bullets?.length) return null;

  return (
    <ul className="my-3 w-full space-y-1.5 pl-5 text-sm font-medium list-disc md:text-sm">
      {bullets.map((bullet, index) => (
        <li key={index} className="text-dark/75 dark:text-light/75">
          {bullet}
        </li>
      ))}
    </ul>
  );
}

const Details = ({ position, company, companyLink, time, address, bullets, tech }) => {
  const ref = useRef(null);

  return (
    <li
      ref={ref}
      className="relative my-8 flex w-full flex-col items-start justify-between pl-20 first:mt-0 last:mb-0 md:pl-[4.5rem] xs:pl-14">
      <LiIcon reference={ref} />
      <motion.div
        initial={false}
        whileInView={{ y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, type: "spring" }}
        className="w-full">
        <h3 className="text-lg font-bold capitalize xs:text-base sm:text-lg">
          {position}&nbsp;
          {companyLink ? (
            <a
              href={companyLink}
              target="_blank"
              rel="noreferrer"
              className="text-primary capitalize dark:text-primaryDark">
              @{company}
            </a>
          ) : (
            <span className="text-primary capitalize dark:text-primaryDark">@{company}</span>
          )}
        </h3>
        <p className="mt-1 text-sm font-medium capitalize text-dark/75 dark:text-light/75 xs:text-sm">
          {time} | {address}
        </p>
        <ExperienceBullets bullets={bullets} />
        {tech ? (
          <p className="mt-2 text-sm font-medium text-primary dark:text-primaryDark">Tech: {tech}</p>
        ) : null}
      </motion.div>
    </li>
  );
};

const Experience = () => {
  const ref = useRef(null);
  const { content } = usePortfolio();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return (
    <ContentPanel
      icon={<BriefcaseIcon className="h-4 w-4 shrink-0" />}
      title="Experience and Trainings"
      className="mt-12 lg:mt-10">
      <div ref={ref} className="relative mx-auto w-[75%] lg:w-[90%] md:w-full">
        <motion.div
          style={{ scaleY: scrollYProgress }}
          className={`absolute top-0 z-0 h-full w-[2px] origin-top bg-dark dark:bg-light ${timelineAxisClass}`}
        />
        <ul className="relative z-[1] flex w-full flex-col items-start justify-between">
          {content.experience.map((entry) => (
            <Details
              key={entry.id}
              position={entry.position}
              company={entry.company}
              companyLink={entry.companyLink}
              time={entry.time}
              address={entry.address}
              bullets={entry.bullets}
              tech={entry.tech}
            />
          ))}
        </ul>
      </div>
    </ContentPanel>
  );
};

export default Experience;
