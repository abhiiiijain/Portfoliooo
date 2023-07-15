import React from "react";
import Layout from "./Layout";
import Link from "next/link";

const Footer = () => {
  return (
    <footer
      className="w-full border-t-2 border-solid border-dark
    font-medium text-lg
    ">
      <Layout className="py-8 flex items-center justify-between">
        <span>{new Date().getFullYear()} &copy; All Rights Reserved.</span>
        <div className="flex items-center">
          Build with <span className="text-primary txt-2xl px-1">&#9825;</span>
          by&nbsp;
          <Link
            href="https://wa.me/+919588544510"
            target={"_blank"}
            className="underline
          underline-offset-2
          ">
            Abhiiiijain
          </Link>
        </div>
        <Link
          href="mailto:abhinandanbansal123@gmail.com"
          target={"_blank"}
          className="underline
          underline-offset-2">
          Say Hi..
        </Link>
      </Layout>
    </footer>
  );
};

export default Footer;