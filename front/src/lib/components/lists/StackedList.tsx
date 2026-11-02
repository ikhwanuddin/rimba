import { type Key, type ReactElement } from "react";

type ElementWithKey = ReactElement & { key: Key | null };

/**
  * StackedList component renders a list of React elements with keys.
1 */
export default function StackedList({
  items,
}: {
  /** An array of React elements with keys to be rendered in the list. */
  items: ElementWithKey[];
}) {
  return (
    <ul
      role="list"
      className="w-full divide-y divide-stone-200 rounded-xl border border-stone-200 bg-white shadow-sm dark:divide-stone-700 dark:border-stone-700 dark:bg-stone-800"
    >
      {items.map((item) => (
        <li className="flex gap-x-6 justify-between px-5 py-4" key={item.key}>
          {item}
        </li>
      ))}
    </ul>
  );
}
