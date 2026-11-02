import type {
  Box,
  Color,
  Dimensions,
  SoundEventAnnotation,
  SoundEventPrediction,
  SpectrogramWindow,
  Tag,
  TimeInterval,
  TimeStamp,
} from "@/lib/types";
import {
  bboxIntersection,
  computeGeometryBBox,
  scaleBBoxToViewport,
  scaleTimeToViewport,
} from "@/lib/utils/geometry";

export { Color };

export const COLOR_NAMES = [
  "slate",
  "gray",
  "zinc",
  "neutral",
  "stone",
  "red",
  "orange",
  "amber",
  "yellow",
  "lime",
  "green",
  "emerald",
  "teal",
  "cyan",
  "sky",
  "blue",
  "indigo",
  "violet",
  "purple",
  "fuchsia",
  "pink",
  "rose",
];

export const LEVELS = [1, 2, 3, 4, 5, 6];

export type TagElement = {
  tag: Tag;
  score?: number;
  onClick?: () => void;
};

export type Position = {
  x: number;
  y: number;
  offset: number;
  placement: "left" | "right" | "bottom" | "top";
};

export type TagGroup = {
  annotation: SoundEventAnnotation | SoundEventPrediction;
  tags: TagElement[];
  position: Position;
  active?: boolean;
  disabled?: boolean;
  onAdd?: (tag: Tag) => void;
};

function getTimeIntervalLabelPosition({
  annotation,
  window,
  dimensions,
}: {
  annotation: SoundEventAnnotation | SoundEventPrediction;
  window: SpectrogramWindow;
  dimensions: Dimensions;
}): Position {
  const geometry = annotation.sound_event.geometry as TimeInterval;
  const {
    time: { min: startTime, max: endTime },
  } = window;
  const [start, end] = geometry.coordinates;

  if (end < startTime || start > endTime) {
    throw new Error("Annotation is not in the window");
  }

  const x = scaleTimeToViewport(start, window, dimensions.width);
  const x2 = scaleTimeToViewport(end, window, dimensions.width);

  const randomVal = Number(`0x${annotation.uuid.slice(-8)}`) / 0xffffffff;
  const y = 50 + randomVal * (dimensions.height - 100);

  const tooLeft = x < 50;
  const tooRight = x2 > dimensions.width - 50;

  if (tooLeft && tooRight) {
    return {
      x: x,
      y,
      offset: 5,
      placement: "right",
    };
  }

  if (tooLeft) {
    return {
      x: x2,
      y,
      offset: 5,
      placement: "left",
    };
  }

  if (tooRight) {
    return {
      x: x,
      y,
      offset: 5,
      placement: "left",
    };
  }

  return {
    x: x2,
    y,
    offset: 5,
    placement: "left",
  };
}

function getRandomHeight(height: number, uuid: string): number {
  const randomVal = Number(`0x${uuid.slice(-8)}`) / 0xffffffff;
  return 50 + randomVal * (height - 100);
}

function getTimeStampLabelPosition({
  annotation,
  window,
  dimensions,
}: {
  annotation: SoundEventAnnotation | SoundEventPrediction;
  window: SpectrogramWindow;
  dimensions: Dimensions;
}): Position {
  const geometry = annotation.sound_event.geometry as TimeStamp;
  const {
    time: { min: startTime, max: endTime },
  } = window;
  const time = geometry.coordinates;

  if (time < startTime || time > endTime) {
    throw new Error("Annotation is not in the window");
  }

  const x = scaleTimeToViewport(time, window, dimensions.width);

  // Get random height between 50 and dimensions.height - 50
  const y = getRandomHeight(dimensions.height, annotation.uuid);

  const tooLeft = x < 50;

  if (tooLeft) {
    return {
      x: x + 5,
      y,
      offset: 5,
      placement: "right",
    };
  }

  return {
    x: x - 5,
    y,
    offset: 5,
    placement: "left",
  };
}

export function getLabelPosition(
  annotation: SoundEventAnnotation | SoundEventPrediction,
  window: SpectrogramWindow,
  dimensions: Dimensions,
): Position {
  const { geometry } = annotation.sound_event;

  if (geometry.type === "TimeStamp") {
    return getTimeStampLabelPosition({
      annotation,
      window,
      dimensions,
    });
  }

  if (geometry.type === "TimeInterval") {
    return getTimeIntervalLabelPosition({
      annotation,
      window,
      dimensions,
    });
  }

  const windowBBox: Box = [
    window.time.min,
    window.freq.min,
    window.time.max,
    window.freq.max,
  ];

  const bbox = computeGeometryBBox(geometry);
  const intersection = bboxIntersection(bbox, windowBBox);

  if (intersection === null) {
    throw new Error("Annotation is not in the window");
  }

  const [left, top, right, bottom] = scaleBBoxToViewport(
    dimensions,
    intersection,
    window,
  );

  const tooLeft = left < 50;
  const tooBottom = bottom > dimensions.height - 50;
  const tooRight = right > dimensions.width - 50;
  const tooTop = top < 50;

  switch (true) {
    case tooLeft && tooTop:
      return {
        x: right,
        y: bottom,
        offset: 5,
        placement: "right",
      };

    case tooLeft && tooBottom:
      return {
        x: right,
        y: top,
        offset: 5,
        placement: "right",
      };

    case tooRight && tooTop:
      return {
        x: left,
        y: bottom,
        offset: 5,
        placement: "left",
      };

    case tooRight && tooBottom:
      return {
        x: left,
        y: top,
        offset: 5,
        placement: "left",
      };

    case tooLeft:
      return {
        x: right,
        y: top,
        offset: 5,
        placement: "right",
      };

    case tooRight:
      return {
        x: left,
        y: top,
        offset: 5,
        placement: "left",
      };

    case tooTop:
      return {
        x: left,
        y: bottom,
        offset: 5,
        placement: "bottom",
      };

    case tooBottom:
      return {
        x: right,
        y: top,
        offset: 5,
        placement: "right",
      };

    default:
      return {
        x: right,
        y: top,
        offset: 5,
        placement: "right",
      };
  }
}

export function getTagKey(tag: Tag): string {
  return `${tag.key}-${tag.value}`;
}

/* RIMBA: fixed, high-contrast tag palette.
 * Each tag gets a colour from a hash of its key and value, so a species has the
 * same colour in every browser and for every annotator. Text is the 900 shade on
 * the 100 shade (contrast at least 7:1, WCAG AAA). Class names are written out in
 * full so that Tailwind keeps them in the build. */
const TAG_PALETTE: Record<
  string,
  { background: string; border: string; text: string }
> = {
  red: {
    background: "bg-red-100 dark:bg-red-900",
    border: "border-red-500 dark:border-red-400",
    text: "text-red-900 dark:text-red-100",
  },
  orange: {
    background: "bg-orange-100 dark:bg-orange-900",
    border: "border-orange-500 dark:border-orange-400",
    text: "text-orange-900 dark:text-orange-100",
  },
  amber: {
    background: "bg-amber-100 dark:bg-amber-900",
    border: "border-amber-500 dark:border-amber-400",
    text: "text-amber-900 dark:text-amber-100",
  },
  lime: {
    background: "bg-lime-100 dark:bg-lime-900",
    border: "border-lime-600 dark:border-lime-400",
    text: "text-lime-900 dark:text-lime-100",
  },
  teal: {
    background: "bg-teal-100 dark:bg-teal-900",
    border: "border-teal-500 dark:border-teal-400",
    text: "text-teal-900 dark:text-teal-100",
  },
  cyan: {
    background: "bg-cyan-100 dark:bg-cyan-900",
    border: "border-cyan-500 dark:border-cyan-400",
    text: "text-cyan-900 dark:text-cyan-100",
  },
  sky: {
    background: "bg-sky-100 dark:bg-sky-900",
    border: "border-sky-500 dark:border-sky-400",
    text: "text-sky-900 dark:text-sky-100",
  },
  blue: {
    background: "bg-blue-100 dark:bg-blue-900",
    border: "border-blue-500 dark:border-blue-400",
    text: "text-blue-900 dark:text-blue-100",
  },
  indigo: {
    background: "bg-indigo-100 dark:bg-indigo-900",
    border: "border-indigo-500 dark:border-indigo-400",
    text: "text-indigo-900 dark:text-indigo-100",
  },
  violet: {
    background: "bg-violet-100 dark:bg-violet-900",
    border: "border-violet-500 dark:border-violet-400",
    text: "text-violet-900 dark:text-violet-100",
  },
  fuchsia: {
    background: "bg-fuchsia-100 dark:bg-fuchsia-900",
    border: "border-fuchsia-500 dark:border-fuchsia-400",
    text: "text-fuchsia-900 dark:text-fuchsia-100",
  },
  rose: {
    background: "bg-rose-100 dark:bg-rose-900",
    border: "border-rose-500 dark:border-rose-400",
    text: "text-rose-900 dark:text-rose-100",
  },
  stone: {
    background: "bg-stone-200 dark:bg-stone-700",
    border: "border-stone-500 dark:border-stone-400",
    text: "text-stone-900 dark:text-stone-50",
  },
};
const HUES = Object.keys(TAG_PALETTE).filter((c) => c !== "stone");
/* Answers that are not a species keep a neutral colour. */
const NEUTRAL_VALUES = new Set(["tidak dikenal", "bukan burung"]);

function hashString(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  // final mixing so that similar names still spread over the palette
  h ^= h >>> 16;
  h = Math.imul(h, 0x85ebca6b);
  h ^= h >>> 13;
  h = Math.imul(h, 0xc2b2ae35);
  h ^= h >>> 16;
  return h >>> 0;
}

export function getRandomColor(): Color {
  return { color: HUES[Math.floor(Math.random() * HUES.length)], level: 1 };
}

export function getTagColor(tag: Tag): Color {
  if (NEUTRAL_VALUES.has(tag.value.trim().toLowerCase())) {
    return { color: "stone", level: 1 };
  }
  return { color: HUES[hashString(getTagKey(tag)) % HUES.length], level: 1 };
}

export function getTagClassNames(color: string, _level: number) {
  return TAG_PALETTE[color] ?? TAG_PALETTE.stone;
}
