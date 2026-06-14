import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import { GithubIcon, LinkedInIcon, SunIcon, MoonIcon } from "./Icons";
import { motion } from "framer-motion";
import useThemeSwitcher from "@/hooks/useThemeSwitcher";
import { usePortfolio } from "@/context/PortfolioContext";

const CustomLink = ({ href, title, className = "" }) => {
  if (!href) return null;

  const router = useRouter();
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(router.asPath === href);
  }, [router.asPath, href]);

  return (
    <Link href={href} className={`${className} relative group`}>
      {title}
      <span
        className={`h-[1px] inline-block bg-dark absolute left-0 -bottom-0.5 group-hover:w-full transition-[width] ease duration-300 ${active ? "w-full" : "w-0"} dark:bg-light`}>
        &nbsp;
      </span>
    </Link>
  );
};

const CustomMobileLink = ({ href, title, className = "", toggle }) => {
  if (!href) return null;

  const router = useRouter();
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(router.asPath === href);
  }, [router.asPath, href]);

  const handleClick = () => {
    toggle();
    router.push(href);
  };

  return (
    <button
      type="button"
      className={`${className} relative group my-2`}
      onClick={handleClick}>
      {title}
      <span
        className={`h-[1px] inline-block bg-current absolute left-0 -bottom-0.5 group-hover:w-full transition-[width] ease duration-300 ${active ? "w-full" : "w-0"}`}>
        &nbsp;
      </span>
    </button>
  );
};

const ThemeToggle = ({ mode, onToggle, className = "ml-5" }) => (
  <button
    type="button"
    aria-label={`Switch to ${mode === "light" ? "dark" : "light"} mode`}
    onClick={onToggle}
    className={`${className} flex items-center justify-center rounded-full p-1 transition-colors ${
      mode === "light" ? "bg-dark text-light" : "bg-light text-dark"
    }`}>
    {mode === "dark" ? <SunIcon className="fill-dark" /> : <MoonIcon className="fill-dark" />}
  </button>
);

const NavBar = () => {
  const router = useRouter();
  const { mode, toggleMode, ready } = useThemeSwitcher();
  const { content } = usePortfolio();
  const nav = content?.site?.nav ?? [];
  const social = content?.site?.social;

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const closeMenu = () => setIsOpen(false);
    router.events.on("routeChangeStart", closeMenu);
    return () => router.events.off("routeChangeStart", closeMenu);
  }, [router]);

  return (
    <header className="sticky top-0 z-50 w-full px-32 py-3 font-medium flex items-center justify-between text-dark dark:text-light bg-light/90 dark:bg-dark/90 backdrop-blur-md border-b border-dark/5 dark:border-light/5 lg:px-16 md:px-12 sm:px-8">
      <button
        type="button"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        className="flex-col justify-center items-center hidden lg:flex"
        onClick={() => setIsOpen((open) => !open)}>
        <span
          className={`bg-dark dark:bg-light block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isOpen ? "rotate-45 translate-y-1" : "-translate-y-0.5"}`}
        />
        <span
          className={`bg-dark dark:bg-light block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${isOpen ? "opacity-0" : "opacity-100"}`}
        />
        <span
          className={`bg-dark dark:bg-light block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isOpen ? "-rotate-45 -translate-y-1" : "translate-y-0.5"}`}
        />
      </button>

      <div className="w-full flex justify-between items-center lg:hidden">
        <nav>
          {nav.map((item, index) => (
            <CustomLink
              key={item.href}
              href={item.href}
              title={item.title}
              className={index === 0 ? "mr-4" : index === nav.length - 1 ? "ml-4" : "mx-4"}
            />
          ))}
        </nav>
        <nav className="flex items-center justify-center flex-wrap">
          {social?.github ? (
            <motion.a
              href={social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-6 mx-3"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.9 }}>
              <GithubIcon />
            </motion.a>
          ) : null}
          {social?.linkedin ? (
            <motion.a
              href={social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-6 mx-3"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.9 }}>
              <LinkedInIcon />
            </motion.a>
          ) : null}
          {ready && <ThemeToggle mode={mode} onToggle={toggleMode} />}
        </nav>
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-dark/95 text-light backdrop-blur-md dark:bg-light/95 dark:text-dark lg:hidden">
          <nav className="flex flex-col items-center justify-center gap-1">
            {nav.map((item) => (
              <CustomMobileLink
                key={item.href}
                href={item.href}
                title={item.title}
                className="text-2xl font-medium"
                toggle={() => setIsOpen(false)}
              />
            ))}
          </nav>
          <nav className="mt-8 flex items-center justify-center flex-wrap gap-2">
            {social?.github ? (
              <motion.a
                href={social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-6 mx-3 bg-light rounded-full dark:bg-dark sm:mx-1"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.9 }}>
                <GithubIcon />
              </motion.a>
            ) : null}
            {social?.linkedin ? (
              <motion.a
                href={social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-6 mx-3 sm:mx-1"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.9 }}>
                <LinkedInIcon />
              </motion.a>
            ) : null}
            {ready && <ThemeToggle mode={mode} onToggle={toggleMode} className="ml-3" />}
          </nav>
        </motion.div>
      )}

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <Logo />
      </div>

      <div className="absolute right-8 top-1/2 hidden -translate-y-1/2 items-center lg:flex md:right-6 sm:right-4">
        {ready && <ThemeToggle mode={mode} onToggle={toggleMode} className="ml-0" />}
      </div>
    </header>
  );
};

export default NavBar;
