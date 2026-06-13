import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { adminFetch } from "@/lib/adminApi";

const SiteSettingsContext = createContext(null);

export function SiteSettingsProvider({ children }) {
  const [site, setSite] = useState(null);
  const [loading, setLoading] = useState(true);

  const reload = useCallback(() => {
    setLoading(true);
    return adminFetch("/api/admin/site")
      .then((r) => r.json())
      .then((data) => {
        setSite(data);
        return data;
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  const saveSite = async (payload) => {
    const res = await adminFetch("/api/admin/site", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || "Failed to save site settings");
    }
    setSite(data);
    return data;
  };

  return (
    <SiteSettingsContext.Provider value={{ site, loading, saveSite }}>
      {children}
    </SiteSettingsContext.Provider>
  );
}

export function useSiteSettings() {
  const context = useContext(SiteSettingsContext);
  if (!context) {
    throw new Error("useSiteSettings must be used within SiteSettingsProvider");
  }
  return context;
}
