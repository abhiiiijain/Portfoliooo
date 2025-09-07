import AnimatedText from "@/components/AnimatedText";
import Layout from "@/components/Layout";
import Head from "next/head";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import profilePic from "../../public/images/profile/dpabhi.jpg";
import { useInView, useMotionValue, useSpring } from "framer-motion";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import TransitionEffect from "@/components/TransitionEffect";

const AnimatedNumbers = ({ value }) => {
  const ref = useRef(null);

  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: 3000 });
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    springValue.on("change", (latest) => {
      if (ref.current && latest.toFixed(0) <= value) {
        ref.current.textContent = latest.toFixed(0);
      }
    });
  }, [springValue, value]);

  return (
    <span ref={ref} suppressHydrationWarning>
      0
    </span>
  );
};

const calculateExperienceYears = (startDate) => {
  const now = new Date();
  const start = new Date(startDate);
  let years = now.getFullYear() - start.getFullYear();
  const monthDiff = now.getMonth() - start.getMonth();
  const dayDiff = now.getDate() - start.getDate();
  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    years -= 1;
  }
  return Math.max(0, years);
};


const About = () => {
  const [experienceYears, setExperienceYears] = useState(0);

  useEffect(() => {
    // Update this start date if your professional experience start changes
    const years = calculateExperienceYears("2023-09-04");
    setExperienceYears(years);
  }, []);

  return (
    <>
      <Head>
        <title>Abhiiiijain | About Page</title>
        <meta name="description" content="any description"></meta>
      </Head>
      <TransitionEffect />
      <main className=" flex w-full flex-col items-center justify-center dark:text-light">
        <Layout className="pt-16">
          <AnimatedText
            text="Passion Fuels Purpose!"
            className="mb-16 lg:!text-7xl 
          sm:!text-6xl xs:!text-4xl sm:mb-8
          "
          />
          <div
            className="grid w-full grid-cols-8 gap-16 sm:gap-8 
          ">
            <div
              className="col-span-3 flex flex-col items-start justify-start xl:col-span-4
            md:order-2 md:col-span-8
            ">
              <h2 className="mb-4 text-lg font-bold uppercase text-dark/75 dark:text-light/75">
                Biography
              </h2>
              <p className="font-medium">
                Hi, I am <b>Abhinandan Jain</b>, an innovative <b>Software Engineer</b>
                with hands-on experience in building scalable and responsive web
                applications using the <b>MERN Stack (MongoDB, Express, ReactJS, Node.js)
                  and MySQL</b>. Over the past year, I have worked on multiple projects in
                professional environments, contributing to the development of dynamic
                and user-friendly digital solutions.
              </p>
              <p className="font-medium my-4">
                I hold a <b>Bachelor of Technology in Computer Science</b>
                from <b>Chandigarh Engineering College, CGC Landran</b>
                , where I built a strong foundation in <b>Operating Systems, Data Structures,
                  Algorithms, Databases, and Networking</b>.
              </p>
              <p className="font-medium my-4">
                Throughout my career journey, I have gained industry experience working with
                <b>Twigz Technologies Pvt. Ltd., A2it Online, and Connecting Points Tech</b>,
                where I developed and optimized web applications, enhanced UI/UX,
                and collaborated in Agile teams to deliver impactful projects.
              </p>
              <p className="font-medium">
                My technical expertise includes <b>C++, C, HTML, CSS, JavaScript, ReactJS,
                  Node.js, Express, MySQL, and MongoDB</b>. I have also worked
                extensively with <b>Redux, Tailwind CSS, Ant Design</b>, and testing
                practices to ensure robust application performance.
              </p>
            </div>

            <div
              className="col-span-3 relative h-max rounded-2xl border-2 borderr-solid
            border-dark bg-light p-8 dark:bg-dark dark:border-light 
            xl:col-span-4 md:order-1 md:col-span-8
            ">
              <div className="absolute top-0 -right-3 -z-10 w-[102%] h-[102%] rounded-[2rem] bg-dark dark:bg-light" />
              <Image
                src={profilePic}
                alt="abhiiiijain"
                className="w-full h-auto rounded-2xl"
                priority
                sizes="(max-width: 769px) 100vw,
                (max-width:1200px) 50vw,
                33vw"
              />
            </div>

            <div
              className="col-span-2 flex flex-col items-end justify-between xl:col-span-8 xl:flex-row
            xl:items-center md:order-3
            ">
              <div
                className="flex flex-col items-end justify-center xl:items-center
              ">
                <span className="iniline-block text-7xl font-bold md:text-6xl sm:text-5xl xs:text-4xl ">
                  <AnimatedNumbers value={20} />+
                </span>
                <h2
                  className="text-xl font-medium capitalize text-dark/75 dark:text-light/75 
                xl:text-center md:text-lg sm:text-base xs:text-sm
                ">
                  Projects completed
                </h2>
              </div>

              <div
                className="flex flex-col items-end justify-center xl:items-center
                ">
                <span className="iniline-block text-7xl font-bold md:text-6xl sm:text-5xl xs:text-4xl ">
                  <AnimatedNumbers value={10} />+
                </span>
                <h2
                  className="text-xl font-medium capitalize text-dark/75 dark:text-light/75
                  xl:text-center md:text-lg sm:text-base xs:text-sm
                  ">
                  Certifications
                </h2>
              </div>

              <div
                className="flex flex-col items-end justify-center xl:items-center
              ">
                <span className="iniline-block text-7xl font-bold md:text-6xl sm:text-5xl xs:text-4xl ">
                  <AnimatedNumbers value={experienceYears} />+
                </span>
                <h2
                  className="text-xl font-medium capitalize text-dark/75 dark:text-light/75
                xl:text-center md:text-lg sm:text-base xs:text-sm
                ">
                  years of experience
                </h2>
              </div>
            </div>
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
