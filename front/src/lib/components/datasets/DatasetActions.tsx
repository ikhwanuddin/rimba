import {
  CloseIcon,
  DeleteIcon,
  DownloadIcon,
  WarningIcon,
} from "@/lib/components/icons";
import Alert from "@/lib/components/ui/Alert";
import Button from "@/lib/components/ui/Button";

import { t } from "@/lib/i18n";
import type { Dataset } from "@/lib/types";

export default function DatasetActions({
  dataset,
  onDownloadDataset,
  onDeleteDataset,
}: {
  dataset: Dataset;
  onDownloadDataset?: () => void;
  onDeleteDataset?: () => void;
}) {
  return (
    <div className="flex flex-row gap-2 justify-center">
      {onDownloadDataset != null ? (
        <Button mode="text" variant="primary" onClick={onDownloadDataset}>
          <DownloadIcon className="inline-block mr-2 w-5 h-5" /> {t(" Unduh")}
        </Button>
      ) : null}
      <DeleteDataset dataset={dataset} onDeleteDataset={onDeleteDataset} />
    </div>
  );
}

function DeleteDataset({
  dataset,
  onDeleteDataset,
}: {
  dataset: Dataset;
  onDeleteDataset?: () => void;
}) {
  return (
    <Alert
      title={
        <>
          <WarningIcon className="inline-block mr-2 w-8 h-8 text-red-500" />
          {t("Yakin mau menghapus rekaman ini?")}
        </>
      }
      button={
        <>
          <DeleteIcon className="inline-block mr-2 w-5 h-5" />
          {t("Hapus rekaman")}
        </>
      }
      mode="text"
      variant="danger"
    >
      {({ close }) => {
        return (
          <>
            <div className="flex flex-col gap-2 text-center">
              <h2 className="p-4 font-extrabold text-center">{dataset.name}</h2>
              <p>
                {t(
                  "Tindakan ini tidak bisa dibatalkan. Semua berkas audio di kumpulan ini terhapus permanen, beserta anotasi, catatan, dan label yang terkait.",
                )}
              </p>
              <p className="font-semibold text-red-600 dark:text-red-400">
                {t("Sebaiknya jangan hapus rekaman yang sudah dianotasi.")}
              </p>
              <p>{t("Lanjutkan?")}</p>
            </div>
            <div className="flex flex-row gap-2 justify-end mt-4">
              <Button
                tabIndex={0}
                mode="text"
                variant="danger"
                onClick={onDeleteDataset}
              >
                <DeleteIcon className="inline-block mr-2 w-5 h-5" />
                {t("Hapus")}
              </Button>
              <Button
                tabIndex={1}
                mode="outline"
                variant="primary"
                onClick={close}
              >
                <CloseIcon className="inline-block mr-2 w-5 h-5" />
                {t("Batal")}
              </Button>
            </div>
          </>
        );
      }}
    </Alert>
  );
}
