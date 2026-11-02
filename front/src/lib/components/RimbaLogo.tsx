/* RIMBA: the logo with the tagline in the interface language. */
import logoId from "@/assets/rimba_logo.svg";
import logoEn from "@/assets/rimba_logo_en.svg";
import Image from "next/image";

import { getLang } from "@/lib/i18n";

export default function RimbaLogo({
  height,
  priority = false,
}: {
  height: number;
  priority?: boolean;
}) {
  const logo = getLang() === "en" ? logoEn : logoId;
  return (
    <Image
      src={logo}
      alt="RIMBA"
      height={height}
      width={Math.round((height * logo.width) / logo.height)}
      priority={priority}
    />
  );
}
