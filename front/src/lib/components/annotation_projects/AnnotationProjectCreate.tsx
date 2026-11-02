import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { useForm } from "react-hook-form";

import { Group, Input, Submit, TextArea } from "@/lib/components/inputs/index";

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
        label="Nama"
        name="name"
        help="Beri nama proyek anotasi ini."
        error={errors.name?.message}
      >
        <Input {...register("name")} />
      </Group>
      <Group
        label="Deskripsi"
        name="description"
        help="Jelaskan tujuan proyek ini"
        error={errors.description?.message}
      >
        <TextArea rows={6} {...register("description")} />
      </Group>
      <Group
        label="Petunjuk"
        name="annotation_instructions"
        help="Tulis petunjuk untuk anotator."
        error={errors.annotation_instructions?.message}
      >
        <TextArea rows={10} {...register("annotation_instructions")} />
      </Group>
      <Submit>Buat proyek</Submit>
    </form>
  );
}
