"use client";

/* Way Canguk fork: credits and licence. */
import Image from "next/image";

import Hero from "@/lib/components/ui/Hero";

export default function Page() {
  return (
    <div>
      <Hero text="About" />
      <div className="p-6 flex flex-col items-center gap-6">
        <Image
          src="/waycanguk_logo.svg"
          alt="Anotasi Way Canguk"
          width={480}
          height={150}
        />
        <div className="max-w-prose flex flex-col gap-4 text-lg">
          <p>
            Bird-call annotation for recordings from Way Canguk, Bukit Barisan
            Selatan National Park, Indonesia, made with multichannel MAARU
            recorders. Part of a PhD project at the Dyson School of Design
            Engineering, Imperial College London, with the Wildlife Conservation
            Society Indonesia Program.
          </p>
          <p>
            This site is a modified version of{" "}
            <a
              className="underline text-emerald-700 dark:text-emerald-300"
              href="https://github.com/mbsantiago/whombat"
            >
              Whombat
            </a>{" "}
            by Santiago Martínez Balvanera and colleagues (Martínez Balvanera et
            al., 2024, Methods in Ecology and Evolution,
            doi:10.1111/2041-210X.14468), released under the GNU General Public
            License v3.0. The modified source code is at{" "}
            <a
              className="underline text-emerald-700 dark:text-emerald-300"
              href="https://github.com/ikhwanuddin/whombat/tree/waycanguk"
            >
              github.com/ikhwanuddin/whombat
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
