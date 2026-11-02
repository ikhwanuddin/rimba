import classNames from "classnames";
import type { HTMLAttributes } from "react";

export default function Card({
  children,
  className,
  ...rest
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={classNames(
        "border flex flex-col gap-3 p-5 rounded-xl border-stone-200 bg-white shadow-sm dark:border-stone-700 dark:bg-stone-800 text-stone-700 dark:text-stone-300",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
