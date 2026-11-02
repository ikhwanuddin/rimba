import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { useForm } from "react-hook-form";

import { Group, Input, Submit, TextArea } from "@/lib/components/inputs/index";

import { t } from "@/lib/i18n";
import { DatasetCreateSchema } from "@/lib/schemas";
import type { DatasetCreate } from "@/lib/types";

/**
 * Component for creating a new dataset.
 */
export default function CreateDataset({
  onCreateDataset,
}: {
  onCreateDataset?: (dataset: DatasetCreate) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DatasetCreate>({
    resolver: zodResolver(DatasetCreateSchema),
    mode: "onChange",
  });

  const onSubmit = useCallback(
    (data: DatasetCreate) => {
      onCreateDataset?.(data);
    },
    [onCreateDataset],
  );

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <Group
        name="name"
        label={t("Nama")}
        help={t("Beri nama kumpulan rekaman ini.")}
        error={errors.name?.message}
      >
        <Input {...register("name")} />
      </Group>
      <Group
        name="description"
        label={t("Deskripsi")}
        help={t("Jelaskan isi rekaman ini.")}
        error={errors.description?.message}
      >
        <TextArea {...register("description")} />
      </Group>
      <Group
        name="audio_dir"
        label={t("Folder audio")}
        help={t("Path folder tempat berkas audio disimpan di server.")}
        error={errors.name?.message}
      >
        <Input {...register("audio_dir")} />
      </Group>
      <div className="mb-3">
        <Submit>{t("Daftarkan")}</Submit>
      </div>
    </form>
  );
}
