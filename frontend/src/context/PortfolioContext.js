import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchPortfolioContent } from "@/lib/content";

const PortfolioContext = createContext({
  content: null,
  loading: true,
  error: null,
});

export function PortfolioProvider({ children }) {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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
          setContent(null);
          setError(fetchError.message || "Failed to load portfolio content");
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <PortfolioContext.Provider value={{ content, loading, error }}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  return useContext(PortfolioContext);
}
