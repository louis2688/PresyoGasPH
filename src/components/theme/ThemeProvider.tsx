"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useSyncExternalStore,
  type ReactNode,
} from "react";

export type ThemeMode = "light" | "dark";

type ThemeContextValue = {
  theme: ThemeMode;
  setTheme: (mode: ThemeMode) => void;
  toggleTheme: () => void;
  ready: boolean;
};

const STORAGE_KEY = "presyogas-theme";

const ThemeContext = createContext<ThemeContextValue | null>(null);

function applyThemeClass(mode: ThemeMode) {
  const root = document.documentElement;
  root.classList.toggle("dark", mode === "dark");
  root.style.colorScheme = mode;
}

function readStoredTheme(): ThemeMode {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "dark" || stored === "light") return stored;
  } catch {
    /* ignore */
  }
  return "light";
}

function subscribe(onStoreChange: () => void) {
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY || e.key === null) onStoreChange();
  };
  window.addEventListener("storage", onStorage);
  window.addEventListener("presyogas-theme-change", onStoreChange);
  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener("presyogas-theme-change", onStoreChange);
  };
}

function getSnapshot(): ThemeMode {
  return readStoredTheme();
}

function getServerSnapshot(): ThemeMode {
  return "light";
}

function writeTheme(mode: ThemeMode) {
  localStorage.setItem(STORAGE_KEY, mode);
  applyThemeClass(mode);
  window.dispatchEvent(new Event("presyogas-theme-change"));
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  useEffect(() => {
    applyThemeClass(theme);
  }, [theme]);

  const setTheme = useCallback((mode: ThemeMode) => {
    writeTheme(mode);
  }, []);

  const toggleTheme = useCallback(() => {
    writeTheme(theme === "dark" ? "light" : "dark");
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{ theme, setTheme, toggleTheme, ready: true }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return ctx;
}
