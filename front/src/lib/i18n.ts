/* RIMBA: two interface languages, Indonesian (written in the code) and English
 * (the dictionary in i18n_en.ts, keyed by the Indonesian text).
 *
 * The language is chosen once per page load, before anything renders
 * (see ClientProvider): a saved manual choice wins; otherwise Indonesian for
 * visitors in Indonesia and English elsewhere, from the country Cloudflare
 * reports at /cdn-cgi/trace. Without Cloudflare (local runs) the browser
 * language decides. Switching language saves the choice and reloads the page.
 */
import EN from "@/lib/i18n_en";

export type Lang = "id" | "en";

const SAVED = "rimba-lang";
const DETECTED = "rimba-lang-detected";

let lang: Lang = "id";

export function getLang(): Lang {
  return lang;
}

/** Locale for dates and numbers. */
export function locale(): string {
  return lang === "en" ? "en-GB" : "id-ID";
}

/** Translate an Indonesian interface text; {name} placeholders are filled from vars. */
export function t(
  text: string,
  vars?: Record<string, string | number>,
): string {
  const key = text.trim();
  let out = lang === "en" ? (EN[key] ?? key) : key;
  if (key !== text) {
    const lead = text.slice(0, text.indexOf(key));
    out = lead + out + text.slice(lead.length + key.length);
  }
  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      out = out.replaceAll(`{${k}}`, String(v));
    }
  }
  return out;
}

/**
 * Pick one language from a two-language project text (name, description,
 * instructions): Indonesian first, then a line "=== EN ===", then English.
 * Texts without that line are shown as they are.
 */
export function localized(text: string): string {
  const parts = text.split(/\n?^=== EN ===$\n?/m);
  if (parts.length < 2) return text;
  return (lang === "en" ? parts[1] : parts[0]).trim();
}

export function savedLang(): Lang | null {
  const s = localStorage.getItem(SAVED);
  return s === "id" || s === "en" ? s : null;
}

export function setLang(next: Lang) {
  localStorage.setItem(SAVED, next);
  window.location.reload();
}

async function country(): Promise<string | null> {
  try {
    const r = await fetch("/cdn-cgi/trace", {
      signal: AbortSignal.timeout(2000),
    });
    if (!r.ok) return null;
    const m = (await r.text()).match(/^loc=([A-Z]{2})$/m);
    return m ? m[1] : null;
  } catch {
    return null;
  }
}

/** Pick the language for this page load and apply it. */
export async function initLang(): Promise<void> {
  let l = savedLang() ?? (sessionStorage.getItem(DETECTED) as Lang | null);
  if (l !== "id" && l !== "en") {
    const c = await country();
    if (c) l = c === "ID" ? "id" : "en";
    else l = navigator.language.toLowerCase().startsWith("id") ? "id" : "en";
    sessionStorage.setItem(DETECTED, l);
  }
  lang = l;
  document.documentElement.lang = l;
}
