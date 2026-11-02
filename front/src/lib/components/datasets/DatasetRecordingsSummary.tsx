import { ComponentProps } from "react";

import DatasetExport from "@/lib/components/datasets/DatasetExport";
import { DownloadIcon, RecordingsIcon } from "@/lib/components/icons";
import SecondaryNavBar from "@/lib/components/navigation/SecondaryNavBar";
import Dialog from "@/lib/components/ui/Dialog";

import { t } from "@/lib/i18n";
import type { Dataset } from "@/lib/types";

export default function DatasetRecordingSummary({
  dataset,
  ...props
}: { dataset: Dataset } & ComponentProps<typeof DatasetExport>) {
  return (
    <SecondaryNavBar
      title={t("Berkas audio")}
      icon={
        <>
          <RecordingsIcon className="inline-block mr-1 w-5 h-5 align-middle text-stone-500" />
          <span className="mr-1 font-semibold text-stone-500">
            {dataset?.recording_count}
          </span>
        </>
      }
      buttons={[
        <Dialog
          key="export"
          title={t("Ekspor metadata berkas")}
          mode="text"
          variant="secondary"
          label={
            <>
              <DownloadIcon className="inline-block mr-1 w-5 h-5 text-emerald-500 align-middle" />
              {t("ekspor")}
            </>
          }
        >
          {() => <DatasetExport {...props} />}
        </Dialog>,
      ]}
    />
  );
}
