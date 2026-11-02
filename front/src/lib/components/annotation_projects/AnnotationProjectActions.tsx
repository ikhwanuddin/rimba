import {
  CloseIcon,
  DeleteIcon,
  DownloadIcon,
  WarningIcon,
} from "@/lib/components/icons";
import Alert from "@/lib/components/ui/Alert";
import Button from "@/lib/components/ui/Button";

import { localized, t } from "@/lib/i18n";
import type { AnnotationProject } from "@/lib/types";

export default function ProjectActions({
  annotationProject,
  onDeleteAnnotationProject,
  onDownloadAnnotationProject,
}: {
  annotationProject: AnnotationProject;
  onDeleteAnnotationProject?: () => void;
  onDownloadAnnotationProject?: () => void;
}) {
  return (
    <div className="flex flex-row flex-wrap gap-2 justify-between items-center">
      <Button
        mode="outline"
        variant="primary"
        padding="px-3 py-1.5"
        onClick={onDownloadAnnotationProject}
      >
        <DownloadIcon className="inline-block mr-1 w-4 h-4" /> {t(" Unduh")}
      </Button>
      <DeleteProject
        annotationProject={annotationProject}
        onDelete={onDeleteAnnotationProject}
      />
    </div>
  );
}

function DeleteProject({
  annotationProject,
  onDelete,
}: {
  annotationProject: AnnotationProject;
  onDelete?: () => void;
}) {
  return (
    <Alert
      title={
        <>
          <WarningIcon className="inline-block mr-2 w-8 h-8 text-red-600 dark:text-red-400" />
          {t("Yakin mau menghapus proyek ini?")}
        </>
      }
      button={
        <>
          <DeleteIcon className="inline-block mr-2 w-5 h-5" />
          {t("Hapus proyek")}
        </>
      }
      mode="text"
      variant="danger"
    >
      {({ close }) => {
        return (
          <>
            <h2 className="p-4 font-extrabold text-center">
              {localized(annotationProject.name)}
            </h2>
            <div className="flex flex-col gap-2">
              <p>
                {t(
                  "Tindakan ini tidak bisa dibatalkan. Semua anotasi dan jawaban di proyek ini ikut terhapus.",
                )}
              </p>
              <p>{t("Lanjutkan?")}</p>
            </div>
            <div className="flex flex-row gap-2 justify-end mt-4">
              <Button mode="outline" variant="primary" onClick={close}>
                <CloseIcon className="inline-block mr-2 w-5 h-5" />
                {t("Batal")}
              </Button>
              <Button mode="text" variant="danger" onClick={onDelete}>
                <DeleteIcon className="inline-block mr-2 w-5 h-5" />
                {t("Hapus")}
              </Button>
            </div>
          </>
        );
      }}
    </Alert>
  );
}
