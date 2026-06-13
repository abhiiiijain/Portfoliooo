import React, { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import LiIcon, { timelineAxisClass } from "./LiIcon";
import SectionHeading from "@/components/SectionHeading";
import { usePortfolio } from "@/context/PortfolioContext";

const Details = ({ type, time, place, info, trade }) => {
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
          {type}&nbsp;
          {trade && (
            <span className="text-primary dark:text-primaryDark capitalize">{trade}</span>
          )}
        </h3>
        <p className="capitalize font-medium text-dark/75 dark:text-light/75 xs:text-sm mt-1">
          {time} | {place}
        </p>
        {info && <p className="font-medium w-full md:text-sm mt-2">{info}</p>}
      </motion.div>
    </li>
  );
};

const Education = () => {
  const ref = useRef(null);
  const { content } = usePortfolio();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return (
    <div className="mt-16 lg:mt-12 w-full">
      <SectionHeading title="Education" />

      <div ref={ref} className="w-[75%] mx-auto relative lg:w-[90%] md:w-full">
        <motion.div
          style={{ scaleY: scrollYProgress }}
          className={`absolute top-0 h-full w-[2px] origin-top bg-dark dark:bg-light z-0 ${timelineAxisClass}`}
        />
        <ul className="relative z-[1] w-full flex flex-col items-start justify-between">
          {content.education.map((entry) => (
            <Details
              key={entry.id}
              type={entry.type}
              trade={entry.trade}
              time={entry.time}
              place={entry.place}
              info={entry.info}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Education;
