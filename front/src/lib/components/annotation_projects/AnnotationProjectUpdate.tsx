import type { ReactNode } from "react";

import Card from "@/lib/components/ui/Card";
import Description from "@/lib/components/ui/Description";
import { H4 } from "@/lib/components/ui/Headings";
import Loading from "@/lib/components/ui/Loading";

import { t } from "@/lib/i18n";
import type { AnnotationProject, AnnotationProjectUpdate } from "@/lib/types";

export default function AnnotationProjectUpdateComponent({
  annotationProject,
  isLoading = false,
  onChangeAnnotationProject,
  actions,
}: {
  annotationProject: AnnotationProject;
  isLoading?: boolean;
  onChangeAnnotationProject?: (data: AnnotationProjectUpdate) => void;
  /** RIMBA: download/delete buttons shown at the foot of the card. */
  actions?: ReactNode;
}) {
  return (
    <Card>
      <H4>{t("Detail proyek")}</H4>
      <div className="border-t border-stone-200 dark:border-stone-700">
        {isLoading ? (
          <Loading />
        ) : (
          <dl className="divide-y divide-stone-100 dark:divide-stone-700">
            <div className="py-4">
              <Description
                name={t("Nama")}
                value={annotationProject.name}
                onChange={(name) => onChangeAnnotationProject?.({ name })}
                type="textarea"
                editable
              />
            </div>
            <div className="py-4">
              <Description
                name={t("Deskripsi")}
                value={annotationProject.description}
                onChange={(description) =>
                  onChangeAnnotationProject?.({ description })
                }
                type="textarea"
                editable
              />
            </div>
            <div className="py-4">
              <Description
                name={t("Petunjuk anotator")}
                value={annotationProject.annotation_instructions ?? ""}
                onChange={(annotation_instructions) =>
                  onChangeAnnotationProject?.({ annotation_instructions })
                }
                type="textarea"
                editable
              />
            </div>
            <div className="py-4">
              <Description
                name={t("Dibuat")}
                value={annotationProject.created_on}
                type="text"
              />
            </div>
          </dl>
        )}
      </div>
      {actions != null && (
        <div className="pt-4 border-t border-stone-200 dark:border-stone-700">
          {actions}
        </div>
      )}
    </Card>
  );
}
