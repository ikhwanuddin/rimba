import { NoIcon } from "@/lib/components/icons";
import Button from "@/lib/components/ui/Button";

export default function NotFound({ onGoHome }: { onGoHome?: () => void }) {
  return (
    <div className="flex flex-col gap-3 justify-center items-center min-h-[70vh]">
      <div className="stroke-stone-400">
        <NoIcon
          className="inline-block stroke-inherit"
          width={96}
          height={96}
        />
      </div>
      <p className="text-2xl font-semibold">Halaman tidak ditemukan</p>
      <p className="text-stone-500">
        Alamat ini tidak ada atau sudah dipindah.
      </p>
      <div>
        <Button onClick={onGoHome}>Kembali ke Beranda</Button>
      </div>
    </div>
  );
}
