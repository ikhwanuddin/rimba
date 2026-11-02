import { useEffect, useState } from "react";

/** True when the page is in dark mode (RIMBA: the "dark" class on <html>,
 * set from the theme choice in lib/theme.ts). */
export default function useTheme() {
  const isDark = () => document.documentElement.classList.contains("dark");
  const [isDarkTheme, setIsDarkTheme] = useState(isDark());
  useEffect(() => {
    const obs = new MutationObserver(() => setIsDarkTheme(isDark()));
    obs.observe(document.documentElement, { attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);
  return isDarkTheme;
}
