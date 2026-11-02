import classNames from "classnames";
import { ForwardedRef, forwardRef } from "react";
import type { ButtonHTMLAttributes, ReactNode } from "react";

import type { Mode, Variant } from "@/lib/components/common";

const FOCUS_STYLE = "focus:ring-4 focus:ring-emerald-500/50 focus:outline-none";

// RIMBA: colours checked for WCAG AA contrast in light and dark mode.
export const CLASS_NAMES = {
  filled: {
    primary:
      "border-emerald-700 bg-emerald-700 hover:bg-emerald-800 !text-white dark:bg-emerald-600 dark:hover:bg-emerald-700 disabled:bg-emerald-300 dark:disabled:bg-emerald-800",
    secondary:
      "border-stone-300 dark:border-stone-600 bg-stone-100 hover:bg-stone-200 dark:bg-stone-700 dark:hover:bg-stone-600 disabled:bg-stone-300 dark:disabled:bg-stone-700 dark:text-stone-100",
    danger:
      "border-rose-700 bg-rose-700 hover:bg-rose-800 !text-white dark:bg-rose-600 dark:hover:bg-rose-700 disabled:bg-rose-300 dark:disabled:bg-rose-800",
    success:
      "border-green-700 bg-green-700 hover:bg-green-800 !text-white dark:bg-green-600 dark:hover:bg-green-700 disabled:bg-green-300 dark:disabled:bg-green-800",
    warning:
      "border-amber-500 bg-amber-400 hover:bg-amber-500 !text-stone-900 disabled:bg-amber-200 dark:disabled:bg-amber-800",
    info: "border-blue-700 bg-blue-700 hover:bg-blue-800 !text-white dark:bg-blue-600 dark:hover:bg-blue-700 disabled:bg-blue-300 dark:disabled:bg-blue-800",
    common:
      "border text-stone-900 dark:text-stone-100 disabled:text-stone-500 dark:disabled:text-stone-300",
  },
  outline: {
    primary:
      "border-emerald-600 !text-emerald-800 hover:bg-emerald-50 dark:border-emerald-500 dark:!text-emerald-200 dark:hover:bg-emerald-900/50",
    secondary:
      "border-stone-400 hover:bg-stone-100 dark:border-stone-500 dark:hover:bg-stone-700",
    danger:
      "border-rose-500 !text-rose-700 hover:bg-rose-50 dark:!text-rose-300 dark:hover:bg-rose-900/40",
    success:
      "border-green-600 !text-green-800 hover:bg-green-50 dark:!text-green-300 dark:hover:bg-green-900/40",
    warning:
      "border-amber-500 !text-amber-800 hover:bg-amber-50 dark:!text-amber-300 dark:hover:bg-amber-900/40",
    info: "border-blue-500 !text-blue-700 hover:bg-blue-50 dark:!text-blue-300 dark:hover:bg-blue-900/40",
    common: "border bg-transparent text-stone-900 dark:text-stone-100",
  },
  text: {
    primary:
      "text-emerald-700 stroke-emerald-700 dark:text-emerald-300 dark:stroke-emerald-300",
    secondary:
      "text-stone-600 stroke-stone-600 hover:text-stone-900 dark:text-stone-300 dark:stroke-stone-300 dark:hover:text-stone-100",
    danger:
      "text-rose-600 stroke-rose-600 hover:text-rose-700 dark:text-rose-400 dark:stroke-rose-400 dark:hover:text-rose-300",
    success:
      "text-green-700 stroke-green-700 dark:text-green-400 dark:stroke-green-400",
    warning:
      "text-amber-700 stroke-amber-700 dark:text-amber-300 dark:stroke-amber-300",
    info: "text-blue-600 stroke-blue-600 dark:text-blue-400 dark:stroke-blue-400",
    common:
      "bg-transparent hover:underline hover:decoration-solid hover:decoration-2 hover:underline-offset-2 disabled:no-underline disabled:font-medium stroke-2 hover:stroke-4 disabled:stroke-1",
  },
};

export function getButtonClassName({
  variant = "primary",
  mode = "filled",
  padding = "p-2.5",
  align = "text-center",
}: {
  variant?: Variant;
  mode?: Mode;
  padding?: string;
  align?: "text-center" | "text-left" | "text-right";
}) {
  return classNames(
    CLASS_NAMES[mode][variant],
    CLASS_NAMES[mode]["common"],
    FOCUS_STYLE,
    padding,
    align,
    "group flex flex-row items-center rounded-lg text-sm font-medium",
  );
}

const Button = forwardRef(function Button(
  {
    children,
    variant = "primary",
    mode = "filled",
    padding = "p-2.5",
    align = "text-center",
    className,
    ...props
  }: {
    children: ReactNode;
    variant?: Variant;
    padding?: string;
    align?: "text-center" | "text-left" | "text-right";
    mode?: Mode;
  } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "ref">,
  ref: ForwardedRef<HTMLButtonElement>,
) {
  const baseClass = getButtonClassName({ variant, mode, padding, align });
  return (
    <button className={classNames(baseClass, className)} {...props} ref={ref}>
      {children}
    </button>
  );
});

export default Button;
