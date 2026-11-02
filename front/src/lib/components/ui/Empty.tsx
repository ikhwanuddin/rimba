import classNames from "classnames";
import type { ReactNode } from "react";

export default function Empty({
  children,
  outerClassName = "py-2",
  className,
}: {
  children: ReactNode;
  outerClassName?: string;
  className?: string;
}) {
  return (
    <div className={`${outerClassName} w-full`}>
      <div
        className={classNames(
          className,
          "flex flex-col gap-1 justify-center items-center py-6 px-4 w-full text-sm text-center rounded-lg border border-dashed border-stone-300 text-stone-500 dark:border-stone-600 dark:text-stone-400",
        )}
      >
        {children}
      </div>
    </div>
  );
}
