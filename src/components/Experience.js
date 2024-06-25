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
        Trainings and Internships
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
            company="A2it Solution Pvt. Ltd."
            // companyLink="/"
            time="Sep 2023 - Present"
            address="Gurugram, INDIA"
            work={
              <li>
                • I have extensive experience in building interactive and
                responsive web applications using React.js and JavaScript. I
                successfully developed a front-end web application using
                React.js that effectively addressed a specific problem.
                <br />
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
                • To enhance the user experience, I integrated Redux, Axios, and
                React Router into the project, resulting in a remarkable 10%
                improvement in usability based on thorough usability tests.
                <br />
                • Additionally, I created a new application with a focus on
                optimizing performance and scalability. By incorporating the
                best practices I learned during development, the application
                achieved higher efficiency and better scalability.
                <br />
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
            work="• Used multiple libraries like React, Redux, AntDesign and Tailwind to build a scalable banking project."
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
                • React.js, JavaScript, with hands-on experience in building
                interactive and responsive web applications.
                <br />
                • Developed a project using React.js to create a front-end web
                application that solved a specific problem.
                <br />
                • Implemented Redux, Axios, and React Router to improve user
                experience by 10% based on the usability tests.
                <br />• Developed a new application with improved performance
                and scalability by implementing best practices learned while
                developing.
              </li>
            }
            tech="ReactJs, MongoDb"
          />
          <Details
            position="PHP Training"
            company="Chandiagrh Engineering College "
            // companyLink="/"
            time="2022-Present"
            address="Landran, INIDA"
            work="• Mastered PHP and built an ecommerce platform like amazon which provide features like cart, search."
            tech="PHP, MySQL, HTML, CSS"
          />
        </ul>
      </div>
    </div>
  );
};

export default Experience;
