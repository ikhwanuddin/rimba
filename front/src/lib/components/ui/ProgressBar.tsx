import classNames from "classnames";

export default function ProgressBar({
  total,
  complete,
  verified = 0,
  error = 0,
  className = "mb-4",
}: {
  total: number;
  complete: number;
  verified?: number;
  error?: number;
  className?: string;
}) {
  const completedPerc = (complete / total) * 100;
  const verifiedPerc = (verified / total) * 100;
  const errorPerc = (error / total) * 100;

  // RIMBA: a slim bar without numbers inside (they could not be read); the
  // numbers are in the tooltip.
  const title = `${complete + verified}/${total} (${Math.round(completedPerc + verifiedPerc)}%)`;
  return (
    <div
      title={title}
      className={classNames(
        className,
        "w-full flex flex-row h-2 overflow-hidden bg-stone-200 rounded-full dark:bg-stone-700",
      )}
    >
      <div
        className="bg-emerald-600 dark:bg-emerald-500"
        style={{ width: `${completedPerc}%` }}
      />
      <div className="bg-amber-500" style={{ width: `${verifiedPerc}%` }} />
      <div className="bg-red-500" style={{ width: `${errorPerc}%` }} />
    </div>
  );
}
