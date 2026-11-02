import { type ComponentProps } from "react";

import Card from "@/lib/components/ui/Card";
import Empty from "@/lib/components/ui/Empty";

import { t } from "@/lib/i18n";

import TagPanel from "../tags/TagPanel";

export default function ClipAnnotationTags(
  props: Omit<ComponentProps<typeof TagPanel>, "title">,
) {
  return (
    <Card>
      <TagPanel title={t("Label klip")} {...props} EmptyTags={<NoTags />} />
    </Card>
  );
}

function NoTags() {
  return (
    <Empty outerClassName="p-2">{t("Belum ada label di klip ini.")}</Empty>
  );
}
