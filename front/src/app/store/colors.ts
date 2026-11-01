import { StateCreator } from "zustand";

import type { Tag } from "@/lib/types";
import { type Color, getTagColor, getTagKey } from "@/lib/utils/tags";

export type ColorsSlice = {
  colors: {
    tags: { [key: string]: Color };
  };
  setTagColor: (tag: Tag, color: Color) => void;
  getTagColor: (tag: Tag) => Color;
  clearTagColors: () => void;
};

export const createColorsSlice: StateCreator<ColorsSlice> = (set, get) => ({
  colors: {
    tags: {},
  },
  setTagColor: (tag: Tag, color: Color) => {
    set((state) => ({
      colors: {
        tags: {
          ...state.colors.tags,
          [getTagKey(tag)]: color,
        },
      },
    }));
  },
  // Way Canguk fork: colours come from the tag itself (same for everyone),
  // not from a random pick stored per browser.
  getTagColor: (tag: Tag) => getTagColor(tag),
  clearTagColors: () => {
    set(() => ({
      colors: {
        tags: {},
      },
    }));
  },
});
