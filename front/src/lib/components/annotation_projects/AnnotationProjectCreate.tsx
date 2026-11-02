import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { useForm } from "react-hook-form";

import { Group, Input, Submit, TextArea } from "@/lib/components/inputs/index";

import { t } from "@/lib/i18n";
import { AnnotationProjectCreateSchema } from "@/lib/schemas";
import type { AnnotationProject, AnnotationProjectCreate } from "@/lib/types";

export default function CreateProject({
  onCreateAnnotationProject,
}: {
  onCreateAnnotationProject?: (project: AnnotationProjectCreate) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AnnotationProject>({
    resolver: zodResolver(AnnotationProjectCreateSchema),
    mode: "onChange",
  });

  const onSubmit = useCallback(
    (data: AnnotationProjectCreate) => onCreateAnnotationProject?.(data),
    [onCreateAnnotationProject],
  );

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <Group
        label={t("Nama")}
        name="name"
        help={t("Beri nama proyek anotasi ini.")}
        error={errors.name?.message}
      >
        <Input {...register("name")} />
      </Group>
      <Group
        label={t("Deskripsi")}
        name="description"
        help={t("Jelaskan tujuan proyek ini")}
        error={errors.description?.message}
      >
        <TextArea rows={6} {...register("description")} />
      </Group>
      <Group
        label={t("Petunjuk")}
        name="annotation_instructions"
        help={t("Tulis petunjuk untuk anotator.")}
        error={errors.annotation_instructions?.message}
      >
        <TextArea rows={10} {...register("annotation_instructions")} />
      </Group>
      <Submit>{t("Buat proyek")}</Submit>
    </form>
  );
}
