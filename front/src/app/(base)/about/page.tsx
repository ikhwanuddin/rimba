"use client";

/* RIMBA: what the site is, what this version changes, and credits. */
import { version } from "@/app/version";

import RimbaLogo from "@/lib/components/RimbaLogo";
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

// RIMBA: where development is heading (also in the README, "Roadmap").
const ROADMAP: [string, string][] = [
  [
    "Sekarang: Validasi Deteksi Way Canguk",
    "Klip mono dan beam diacak dalam satu antrean, lalu jawaban diekspor untuk menghitung precision per metode dan per rentang skor.",
  ],
  [
    "Anotasi Penuh di RIMBA",
    "Tahap Anotasi Penuh (dengar utuh rekaman pagi dan memberi kotak pada semua suara) juga dikerjakan di sini, dengan kotak usulan otomatis sebagai titik awal.",
  ],
  [
    "Mutu jawaban",
    "Sebagian klip dijawab dua orang untuk mengukur kesepakatan antar-anotator, dan klip Tidak yakin dibahas bersama langsung di aplikasi.",
  ],
  [
    "Evaluasi model",
    "Fitur evaluasi Whombat dihidupkan lagi: impor deteksi BirdNET dan Perch, precision dan recall per spesies, dan ambang skor per spesies.",
  ],
  [
    "Nama spesies lokal",
    "Nama Indonesia, nama ilmiah, dan padanan nama BirdNET dalam satu daftar spesies per situs.",
  ],
  [
    "Audio multikanal dan spasial",
    "Memutar tiap kanal dan beam perekam MAARU, menampilkan arah datang suara, dan peta titik rekam.",
  ],
  [
    "Situs dan lembaga lain",
    "Proyek untuk hutan lain di Indonesia dan Asia Tenggara, dengan peran admin per proyek.",
  ],
  [
    "Latihan anotator",
    "Sesi latihan dari klip yang sudah terverifikasi, supaya anggota tim baru cepat mengenali suara.",
  ],
  [
    "Terbuka dan bisa dirujuk",
    "Rilis bertag dengan DOI, serta ekspor ke format umum (AOEF, CSV, tabel seleksi Raven).",
  ],
];

export default function Page() {
  return (
    <div>
      <Hero text={t("Tentang")} />
      <div className="p-6 flex flex-col items-center gap-6">
        <RimbaLogo height={158} />
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
          <section className="flex flex-col gap-4 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm dark:border-stone-700 dark:bg-stone-800">
            <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100">
              {t("Arah pengembangan")}
            </h2>
            <p>
              {t(
                "RIMBA berkembang mengikuti kebutuhan penelitian. Fitur Whombat yang sekarang disembunyikan tetap ada di kode dan bisa dihidupkan lagi saat diperlukan.",
              )}
            </p>
            <ol className="flex flex-col gap-3">
              {ROADMAP.map(([title, text], i) => (
                <li key={title} className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-900 dark:bg-emerald-900 dark:text-emerald-100">
                    {i + 1}
                  </span>
                  <span>
                    <b className="text-stone-900 dark:text-stone-100">
                      {t(title)}.
                    </b>{" "}
                    {t(text)}
                  </span>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </div>
    </div>
  );
}
