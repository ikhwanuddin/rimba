import type { ReactNode } from "react";

import useAnnotationProject from "@/app/hooks/api/useAnnotationProject";

import AnnotationProjectUpdateBase from "@/lib/components/annotation_projects/AnnotationProjectUpdate";

import type { AnnotationProject } from "@/lib/types";

export default function AnnotationProjectUpdate({
  annotationProject,
  actions,
}: {
  annotationProject: AnnotationProject;
  actions?: ReactNode;
}) {
  const { data, update, isLoading } = useAnnotationProject({
    uuid: annotationProject.uuid,
    annotationProject: annotationProject,
  });

  return (
    <AnnotationProjectUpdateBase
      annotationProject={data || annotationProject}
      isLoading={isLoading}
      onChangeAnnotationProject={update.mutate}
      actions={actions}
    />
  );
}
