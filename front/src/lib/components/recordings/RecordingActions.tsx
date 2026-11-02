import {
  CloseIcon,
  DeleteIcon,
  DownloadIcon,
  WarningIcon,
} from "@/lib/components/icons";
import Alert from "@/lib/components/ui/Alert";
import Button from "@/lib/components/ui/Button";
import Link from "@/lib/components/ui/Link";

export default function RecordingActions({
  onDeleteRecording,
  onDownloadRecording,
}: {
  downloadURL?: string;
  onDeleteRecording?: () => void;
  onDownloadRecording?: () => void;
}) {
  return (
    <div className="flex flex-row gap-2 justify-center">
      <Button mode="text" variant="primary" onClick={onDownloadRecording}>
        <DownloadIcon className="inline-block mr-2 w-5 h-5" />
        Unduh
      </Button>
      <DeleteRecording onDelete={onDeleteRecording} />
    </div>
  );
}

function DeleteRecording({ onDelete }: { onDelete?: () => void }) {
  return (
    <Alert
      title={
        <>
          <WarningIcon className="inline-block mr-2 w-8 h-8 text-red-500" />
          Yakin mau menghapus berkas ini?
        </>
      }
      button={
        <>
          <DeleteIcon className="inline-block mr-2 w-5 h-5" />
          Hapus berkas
        </>
      }
      mode="text"
      variant="danger"
    >
      {({ close }) => {
        return (
          <>
            <div className="flex flex-col gap-2">
              <p>
                Tindakan ini tidak bisa dibatalkan. Berkas terhapus permanen
                dari basis data beserta metadata, anotasi, catatan, dan
                labelnya.
              </p>
              <p className="font-semibold text-red-600 dark:text-red-400">
                Sebaiknya jangan hapus berkas yang sudah dianotasi.
              </p>
              <p>Lanjutkan?</p>
            </div>
            <div className="flex flex-row gap-2 justify-end mt-4">
              <Button
                tabIndex={0}
                mode="text"
                variant="danger"
                onClick={onDelete}
              >
                <DeleteIcon className="inline-block mr-2 w-5 h-5" />
                Hapus
              </Button>
              <Button
                tabIndex={1}
                mode="outline"
                variant="primary"
                onClick={close}
              >
                <CloseIcon className="inline-block mr-2 w-5 h-5" />
                Batal
              </Button>
            </div>
          </>
        );
      }}
    </Alert>
  );
}
