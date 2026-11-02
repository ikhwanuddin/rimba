import type { ReactNode } from "react";

/**
 * A generic header component for providing consistent styling and layout to
 * the top section of a page or section.
 *
 * This component is designed to be flexible, allowing you to pass any content
 * as children to customize the header's appearance. It provides a basic
 * background color and padding, along with responsive adjustments for
 * different screen sizes.
 */
export default function Header({ children }: { children: ReactNode }) {
  return (
    <header className="border-b border-stone-200 bg-white dark:border-stone-700 dark:bg-stone-900">
      <div className="mx-auto max-w-7xl px-4 py-4">{children}</div>
    </header>
  );
}
