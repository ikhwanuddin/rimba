/* RIMBA: light, dark or follow the device. The choice is kept in the browser
 * (localStorage "rimba-theme"); "system" follows the device setting live.
 * THEME_SCRIPT runs in <head> before the page paints, so there is no flash. */

export type ThemeMode = "light" | "dark" | "system";

const KEY = "rimba-theme";
const MQ = "(prefers-color-scheme: dark)";

export function getThemeMode(): ThemeMode {
  const v = localStorage.getItem(KEY);
  return v === "light" || v === "dark" ? v : "system";
}

function apply(mode: ThemeMode) {
  const dark =
    mode === "dark" || (mode === "system" && window.matchMedia(MQ).matches);
  document.documentElement.classList.toggle("dark", dark);
  document.documentElement.style.colorScheme = dark ? "dark" : "light";
}

export function setThemeMode(mode: ThemeMode) {
  if (mode === "system") localStorage.removeItem(KEY);
  else localStorage.setItem(KEY, mode);
  apply(mode);
}

/** Keep "system" in step with the device when it switches theme. */
export function watchSystemTheme() {
  const mq = window.matchMedia(MQ);
  const onChange = () => {
    if (getThemeMode() === "system") apply("system");
  };
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

export const THEME_SCRIPT = `(function(){try{var m=localStorage.getItem("${KEY}");var d=m==="dark"||(m!=="light"&&window.matchMedia("${MQ}").matches);document.documentElement.classList.toggle("dark",d);document.documentElement.style.colorScheme=d?"dark":"light";}catch(e){}})();`;
