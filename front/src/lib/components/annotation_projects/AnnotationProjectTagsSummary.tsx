import { type ComponentProps, useMemo, useState } from "react";

import {
  AddIcon,
  AscendingIcon,
  DescendingIcon,
  TagsIcon,
} from "@/lib/components/icons";
import Search from "@/lib/components/inputs/Search";
import TagComponent from "@/lib/components/tags/Tag";
import Button from "@/lib/components/ui/Button";
import Card from "@/lib/components/ui/Card";
import Empty from "@/lib/components/ui/Empty";
import { H4 } from "@/lib/components/ui/Headings";
import Help from "@/lib/components/ui/Help";
import Loading from "@/lib/components/ui/Loading";

import useListWithSearch from "@/lib/hooks/lists/useListWithSearch";

import { t } from "@/lib/i18n";
import type * as types from "@/lib/types";
import { Color, getTagColor, getTagKey } from "@/lib/utils/tags";

const _emptyList: types.TagCount[] = [];

export default function ProjectTagsSummary({
  annotationProject,
  isLoading = false,
  clipTags = _emptyList,
  soundEventTags = _emptyList,
  onAddTags,
  ...props
}: {
  annotationProject: types.AnnotationProject;
  isLoading?: boolean;
  clipTags?: types.TagCount[];
  soundEventTags?: types.TagCount[];
  onAddTags?: () => void;
} & Omit<ComponentProps<typeof TagCounts>, "counts">) {
  const projectTags = useMemo(
    () => annotationProject.tags || [],
    [annotationProject.tags],
  );

  const counts = useMemo(
    () => getTagCount({ projectTags, clipTags, soundEventTags }),
    [clipTags, soundEventTags, projectTags],
  );

  return (
    <Card>
      <div className="flex flex-row gap-2 justify-between items-center">
        <H4 className="inline-flex gap-2 items-center">
          <TagsIcon className="inline-block w-5 h-5" />
          {t("Label proyek")}
          <span className="py-0.5 px-2 text-xs font-medium rounded-full bg-stone-100 text-stone-600 dark:bg-stone-700 dark:text-stone-300">
            {projectTags.length}
          </span>
          <Help>
            {t(
              'Label yang dipakai di proyek ini. "Klip" = jumlah klip berlabel itu, "Kotak" = jumlah kotak berlabel itu.',
            )}
          </Help>
        </H4>
        <Button
          mode="outline"
          variant="primary"
          padding="px-3 py-1.5"
          onClick={onAddTags}
        >
          <AddIcon className="inline-block mr-1 w-4 h-4" /> {t(" Tambah label")}
        </Button>
      </div>
      {isLoading ? (
        <Loading />
      ) : projectTags.length === 0 ? (
        <NoTags />
      ) : (
        <TagCounts counts={counts} {...props} />
      )}
    </Card>
  );
}

function NoTags() {
  return <Empty>{t("Belum ada label di proyek ini.")}</Empty>;
}

function TagCounts({
  counts,
  sortBy: initialSortBy = "clip",
  showMax: initialShowMax = 10,
  onClickTag,
  tagColorFn = getTagColor,
}: {
  counts: { tag: types.Tag; clipCount: number; soundEventCount: number }[];
  sortBy?: "clip" | "soundEvent" | "-clip" | "-soundEvent" | "tag" | "-tag";
  showMax?: number;
  onClickTag?: (tag: types.Tag) => void;
  tagColorFn?: (tag: types.Tag) => Color;
}) {
  const [sortBy, setSortBy] = useState(initialSortBy);

  const sortFn: (a: TagRow, b: TagRow) => number = useMemo(() => {
    switch (sortBy) {
      case "clip":
        return (a, b) => (a.clipCount < b.clipCount ? 1 : -1);
      case "soundEvent":
        return (a, b) => (a.soundEventCount < b.soundEventCount ? 1 : -1);
      case "-clip":
        return (a, b) => (a.clipCount > b.clipCount ? 1 : -1);
      case "-soundEvent":
        return (a, b) => (a.soundEventCount > b.soundEventCount ? 1 : -1);
      case "tag":
        return (a, b) => (a.tag.value < b.tag.value ? 1 : -1);
      case "-tag":
        return (a, b) => (a.tag.value > b.tag.value ? 1 : -1);
      default:
        return (a, b) => (a.tag.value > b.tag.value ? 1 : -1);
    }
  }, [sortBy]);

  const sortedCount = useMemo(() => counts.sort(sortFn), [counts, sortFn]);
  const { items, setSearch, setLimit, limit } = useListWithSearch<{
    tag: types.Tag;
    clipCount: number;
    soundEventCount: number;
  }>({
    options: sortedCount,
    fields: ["tag.key", "tag.value"],
    limit: initialShowMax,
    shouldSort: false,
    threshold: 0.3,
  });

  if (counts.length === 0) {
    return <NoAnnotationTags />;
  }

  return (
    <div className="flex flex-col gap-3 w-full">
      {counts.length > 8 && (
        <Search
          placeholder={t("Cari label")}
          onChange={(value) => setSearch(value as string)}
        />
      )}
      <TagTable
        items={items}
        sortBy={sortBy}
        onClickTag={onClickTag}
        tagColorFn={tagColorFn}
        onSortByTag={() =>
          setSortBy((sortBy) => (sortBy === "tag" ? "-tag" : "tag"))
        }
        onSortByClip={() =>
          setSortBy((sortBy) => (sortBy === "clip" ? "-clip" : "clip"))
        }
        onSortBySoundEvent={() =>
          setSortBy((sortBy) =>
            sortBy === "soundEvent" ? "-soundEvent" : "soundEvent",
          )
        }
      />
      {counts.length > limit && (
        <Button
          mode="text"
          variant="primary"
          padding="py-1"
          onClick={() => setLimit(counts.length)}
        >
          {t("Tampilkan semua ({n})", { n: counts.length })}
        </Button>
      )}
    </div>
  );
}

function NoAnnotationTags() {
  return (
    <div className="text-stone-500">
      {t("Belum ada label pada anotasi di proyek ini.")}
    </div>
  );
}

type TagRow = {
  tag: types.Tag;
  clipCount: number;
  soundEventCount: number;
};

function getTagCount({
  projectTags,
  clipTags,
  soundEventTags,
}: {
  projectTags: types.Tag[];
  clipTags: types.TagCount[];
  soundEventTags: types.TagCount[];
}): TagRow[] {
  const mapping: Map<string, TagRow> = new Map();

  for (const projectTag of projectTags) {
    const key = getTagKey(projectTag);

    if (!mapping.has(key)) {
      mapping.set(key, {
        tag: projectTag,
        clipCount: 0,
        soundEventCount: 0,
      });
    }
  }

  for (const clipTag of clipTags) {
    const key = getTagKey(clipTag.tag);

    let prev = mapping.get(key);

    if (prev === undefined) {
      prev = {
        tag: clipTag.tag,
        clipCount: 0,
        soundEventCount: 0,
      };

      mapping.set(key, prev);
    }

    prev.clipCount += clipTag.count;
  }

  for (const soundEventTag of soundEventTags) {
    const key = getTagKey(soundEventTag.tag);

    let prev = mapping.get(key);

    if (prev === undefined) {
      prev = {
        tag: soundEventTag.tag,
        clipCount: 0,
        soundEventCount: 0,
      };

      mapping.set(key, prev);
    }

    prev.soundEventCount += soundEventTag.count;
  }

  return Array.from(mapping.values());
}

function TagTable({
  items,
  sortBy,
  onSortByTag,
  onSortBySoundEvent,
  onSortByClip,
  onClickTag,
  tagColorFn = getTagColor,
}: {
  items: TagRow[];
  sortBy: "clip" | "soundEvent" | "-clip" | "-soundEvent" | "tag" | "-tag";
  onSortByTag?: () => void;
  onSortByClip?: () => void;
  onSortBySoundEvent?: () => void;
  onClickTag?: (tag: types.Tag) => void;
  tagColorFn?: (tag: types.Tag) => Color;
}) {
  // RIMBA: a grid table; long label names wrap instead of pushing the counts out.
  const sortIcon = (key: string) =>
    sortBy === key ? (
      <DescendingIcon className="inline-block w-4 h-4" />
    ) : sortBy === "-" + key ? (
      <AscendingIcon className="inline-block w-4 h-4" />
    ) : null;
  const head =
    "inline-flex gap-1 items-center text-xs font-medium uppercase tracking-wide text-stone-500 hover:text-stone-800 dark:hover:text-stone-200";
  return (
    <div className="flex flex-col w-full text-sm">
      <div className="grid grid-cols-[minmax(0,1fr)_3.5rem_3.5rem] gap-2 pb-2 border-b border-stone-200 dark:border-stone-700">
        <button type="button" className={head} onClick={onSortByTag}>
          {t("Label")}
          {sortIcon("tag")}
        </button>
        <button
          type="button"
          className={head + " justify-end"}
          onClick={onSortByClip}
        >
          {sortIcon("clip")}
          {t("Klip")}
        </button>
        <button
          type="button"
          className={head + " justify-end"}
          onClick={onSortBySoundEvent}
        >
          {sortIcon("soundEvent")}
          {t("Kotak")}
        </button>
      </div>
      {items.map(({ tag, clipCount, soundEventCount }) => (
        <div
          key={getTagKey(tag)}
          className="grid grid-cols-[minmax(0,1fr)_3.5rem_3.5rem] gap-2 items-center py-2 border-b border-stone-100 last:border-b-0 dark:border-stone-700/50"
        >
          <div className="min-w-0">
            <TagComponent
              tag={tag}
              wrapText
              onClick={() => onClickTag?.(tag)}
              {...tagColorFn(tag)}
            />
          </div>
          <span className="text-right tabular-nums text-stone-700 dark:text-stone-300">
            {clipCount}
          </span>
          <span className="text-right tabular-nums text-stone-700 dark:text-stone-300">
            {soundEventCount}
          </span>
        </div>
      ))}
    </div>
  );
}
