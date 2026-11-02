"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useContext } from "react";

import AnnotateTasks from "@/app/components/annotation/AnnotationTasks";
import AnnotatorView from "@/app/components/annotation/AnnotatorView";

import useAnnotationTask from "@/app/hooks/api/useAnnotationTask";
import useIsAdmin from "@/app/hooks/useIsAdmin";

import Loading from "@/lib/components/ui/Loading";

import type { AnnotationTask } from "@/lib/types";

import AnnotationProjectContext from "../../../../contexts/annotationProject";

export default function Page() {
  const project = useContext(AnnotationProjectContext);
  const isAdmin = useIsAdmin();
  const router = useRouter();
  const pathname = usePathname();

  const searchParams = useSearchParams();
  const taskUUID = searchParams.get("annotation_task_uuid");

  const { data: task, isLoading } = useAnnotationTask({
    uuid: taskUUID ?? "",
    enabled: taskUUID != null,
  });

  const handleChangeTask = useCallback(
    (task: AnnotationTask) => {
      const params = new URLSearchParams(searchParams);
      params.set("annotation_task_uuid", task.uuid);
      router.replace(`${pathname}?${params}`);
    },
    [router, pathname, searchParams],
  );

  // RIMBA: annotators work from the shared clip queue.
  if (!isAdmin) {
    return <AnnotatorView annotationProject={project} />;
  }

  if (isLoading && taskUUID != null) {
    return <Loading />;
  }

  return (
    <AnnotateTasks
      annotationProject={project}
      annotationTask={task}
      onChangeTask={handleChangeTask}
    />
  );
}
