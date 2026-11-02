import type { ComponentProps } from "react";

import { NotesIcon } from "@/lib/components/icons";
import NotesPanel from "@/lib/components/notes/NotesPanel";

import { t } from "@/lib/i18n";

function NoNotes() {
  return (
    <div className="p-4 w-full">
      <div className="flex flex-col justify-center items-center p-8 w-full rounded-lg border border-dashed border-stone-500 bg-stone-300 dark:bg-stone-800">
        <span className="text-stone-700 dark:text-stone-300">
          <NotesIcon className="inline-block mr-1 w-5 h-5" />{" "}
          {t(" Belum ada catatan")}
        </span>
        <span className="text-sm text-stone-500 dark:text-stone-400">
          {t("Tulis catatan di atas untuk memulai diskusi tentang berkas ini.")}
        </span>
      </div>
    </div>
  );
}

export default function RecordingNotes(
  props: Omit<ComponentProps<typeof NotesPanel>, "title" | "EmptyNotes">,
) {
  return (
    <NotesPanel
      title={t("Catatan berkas")}
      EmptyNotes={<NoNotes />}
      {...props}
    />
  );
}
