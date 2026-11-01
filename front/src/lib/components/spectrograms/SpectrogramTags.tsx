import classNames from "classnames";
import { useMemo } from "react";
import type { ComponentProps, FC, ReactNode } from "react";

import { CloseIcon } from "@/lib/components/icons";

import useElementSize from "@/lib/hooks/utils/useElementSize";

import type {
  Dimensions,
  SoundEventAnnotation,
  SpectrogramWindow,
  Tag as TagType,
} from "@/lib/types";
import { isGeometryInWindow } from "@/lib/utils/geometry";
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
  const { x, y } = getLabelPosition(soundEvent, viewport, dimensions);
  return (
    <div
      className={classNames(
        "h-5 flex flex-col absolute px-2 text-stone-300 hover:z-50 z-40",
      )}
      style={{
        left: x,
        top: y,
      }}
    >
      <div className="flex relative right-0 flex-col gap-1 -ms-2">
        {soundEvent.tags?.map((tag) => (
          <SpectrogramTag
            key={getTagKey(tag)}
            disabled={!enabled}
            tagColorFn={tagColorFn}
            onClick={() => onRemoveTag?.(tag)}
            tag={tag}
          />
        ))}
      </div>
      {enabled && <AddTagButton onSelectTag={onAddTag} {...props} />}
    </div>
  );
}

/* Way Canguk fork: the label of a box is always visible (upstream shows a small
 * dot and the name only on hover), in the same high-contrast colours as other
 * tags. Removing a tag needs a click on the small cross, not on the label. */
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
      className={classNames(
        "flex flex-row gap-1 items-center w-fit px-1.5 py-0.5 rounded-md border text-xs font-semibold whitespace-nowrap shadow",
        cls.background,
        cls.text,
        cls.border,
      )}
    >
      {tag.value}
      {!disabled && (
        <button
          type="button"
          aria-label={`Remove ${tag.value}`}
          className="hover:text-red-600"
          onClick={onClick}
        >
          <CloseIcon className="inline-block w-3 h-3 stroke-2" />
        </button>
      )}
    </span>
  );
}
