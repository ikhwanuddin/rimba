import {
  ChannelsIcon,
  SampleRateIcon,
  TimeExpansionIcon,
  TimeIcon,
} from "@/lib/components/icons";
import Card from "@/lib/components/ui/Card";

import { t } from "@/lib/i18n";
import type { Recording } from "@/lib/types";

function Label({ label }: { label: string }) {
  return (
    <div className="mr-2 text-sm font-thin text-stone-500 dark:text-stone-400">
      {label}
    </div>
  );
}

function Units({ units }: { units: string }) {
  return (
    <span className="ml-1 text-stone-500 dark:text-stone-400">{units}</span>
  );
}

export default function RecordingMediaInfo({
  recording,
}: {
  recording: Recording;
}) {
  return (
    <Card>
      <div className="inline-flex items-center">
        <TimeIcon className="inline-block mr-1 w-5 h-5 text-stone-500 dark:text-stone-400" />
        <Label label={t("Durasi")} />
        {recording.duration.toFixed(3)}
        <Units units="s" />
      </div>
      <div className="inline-flex items-center">
        <ChannelsIcon className="inline-block mr-1 w-5 h-5 text-stone-500 dark:text-stone-400" />
        <Label label={t("Kanal")} />
        {recording.channels}
      </div>
      <div className="inline-flex items-center">
        <SampleRateIcon className="inline-block mr-1 w-5 h-5 text-stone-500 dark:text-stone-400" />
        <Label label={t("Laju sampel")} />
        {recording.samplerate.toLocaleString()}
        <Units units="Hz" />
      </div>
      <div className="inline-flex items-center">
        <TimeExpansionIcon className="inline-block mr-1 w-5 h-5 text-stone-500 dark:text-stone-400" />
        <Label label={t("Ekspansi waktu")} />
        {recording.time_expansion}
      </div>
    </Card>
  );
}
