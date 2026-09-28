"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    setTheme(document.documentElement.getAttribute("data-theme") || "system");
  }, []);

  function applyTheme(next) {
    if (next === "system") {
      document.documentElement.removeAttribute("data-theme");
      window.localStorage.removeItem("theme");
    } else {
      document.documentElement.setAttribute("data-theme", next);
      window.localStorage.setItem("theme", next);
    }
    setTheme(next);
  }

  function toggle() {
    const isDark =
      theme === "dark" ||
      (theme === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);
    applyTheme(isDark ? "light" : "dark");
  }

  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-color-scheme: dark)").matches);

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <svg className="theme-icon theme-icon-sun" width="18" height="18" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="4.6" stroke="currentColor" strokeWidth="1.8" />
        <g stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          <line x1="12" y1="1.5" x2="12" y2="4.2" />
          <line x1="12" y1="19.8" x2="12" y2="22.5" />
          <line x1="1.5" y1="12" x2="4.2" y2="12" />
          <line x1="19.8" y1="12" x2="22.5" y2="12" />
          <line x1="4.4" y1="4.4" x2="6.3" y2="6.3" />
          <line x1="17.7" y1="17.7" x2="19.6" y2="19.6" />
          <line x1="4.4" y1="19.6" x2="6.3" y2="17.7" />
          <line x1="17.7" y1="6.3" x2="19.6" y2="4.4" />
        </g>
      </svg>
      <svg className="theme-icon theme-icon-moon" width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path
          d="M20.5 14.5A8.5 8.5 0 1 1 9.5 3.5a7 7 0 0 0 11 11Z"
          fill="currentColor"
        />
      </svg>
    </button>
  );
}
