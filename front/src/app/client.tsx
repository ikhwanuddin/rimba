"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type ReactNode, useEffect, useState } from "react";

import { initLang } from "@/lib/i18n";
import { watchSystemTheme } from "@/lib/theme";

export const queryClient = new QueryClient();

export function ClientProvider({ children }: { children: ReactNode }) {
  // RIMBA: render only after the interface language is known (see lib/i18n.ts).
  const [ready, setReady] = useState(false);
  useEffect(() => watchSystemTheme(), []);
  useEffect(() => {
    initLang().then(() => setReady(true));
  }, []);
  if (!ready) return null;
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
