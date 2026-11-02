import classnames from "classnames";
import type { ButtonHTMLAttributes, ReactNode } from "react";

const BASE_CLASS =
  "whitespace-nowrap rounded-md px-3 py-1.5 text-center text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 flex gap-1.5 items-center transition";

const ACTIVE_CLASS =
  "bg-white text-emerald-800 shadow-sm dark:bg-stone-700 dark:text-emerald-200";

const INACTIVE_CLASS =
  "text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-200";

export default function Tab({
  children,
  active = false,
  className,
  ...props
}: {
  children: ReactNode;
  active?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={classnames(
        BASE_CLASS,
        active ? ACTIVE_CLASS : INACTIVE_CLASS,
        className,
      )}
    >
      {children}
    </button>
  );
}
