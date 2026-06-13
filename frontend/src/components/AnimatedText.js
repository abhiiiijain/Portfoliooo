import React, { useEffect, useState } from "react";

const wrapperClass =
  "w-full mx-auto py-2 flex item-center justify-center text-center overflow-hidden dark:text-light sm:py-0";

const AnimatedText = ({ text, className = "" }) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  if (!text?.trim()) {
    return null;
  }

  const headingClass = `inline-block w-full text-dark font-bold capitalize text-6xl dark:text-light ${className}`;
  const words = text.trim().split(/\s+/);

  return (
    <div className={wrapperClass}>
      <h1 className={headingClass}>
        {words.map((word, index) => (
          <span
            key={`${word}-${index}`}
            className={`inline-block ${ready ? "animate-fade-up" : ""}`}
            style={ready ? { animationDelay: `${0.5 + index * 0.08}s` } : undefined}>
            {word}
            {index < words.length - 1 ? "\u00a0" : ""}
          </span>
        ))}
      </h1>
    </div>
  );
};

export default AnimatedText;
