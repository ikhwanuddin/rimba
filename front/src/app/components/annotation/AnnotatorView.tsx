/* Way Canguk fork: simple annotation page for annotators.
 *
 * One question per clip: is the sound inside the box the species on its label?
 * Yes / No / Not sure (keys 1, 2, 3). The answer is stored as a clip tag
 * ("jawaban": "ya" | "tidak" | "tidak yakin"), the task is marked completed and
 * the next clip opens. Optionally the box label can be changed to another
 * species of the project before answering. Box editing stays available but in
 * small controls; metadata, filters, maps and settings are hidden. */
import classNames from "classnames";
import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import toast from "react-hot-toast";
import { useHotkeys } from "react-hotkeys-hook";

import useClipAnnotation from "@/app/hooks/api/useClipAnnotation";

import UserContext from "@/app/contexts/user";

import type useAnnotateTasks from "@/lib/hooks/annotation/useAnnotateTasks";

import type { AnnotationProject, Tag } from "@/lib/types";
import { getTagClassNames, getTagColor } from "@/lib/utils/tags";

import ClipAnnotationNotes from "../clip_annotations/ClipAnnotationNotes";

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

type Tasks = ReturnType<typeof useAnnotateTasks>;

export default function AnnotatorView({
  annotationProject,
  tasks,
  Spectrogram,
}: {
  annotationProject: AnnotationProject;
  tasks: Tasks;
  Spectrogram?: JSX.Element;
}) {
  const user = useContext(UserContext);
  const total = tasks.tasks.length;
  const done = useMemo(
    () =>
      tasks.tasks.filter((t) =>
        t.status_badges?.some((b) => b.state === "completed"),
      ).length,
    [tasks.tasks],
  );
  const [showHelp, setShowHelp] = useState(false);

  // On opening the page, continue at the first clip not answered yet.
  const resumed = useRef(false);
  useEffect(() => {
    if (resumed.current || tasks.task == null || tasks.tasks.length === 0)
      return;
    resumed.current = true;
    const isDone = (t: (typeof tasks.tasks)[number]) =>
      t.status_badges?.some((b) => b.state === "completed") ?? false;
    if (!isDone(tasks.task)) return;
    const next = tasks.tasks.find((t) => !isDone(t));
    if (next != null) tasks.goToTask(next);
  }, [tasks]);

  return (
    <div className="flex flex-col gap-4 max-w-6xl mx-auto">
      <div className="flex flex-row flex-wrap items-center gap-4">
        <button
          type="button"
          className="rounded-md border border-stone-300 px-3 py-1 hover:bg-stone-200 disabled:opacity-40 dark:border-stone-600 dark:hover:bg-stone-700"
          onClick={tasks.prevTask}
          disabled={!tasks.hasPrevTask}
        >
          ← Sebelumnya
        </button>
        <div className="flex flex-col grow min-w-48">
          <span className="text-sm text-stone-600 dark:text-stone-400">
            Klip {(tasks.current ?? 0) + 1} dari {total} · selesai {done}
          </span>
          <div className="h-2 w-full rounded-full bg-stone-200 dark:bg-stone-700">
            <div
              className="h-2 rounded-full bg-emerald-600"
              style={{ width: `${total ? (100 * done) / total : 0}%` }}
            />
          </div>
        </div>
        <button
          type="button"
          className="rounded-md border border-stone-300 px-3 py-1 hover:bg-stone-200 disabled:opacity-40 dark:border-stone-600 dark:hover:bg-stone-700"
          onClick={tasks.nextTask}
          disabled={!tasks.hasNextTask}
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
        <div className="whitespace-pre-line rounded-md border border-emerald-200 bg-emerald-50 p-4 text-stone-800 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-200">
          {annotationProject.annotation_instructions}
        </div>
      )}
      {tasks.task == null || tasks.annotations.data == null ? (
        <div className="p-8 text-center text-stone-500">
          {total > 0 && done === total
            ? "Semua klip sudah dijawab. Terima kasih!"
            : "Memuat klip…"}
        </div>
      ) : (
        <>
          {Spectrogram}
          <AnswerPanel
            key={tasks.annotations.data.uuid}
            annotationProject={annotationProject}
            tasks={tasks}
            userId={user?.id}
          />
        </>
      )}
    </div>
  );
}

function AnswerPanel({
  annotationProject,
  tasks,
  userId,
}: {
  annotationProject: AnnotationProject;
  tasks: Tasks;
  userId?: string;
}) {
  const clipAnnotation = tasks.annotations.data!;
  const {
    data = clipAnnotation,
    addClipAnnotationTag,
    removeClipAnnotationTag,
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
  const answerTags = useMemo(
    () => (annotationProject.tags ?? []).filter((t) => t.key === ANSWER_KEY),
    [annotationProject.tags],
  );
  const speciesTags = useMemo(
    () => (annotationProject.tags ?? []).filter((t) => t.key === SPECIES_KEY),
    [annotationProject.tags],
  );

  const handleAnswer = useCallback(
    async (value: string) => {
      if (busy) return;
      const tag = answerTags.find((t) => t.value === value);
      if (tag == null) {
        toast.error(`Tag "${ANSWER_KEY}: ${value}" belum ada di proyek ini.`);
        return;
      }
      setBusy(true);
      try {
        for (const old of data.tags ?? []) {
          if (old.key === ANSWER_KEY && old.value !== value) {
            await removeClipAnnotationTag.mutateAsync(old);
          }
        }
        if (answer !== value) await addClipAnnotationTag.mutateAsync(tag);
        const alreadyDone = tasks.task?.status_badges?.some(
          (b) => b.state === "completed" && b.user?.id === userId,
        );
        if (alreadyDone) {
          tasks.nextTask();
        } else {
          await tasks.markCompleted.mutateAsync();
        }
      } catch {
        toast.error("Gagal menyimpan jawaban. Coba lagi.");
      } finally {
        setBusy(false);
      }
    },
    [
      busy,
      answerTags,
      data.tags,
      answer,
      addClipAnnotationTag,
      removeClipAnnotationTag,
      tasks,
      userId,
    ],
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
    <div className="flex flex-col gap-4 rounded-lg border border-stone-200 bg-white p-5 dark:border-stone-700 dark:bg-stone-800">
      <p className="text-lg">
        Apakah suara di dalam kotak adalah{" "}
        <span className="font-bold">{labelText}</span>?
      </p>
      <div className="flex flex-row flex-wrap gap-3">
        {ANSWERS.map((a) => (
          <button
            key={a.value}
            type="button"
            disabled={busy}
            onClick={() => handleAnswer(a.value)}
            className={classNames(
              "min-w-36 rounded-lg px-6 py-3 text-lg font-bold shadow-sm disabled:opacity-50 focus:outline-none focus:ring-4 focus:ring-emerald-300",
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
      </div>
      <p className="text-sm text-stone-500">
        Spasi = putar/jeda. Jawaban tersimpan dan klip berikutnya langsung
        terbuka.
        {answer ? ` Jawaban tersimpan: "${answer}".` : ""}
      </p>
      <div className="flex flex-col gap-2 border-t border-stone-200 pt-3 dark:border-stone-700">
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
    </div>
  );
}
