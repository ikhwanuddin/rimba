import Pagination from "@/app/components/Pagination";
import AnnotationProjectCreate from "@/app/components/annotation_projects/AnnotationProjectCreate";
import AnnotationProjectImport from "@/app/components/annotation_projects/AnnotationProjectImport";

import useAnnotationProjects from "@/app/hooks/api/useAnnotationProjects";
import useIsAdmin from "@/app/hooks/useIsAdmin";

import AnnotationProjectListBase from "@/lib/components/annotation_projects/AnnotationProjectList";
import { DatasetIcon } from "@/lib/components/icons";
import Search from "@/lib/components/inputs/Search";

import type { AnnotationProject } from "@/lib/types";

export default function AnnotationProjectList({
  onCreateAnnotationProject,
  onClickAnnotationProject,
}: {
  onCreateAnnotationProject?: (annotationProject: AnnotationProject) => void;
  onClickAnnotationProject?: (annotationProject: AnnotationProject) => void;
}) {
  const isAdmin = useIsAdmin();
  const { items, pagination, isLoading, filter } = useAnnotationProjects({
    onCreateAnnotationProject,
  });
  return (
    <AnnotationProjectListBase
      annotationProjects={items}
      isLoading={isLoading}
      onClickAnnotationProject={onClickAnnotationProject}
      AnnotationProjectImport={
        isAdmin ? (
          <AnnotationProjectImport
            onImportAnnotationProject={onCreateAnnotationProject}
          />
        ) : null
      }
      AnnotationProjectCreate={
        isAdmin ? (
          <AnnotationProjectCreate
            onCreateAnnotationProject={onCreateAnnotationProject}
          />
        ) : null
      }
      AnnotationProjectSearch={
        <Search
          label="Search"
          placeholder="Search project..."
          value={filter.get("search")}
          onChange={(value) => filter.set("search", value as string)}
          onSubmit={filter.submit}
          icon={<DatasetIcon />}
        />
      }
      Pagination={<Pagination pagination={pagination} />}
    />
  );
}
