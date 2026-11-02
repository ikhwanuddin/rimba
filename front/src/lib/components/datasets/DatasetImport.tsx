import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { useForm } from "react-hook-form";

import { UploadIcon } from "@/lib/components/icons";
import { Group, Input, Submit } from "@/lib/components/inputs/index";

import { t } from "@/lib/i18n";
import { DatasetImportSchema } from "@/lib/schemas";
import type { DatasetImport } from "@/lib/types";

/**
 * Component for importing a dataset.
 *
 * @param onCreate - Callback function triggered when the dataset is
 * successfully imported.
 * @returns JSX element containing a form for importing a dataset.
 */
export default function DatasetImportComponent({
  onImportDataset,
}: {
  onImportDataset?: (dataset: DatasetImport) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DatasetImport>({
    resolver: zodResolver(DatasetImportSchema),
    mode: "onChange",
  });

  const handleOnCreate = useCallback(
    (data: DatasetImport) => {
      onImportDataset?.(data);
    },
    [onImportDataset],
  );

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={handleSubmit(handleOnCreate)}
    >
      <Group
        name="dataset"
        label={t("Pilih berkas rekaman untuk diimpor")}
        help={t("Berkas harus berformat AOEF")}
        error={errors.dataset?.message?.toString()}
      >
        <Input
          type="file"
          {...register("dataset")}
          required
          multiple={false}
          accept="application/json"
        />
      </Group>
      <Group
        name="audio_dir"
        label={t("Folder audio")}
        help={t("Folder tempat semua berkas audio disimpan")}
        error={errors.audio_dir?.message}
      >
        <Input
          {...register("audio_dir")}
          placeholder={t("Path folder audio...")}
          required
        />
      </Group>
      <Submit>
        <UploadIcon className="inline-block mr-2 w-6 h-6 align-middle" />
        {t("Impor")}
      </Submit>
    </form>
  );
}
