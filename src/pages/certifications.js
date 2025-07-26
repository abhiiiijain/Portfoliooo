import AnimatedText from "@/components/AnimatedText";
import Layout from "@/components/Layout";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";
import mern from "../../public/images/certificates/mern.png";
import react from "../../public/images/certificates/react.png";
import CertCnPython from "../../public/images/certificates/certcnpython.png";
import CertHrSqla from "../../public/images/certificates/certhrsqla.png";
import CertCrCpp from "../../public/images/certificates/certcrcpp.png";
import CertHrC from "../../public/images/certificates/certhrc.png";
import CertCrHtml from "../../public/images/certificates/certcrhtml.png";
import CertCrCss from "../../public/images/certificates/certcrcss.png";
import CertCrC from "../../public/images/certificates/certcrc.png";
import CertHrReact from "../../public/images/certificates/certhrreact.png";
import { easeInOut, motion, useMotionValue } from "framer-motion";
import TransitionEffect from "@/components/TransitionEffect";

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

  function handleMouseLeave(event) {
    imgRef.current.style.display = "none";
    x.set(0);
    y.set(0);
  }

  return (
    <Link
      href={link}
      target="_blank"
      onMouseMove={handleMouse}
      onMouseLeave={handleMouseLeave}>
      <h2
        className="capitalize text-xl font-semibold hover:underline md:text-center lg:text-lg md:text-sm
        ">
        {title}
      </h2>
      <FramerImage
        style={{ x: x, y: y }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1, transition: { duration: 0.2 } }}
        ref={imgRef}
        src={img}
        alt={title}
        className="z-10 w-96 h-auto hidden absolute rounded-lg
        md:!hidden 
        "
      />
    </Link>
  );
};

const Certification = ({ img, title, date, link, company }) => {
  return (
    <motion.li
      initial={{ y: 200 }}
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

const FearutedCertification = ({ img, title, date, company, link }) => {
  return (
    <li
      className="relative col-span-1 w-full p-4 bg-light border border-solid border-dark rounded-2xl
    dark:bg-dark dark:border-light
    ">
      <div
        className="absolute top-0 -right-3 -z-10 w-[101%] h-[103%] rounded-[2rem] bg-dark
      rounded-br-3xl"
      />
      <Link
        href={link}
        target="_blank"
        className="w-full inline-block cursor-pointer overflow-hidden rounded-lg">
        <FramerImage
          src={img}
          alt="title of project"
          className="w-full h-auto"
          whileHover={{ scale: 1.05 }}
          transition={{ duartion: 0.2 }}
          priority
          sizes="(max-width: 769px) 100vw,
          (max-width:1200px) 50vw,
          50vw"
        />
      </Link>
      <Link href={link} target="_blank">
        <h2
          className="capitalize text-2xl font-bold my-2 mt-4
        hover:underline xs:text-lg
        ">
          {title}
        </h2>
      </Link>
      <p className="text-lg mb-2">{company}</p>
      <div className="flex justify-between">
        <span className="text-primary font-semibold dark:text-primaryDark">
          {date}
        </span>
        <Link href={link} target="_blank">
          <h2
            className="text-primary font-semibold dark:text-primaryDark
        ">
            Verify
          </h2>
        </Link>
      </div>
    </li>
  );
};

const certifications = () => {
  return (
    <>
      <Head>
        <title>Abhiiiijain | Certifications Page</title>
        <meta name="description" content="any description"></meta>
      </Head>
      <TransitionEffect />
      <main
        className="w-full mb-16 flex flex-col items-center justify-center overflow-hidden
      dark:text-light
      ">
        <Layout className="pt-16 mb-32">
          <AnimatedText
            text=" Words can change the world!"
            className="mb-16 lg:!text-7xl sm:mb-8 sm:!text-6xl xs:!text-4xl
          "
          />
          <ul className="grid grid-cols-2 gap-16 lg:gap-8 md:grid-cols-1 md:gap-y-16">
            <FearutedCertification
              title="MERN Stack"
              company="A2it Online Pvt. Ltd."
              date="June 03, 2023"
              link="https://drive.google.com/file/d/1IsY2qIs1rBV7XLZFS4VfciKgAWqxncDw/view?usp=sharing/"
              img={mern}
            />
            <FearutedCertification
              title="ReactJs"
              company="ThinkNext Techonologies Pvt. Ltd."
              date="July 31, 2021"
              link="https://certificates.thinknexttraining.com/en/verify/85494246192917/"
              img={react}
            />
          </ul>
          {/* <ul className="grid grid-cols-2 gap-16 lg:gap-8 md:grid-cols-1 md:gap-y-16">
            <FearutedCertification
              title="SQL Basic"
              company="HackerRank"
              date="Sep 29, 2021"
              link="https://www.hackerrank.com/certificates/aa092616e2d1/"
              img={certhrsql}
            />
            <FearutedCertification
              title="React (Basic)"
              company="HackerRank"
              date="Sep 28, 2021"
              link="https://www.hackerrank.com/certificates/18fb8a9f4368/"
              img={certhrreact}
            />
          </ul>
          <ul className="grid grid-cols-2 gap-16 lg:gap-8 md:grid-cols-1 md:gap-y-16">
            <FearutedCertification
              title="Introduction to Python"
              company="Coding Ninjas"
              date="Sep 27, 2020"
              link="https://ninjasfiles.s3.amazonaws.com/certificate10579455ae927e27c9741d63d3f039c4a7f566e.pdf"
              img={certcnpython}
            />
            <FearutedCertification
              title="C (Advanced)"
              company="HackerRank"
              date="Sep 15, 2020"
              link="https://www.hackerrank.com/certificates/53f0b0236fe8/"
              img={certhrc}
            />
          </ul>
          <ul className="grid grid-cols-2 gap-16 lg:gap-8 md:grid-cols-1 md:gap-y-16">
            <FearutedCertification
              title="C++ For C Programmers"
              company="Coursera"
              date="May 28, 2020"
              link="https://www.coursera.org/account/accomplishments/certificate/94PDADY56XCY/"
              img={certcrcpp}
            />
            <FearutedCertification
              title="Introduction to CSS3"
              company="Coursera"
              date="May 24, 2020"
              link="https://www.coursera.org/account/accomplishments/certificate/NUEWY98LUPZT/"
              img={certcrcss}
            />
          </ul>
          <ul className="grid grid-cols-2 gap-16 lg:gap-8 md:grid-cols-1 md:gap-y-16">
            <FearutedCertification
              title="C for Everyone: Programming Fundamentals"
              company="Coursera"
              date="May 11, 2020"
              link="https://www.coursera.org/account/accomplishments/certificate/UZ2X95M7KNDL/"
              img={certcrc}
            />
            <FearutedCertification
              title="Introduction to HTML5"
              company="Coursera"
              date="May 08, 2020"
              link="https://www.coursera.org/account/accomplishments/certificate/NUEWY98LUPZT/"
              img={certcrhtml}
            />
          </ul> */}
          <h2 className="font-bold text-4xl w-full text-center my-16 mt-32">
            All Certifications
          </h2>

          <ul>
            <Certification
              title="SQL (Intermediate)"
              company="HackerRank"
              date="Jul 18, 2023"
              link="https://www.hackerrank.com/certificates/c4d15bcc8094/"
              img={CertHrSqla}
            />
            <Certification
              title="React (Basic)"
              company="HackerRank"
              date="Sep 28, 2021"
              link="https://www.hackerrank.com/certificates/18fb8a9f4368/"
              img={CertHrReact}
            />
            <Certification
              title="Introduction to Python"
              company="Coding Ninjas"
              date="Sep 27, 2020"
              link="https://ninjasfiles.s3.amazonaws.com/certificate10579455ae927e27c9741d63d3f039c4a7f566e.pdf"
              img={CertCnPython}
            />
            <Certification
              title="C (Advanced)"
              company="HackerRank"
              date="Sep 15, 2020"
              link="https://www.hackerrank.com/certificates/53f0b0236fe8/"
              img={CertHrC}
            />
            {/* <Certification
              title="C++ For C Programmers"
              company="Coursera"
              date="May 28, 2020"
              link="https://www.coursera.org/account/accomplishments/certificate/94PDADY56XCY/"
              img={CertCrCpp}
            /> */}
            {/* <Certification
              title="Introduction to CSS3"
              company="Coursera"
              date="May 24, 2020"
              link="https://www.coursera.org/account/accomplishments/certificate/NUEWY98LUPZT/"
              img={CertCrCss}
            /> */}
            {/* <Certification
              title="C for Everyone: Programming Fundamentals"
              company="Coursera"
              date="May 11, 2020"
              link="https://www.coursera.org/account/accomplishments/certificate/UZ2X95M7KNDL/"
              img={CertCrC}
            /> */}
            {/* <Certification
              title="Introduction to HTML5"
              company="Coursera"
              date="May 08, 2020"
              link="https://www.coursera.org/account/accomplishments/certificate/NUEWY98LUPZT/"
              img={CertCrHtml}
            /> */}
          </ul>
        </Layout>
      </main>
    </>
  );
};

export default certifications;
