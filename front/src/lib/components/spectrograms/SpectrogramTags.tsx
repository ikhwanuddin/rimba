import classNames from "classnames";
import { useMemo } from "react";
import type { CSSProperties, ComponentProps, FC, ReactNode } from "react";

import { CloseIcon } from "@/lib/components/icons";

import useElementSize from "@/lib/hooks/utils/useElementSize";

import { t } from "@/lib/i18n";
import type {
  Dimensions,
  SoundEventAnnotation,
  SpectrogramWindow,
  Tag as TagType,
} from "@/lib/types";
import {
  bboxIntersection,
  computeGeometryBBox,
  isGeometryInWindow,
  scaleBBoxToViewport,
} from "@/lib/utils/geometry";
import { getLabelPosition, getTagKey } from "@/lib/utils/tags";
import {
  type Color,
  type TagElement,
  getTagClassNames,
  getTagColor,
} from "@/lib/utils/tags";

import AddTagButton from "../tags/AddTagButton";

export default function SpectrogramTags({
  children,
  soundEvents,
  viewport,
  SoundEventTags = SoundEventSpectrogramTagsBase,
  ...props
}: {
  children: ReactNode;
  viewport: SpectrogramWindow;
  soundEvents: SoundEventAnnotation[];
  SoundEventTags?: FC<SoundEventSpectrogramTagsProps>;
} & Omit<SoundEventSpectrogramTagsProps, "soundEvent" | "dimensions">) {
  const { size: dimensions, ref } = useElementSize<HTMLDivElement>();

  const soundEventsInWindow = useMemo(() => {
    return soundEvents.filter((soundEvent) => {
      return isGeometryInWindow(soundEvent.sound_event.geometry, viewport);
    });
  }, [soundEvents, viewport]);

  return (
    <div className="relative w-full h-full rounded" ref={ref}>
      {children}
      {soundEventsInWindow.map((soundEvent) => (
        <SoundEventTags
          key={soundEvent.uuid}
          viewport={viewport}
          soundEvent={soundEvent}
          dimensions={dimensions}
          {...props}
        />
      ))}
    </div>
  );
}

export type SoundEventSpectrogramTagsProps = {
  soundEvent: SoundEventAnnotation;
  viewport: SpectrogramWindow;
  dimensions: Dimensions;
  enabled?: boolean;
  onAddTag?: (tag: TagType) => void;
  onRemoveTag?: (tag: TagType) => void;
};

/* RIMBA: where a box label sits, in pixels. Labels go just inside the top-left
 * corner of a box (top-right when a narrow box is near the right edge), so they
 * never leave the spectrogram or cover the bar below it. Other geometries keep
 * the upstream position. */
function labelStyle(
  soundEvent: SoundEventAnnotation,
  viewport: SpectrogramWindow,
  dimensions: Dimensions,
): CSSProperties {
  const { geometry } = soundEvent.sound_event;
  if (geometry.type === "TimeStamp" || geometry.type === "TimeInterval") {
    const { x, y } = getLabelPosition(soundEvent, viewport, dimensions);
    return { left: x, top: y };
  }
  const windowBox: [number, number, number, number] = [
    viewport.time.min,
    viewport.freq.min,
    viewport.time.max,
    viewport.freq.max,
  ];
  const box = bboxIntersection(computeGeometryBBox(geometry), windowBox);
  if (box == null) return { display: "none" };
  const [left, top, right] = scaleBBoxToViewport(dimensions, box, viewport);
  const y = Math.max(top, 0) + 4;
  if (left > dimensions.width - 160 && right - left < 160) {
    return { right: Math.max(dimensions.width - right, 0) + 4, top: y };
  }
  return { left: Math.max(left, 0) + 4, top: y };
}

export function SoundEventSpectrogramTagsBase({
  soundEvent,
  viewport,
  dimensions,
  enabled = true,
  tagColorFn = getTagColor,
  onRemoveTag,
  onAddTag,
  ...props
}: SoundEventSpectrogramTagsProps & {
  tagColorFn?: (tag: TagType) => Color;
} & Omit<ComponentProps<typeof AddTagButton>, "onSelectTag">) {
  return (
    <div
      className="flex absolute z-40 flex-row flex-wrap gap-1 items-center hover:z-50"
      style={labelStyle(soundEvent, viewport, dimensions)}
    >
      {soundEvent.tags?.map((tag) => (
        <SpectrogramTag
          key={getTagKey(tag)}
          disabled={!enabled}
          tagColorFn={tagColorFn}
          onClick={() => onRemoveTag?.(tag)}
          tag={tag}
        />
      ))}
      {enabled && (
        <span
          title={t("Tambah label")}
          className="rounded-md border shadow bg-white/95 border-stone-300 [&_button]:px-1 [&_button]:!text-stone-700 [&_button]:!stroke-stone-700"
        >
          <AddTagButton text="" onSelectTag={onAddTag} {...props} />
        </span>
      )}
    </div>
  );
}

/* RIMBA: the label of a box is always visible (upstream shows a small dot and
 * the name only on hover). The spectrogram is dark in both themes, so the label
 * is a light chip with dark text and a dot in the label colour. Removing a tag
 * needs a click on the small cross, not on the label. */
export function SpectrogramTag({
  tag,
  onClick,
  tagColorFn = getTagColor,
  disabled = false,
}: TagElement & { disabled?: boolean; tagColorFn: (tag: TagType) => Color }) {
  const color = tagColorFn(tag);
  const cls = getTagClassNames(color.color, color.level);
  return (
    <span
      title={`${tag.key}: ${tag.value}`}
      className="flex flex-row gap-1.5 items-center py-0.5 px-1.5 text-xs font-semibold whitespace-nowrap rounded-md border shadow w-fit bg-white/95 border-stone-300 text-stone-900"
    >
      <span
        className={classNames(
          "w-2.5 h-2.5 rounded-full border-[3px]",
          cls.border,
        )}
      />
      {tag.value}
      {!disabled && (
        <button
          type="button"
          aria-label={`Remove ${tag.value}`}
          className="text-stone-500 hover:text-red-600"
          onClick={onClick}
        >
          <CloseIcon className="inline-block w-3 h-3 stroke-2" />
        </button>
      )}
    </span>
  );
}
