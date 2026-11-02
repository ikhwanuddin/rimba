import AnnotationProjectComponent from "@/lib/components/annotation_projects/AnnotationProject";
import { AddIcon, UploadIcon, WarningIcon } from "@/lib/components/icons";
import ListLayout from "@/lib/components/layouts/List";
import Dialog from "@/lib/components/ui/Dialog";
import Empty from "@/lib/components/ui/Empty";

import { t } from "@/lib/i18n";
import type { AnnotationProject } from "@/lib/types";

export default function AnnotationProjectList({
  annotationProjects,
  isLoading = false,
  AnnotationProjectSearch,
  AnnotationProjectCreate,
  AnnotationProjectImport,
  Pagination,
  onClickAnnotationProject,
}: {
  annotationProjects: AnnotationProject[];
  isLoading?: boolean;
  onClickAnnotationProject?: (annotationProject: AnnotationProject) => void;
  AnnotationProjectSearch: JSX.Element;
  AnnotationProjectCreate?: JSX.Element | null;
  AnnotationProjectImport?: JSX.Element | null;
  Pagination: JSX.Element;
}) {
  return (
    <ListLayout
      isLoading={isLoading}
      isEmpty={annotationProjects.length === 0}
      Search={AnnotationProjectSearch}
      Empty={<NoProjects />}
      Actions={[
        AnnotationProjectCreate != null && (
          <Dialog
            key="create"
            mode="text"
            title={t("Buat proyek anotasi")}
            width="w-96"
            label={
              <>
                <AddIcon className="inline-block w-4 h-4 align-middle" />{" "}
                {t(" Buat baru")}
              </>
            }
          >
            {() => AnnotationProjectCreate}
          </Dialog>
        ),
        AnnotationProjectImport != null && (
          <Dialog
            key="import"
            mode="text"
            title={t("Impor proyek anotasi")}
            label={
              <>
                <UploadIcon className="inline-block w-4 h-4 align-middle" />{" "}
                {t("Impor")}
              </>
            }
          >
            {() => AnnotationProjectImport}
          </Dialog>
        ),
      ].filter((a): a is JSX.Element => Boolean(a))}
      Pagination={Pagination}
      items={annotationProjects.map((item) => (
        <AnnotationProjectComponent
          key={item.uuid}
          annotationProject={item}
          onClickAnnotationProject={() => onClickAnnotationProject?.(item)}
        />
      ))}
    />
  );
}

function NoProjects() {
  return (
    <Empty>
      <WarningIcon className="w-16 h-16 text-stone-500" />
      <p>{t("Belum ada proyek anotasi.")}</p>
      <p>
        {t("Untuk membuat proyek baru, klik tombol")}
        <span className="text-emerald-500">
          <AddIcon className="inline-block mr-1 ml-2 w-4 h-4" />
          Create{" "}
        </span>{" "}
        button above.
      </p>
    </Empty>
  );
}
