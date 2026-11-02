import type { ReactNode } from "react";

import Header from "@/lib/components/ui/Header";
import { H1 } from "@/lib/components/ui/Headings";

/**
 * A component for rendering a section header with a tabbed navigation bar.
 *
 * This component is typically used to create visually distinct sections within
 * a page or layout, where each tab represents a different sub-section of the
 * content.
 *
 * Should be used in conjunction with the `Tab` component.
 */
export default function SectionTabs({
  tabs,
  title,
}: {
  /** An array of React elements representing the tabs to be displayed. */
  tabs: ReactNode[];
  /** The title to be displayed in the section header. */
  title?: ReactNode;
}) {
  return (
    <Header>
      <div className="flex flex-row flex-wrap gap-y-3 gap-x-6 items-center w-full min-w-0">
        {title != null && (
          <H1 className="min-w-0 text-xl sm:text-2xl">{title}</H1>
        )}
        {tabs.length > 0 && (
          <ul className="flex overflow-x-auto gap-1 p-1 max-w-full rounded-lg bg-stone-100 dark:bg-stone-800">
            {tabs.map((tab, index) => (
              <li key={index}>{tab}</li>
            ))}
          </ul>
        )}
      </div>
    </Header>
  );
}
