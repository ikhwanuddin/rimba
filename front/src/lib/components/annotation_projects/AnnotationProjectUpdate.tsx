import Card from "@/lib/components/ui/Card";
import Description from "@/lib/components/ui/Description";
import { H3 } from "@/lib/components/ui/Headings";
import Loading from "@/lib/components/ui/Loading";

import type { AnnotationProject, AnnotationProjectUpdate } from "@/lib/types";

export default function AnnotationProjectUpdateComponent({
  annotationProject,
  isLoading = false,
  onChangeAnnotationProject,
}: {
  annotationProject: AnnotationProject;
  isLoading?: boolean;
  onChangeAnnotationProject?: (data: AnnotationProjectUpdate) => void;
}) {
  return (
    <Card>
      <div className="px-4 sm:px-0">
        <H3>Detail proyek</H3>
      </div>
      <div className="mt-6 border-t border-stone-300 dark:border-stone-700">
        {isLoading ? (
          <Loading />
        ) : (
          <dl className="divide-y divide-stone-500">
            <div className="py-6 px-4 sm:px-0">
              <Description
                name="Nama"
                value={annotationProject.name}
                onChange={(name) => onChangeAnnotationProject?.({ name })}
                type="text"
                editable
              />
            </div>
            <div className="py-6 px-4 sm:px-0">
              <Description
                name="Deskripsi"
                value={annotationProject.description}
                onChange={(description) =>
                  onChangeAnnotationProject?.({ description })
                }
                type="textarea"
                editable
              />
            </div>
            <div className="py-6 px-4 sm:px-0">
              <Description
                name="Petunjuk anotator"
                value={annotationProject.annotation_instructions ?? ""}
                onChange={(annotation_instructions) =>
                  onChangeAnnotationProject?.({ annotation_instructions })
                }
                type="textarea"
                editable
              />
            </div>
            <div className="py-6 px-4 sm:px-0">
              <Description
                name="Dibuat"
                value={annotationProject.created_on}
                type="text"
              />
            </div>
          </dl>
        )}
      </div>
    </Card>
  );
}
