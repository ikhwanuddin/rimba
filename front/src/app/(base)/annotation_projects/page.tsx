"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";

import AnnotationProjectList from "@/app/components/annotation_projects/AnnotationProjectList";

import useIsAdmin from "@/app/hooks/useIsAdmin";

import Hero from "@/lib/components/ui/Hero";

import type { AnnotationProject } from "@/lib/types";

export default function AnnotationProjects() {
  const router = useRouter();
  const isAdmin = useIsAdmin();

  const handleClickAnnotationProject = useCallback(
    (project: AnnotationProject) => {
      router.push(
        isAdmin
          ? `/annotation_projects/detail/?annotation_project_uuid=${project.uuid}`
          : `/annotation_projects/detail/annotation/?annotation_project_uuid=${project.uuid}`,
      );
    },
    [router, isAdmin],
  );

  return (
    <>
      <Hero text="Proyek anotasi" />
      <AnnotationProjectList
        onClickAnnotationProject={handleClickAnnotationProject}
        onCreateAnnotationProject={handleClickAnnotationProject}
      />
    </>
  );
}
