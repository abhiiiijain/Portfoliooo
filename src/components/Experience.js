import React, { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import LiIcon from "./LiIcon";

const Details = ({
  position,
  company,
  companyLink,
  time,
  address,
  work,
  tech,
}) => {
  const ref = useRef(null);
  return (
    <li
      ref={ref}
      className="my-8 first:mt-0 last:mb-0 w-[60%] mx-auto 
      flex flex-col items-left justify-between md:w-[80%]
    ">
      <LiIcon reference={ref} />
      <motion.div
        initial={{ y: 50 }}
        whileInView={{ y: 0 }}
        transition={{ duration: 0.5, type: "spring" }}>
        <h3 className="capitalize font-bold text-2xl sm:text-xl xs:text-lg">
          {position}&nbsp;
          <a
            href={companyLink}
            target="_blank"
            className="text-primary dark:text-primaryDark capitalize">
            @{company}
          </a>
        </h3>
        <span
          className="capitalize font-medium text-dark/75 dark:text-light/75 xs:text-sm
        ">
          {time} | {address}
        </span>
        <p
          className="font-medium w-full md:text-sm
        ">
          {work}
        </p>
        <p
          className="font-medium w-full md:text-sm text-primary dark:text-primaryDark
        ">
          Tech: {tech}
        </p>
      </motion.div>
    </li>
  );
};

const Experience = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center start"],
  });
  return (
    <div className="my-64">
      <h2
        className="font-bold text-8xl mb-32 w-full text-center
      md:text-6xl xs:text-4xl md:mb-16
      ">
        Experience and Trainings
      </h2>

      <div ref={ref} className="w-[75%] mx-auto relative lg:w-[90%] md:w-full">
        <motion.div
          style={{ scaleY: scrollYProgress }}
          className="absolute left-9 top-0 w-[4px] h-full bg-dark origin-top
          dark:bg-light md:w-[2px] md:left-[30px] xs:left-[20px]
          "
        />
        <ul className=" w-full flex flex-col items-start justify-between ml-4 xs:ml-2">
          <Details
            position="Software Engineer"
            company="Twigz Technologies Pvt. Ltd."
            // companyLink="/"
            time="Sep 2023 - Present"
            address="Gurugram, INDIA"
            work={
              <li>
                • Built responsive and interactive web applications using React.js, ensuring smooth performance across devices.
                <br />
                • Developed and maintained reusable front-end components to improve scalability and maintainability.
                <br />
                • Collaborated with cross-functional teams and followed Agile methodologies to deliver features on time.
                <br />
                • Managed source code with GitHub, maintaining a clean and well-structured repository for collaborative work.
                <br />
                • Wrote efficient, testable code and applied thorough testing practices to improve usability and stability.
              </li>

            }
            tech="ReactJs, NodeJs, ExpressJs, MongoBD, Tailwind CSS"
          />
          <Details
            position="MERN Stack Intern"
            company="A2it Solution Pvt. Ltd."
            // companyLink="/"
            time="Jan 2023 - Jun 2023"
            address="Mohali, INDIA"
            work={
              <li>
                • Developed full-stack applications using the MERN stack, with a focus on performance and scalability.
                <br />
                • Integrated Axios for data handling and React Router for seamless navigation across the application.
                <br />
                • Conducted comprehensive testing and delivered iterative enhancements, improving usability by 10%.
                <br />
                • Designed and deployed new applications optimized for speed, reliability, and user satisfaction.
              </li>
            }
            tech="ReactJs, NodeJs, ExpressJs, MongoBD"
          />
          <Details
            position="Software Engineer"
            company="Connecting Points Tech"
            // companyLink="/"
            time="Jun 2022 - Sep 2022"
            address="Mohali, INDIA"
            work={
              <li>
                • Contributed to internal projects by developing front-end features with React and Redux.
                <br />
                • Enhanced the user interface using Ant Design, improving consistency and accessibility.
                <br />
                • Applied Tailwind CSS for efficient styling and faster development of responsive layouts.
              </li>
            }
            tech="ReactJs, Redux, Tailwind CSS"
          />
          <Details
            position="ReactJs Training"
            company="ThinkNext Technologies Pvt. Ltd. "
            // companyLink="/"
            time="Jul 2021 - Aug 2021"
            address="Mohali, INDIA"
            work={
              <li>
                • Built interactive and responsive web applications using React.js and JavaScript.
                <br />
                • Designed and developed a front-end application in React.js to solve a specific user problem.
                <br />
                • Implemented Redux, Axios, and React Router, improving user experience by 10% through usability testing.
                <br />
                • Created a new application with enhanced performance and scalability by applying industry best practices.
              </li>
            }
            tech="ReactJs, MongoDb"
          />
          <Details
            position="PHP Training"
            company="Chandiagrh Engineering College "
            // companyLink="/"
            time="April 2020 - June 2020"
            address="Landran, INIDA"
            work={
              <li>
                • Mastered PHP and built an ecommerce platform like amazon which provide features like cart, search.
                <br />
                • Developed a user-friendly ecommerce platform with features like cart, search, and payment integration.
                <br />
                • Implemented PHP for server-side logic and MySQL for database management.
                <br />
                • Designed responsive UI using HTML and CSS to enhance user experience.
              </li>
            }
            tech="PHP, MySQL, HTML, CSS"
          />
        </ul>
      </div>
    </div>
  );
};

export default Experience;
