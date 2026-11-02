import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import { StrictMode } from "react";

import { ClientProvider } from "@/app/client";

import Notification from "@/lib/components/ui/Notification";

import { THEME_SCRIPT } from "@/lib/theme";

import "./globals.css";

const mulish = Mulish({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RIMBA",
  description:
    "RIMBA: Rainforest Identification and Monitoring through Bioacoustic Analysis (built on Whombat)",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StrictMode>
      <html lang="en" suppressHydrationWarning>
        <head>
          <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
        </head>
        <body
          className={`${mulish.className} font-sans bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 min-h-screen w-screen overflow-x-hidden`}
        >
          <ClientProvider>
            {children}
            <Notification />
          </ClientProvider>
        </body>
      </html>
    </StrictMode>
  );
}
