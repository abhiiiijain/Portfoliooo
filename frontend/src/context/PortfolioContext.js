import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchPortfolioContent } from "@/lib/content";

const PortfolioContext = createContext({
  content: null,
  error: null,
});

export function PortfolioProvider({ children, initialContent = null }) {
  const [content, setContent] = useState(initialContent);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (content) return;

    let active = true;

    fetchPortfolioContent()
      .then((data) => {
        if (active) {
          setContent(data);
          setError(null);
        }
      })
      .catch((fetchError) => {
        if (active) {
          setError(fetchError.message || "Failed to load portfolio content");
        }
      });

    return () => {
      active = false;
    };
  }, [content]);

  return (
    <PortfolioContext.Provider value={{ content, error }}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  return useContext(PortfolioContext);
}
