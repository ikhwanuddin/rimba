import { TagsIcon } from "@/lib/components/icons";
import TagList from "@/lib/components/tags/TagList";
import { H2, H3 } from "@/lib/components/ui/Headings";
import Info from "@/lib/components/ui/Info";

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
    <div className="flex flex-col gap-4 p-4">
      <H2>
        <TagsIcon className="inline-block mr-2 w-8 h-8 align-middle" />
        {t("Label proyek")}
      </H2>
      <p className="text-stone-500">
        <span className="font-bold text-emerald-500">{t("Label")}</span>{" "}
        {t(
          " memberi makna pada anotasi. Lihat label proyek ini atau tambahkan bila perlu.",
        )}
      </p>
      <Info className="mt-4">{t("Label bisa ditambah lagi kapan saja.")}</Info>
      <div className="grid grid-cols-2 gap-y-4 gap-x-14">
        <div className="col-span-2 md:col-span-1">
          <H3>{t("Tambah label")}</H3>
          <small className="text-stone-500">
            {t("Cari label di bawah, lalu klik untuk menambahkannya.")}
          </small>
          <div className="py-2">{TagSearchBar}</div>
          <small className="text-stone-500">
            {t("Buat label baru bila perlu, tapi jangan dobel makna.")}
          </small>
        </div>
        <div className="flex flex-col col-span-2 gap-2 md:col-span-1">
          <H3>{t("Label terpilih")}</H3>
          <p>
            <span className="font-bold text-blue-500">
              {(annotationProject.tags ?? []).length.toLocaleString()}
            </span>{" "}
            {t("label terpilih, bisa dipakai anotator.")}
          </p>
          <small className="text-stone-500">
            {t("Cari label yang sudah dipilih. Klik label untuk melepasnya.")}
          </small>
          <div>
            <TagList
              tags={annotationProject.tags ?? []}
              onClick={onDeleteTag}
              tagColorFn={tagColorFn}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
