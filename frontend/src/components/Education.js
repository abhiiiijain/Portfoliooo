import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import LiIcon, { timelineAxisClass } from "./LiIcon";
import { ContentPanel } from "@/components/HomeSection";
import { AcademicIcon } from "@/components/icons/PageIcons";
import { usePortfolio } from "@/context/PortfolioContext";

const Details = ({ type, time, place, info, trade }) => {
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
          {type}&nbsp;
          {trade ? <span className="text-primary capitalize dark:text-primaryDark">{trade}</span> : null}
        </h3>
        <p className="mt-1 text-sm font-medium capitalize text-dark/75 dark:text-light/75 xs:text-sm">
          {time} | {place}
        </p>
        {info ? <p className="mt-2 w-full text-sm font-medium text-dark/70 dark:text-light/70">{info}</p> : null}
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
    <ContentPanel icon={<AcademicIcon className="h-4 w-4 shrink-0" />} title="Education" className="mt-12 lg:mt-10">
      <div ref={ref} className="relative mx-auto w-[75%] lg:w-[90%] md:w-full">
        <motion.div
          style={{ scaleY: scrollYProgress }}
          className={`absolute top-0 z-0 h-full w-[2px] origin-top bg-dark dark:bg-light ${timelineAxisClass}`}
        />
        <ul className="relative z-[1] flex w-full flex-col items-start justify-between">
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
    </ContentPanel>
  );
};

export default Education;
