/* RIMBA: simple annotation page for annotators.
 *
 * One question per clip: is the sound inside the box the species on its label?
 * Yes / No / Not sure (keys 1, 2, 3). The answer is stored as a clip tag
 * ("jawaban": "ya" | "tidak" | "tidak yakin"), the task is marked completed and
 * the next clip opens. Clips come from a shared queue (POST
 * /annotation_tasks/claim/): each annotator gets the next clip nobody holds.
 * "Previous" walks back through the clips seen in this session. Optionally the
 * box label can be changed to another species of the project before answering. Box editing stays available but in
 * small controls; metadata, filters, maps and settings are hidden. */
import { useQuery } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import classNames from "classnames";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useHotkeys } from "react-hotkeys-hook";

import useClipAnnotation from "@/app/hooks/api/useClipAnnotation";
import useAudioSettings from "@/app/hooks/settings/useAudioSettings";
import useSpectrogramSettings from "@/app/hooks/settings/useSpectrogramSettings";
import useViewSettings from "@/app/hooks/settings/useViewSettings";

import api from "@/app/api";

import useAnnotationTagPallete from "@/lib/hooks/annotation/useAnnotationTagPalette";

import type { Claim } from "@/lib/api/annotation_tasks";
import type {
  AnnotationProject,
  AnnotationTask,
  ClipAnnotation,
  Tag,
} from "@/lib/types";
import { getTagClassNames, getTagColor } from "@/lib/utils/tags";

import ClipAnnotationNotes from "../clip_annotations/ClipAnnotationNotes";
import ClipAnnotationSpectrogram from "./AnnotationClip";

export const ANSWER_KEY = "jawaban";
export const SPECIES_KEY = "species";
const ANSWERS = [
  {
    value: "ya",
    label: "Ya",
    hotkey: "1",
    className: "bg-emerald-700 hover:bg-emerald-800 text-white",
  },
  {
    value: "tidak",
    label: "Tidak",
    hotkey: "2",
    className: "bg-red-700 hover:bg-red-800 text-white",
  },
  {
    value: "tidak yakin",
    label: "Tidak yakin",
    hotkey: "3",
    className: "bg-amber-500 hover:bg-amber-600 text-stone-900",
  },
] as const;

type QueueState = {
  stack: AnnotationTask[];
  pos: number;
  claim: Claim | null;
  loading: boolean;
};

export default function AnnotatorView({
  annotationProject,
}: {
  annotationProject: AnnotationProject;
}) {
  const audioSettings = useAudioSettings();
  const spectrogramSettings = useSpectrogramSettings();
  const viewSettings = useViewSettings();
  const tagPalette = useAnnotationTagPallete();
  const [q, setQ] = useState<QueueState>({
    stack: [],
    pos: -1,
    claim: null,
    loading: true,
  });
  const [showHelp, setShowHelp] = useState(false);

  const claimNext = useCallback(async () => {
    setQ((s) => ({ ...s, loading: true }));
    try {
      const claim = await api.annotationTasks.claim(annotationProject);
      setQ((s) => {
        const stack = s.stack.filter((t) => t.uuid !== claim.task?.uuid);
        if (claim.task != null) stack.push(claim.task);
        return {
          stack,
          pos: claim.task != null ? stack.length - 1 : stack.length,
          claim,
          loading: false,
        };
      });
    } catch {
      toast.error("Gagal mengambil klip berikutnya. Coba muat ulang halaman.");
      setQ((s) => ({ ...s, loading: false }));
    }
  }, [annotationProject]);

  const started = useRef(false);
  useEffect(() => {
    if (started.current) return;
    started.current = true;
    claimNext();
  }, [claimNext]);

  const task = q.pos >= 0 && q.pos < q.stack.length ? q.stack[q.pos] : null;
  const goPrev = useCallback(
    () => setQ((s) => ({ ...s, pos: Math.max(0, s.pos - 1) })),
    [],
  );
  const goNext = useCallback(() => {
    if (q.pos < q.stack.length - 1) setQ((s) => ({ ...s, pos: s.pos + 1 }));
    else claimNext();
  }, [q.pos, q.stack.length, claimNext]);
  const replaceTask = useCallback(
    (t: AnnotationTask) =>
      setQ((s) => ({
        ...s,
        stack: s.stack.map((x) => (x.uuid === t.uuid ? t : x)),
      })),
    [],
  );

  const dropTask = useCallback(
    (t: AnnotationTask) =>
      setQ((s) => {
        const stack = s.stack.filter((x) => x.uuid !== t.uuid);
        return { ...s, stack, pos: Math.min(s.pos, stack.length - 1) };
      }),
    [],
  );

  const annotations = useQuery<ClipAnnotation>({
    // the task object only changes its badges; the uuid identifies the clip
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: ["annotation_task", task?.uuid, "annotations"],
    queryFn: () => api.annotationTasks.getAnnotations(task!),
    enabled: task != null,
  });

  const c = q.claim;
  return (
    <div className="flex flex-col gap-4 max-w-6xl mx-auto">
      <div className="flex flex-row flex-wrap items-center gap-4">
        <button
          type="button"
          className="rounded-md border border-stone-300 px-3 py-1 hover:bg-stone-200 disabled:opacity-40 dark:border-stone-600 dark:hover:bg-stone-700"
          onClick={goPrev}
          disabled={q.pos <= 0}
        >
          ← Sebelumnya
        </button>
        <div className="flex flex-col grow min-w-48">
          <span className="text-sm text-stone-600 dark:text-stone-400">
            {c
              ? `Kamu sudah menjawab ${c.done_by_me} · sisa proyek ${c.remaining} dari ${c.total}`
              : "…"}
          </span>
          <div className="h-2 w-full rounded-full bg-stone-200 dark:bg-stone-700">
            <div
              className="h-2 rounded-full bg-emerald-600"
              style={{
                width: `${c && c.total ? (100 * (c.total - c.remaining)) / c.total : 0}%`,
              }}
            />
          </div>
        </div>
        <button
          type="button"
          className="rounded-md border border-stone-300 px-3 py-1 hover:bg-stone-200 disabled:opacity-40 dark:border-stone-600 dark:hover:bg-stone-700"
          onClick={goNext}
          disabled={q.loading}
        >
          Berikutnya →
        </button>
        {annotationProject.annotation_instructions ? (
          <button
            type="button"
            className="text-emerald-700 underline dark:text-emerald-300"
            onClick={() => setShowHelp((s) => !s)}
          >
            {showHelp ? "Tutup petunjuk" : "Petunjuk"}
          </button>
        ) : null}
      </div>
      {showHelp && (
        <div className="flex flex-col gap-1 rounded-md border border-emerald-200 bg-emerald-50 p-4 text-stone-800 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-200">
          {annotationProject.annotation_instructions
            ?.split("\n")
            .map((line, i) =>
              line.trim() === "" ? (
                <div key={i} className="h-2" />
              ) : /^[A-Z][A-Z ]+\b/.test(line) ? (
                <p
                  key={i}
                  className="font-bold text-emerald-800 dark:text-emerald-300"
                >
                  {line}
                </p>
              ) : (
                <p key={i}>{line}</p>
              ),
            )}
        </div>
      )}
      {task == null ? (
        <div className="p-8 text-center text-stone-500">
          {q.loading
            ? "Memuat klip…"
            : "Tidak ada klip tersisa untukmu. Terima kasih!"}
        </div>
      ) : annotations.data == null ? (
        <div className="p-8 text-center text-stone-500">Memuat klip…</div>
      ) : (
        <>
          <ClipAnnotationSpectrogram
            key={annotations.data.uuid}
            clipAnnotation={annotations.data}
            audioSettings={audioSettings}
            viewSettings={viewSettings}
            spectrogramSettings={spectrogramSettings}
            tagPalette={tagPalette}
            simple
          />
          <AnswerPanel
            key={task.uuid}
            annotationProject={annotationProject}
            task={task}
            clipAnnotation={annotations.data}
            onDone={(t) => {
              replaceTask(t);
              goNext();
            }}
            onSkip={() => {
              dropTask(task);
              claimNext();
            }}
          />
        </>
      )}
    </div>
  );
}

function AnswerPanel({
  annotationProject,
  task,
  clipAnnotation,
  onDone,
  onSkip,
}: {
  annotationProject: AnnotationProject;
  task: AnnotationTask;
  clipAnnotation: ClipAnnotation;
  onDone: (task: AnnotationTask) => void;
  onSkip: () => void;
}) {
  const {
    data = clipAnnotation,
    refetch,
    addSoundEventTag,
    removeSoundEventTag,
  } = useClipAnnotation({ uuid: clipAnnotation.uuid, clipAnnotation });
  const [busy, setBusy] = useState(false);
  const [showSpecies, setShowSpecies] = useState(false);

  const soundEvents = data.sound_events ?? [];
  const labels = useMemo(() => {
    const vals = new Set<string>();
    for (const se of soundEvents)
      for (const t of se.tags ?? [])
        if (t.key === SPECIES_KEY) vals.add(t.value);
    return Array.from(vals);
  }, [soundEvents]);
  const answer = data.tags?.find((t) => t.key === ANSWER_KEY)?.value;
  const speciesTags = useMemo(
    () => (annotationProject.tags ?? []).filter((t) => t.key === SPECIES_KEY),
    [annotationProject.tags],
  );

  const handleAnswer = useCallback(
    async (value: string) => {
      if (busy) return;
      setBusy(true);
      try {
        const updated = await api.annotationTasks.answer(task, value);
        await refetch();
        onDone(updated);
      } catch (e) {
        if (isAxiosError(e) && e.response?.status === 409) {
          toast.error(
            "Klip ini sudah dialihkan ke anotator lain karena terlalu lama dibuka. Lanjut ke klip berikutnya.",
          );
          onSkip();
        } else {
          toast.error("Gagal menyimpan jawaban. Coba lagi.");
        }
      } finally {
        setBusy(false);
      }
    },
    [busy, task, refetch, onDone, onSkip],
  );

  const handleRelabel = useCallback(
    async (tag: Tag) => {
      if (busy) return;
      setBusy(true);
      try {
        for (const se of soundEvents) {
          for (const old of se.tags ?? []) {
            if (old.key === SPECIES_KEY && old.value !== tag.value) {
              await removeSoundEventTag.mutateAsync({
                soundEventAnnotation: se,
                tag: old,
              });
            }
          }
          if (
            !(se.tags ?? []).some(
              (t) => t.key === SPECIES_KEY && t.value === tag.value,
            )
          ) {
            await addSoundEventTag.mutateAsync({
              soundEventAnnotation: se,
              tag,
            });
          }
        }
        setShowSpecies(false);
        toast.success(`Label diganti: ${tag.value}`);
      } catch {
        toast.error("Gagal mengganti label. Coba lagi.");
      } finally {
        setBusy(false);
      }
    },
    [busy, soundEvents, addSoundEventTag, removeSoundEventTag],
  );

  useHotkeys("1", () => handleAnswer("ya"), [handleAnswer]);
  useHotkeys("2", () => handleAnswer("tidak"), [handleAnswer]);
  useHotkeys("3", () => handleAnswer("tidak yakin"), [handleAnswer]);

  const labelText = labels.length > 0 ? labels.join(" / ") : "(tanpa label)";

  return (
    <>
      {/* the question and the answer buttons stay pinned to the bottom of the window */}
      <div className="sticky bottom-0 z-[60] -mx-1 flex flex-col gap-3 rounded-lg border border-stone-200 bg-white/95 p-4 shadow-[0_-6px_16px_-8px_rgba(0,0,0,0.25)] backdrop-blur dark:border-stone-700 dark:bg-stone-800/95">
        <p className="text-lg">
          Apakah suara di dalam kotak adalah{" "}
          <span className="font-bold">{labelText}</span>?
        </p>
        <div className="flex flex-row flex-wrap items-center gap-3">
          {ANSWERS.map((a) => (
            <button
              key={a.value}
              type="button"
              disabled={busy}
              onClick={() => handleAnswer(a.value)}
              className={classNames(
                "min-w-32 rounded-lg px-5 py-2.5 text-lg font-bold shadow-sm disabled:opacity-50 focus:outline-none focus:ring-4 focus:ring-emerald-300",
                a.className,
                answer === a.value &&
                  "ring-4 ring-offset-2 ring-stone-900 dark:ring-stone-100",
              )}
            >
              {a.label}{" "}
              <kbd className="ml-1 rounded bg-black/15 px-1.5 text-sm font-normal">
                {a.hotkey}
              </kbd>
            </button>
          ))}
          <p className="text-sm text-stone-500 dark:text-stone-400">
            Spasi = putar/jeda.
            {answer ? ` Jawaban tersimpan: "${answer}".` : ""}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-2 rounded-lg border border-stone-200 bg-white p-4 dark:border-stone-700 dark:bg-stone-800">
        <button
          type="button"
          className="w-fit text-sm text-emerald-700 underline dark:text-emerald-300"
          onClick={() => setShowSpecies((s) => !s)}
        >
          {showSpecies ? "Tutup" : "Yakin itu spesies lain? Ganti label kotak"}
        </button>
        {showSpecies && (
          <div className="flex flex-row flex-wrap gap-2">
            {speciesTags.map((t) => {
              const cls = getTagClassNames(getTagColor(t).color, 1);
              const current = labels.includes(t.value);
              return (
                <button
                  key={t.value}
                  type="button"
                  disabled={busy || current}
                  onClick={() => handleRelabel(t)}
                  className={classNames(
                    "rounded-md border px-2 py-1 text-sm font-semibold disabled:opacity-60",
                    cls.background,
                    cls.text,
                    cls.border,
                    current && "ring-2 ring-stone-900",
                  )}
                >
                  {t.value}
                </button>
              );
            })}
          </div>
        )}
        <details className="text-sm">
          <summary className="cursor-pointer text-emerald-700 underline dark:text-emerald-300 w-fit">
            Catatan (opsional)
          </summary>
          <div className="mt-2">
            <ClipAnnotationNotes clipAnnotation={data} />
          </div>
        </details>
      </div>
    </>
  );
}
