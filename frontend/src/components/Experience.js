import React, { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import LiIcon, { timelineAxisClass } from "./LiIcon";
import SectionHeading from "@/components/SectionHeading";
import { usePortfolio } from "@/context/PortfolioContext";

function ExperienceBullets({ bullets }) {
  if (!bullets?.length) return null;

  return (
    <ul className="my-3 list-disc pl-5 font-medium w-full md:text-sm space-y-1.5">
      {bullets.map((bullet, index) => (
        <li key={index}>{bullet}</li>
      ))}
    </ul>
  );
}

const Details = ({
  position,
  company,
  companyLink,
  time,
  address,
  bullets,
  tech,
}) => {
  const ref = useRef(null);

  return (
    <li
      ref={ref}
      className="relative my-8 first:mt-0 last:mb-0 w-full pl-20 md:pl-[4.5rem] xs:pl-14
      flex flex-col items-start justify-between">
      <LiIcon reference={ref} />
      <motion.div
        initial={false}
        whileInView={{ y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, type: "spring" }}
        className="w-full">
        <h3 className="capitalize font-bold text-xl sm:text-lg xs:text-base">
          {position}&nbsp;
          {companyLink ? (
            <a
              href={companyLink}
              target="_blank"
              rel="noreferrer"
              className="text-primary dark:text-primaryDark capitalize">
              @{company}
            </a>
          ) : (
            <span className="text-primary dark:text-primaryDark capitalize">@{company}</span>
          )}
        </h3>
        <p className="capitalize font-medium text-dark/75 dark:text-light/75 xs:text-sm mt-1">
          {time} | {address}
        </p>
        <ExperienceBullets bullets={bullets} />
        {tech && (
          <p className="font-medium w-full md:text-sm text-primary dark:text-primaryDark mt-2">
            Tech: {tech}
          </p>
        )}
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
    <div className="mt-16 lg:mt-12 mb-16 lg:mb-12 w-full">
      <SectionHeading title="Experience and Trainings" />

      <div ref={ref} className="w-[75%] mx-auto relative lg:w-[90%] md:w-full">
        <motion.div
          style={{ scaleY: scrollYProgress }}
          className={`absolute top-0 h-full w-[2px] origin-top bg-dark dark:bg-light z-0 ${timelineAxisClass}`}
        />
        <ul className="relative z-[1] w-full flex flex-col items-start justify-between">
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
    </div>
  );
};

export default Experience;
