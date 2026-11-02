"use client";

/* Way Canguk fork: home page dashboard. One panel per annotation project: team
 * progress ring, the annotator's own numbers, answers per day over the last two
 * weeks (WIB) and a finish estimate; admins also see the answer mix and each
 * annotator's count. */
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";

import useAnnotationProjects from "@/app/hooks/api/useAnnotationProjects";

import api from "@/app/api";
import UserContext from "@/app/contexts/user";

import type { Progress } from "@/lib/api/annotation_tasks";
import type { AnnotationProject } from "@/lib/types";

const WEEKDAY = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
const ANSWERS = [
  { key: "ya", label: "Ya", bar: "bg-emerald-600", dot: "bg-emerald-600" },
  { key: "tidak", label: "Tidak", bar: "bg-stone-400", dot: "bg-stone-400" },
  {
    key: "tidak yakin",
    label: "Tidak yakin",
    bar: "bg-amber-400",
    dot: "bg-amber-400",
  },
];

function Ring({
  pct,
  answered,
  total,
}: {
  pct: number;
  answered: number;
  total: number;
}) {
  const r = 52;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative h-36 w-36 shrink-0">
      <svg viewBox="0 0 120 120" className="h-36 w-36 -rotate-90">
        <circle
          cx="60"
          cy="60"
          r={r}
          strokeWidth="12"
          className="fill-none stroke-emerald-100 dark:stroke-stone-700"
        />
        <circle
          cx="60"
          cy="60"
          r={r}
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={`${(c * pct) / 100} ${c}`}
          className="fill-none stroke-emerald-600 transition-all duration-700"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold text-stone-900 dark:text-stone-100">
          {pct}%
        </span>
        <span className="text-xs text-stone-500">
          {answered} / {total} klip
        </span>
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  note,
  accent = false,
}: {
  label: string;
  value: number | string;
  note?: string;
  accent?: boolean;
}) {
  return (
    <div
      className={
        "flex flex-col rounded-xl px-4 py-3 " +
        (accent ? "bg-emerald-700 text-white" : "bg-stone-50 dark:bg-stone-900")
      }
    >
      <span
        className={
          "text-xs font-semibold uppercase tracking-wide " +
          (accent ? "text-emerald-100" : "text-stone-500")
        }
      >
        {label}
      </span>
      <span className="text-2xl font-bold">{value}</span>
      {note && (
        <span
          className={
            "text-xs " + (accent ? "text-emerald-100" : "text-stone-500")
          }
        >
          {note}
        </span>
      )}
    </div>
  );
}

function Activity({ p, isAdmin }: { p: Progress; isAdmin: boolean }) {
  const max = Math.max(1, ...p.by_day);
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline justify-between">
        <h3 className="text-sm font-semibold text-stone-700 dark:text-stone-300">
          Klip terjawab per hari (14 hari, WIB)
        </h3>
        <span className="flex items-center gap-3 text-xs text-stone-500">
          <span className="flex items-center gap-1">
            <span className="h-2.5 w-2.5 rounded-sm bg-emerald-700" />{" "}
            {isAdmin ? "kamu" : "jawabanmu"}
          </span>
          <span className="flex items-center gap-1">
            <span className="h-2.5 w-2.5 rounded-sm bg-emerald-200 dark:bg-emerald-900" />{" "}
            tim
          </span>
        </span>
      </div>
      <div className="flex h-28 items-end gap-1.5">
        {p.by_day.map((n, i) => (
          <div
            key={p.days[i]}
            className="group relative flex h-full flex-1 flex-col justify-end"
            title={`${p.days[i]}: ${n} klip (kamu ${p.my_by_day[i]})`}
          >
            <div
              className="flex w-full flex-col justify-end overflow-hidden rounded-t-md bg-emerald-200 dark:bg-emerald-900"
              style={{ height: `${(100 * n) / max}%`, minHeight: n ? 4 : 0 }}
            >
              <div
                className="w-full bg-emerald-700"
                style={{ height: n ? `${(100 * p.my_by_day[i]) / n}%` : 0 }}
              />
            </div>
            {n > 0 && (
              <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] font-semibold text-stone-500 opacity-0 group-hover:opacity-100">
                {n}
              </span>
            )}
          </div>
        ))}
      </div>
      <div className="flex gap-1.5">
        {p.days.map((d, i) => (
          <span
            key={d}
            className={
              "flex-1 text-center text-[10px] " +
              (i === p.days.length - 1
                ? "font-bold text-emerald-700 dark:text-emerald-300"
                : "text-stone-400") +
              // on a phone only every other day is labelled
              ((p.days.length - 1 - i) % 2 === 1 ? " invisible sm:visible" : "")
            }
          >
            {i === p.days.length - 1
              ? "Hari ini"
              : WEEKDAY[new Date(d + "T00:00:00").getDay()]}
          </span>
        ))}
      </div>
    </div>
  );
}

function AnswerMix({
  answers,
  title,
}: {
  answers: Record<string, number>;
  title: string;
}) {
  const sum = ANSWERS.reduce((a, x) => a + (answers[x.key] ?? 0), 0);
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-sm font-semibold text-stone-700 dark:text-stone-300">
        {title}
      </h3>
      <div className="flex h-3 w-full overflow-hidden rounded-full bg-stone-100 dark:bg-stone-700">
        {sum > 0 &&
          ANSWERS.map((x) => (
            <div
              key={x.key}
              className={x.bar}
              style={{ width: `${(100 * (answers[x.key] ?? 0)) / sum}%` }}
            />
          ))}
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-stone-600 dark:text-stone-400">
        {ANSWERS.map((x) => (
          <span key={x.key} className="flex items-center gap-1.5">
            <span className={`h-2.5 w-2.5 rounded-full ${x.dot}`} />
            {x.label}{" "}
            <b className="text-stone-900 dark:text-stone-100">
              {answers[x.key] ?? 0}
            </b>
          </span>
        ))}
      </div>
    </div>
  );
}

function Annotators({ byUser }: { byUser: Record<string, number> }) {
  const rows = Object.entries(byUser).sort(([a], [b]) => a.localeCompare(b));
  const max = Math.max(1, ...rows.map(([, n]) => n));
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-sm font-semibold text-stone-700 dark:text-stone-300">
        Per anotator
      </h3>
      {rows.length === 0 ? (
        <p className="text-sm text-stone-500">Belum ada jawaban.</p>
      ) : (
        rows.map(([u, n]) => (
          <div key={u} className="flex items-center gap-3 text-sm">
            <span className="w-16 shrink-0 font-medium">{u}</span>
            <div className="h-2.5 flex-1 rounded-full bg-stone-100 dark:bg-stone-700">
              <div
                className="h-2.5 rounded-full bg-emerald-600"
                style={{ width: `${(100 * n) / max}%` }}
              />
            </div>
            <span className="w-8 text-right font-semibold">{n}</span>
          </div>
        ))
      )}
    </div>
  );
}

function finishNote(p: Progress) {
  if (p.remaining === 0) return "semua klip sudah terjawab";
  const week = p.by_day.slice(-7).reduce((a, b) => a + b, 0);
  if (week === 0) return "belum ada jawaban 7 hari terakhir";
  const days = Math.ceil(p.remaining / (week / 7));
  return `± ${days} hari lagi pada laju 7 hari terakhir`;
}

function ProjectPanel({
  project,
  isAdmin,
}: {
  project: AnnotationProject;
  isAdmin: boolean;
}) {
  const { data: p } = useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: ["annotation_project_progress", project.uuid],
    queryFn: () => api.annotationTasks.progress(project),
  });
  const answered = p ? p.total - p.remaining : 0;
  const pct = p && p.total ? Math.round((100 * answered) / p.total) : 0;
  const href = isAdmin
    ? `/annotation_projects/detail/?annotation_project_uuid=${project.uuid}`
    : `/annotation_projects/detail/annotation/?annotation_project_uuid=${project.uuid}`;
  const unsure = p
    ? ((isAdmin ? p.answers : p.my_answers)["tidak yakin"] ?? 0)
    : 0;
  return (
    <section className="flex flex-col gap-6 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm dark:border-stone-700 dark:bg-stone-800">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100">
            {project.name}
          </h2>
          <p className="text-stone-600 dark:text-stone-400">
            {project.description}
          </p>
        </div>
        <a
          href={href}
          className="rounded-lg bg-emerald-700 px-5 py-3 font-bold text-white shadow-sm hover:bg-emerald-800"
        >
          {isAdmin
            ? "Buka proyek →"
            : p && p.done_by_me > 0
              ? "Lanjutkan anotasi →"
              : "Mulai anotasi →"}
        </a>
      </div>
      {p && (
        <>
          <div className="flex flex-col items-center gap-6 sm:flex-row">
            <div className="flex flex-col items-center gap-1">
              <Ring pct={pct} answered={answered} total={p.total} />
              <span className="text-xs text-stone-500">progres tim</span>
            </div>
            <div className="grid w-full flex-1 grid-cols-2 gap-3 lg:grid-cols-4">
              <Stat
                accent
                label={isAdmin ? "Jawaban tim" : "Jawabanmu"}
                value={isAdmin ? answered : p.done_by_me}
                note={
                  isAdmin
                    ? `dari ${p.total} klip`
                    : `dari ${answered} jawaban tim`
                }
              />
              <Stat
                label="Hari ini"
                value={isAdmin ? p.today_total : p.today_by_me}
                note={isAdmin ? "seluruh tim" : `tim: ${p.today_total}`}
              />
              <Stat
                label="Sisa klip"
                value={p.remaining}
                note={finishNote(p)}
              />
              <Stat
                label="Perlu didiskusikan"
                value={unsure}
                note={isAdmin ? "jawaban tidak yakin" : "jawabanmu tidak yakin"}
              />
            </div>
          </div>
          <Activity p={p} isAdmin={isAdmin} />
          {isAdmin && (
            <div className="grid gap-6 border-t border-stone-100 pt-5 md:grid-cols-2 dark:border-stone-700">
              <AnswerMix answers={p.answers} title="Komposisi jawaban" />
              <Annotators byUser={p.by_user} />
            </div>
          )}
        </>
      )}
    </section>
  );
}

export default function Page() {
  const user = useContext(UserContext);
  const isAdmin = user?.is_superuser === true;
  const { items, isLoading } = useAnnotationProjects({ pageSize: 100 });
  const today = new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Jakarta",
  });
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-8">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">
          {today}
        </p>
        <h1 className="text-3xl font-bold text-stone-900 dark:text-stone-100">
          Halo, {user?.name || user?.username}
        </h1>
      </div>
      {isLoading ? (
        <p className="text-stone-500">Memuat proyek…</p>
      ) : items.length === 0 ? (
        <p className="text-stone-500">Belum ada proyek anotasi.</p>
      ) : (
        items.map((project) => (
          <ProjectPanel
            key={project.uuid}
            project={project}
            isAdmin={isAdmin}
          />
        ))
      )}
    </div>
  );
}
