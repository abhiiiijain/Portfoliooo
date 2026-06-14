import { useCallback, useEffect, useState } from "react";
import {
  applyTheme,
  getStoredTheme,
  resolveTheme,
  setStoredTheme,
} from "@/lib/theme";

export default function useThemeSwitcher() {
  const [mode, setModeState] = useState("light");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const syncTheme = () => {
      const resolved = resolveTheme();
      setModeState(resolved);
      applyTheme(resolved);
    };

    syncTheme();
    setReady(true);

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const onSystemChange = () => {
      if (!getStoredTheme()) {
        syncTheme();
      }
    };

    mediaQuery.addEventListener("change", onSystemChange);
    return () => mediaQuery.removeEventListener("change", onSystemChange);
  }, []);

  const setMode = useCallback((next) => {
    const theme = next === "dark" ? "dark" : "light";
    setStoredTheme(theme);
    setModeState(theme);
    applyTheme(theme);
  }, []);

  const toggleMode = useCallback(() => {
    setMode(mode === "dark" ? "light" : "dark");
  }, [mode, setMode]);

  return { mode, toggleMode, ready };
}
