import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { usePortfolio } from "@/context/PortfolioContext";

const MotionLink = motion(Link);

const Logo = () => {
  const { content } = usePortfolio();
  const initials = content?.site?.logoInitials?.trim() || content?.site?.brand?.trim()?.slice(0, 2) || "";
  if (!initials) return null;

  return (
    <div className="flex items-center justify-center">
      <MotionLink
        href="/"
        className="w-9 h-9 bg-dark text-light flex items-center 
        justify-center rounded-full text-base font-bold font-heading border bolder-solid
        border-transparent dark:border-light 
        "
        whileHover={{
          backgroundColor: [
            "#121212",
            "rgba(131,58,180,1)",
            "rgba(253,29,29,1)",
            "rgba(252,176,69,1)",
            "rgba(131,58,180,1)",
            "#121212",
          ],
          transition: { duration: 1, repeat: Infinity },
        }}>
        {initials}
      </MotionLink>
    </div>
  );
};

export default Logo;
