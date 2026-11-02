import {
  ComputerDesktopIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/24/outline";
import classnames from "classnames";
import { useEffect, useState } from "react";

import { t } from "@/lib/i18n";
import { type ThemeMode, getThemeMode, setThemeMode } from "@/lib/theme";

const OPTIONS: { mode: ThemeMode; label: string; Icon: typeof SunIcon }[] = [
  { mode: "light", label: "Terang", Icon: SunIcon },
  { mode: "dark", label: "Gelap", Icon: MoonIcon },
  { mode: "system", label: "Sistem", Icon: ComputerDesktopIcon },
];

/** RIMBA: light / dark / follow-the-device switch for the account menu. */
export default function ThemeSwitch() {
  const [mode, setMode] = useState<ThemeMode>("system");
  useEffect(() => setMode(getThemeMode()), []);
  return (
    <div className="px-2 pt-1 pb-2">
      <div className="px-1 pb-1 text-xs font-medium text-stone-500 dark:text-stone-400">
        {t("Mode tampilan")}
      </div>
      <div
        role="radiogroup"
        aria-label={t("Mode tampilan")}
        className="grid grid-cols-3 gap-1 p-1 rounded-lg bg-stone-100 dark:bg-stone-900"
      >
        {OPTIONS.map(({ mode: m, label, Icon }) => (
          <button
            key={m}
            type="button"
            role="radio"
            aria-checked={mode === m}
            title={t(label)}
            onClick={() => {
              setThemeMode(m);
              setMode(m);
            }}
            className={classnames(
              "flex flex-col gap-0.5 items-center py-1.5 text-xs font-medium rounded-md transition",
              mode === m
                ? "bg-white text-emerald-800 shadow-sm dark:bg-stone-700 dark:text-emerald-200"
                : "text-stone-600 hover:text-stone-900 dark:text-stone-300 dark:hover:text-stone-100",
            )}
          >
            <Icon className="w-4 h-4" />
            {t(label)}
          </button>
        ))}
      </div>
    </div>
  );
}
