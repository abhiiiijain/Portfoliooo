import { motion, useScroll } from "framer-motion";

const TIMELINE_LEFT =
  "left-9 md:left-[30px] xs:left-5 -translate-x-1/2";

const LiIcon = ({ reference }) => {
  const { scrollYProgress } = useScroll({
    target: reference,
    offset: ["center end", "center center"],
  });

  return (
    <figure
      className={`absolute top-1 z-10 stroke-dark dark:stroke-light ${TIMELINE_LEFT}`}>
      <svg
        className="-rotate-90 md:w-[60px] md:h-[60px] xs:w-[40px] xs:h-[40px]"
        width="75"
        height="75"
        viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="20"
          className="stroke-primary dark:stroke-primaryDark stroke-1 fill-none"
        />
        <motion.circle
          cx="50"
          cy="50"
          r="20"
          className="stroke-[5px] fill-light dark:fill-dark stroke-dark dark:stroke-light"
          style={{ pathLength: scrollYProgress }}
        />
        <circle
          cx="50"
          cy="50"
          r="10"
          className="animate-pulse stroke-1 fill-primary dark:fill-primaryDark"
        />
      </svg>
    </figure>
  );
};

export const timelineAxisClass = TIMELINE_LEFT;

export default LiIcon;
