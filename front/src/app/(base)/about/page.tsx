"use client";

/* Way Canguk fork: what the site is, what this version changes, and credits. */
import logo from "@/assets/waycanguk_logo.svg";
import Image from "next/image";

import { version } from "@/app/version";

import Hero from "@/lib/components/ui/Hero";

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
    "Bahasa Indonesia, warna label yang mudah dibaca, dan menu admin yang disembunyikan dari anotator.",
  ],
  [
    "Data",
    "Jawaban disimpan di server proyek dan dicadangkan setiap hari. Situs hanya bisa dibuka oleh email yang terdaftar.",
  ],
];

export default function Page() {
  return (
    <div>
      <Hero text="Tentang" />
      <div className="p-6 flex flex-col items-center gap-6">
        <Image
          src={logo}
          alt="Anotasi Kicau Burung Way Canguk"
          width={480}
          height={150}
        />
        <div className="max-w-prose flex flex-col gap-8 text-stone-700 dark:text-stone-300">
          <p className="text-lg">
            Anotasi kicau burung untuk rekaman suara dari Way Canguk, Taman
            Nasional Bukit Barisan Selatan, Lampung, yang direkam dengan perekam
            multikanal MAARU. Bagian dari proyek PhD di Dyson School of Design
            Engineering, Imperial College London, bersama Wildlife Conservation
            Society – Indonesia Program.
          </p>
          <section className="flex flex-col gap-4 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm dark:border-stone-700 dark:bg-stone-800">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100">
                Tentang versi ini
              </h2>
              <span className="rounded-full bg-emerald-100 px-3 py-1 font-mono text-xs font-semibold text-emerald-900 dark:bg-emerald-900 dark:text-emerald-100">
                {version}
              </span>
            </div>
            <p>
              Situs ini adalah versi Whombat 0.9.0, alat anotasi audio sumber
              terbuka, yang disesuaikan untuk pengecekan klip kicau burung oleh
              tim anotator Way Canguk. Yang berbeda dari Whombat aslinya:
            </p>
            <ul className="flex flex-col gap-3">
              {CHANGES.map(([title, text]) => (
                <li key={title} className="flex gap-3">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-emerald-600" />
                  <span>
                    <b className="text-stone-900 dark:text-stone-100">
                      {title}.
                    </b>{" "}
                    {text}
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
