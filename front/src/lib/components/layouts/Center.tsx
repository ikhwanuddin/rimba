import { type ReactNode } from "react";

export default function Center({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col justify-center items-center py-2 w-full sm:py-6 sm:px-8 lg:px-16">
      {children}
    </div>
  );
}
