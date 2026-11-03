import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import classNames from "classnames";

import { t } from "@/lib/i18n";

const defaultPageSizeOptions = [10, 25, 50, 100];

/** Page numbers to show: first, last, the current page and its neighbours,
 * with null where pages are left out (shown as "…"). */
function pageWindow(page: number, numPages: number): (number | null)[] {
  const keep = new Set([0, numPages - 1, page - 1, page, page + 1]);
  const out: (number | null)[] = [];
  for (let i = 0; i < numPages; i++) {
    if (keep.has(i)) out.push(i);
    else if (out[out.length - 1] !== null) out.push(null);
  }
  return out;
}

const PAGE_BUTTON =
  "inline-flex justify-center items-center min-w-9 h-9 px-2 text-sm font-medium rounded-md transition focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500";

/**
 * RIMBA: list footer with a "1–10 of 37" summary on the left and numbered
 * page buttons plus a page-size choice on the right. The page buttons only
 * appear when there is more than one page.
 */
export default function Pagination({
  page = 0,
  numPages = 1,
  pageSize = 10,
  total,
  hasNextPage = false,
  hasPrevPage = false,
  onNextPage: nextPage,
  onPrevPage: prevPage,
  onSetPage: setPage,
  onSetPageSize: setPageSize,
  pageSizeOptions = defaultPageSizeOptions,
}: {
  /** The current page number (from 0). */
  page?: number;
  /** The total number of pages. */
  numPages?: number;
  /** The number of items per page. */
  pageSize?: number;
  /** The total number of items, when known. */
  total?: number;
  hasNextPage?: boolean;
  hasPrevPage?: boolean;
  onNextPage?: () => void;
  onPrevPage?: () => void;
  onSetPage?: (page: number) => void;
  onSetPageSize?: (pageSize: number) => void;
  pageSizeOptions?: number[];
}) {
  const pages = Math.max(numPages, 1);
  const summary =
    total == null
      ? t("Halaman {p} dari {n}", { p: page + 1, n: pages })
      : pages <= 1
        ? t("Total: {n}", { n: total })
        : t("{a}–{b} dari {n}", {
            a: page * pageSize + 1,
            b: Math.min((page + 1) * pageSize, total),
            n: total,
          });
  const showSize = total == null || total > Math.min(...pageSizeOptions);
  return (
    <nav
      aria-label={t("Halaman")}
      className="flex flex-row flex-wrap gap-3 justify-between items-center pt-3 border-t border-stone-200 dark:border-stone-700"
    >
      <p className="text-sm tabular-nums text-stone-600 dark:text-stone-300">
        {summary}
      </p>
      <div className="flex flex-row flex-wrap gap-3 items-center">
        {showSize && (
          <label className="flex gap-2 items-center text-sm text-stone-600 dark:text-stone-300">
            {t("Per halaman")}
            <select
              value={pageSize}
              onChange={(e) => setPageSize?.(parseInt(e.target.value))}
              className="py-1 pr-7 pl-2 h-9 text-sm bg-white rounded-md border border-stone-300 text-stone-800 focus:border-emerald-500 focus:ring-emerald-500 dark:bg-stone-800 dark:border-stone-600 dark:text-stone-100"
            >
              {pageSizeOptions.map((v) => (
                <option key={v} value={v}>
                  {v < 0 ? t("Semua") : v}
                </option>
              ))}
            </select>
          </label>
        )}
        {pages > 1 && (
          <div className="flex flex-row gap-1 items-center">
            <button
              type="button"
              onClick={prevPage}
              disabled={!hasPrevPage}
              aria-label={t("Halaman sebelumnya")}
              title={t("Halaman sebelumnya")}
              className={classNames(
                PAGE_BUTTON,
                "text-stone-700 hover:bg-stone-200 disabled:opacity-40 disabled:hover:bg-transparent dark:text-stone-200 dark:hover:bg-stone-700",
              )}
            >
              <ChevronLeftIcon className="w-5 h-5" />
            </button>
            {pageWindow(page, pages).map((p, i) =>
              p === null ? (
                <span
                  key={`gap${i}`}
                  className="px-1 text-sm text-stone-500 dark:text-stone-400"
                >
                  …
                </span>
              ) : (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPage?.(p)}
                  aria-current={p === page ? "page" : undefined}
                  className={classNames(
                    PAGE_BUTTON,
                    "tabular-nums",
                    p === page
                      ? "text-white bg-emerald-700 dark:bg-emerald-600"
                      : "text-stone-700 hover:bg-stone-200 dark:text-stone-200 dark:hover:bg-stone-700",
                  )}
                >
                  {p + 1}
                </button>
              ),
            )}
            <button
              type="button"
              onClick={nextPage}
              disabled={!hasNextPage}
              aria-label={t("Halaman berikutnya")}
              title={t("Halaman berikutnya")}
              className={classNames(
                PAGE_BUTTON,
                "text-stone-700 hover:bg-stone-200 disabled:opacity-40 disabled:hover:bg-transparent dark:text-stone-200 dark:hover:bg-stone-700",
              )}
            >
              <ChevronRightIcon className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
