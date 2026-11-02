import { TagsIcon } from "@/lib/components/icons";
import TagList from "@/lib/components/tags/TagList";
import Card from "@/lib/components/ui/Card";
import { H2, H4 } from "@/lib/components/ui/Headings";

import { t } from "@/lib/i18n";
import type { AnnotationProject, Color, Tag } from "@/lib/types";

export default function AnnotationProjectTags({
  annotationProject,
  onDeleteTag,
  TagSearchBar,
  tagColorFn,
}: {
  annotationProject: AnnotationProject;
  onDeleteTag?: (tag: Tag) => void;
  TagSearchBar?: JSX.Element;
  tagColorFn?: (tag: Tag) => Color;
}) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <H2 className="inline-flex gap-2 items-center">
          <TagsIcon className="inline-block w-6 h-6" />
          {t("Label proyek")}
        </H2>
        <p className="max-w-prose text-sm text-stone-500 dark:text-stone-400">
          <span className="font-bold text-emerald-700 dark:text-emerald-400">
            {t("Label")}
          </span>{" "}
          {t(
            " memberi makna pada anotasi. Lihat label proyek ini atau tambahkan bila perlu.",
          )}{" "}
          {t("Label bisa ditambah lagi kapan saja.")}
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 items-start md:grid-cols-2">
        <Card>
          <H4>{t("Tambah label")}</H4>
          <small className="text-stone-500 dark:text-stone-400">
            {t("Cari label di bawah, lalu klik untuk menambahkannya.")}
          </small>
          <div className="py-2">{TagSearchBar}</div>
          <small className="text-stone-500 dark:text-stone-400">
            {t("Buat label baru bila perlu, tapi jangan dobel makna.")}
          </small>
        </Card>
        <Card>
          <H4 className="inline-flex gap-2 items-center">
            {t("Label terpilih")}
            <span className="py-0.5 px-2 text-xs font-medium rounded-full bg-stone-100 text-stone-600 dark:bg-stone-700 dark:text-stone-300">
              {(annotationProject.tags ?? []).length.toLocaleString()}
            </span>
          </H4>
          <small className="text-stone-500 dark:text-stone-400">
            {t("Cari label yang sudah dipilih. Klik label untuk melepasnya.")}
          </small>
          <div>
            <TagList
              tags={annotationProject.tags ?? []}
              onClick={onDeleteTag}
              tagColorFn={tagColorFn}
            />
          </div>
        </Card>
      </div>
    </div>
  );
}
