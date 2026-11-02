import classNames from "classnames";
import { type ReactNode, useMemo } from "react";

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
import { H4 } from "@/lib/components/ui/Headings";
import Loading from "@/lib/components/ui/Loading";

import { t } from "@/lib/i18n";
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
      <div className="flex flex-row gap-2 justify-between items-center">
        <H4>{t("Progres anotasi")}</H4>
        <Button
          mode="outline"
          variant="primary"
          padding="px-3 py-1.5"
          onClick={onAddTasks}
        >
          <AddIcon className="inline-block mr-1 w-4 h-4" /> {t(" Tambah klip")}
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
        {t("Proyek ini belum punya klip. Tambahkan lewat tombol")}{" "}
        <span className="inline text-emerald-500">{t("Tambah klip")}</span>{" "}
        {t(" di atas.")}
      </p>
    </Empty>
  );
}

// RIMBA: status tiles and a slim progress bar with a one-line summary.
function StatTile({
  icon,
  title,
  value,
  tone,
  onClick,
}: {
  icon: ReactNode;
  title: string;
  value: number;
  tone: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={classNames(
        "flex flex-col gap-1 items-start p-3 text-left rounded-lg ring-1 ring-inset transition hover:brightness-95 focus:outline-none focus:ring-2",
        tone,
      )}
    >
      <span className="flex gap-1.5 items-center text-xs font-medium">
        {icon}
        {title}
      </span>
      <span className="text-2xl font-semibold tabular-nums text-stone-900 dark:text-stone-100">
        {value.toLocaleString()}
      </span>
    </button>
  );
}

function ProgressReport({
  annotationTasks,
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
  const total = annotationTasks.length;
  const done = completed + verified;
  const percent = total === 0 ? 0 : Math.round((done / total) * 100);
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatTile
          icon={<EditIcon className="w-4 h-4" />}
          title={t("Belum dijawab")}
          value={missing}
          tone="bg-stone-50 text-stone-600 ring-stone-200 dark:bg-stone-900 dark:text-stone-300 dark:ring-stone-700"
          onClick={onClickPending}
        />
        <StatTile
          icon={<NeedsReviewIcon className="w-4 h-4" />}
          title={t("Perlu ditinjau")}
          value={needReview}
          tone="bg-red-50 text-red-700 ring-red-200 dark:bg-red-950 dark:text-red-300 dark:ring-red-900"
          onClick={onClickReview}
        />
        <StatTile
          icon={<CompleteIcon className="w-4 h-4" />}
          title={t("Selesai")}
          value={completed}
          tone="bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:ring-emerald-900"
          onClick={onClickCompleted}
        />
        <StatTile
          icon={<VerifiedIcon className="w-4 h-4" />}
          title={t("Diverifikasi")}
          value={verified}
          tone="bg-amber-50 text-amber-700 ring-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:ring-amber-900"
          onClick={onClickVerified}
        />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-baseline text-sm">
          <span className="text-stone-600 dark:text-stone-400">
            {t("{done} dari {total} klip selesai", { done, total })}
          </span>
          <span className="font-semibold tabular-nums text-emerald-700 dark:text-emerald-400">
            {percent}%
          </span>
        </div>
        <div className="flex overflow-hidden w-full h-2 rounded-full bg-stone-200 dark:bg-stone-700">
          <div
            className="bg-emerald-600"
            style={{ width: `${(completed / total) * 100}%` }}
          />
          <div
            className="bg-amber-500"
            style={{ width: `${(verified / total) * 100}%` }}
          />
          <div
            className="bg-red-500"
            style={{ width: `${(needReview / total) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
