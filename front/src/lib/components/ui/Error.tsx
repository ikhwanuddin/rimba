import { WarningIcon } from "@/lib/components/icons";
import Button from "@/lib/components/ui/Button";
import { H2 } from "@/lib/components/ui/Headings";

export default function Error({
  error,
  onReset,
  onGoHome,
}: {
  error?: Error & { digest?: string };
  onReset?: () => void;
  onGoHome?: () => void;
}) {
  return (
    <div className="flex flex-row justify-center items-center w-full min-h-[70vh]">
      <div className="flex flex-col gap-2 items-center">
        <WarningIcon className="w-20 h-20 text-amber-500" />
        <H2 className="font-bold">Ada yang tidak beres</H2>
        <div className="inline-flex gap-2 items-center">
          <Button onClick={onReset}>Coba lagi</Button>
          <Button mode="text" onClick={onGoHome}>
            Kembali ke Beranda
          </Button>
        </div>
        <div className="flex flex-col items-center p-6 max-w-prose">
          <p className="text-center text-stone-700 dark:text-stone-300">
            Halaman ini gagal dimuat. Coba lagi, atau kabari pengelola proyek
            dengan menyertakan pesan di bawah ini:
          </p>
          <span className="p-4 max-w-prose font-mono text-sm text-stone-500 whitespace-pre-wrap">
            {error?.message}
          </span>
        </div>
      </div>
    </div>
  );
}
