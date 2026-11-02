import FilterBadge, {
  NumberFilterBadge,
} from "@/lib/components/filters/FilterBadge";
import type { FilterDef } from "@/lib/components/filters/FilterMenu";
import {
  BooleanFilter,
  FloatFilter,
  NullableFloatFilter,
  TagFilter,
} from "@/lib/components/filters/Filters";
import {
  ChannelsIcon,
  IssueIcon,
  LatitudeIcon,
  LongitudeIcon,
  SampleRateIcon,
  TagIcon,
  TimeExpansionIcon,
  TimeIcon,
} from "@/lib/components/icons";

import type { RecordingFilter } from "@/lib/types";

// TODO: Create custom filter for integer, date, time, tags and boolean values
const recordingFilterDefs: FilterDef<RecordingFilter>[] = [
  {
    name: "Durasi",
    field: "duration",
    selector: ({ setFilter }) => (
      <FloatFilter
        name="duration"
        onChange={(val) => setFilter("duration", val)}
      />
    ),
    render: ({ value, clear }) => (
      <NumberFilterBadge field="Durasi" value={value} onRemove={clear} />
    ),
    description: "Saring berkas menurut durasi (detik).",
    icon: (
      <TimeIcon className="inline-block mr-1 w-5 h-5 align-middle text-stone-500" />
    ),
  },
  {
    name: "Laju sampel",
    field: "samplerate",
    render: ({ value, clear }) => (
      <NumberFilterBadge field="Laju sampel" value={value} onRemove={clear} />
    ),
    selector: ({ setFilter }) => (
      <FloatFilter onChange={(val) => setFilter("samplerate", val)} />
    ),
    icon: (
      <SampleRateIcon className="inline-block mr-1 w-5 h-5 align-middle text-stone-500" />
    ),
  },
  {
    name: "Kanal",
    field: "channels",
    render: ({ value, clear }) => (
      <NumberFilterBadge field="Kanal" value={value} onRemove={clear} />
    ),
    selector: ({ setFilter }) => (
      <FloatFilter onChange={(val) => setFilter("channels", val)} />
    ),
    icon: (
      <ChannelsIcon className="inline-block mr-1 w-5 h-5 align-middle text-stone-500" />
    ),
  },
  {
    field: "time_expansion",
    name: "Ekspansi waktu",
    render: ({ value, clear }) => (
      <NumberFilterBadge
        field="Ekspansi waktu"
        value={value}
        onRemove={clear}
      />
    ),
    selector: ({ setFilter }) => (
      <FloatFilter onChange={(val) => setFilter("time_expansion", val)} />
    ),
    icon: (
      <TimeExpansionIcon className="inline-block mr-1 w-5 h-5 align-middle text-stone-500" />
    ),
  },
  {
    field: "latitude",
    name: "Lintang",
    render: ({ value, clear }) => (
      <NumberFilterBadge field="Lintang" value={value} onRemove={clear} />
    ),
    selector: ({ setFilter }) => (
      <NullableFloatFilter
        name="latitude"
        onChange={(val) => setFilter("latitude", val)}
      />
    ),
    icon: (
      <LatitudeIcon className="inline-block mr-1 w-5 h-5 align-middle text-stone-500" />
    ),
  },
  {
    field: "longitude",
    name: "Bujur",
    render: ({ value, clear }) => (
      <NumberFilterBadge field="Bujur" value={value} onRemove={clear} />
    ),
    selector: ({ setFilter }) => (
      <NullableFloatFilter
        name="longitude"
        onChange={(val) => setFilter("longitude", val)}
      />
    ),
    icon: (
      <LongitudeIcon className="inline-block mr-1 w-5 h-5 align-middle text-stone-500" />
    ),
  },
  {
    field: "tag",
    name: "Punya label",
    render: ({ value, clear }) => (
      <FilterBadge
        field="Tag"
        value={`${value.key}: ${value.value}`}
        onRemove={clear}
      />
    ),
    selector: ({ setFilter }) => (
      <TagFilter onChange={(tag) => setFilter("tag", tag)} />
    ),
    icon: (
      <TagIcon className="inline-block mr-1 w-5 h-5 align-middle text-stone-500" />
    ),
  },
  {
    field: "has_issues",
    name: "Ada masalah",
    render: ({ value, clear }) => (
      <FilterBadge
        field="Ada masalah"
        value={value ? "Yes" : "No"}
        onRemove={clear}
      />
    ),
    selector: ({ setFilter }) => (
      <BooleanFilter onChange={(val) => setFilter("has_issues", val)} />
    ),
    icon: (
      <IssueIcon className="inline-block mr-1 w-5 h-5 align-middle text-stone-500" />
    ),
  },
];

export default recordingFilterDefs;
