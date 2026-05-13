"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";

export type Theme = "light" | "dark" | "system";

const THEME_KEY = "theme";

interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<
  ThemeContextValue | undefined
>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: Theme;
}

function resolveTheme(
  theme: Theme
): "dark" | "light" {
  if (theme === "system") {
    if (typeof window === "undefined") {
      return "dark";
    }

    return window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches
      ? "dark"
      : "light";
  }

  return theme;
}

function applyTheme(
  resolved: "dark" | "light"
) {
  const root = document.documentElement;

  if (resolved === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
}

export function ThemeProvider({
  children,
  defaultTheme = "dark",
}: ThemeProviderProps) {
  const [theme, setThemeState] =
    useState<Theme>(defaultTheme);

  useEffect(() => {
    const stored = localStorage.getItem(
      THEME_KEY
    ) as Theme | null;

    const initial = stored || defaultTheme;

    setThemeState(initial);

    applyTheme(resolveTheme(initial));
  }, [defaultTheme]);

  const setTheme = useCallback(
    (theme: Theme) => {
      localStorage.setItem(THEME_KEY, theme);

      setThemeState(theme);

      applyTheme(resolveTheme(theme));
    },
    []
  );

  useEffect(() => {
    if (theme !== "system") return;

    const media = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );

    const handleChange = () => {
      applyTheme(resolveTheme("system"));
    };

    media.addEventListener(
      "change",
      handleChange
    );

    return () => {
      media.removeEventListener(
        "change",
        handleChange
      );
    };
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}