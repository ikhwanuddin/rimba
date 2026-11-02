import { FilterIcon } from "@/lib/components/icons";
import { Dialog } from "@/lib/components/ui";

import { t } from "@/lib/i18n";

export default function FilterButton({
  children,
  title,
}: {
  children: (props: { close: () => void }) => React.ReactNode;
  title: string;
}) {
  return (
    <Dialog
      label={
        <span className="inline-flex gap-2 items-center">
          <FilterIcon className="w-4 h-4 stroke-2" />
          {t("Saring")}
        </span>
      }
      width="max-w-3xl"
      mode="text"
      variant="info"
      title={title}
    >
      {children}
    </Dialog>
  );
}
