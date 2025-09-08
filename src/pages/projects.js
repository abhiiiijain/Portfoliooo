import AnimatedText from "@/components/AnimatedText";
import { GithubIcon } from "@/components/Icons";
import Layout from "@/components/Layout";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import expense from "../../public/images/projects/expense.png";
import arkitektur from "../../public/images/projects/arkitektur.png";
import woodcase from "../../public/images/projects/woodcase.png";
import samadhan from "../../public/images/projects/samadhan.png";
import portfolioo from "../../public/images/projects/portfolioo.png";
import portfolio from "../../public/images/projects/portfolio.png";
import sars from "../../public/images/projects/sars.png";
import TransitionEffect from "@/components/TransitionEffect";

const FramerImage = motion(Image);

const FeaturedProject = ({ type, title, summary, img, link, github, tech }) => {
  return (
    <article
      className="w-full flex items-center justify-between relative rounded-br-2xl
    rounded-3xl border border-solid border-dark bg-light shadow-2xl p-12
    dark:bg-dark dark:border-light
    lg:flex-col lg:p-8 xs:rounded-2xl xs:rounded-br-3xl xs:p-4
    ">
      <div
        className="absolute top-0 -right-3 -z-10 w-[101%] h-[103%] rounded-[2.5rem] bg-dark 
        dark:bg-light rounded-br-3xl xs:-right-2 sm:h-[102%] xs:w-full xs:rounded-[1.5rem]
      "
      />
      <Link
        href={link}
        target="_blank"
        className="w-1/2 cursor-pointer overflow-hidden rounded-lg lg:w-full
        ">
        <FramerImage
          src={img}
          alt="title of project"
          className="w-full h-auto rounded-xl border border-solid border-dark dark:border-light"
          whileHover={{ scale: 1.05 }}
          transition={{ duartion: 0.2 }}
          priority
          sizes="(max-width: 769px) 100vw,
                (max-width:1200px) 50vw,
                50vw"
        />
      </Link>
      <div
        className="w-1/2 flex flex-col items-start justify-between pl-6 lg:w-full
      lg:pl-0 lg:pt-6
      ">
        <span
          className="text-primary font-medium text-xl
        dark:text-primaryDark xs:text-base
        ">
          {type}
        </span>
        <Link
          href={link}
          target="_blank"
          className="hover:underline underline-offset-2">
          <h2
            className="my-2 w-full text-left text-4xl font-bold
          dark:text-light sm:text-sm
          ">
            {title}
          </h2>
        </Link>
        <h2
          className="my-2 w-full text-left text-xl font-semibold
          lg:text-2xl dark:text-light sm:text-sm
          ">
          Tech: {tech}
        </h2>
        <p
          className="my-2 font-medium text-dark dark:text-light sm:text-sm
        ">
          {summary}
        </p>
        <div className="mt-2 flex items-center">
          <Link href={github} target="_blank" className="w-10">
            {" "}
            <GithubIcon />
          </Link>
          <Link
            href={link}
            target="_blank"
            className="ml-4 rounded-lg bg-dark text-light p-2 px-6 text-lg font-semibold
            dark:bg-light dark:text-dark sm:px-4 sm:text-base
            ">
            Visit Project
          </Link>
        </div>
      </div>
    </article>
  );
};

const Project = ({ title, type, img, link, github, tech }) => {
  return (
    <article
      className="w-full flex flex-col items-center justify-center rounded-2xl
    border border-solid border-dark bg-light p-6 relative dark:bg-dark
    dark:border-light xs:p-4 
    ">
      <div
        className="absolute top-0 -right-3 -z-10 w-[101%] h-[103%] rounded-[2rem] bg-dark
      rounded-br-3xl dark:bg-light md:-right-2 md:w-[101%] xs:h-[102%] xs:rounded-[1.5rem]
      "
      />
      <Link
        href={link}
        target="_blank"
        className="w-full cursor-pointer overflow-hidden rounded-lg">
        <FramerImage
          src={img}
          alt="title of project"
          className="w-full h-auto rounded-xl border border-solid border-dark dark:border-light"
          whileHover={{ scale: 1.05 }}
          transition={{ duartion: 0.2 }}
        />
      </Link>
      <div className="w-full flex flex-col items-start justify-between mt-4">
        <span
          className="text-primary font-medium text-xl dark:text-primaryDark
          lg:text-lg md:text-base
        ">
          {type}
        </span>
        <Link
          href={link}
          target="_blank"
          className="hover:underline underline-offset-2">
          <h2
            className="my-2 w-full text-left text-3xl font-bold
          lg:text-2xl dark:text-light sm:text-xl
          ">
            {title}
          </h2>
        </Link>
        <h2
          className="my-2 w-full text-left text-xl font-semibold
          lg:text-2xl dark:text-light sm:text-xl
          ">
          Tech: {tech}
        </h2>
        <div className="w-full mt-2 flex items-center justify-between">
          <Link
            href={link}
            target="_blank"
            className="text-lg font-semibold underline md:text-base
            ">
            Visit
          </Link>
          <Link href={github} target="_blank" className="w-8 md:w-6">
            <GithubIcon />
          </Link>
        </div>
      </div>
    </article>
  );
};

const Projects = () => {
  return (
    <>
      <Head>
        <title>Abhiiiijain | Projects Page</title>
        <meta name="description" content="any description"></meta>
      </Head>
      <TransitionEffect />
      <main className="w-full mb-16 flex flex-col items-center justify-center dark:text-light">
        <Layout className="pt-16">
          <AnimatedText
            text="Imagination Trumps Knowledge!"
            className="mb-16 lg:!text-7xl sm:mb-8 sm:!text-6xl xs:!text-4xl
            "
          />

          <div className="grid grif-col-12 gap-24 gap-y-32 xl:gap-x-16 lg:gap-x-8 md:gap-y-24 sm:gap-x-0">
            <div className="col-span-12">
              <FeaturedProject
                title="Expense Tracker"
                img={expense}
                summary="This Expense Tracker app helps users manage their finances by tracking their spending, categorizing expenses, and providing insights into their financial habits. The backend of this app is developed using Node.js and Express, offering a robust and scalable solution."
                link="https://expense-app-frontend-flax.vercel.app/login"
                github="https://github.com/abhiiiijain/Expense_App_Frontend"
                type="Web App"
                tech="ReactJS, MongoDB, ExpressJS, NodeJS"
              />
            </div>
            <div className="col-span-12">
              <FeaturedProject
                title="Arkitektur - An Interior Design Website"
                img={arkitektur}
                summary="A feature-rich Interior Design website using React, MongoDB and React Router. You can easily book services like Architecture, 3D Animation, House Planning, Renovation, Interior Design and Construction."
                link="https://github.com/abhiiiijain/Arkitektur/"
                github="https://github.com/abhiiiijain/Arkitektur/"
                type="Website"
                tech="ReactJS, MongoDB, ExpressJS, NodeJS"
              />
            </div>
            <div className="col-span-6 sm:col-span-12">
              <Project
                title="WoodCase"
                img={woodcase}
                link="https://github.com/abhiiiijain/WOODCASE/"
                github="https://github.com/abhiiiijain/WOODCASE/"
                type="Website"
                tech="HTML, SCSS, JavaScript"
              />
            </div>
            <div className="col-span-6 sm:col-span-12">
              <Project
                title="SARS-Imprecation"
                img={sars}
                link="https://github.com/abhiiiijain/SARS-Imprecation/"
                github="https://github.com/abhiiiijain/SARS-Imprecation/"
                type="Website"
                tech="PHP, MySQL, BootStrap"
              />
            </div>
            <div className="col-span-12">
              <FeaturedProject
                title="Portfolio"
                img={portfolioo}
                summary=" It offers a responsive & interactive user interface, allowing visitors to explore projects, view skills, and learn more about the developer."
                link="https://abhiiiijain.github.io/Portfolioo/"
                github="https://github.com/abhiiiijain/Portfolioo/"
                type="Portfolio Website"
                tech="ReactJS"
              />
            </div>
            <div className="col-span-6 sm:col-span-12">
              <Project
                title="HTML Portfolio"
                img={portfolio}
                link="https://abhiiiijain.github.io/Portfolio/"
                github="https://github.com/abhiiiijain/Portfolio/"
                type="Portfolio Website"
                tech="HTML, CSS, JavaScript"
              />
            </div>
            <div className="col-span-6 sm:col-span-12">
              <Project
                title="Samadhan - Website for Notes"
                img={samadhan}
                link="https://abhiiiijain.github.io/Samadhan/"
                github="https://github.com/abhiiiijain/Samadhan/"
                type="Website"
                tech="HTML, CSS"
              />
            </div>
          </div>
        </Layout>
      </main>
    </>
  );
};

export default Projects;
