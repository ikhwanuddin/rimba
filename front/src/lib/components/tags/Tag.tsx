/** @module Tag.
 * Definition of the Tag component.
 */
import classnames from "classnames";
import { type HTMLProps } from "react";

import { CloseIcon } from "@/lib/components/icons";

import type { Tag } from "@/lib/types";
import { COLOR_NAMES, LEVELS, getTagClassNames } from "@/lib/utils/tags";

/** A Tag.
 * Will display a tag. The aspect can be customized by specifying
 * the color (hue) and the level (brightness).
 * @component
 */
export default function Tag({
  tag,
  color,
  level = 1,
  className,
  canClose = true,
  wrapText = false,
  onClick,
  onClose,
  ...props
}: {
  tag: Tag;
  level: (typeof LEVELS)[number];
  color: (typeof COLOR_NAMES)[number];
  canClose?: boolean;
  /** RIMBA: let long values wrap instead of being cut off. */
  wrapText?: boolean;
  onClick?: () => void;
  onClose?: () => void;
} & HTMLProps<HTMLDivElement>) {
  const classNames = getTagClassNames(color, level);

  return (
    <div
      className={classnames(
        "border rounded-md px-1.5 inline-flex w-fit max-w-full flex-nowrap",
        wrapText ? "whitespace-normal" : "whitespace-nowrap",
        classNames.background,
        classNames.text,
        classNames.border,
        className,
      )}
      {...props}
    >
      {onClose != null && canClose && (
        <button type="button" className="group min-w-fit" onClick={onClose}>
          <CloseIcon className="inline-block w-4 h-4 group-hover:text-red-500 group-hover:stroke-3" />
        </button>
      )}
      <button
        type="button"
        className={classnames(
          "max-w-full group text-left",
          wrapText ? "block" : "flex flex-row items-center",
        )}
        onClick={onClick}
      >
        <span
          className={classnames("font-normal", !wrapText && "min-w-fit shrink")}
        >
          {tag.key}
        </span>
        <span
          className={classnames(
            "ml-1 font-bold group-hover:underline group-hover:decoration-2 group-hover:underline-offset-2",
            wrapText ? "break-words" : "flex-1 grow truncate",
          )}
        >
          {tag.value}
        </span>
      </button>
    </div>
  );
}

export { COLOR_NAMES, LEVELS };
