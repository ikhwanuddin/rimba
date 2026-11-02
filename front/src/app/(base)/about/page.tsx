"use client";

/* RIMBA: what the site is, what this version changes, and credits. */
import logo from "@/assets/rimba_logo.svg";
import Image from "next/image";

import { version } from "@/app/version";

import Hero from "@/lib/components/ui/Hero";

import { t } from "@/lib/i18n";

const CHANGES: [string, string][] = [
  [
    "Satu pertanyaan per klip",
    "Halaman anotasi hanya menanyakan apakah suara di dalam kotak adalah spesies yang tertulis. Jawabannya Ya, Tidak, atau Tidak yakin (tombol 1, 2, 3); label kotak bisa diganti bila perlu.",
  ],
  [
    "Antrean klip bersama",
    "Setiap anotator mendapat klip berikutnya yang belum dijawab dan tidak sedang dibuka orang lain, jadi satu klip dijawab satu orang. Klip yang dibuka tetapi tidak dijawab dalam 30 menit kembali ke antrean.",
  ],
  [
    "Daftar diskusi",
    "Jumlah jawaban Tidak yakin tampil di beranda sebagai bahan diskusi bersama tim.",
  ],
  [
    "Beranda",
    "Progres tim, jawabanmu, jawaban per hari, dan perkiraan kapan semua klip selesai.",
  ],
  [
    "Tampilan",
    "Bahasa Indonesia dan Inggris, warna label yang mudah dibaca, dan menu admin yang disembunyikan dari anotator.",
  ],
  [
    "Data",
    "Jawaban disimpan di server proyek dan dicadangkan setiap hari. Situs hanya bisa dibuka oleh email yang terdaftar.",
  ],
];

export default function Page() {
  return (
    <div>
      <Hero text={t("Tentang")} />
      <div className="p-6 flex flex-col items-center gap-6">
        <Image src={logo} alt="RIMBA" width={480} height={158} />
        <div className="max-w-prose flex flex-col gap-8 text-stone-700 dark:text-stone-300">
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-400">
            Rainforest Identification and Monitoring through Bioacoustic
            Analysis
          </p>
          <p className="text-lg">
            {t(
              "RIMBA adalah platform anotasi bioakustik untuk rekaman suara hutan hujan Indonesia dan Asia Tenggara: mesin mendeteksi suara, manusia memastikan. Proyek pertamanya Way Canguk, Taman Nasional Bukit Barisan Selatan, Lampung, dengan rekaman dari perekam multikanal MAARU. Bagian dari proyek PhD di Dyson School of Design Engineering, Imperial College London, bersama Wildlife Conservation Society – Indonesia Program.",
            )}
          </p>
          <section className="flex flex-col gap-4 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm dark:border-stone-700 dark:bg-stone-800">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100">
                {t("Asal-usul")}
              </h2>
              <span className="rounded-full bg-emerald-100 px-3 py-1 font-mono text-xs font-semibold text-emerald-900 dark:bg-emerald-900 dark:text-emerald-100">
                {version}
              </span>
            </div>
            <p>
              {t("RIMBA dibangun di atas")}{" "}
              <a
                className="underline"
                href="https://github.com/mbsantiago/whombat"
              >
                Whombat
              </a>{" "}
              {t(
                "0.9.0 karya Santiago Martínez Balvanera dkk., alat anotasi audio sumber terbuka berlisensi GPL-3.0. RIMBA memakai lisensi yang sama;",
              )}{" "}
              <a
                className="underline"
                href="https://github.com/ikhwanuddin/rimba"
              >
                {t("kode sumbernya terbuka")}
              </a>
              {t(". Yang berbeda dari Whombat:")}
            </p>
            <ul className="flex flex-col gap-3">
              {CHANGES.map(([title, text]) => (
                <li key={title} className="flex gap-3">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-emerald-600" />
                  <span>
                    <b className="text-stone-900 dark:text-stone-100">
                      {t(title)}.
                    </b>{" "}
                    {t(text)}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
