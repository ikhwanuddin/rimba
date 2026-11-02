import { useMemo } from "react";

import {
  AddIcon,
  CompleteIcon,
  EditIcon,
  NeedsReviewIcon,
  VerifiedIcon,
} from "@/lib/components/icons";
import Button from "@/lib/components/ui/Button";
import Card from "@/lib/components/ui/Card";
import Empty from "@/lib/components/ui/Empty";
import { H3 } from "@/lib/components/ui/Headings";
import Loading from "@/lib/components/ui/Loading";
import MetricBadge from "@/lib/components/ui/MetricBadge";
import ProgressBar from "@/lib/components/ui/ProgressBar";

import type { AnnotationTask } from "@/lib/types";
import { computeAnnotationTasksProgress } from "@/lib/utils/annotation_tasks";

const _emptyList: AnnotationTask[] = [];

export default function ProjectProgress({
  annotationTasks = _emptyList,
  isLoading = false,
  onAddTasks,
  onClickPending,
  onClickReview,
  onClickCompleted,
  onClickVerified,
}: {
  isLoading?: boolean;
  annotationTasks?: AnnotationTask[];
  onAddTasks?: () => void;
  onClickPending?: () => void;
  onClickReview?: () => void;
  onClickCompleted?: () => void;
  onClickVerified?: () => void;
}) {
  const { missing, needReview, completed, verified } = useMemo(() => {
    if (isLoading || annotationTasks == null) {
      return {
        missing: 0,
        needReview: 0,
        completed: 0,
        verified: 0,
      };
    }
    return computeAnnotationTasksProgress(annotationTasks);
  }, [annotationTasks, isLoading]);

  return (
    <Card>
      <div className="flex flex-row justify-between items-center">
        <H3>Progres anotasi</H3>
        <Button mode="text" variant="primary" onClick={onAddTasks}>
          <AddIcon className="inline-block mr-2 w-5 h-5" /> Tambah klip
        </Button>
      </div>
      {isLoading ? (
        <Loading />
      ) : annotationTasks.length === 0 ? (
        <NoTasks />
      ) : (
        <ProgressReport
          annotationTasks={annotationTasks}
          isLoading={isLoading}
          missing={missing}
          needReview={needReview}
          completed={completed}
          verified={verified}
          onClickReview={onClickReview}
          onClickCompleted={onClickCompleted}
          onClickPending={onClickPending}
          onClickVerified={onClickVerified}
        />
      )}
    </Card>
  );
}

function NoTasks() {
  return (
    <Empty>
      <p>
        Proyek ini belum punya klip. Tambahkan lewat tombol{" "}
        <span className="inline text-emerald-500">Tambah klip</span> di atas.
      </p>
    </Empty>
  );
}

function ProgressReport({
  annotationTasks,
  isLoading,
  missing,
  needReview,
  completed,
  verified,
  onClickPending,
  onClickReview,
  onClickCompleted,
  onClickVerified,
}: {
  annotationTasks: any;
  isLoading: boolean;
  missing: number;
  needReview: number;
  completed: number;
  verified: number;
  onClickPending?: () => void;
  onClickReview?: () => void;
  onClickCompleted?: () => void;
  onClickVerified?: () => void;
}) {
  return (
    <>
      <div className="flex flex-row gap-2 justify-around">
        <MetricBadge
          icon={<EditIcon className="inline-block w-8 h-8 text-blue-500" />}
          title="Belum dijawab"
          value={missing}
          isLoading={isLoading}
          onClick={onClickPending}
        />
        <MetricBadge
          icon={
            <NeedsReviewIcon className="inline-block w-8 h-8 text-red-500" />
          }
          title="Perlu ditinjau"
          value={needReview}
          isLoading={isLoading}
          onClick={onClickReview}
        />
        <MetricBadge
          icon={
            <CompleteIcon className="inline-block w-8 h-8 text-emerald-500" />
          }
          title="Selesai"
          value={completed}
          isLoading={isLoading}
          onClick={onClickCompleted}
        />
        <MetricBadge
          icon={
            <VerifiedIcon className="inline-block w-8 h-8 text-amber-500" />
          }
          title="Diverifikasi"
          value={verified}
          isLoading={isLoading}
          onClick={onClickVerified}
        />
      </div>
      <div className="mt-4">
        <div className="mb-2 text-stone-500">
          Total klip: {annotationTasks.length}
        </div>
        <ProgressBar
          total={annotationTasks.length}
          complete={completed}
          verified={verified}
          error={needReview}
        />
      </div>
    </>
  );
}
