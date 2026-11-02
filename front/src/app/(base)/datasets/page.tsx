"use client";

/**
 * Page module for displaying the list of datasets.
 *
 * This page includes a hero section with the title "Datasets" and a list of
 * datasets using the `DatasetList` component.
 *
 * @module pages/datasets
 * @see components/datasets/DatasetList
 */
import { useRouter } from "next/navigation";
import { useCallback } from "react";

import DatasetList from "@/app/components/datasets/DatasetList";

import Hero from "@/lib/components/ui/Hero";

import { t } from "@/lib/i18n";
import type { Dataset } from "@/lib/types";

export default function Page() {
  const router = useRouter();

  const goToDatasetDetail = useCallback(
    (dataset: Dataset) => {
      router.push(`/datasets/detail/?dataset_uuid=${dataset.uuid}`);
    },
    [router],
  );

  return (
    <>
      <Hero
        text={t("Rekaman audio")}
        note={t(
          "File audio yang terdaftar di server, dikelompokkan per kumpulan. Bahan untuk membuat proyek anotasi; belum berisi pekerjaan atau jawaban.",
        )}
      />
      <DatasetList
        onCreateDataset={goToDatasetDetail}
        onClickDataset={goToDatasetDetail}
      />
    </>
  );
}
