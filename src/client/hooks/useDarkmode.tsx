import { useEffect, useState } from "react";

export type ThemeStates = "light" | "dark" | "system";

export const useDarkMode = () => {
  const [systemTheme, setSystemTheme] = useState<"light" | "dark">(
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handler = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // Initialize and update app theme state
  const [theme, setTheme] = useState<ThemeStates>(() => {
    const storedTheme = localStorage.getItem("theme");
    return (storedTheme as ThemeStates) || "system";
  });

  useEffect(() => {
    const applyTheme = theme === "system" ? systemTheme : theme;

    if (applyTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    localStorage.setItem("theme", theme);
  }, [theme, systemTheme]);

  return { theme, setTheme };
};
