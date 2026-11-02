/* RIMBA: ID | EN switch; the choice is saved in the browser and the page reloads. */
import { type Lang, getLang, setLang, t } from "@/lib/i18n";

const LANGS: Lang[] = ["id", "en"];

export default function LanguageSwitch() {
  const current = getLang();
  return (
    <div
      role="group"
      aria-label={t("Ganti bahasa")}
      title={t("Ganti bahasa")}
      className="inline-flex overflow-hidden rounded-md border border-stone-300 text-xs font-bold dark:border-stone-600"
    >
      {LANGS.map((l) => (
        <button
          key={l}
          type="button"
          aria-pressed={l === current}
          onClick={() => l !== current && setLang(l)}
          className={
            "px-2 py-1 uppercase " +
            (l === current
              ? "bg-emerald-700 text-white"
              : "bg-white text-stone-600 hover:bg-stone-100 dark:bg-stone-800 dark:text-stone-300 dark:hover:bg-stone-700")
          }
        >
          {l}
        </button>
      ))}
    </div>
  );
}
