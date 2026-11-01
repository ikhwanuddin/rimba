"use client";

import { useRouter } from "next/navigation";
import { useCallback, useContext, useEffect } from "react";

import AnnotationProjectDetail from "@/app/components/annotation_projects/AnnotationProjectDetail";

import useIsAdmin from "@/app/hooks/useIsAdmin";

import AnnotationProjectContext from "../../../contexts/annotationProject";

export default function Page() {
  const annotationProject = useContext(AnnotationProjectContext);
  const router = useRouter();
  const isAdmin = useIsAdmin();

  useEffect(() => {
    if (!isAdmin) {
      router.replace(
        `/annotation_projects/detail/annotation/?annotation_project_uuid=${annotationProject.uuid}`,
      );
    }
  }, [isAdmin, router, annotationProject.uuid]);

  const handleDeleteAnnotationProject = useCallback(
    () => router.push("/annotation_projects"),
    [router],
  );

  if (!isAdmin) return null;

  return (
    <AnnotationProjectDetail
      annotationProject={annotationProject}
      onDeleteAnnotationProject={handleDeleteAnnotationProject}
    />
  );
}
