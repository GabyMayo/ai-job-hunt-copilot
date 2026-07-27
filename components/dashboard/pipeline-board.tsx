import Link from "next/link";
import { groupByStatus } from "@/lib/application-utils";
import { STATUS_LABELS, STATUS_STYLES } from "@/lib/status-meta";
import type { ApplicationWithRelations } from "@/lib/types";

export function PipelineBoard({
  applications,
}: {
  applications: ApplicationWithRelations[];
}) {
  const groups = groupByStatus(applications);

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5">
      {(Object.keys(groups) as Array<keyof typeof groups>).map((status) => {
        const items = groups[status];
        const style = STATUS_STYLES[status];
        return (
          <div
            key={status}
            className="rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-800/40"
          >
            <div className="flex items-center gap-1.5">
              <span className={`h-2 w-2 rounded-full ${style.dot}`} />
              <span className="truncate text-xs font-semibold text-slate-600 dark:text-slate-300">
                {STATUS_LABELS[status]}
              </span>
            </div>
            <p className="mt-2 text-xl font-semibold text-slate-900 dark:text-slate-50">
              {items.length}
            </p>
            <ul className="mt-2 space-y-1">
              {items.slice(0, 3).map((app) => (
                <li key={app.id}>
                  <Link
                    href={`/applications/${app.id}`}
                    className="block truncate text-xs text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-300"
                  >
                    {app.company}
                  </Link>
                </li>
              ))}
              {items.length > 3 ? (
                <li className="text-xs text-slate-400 dark:text-slate-500">
                  +{items.length - 3} more
                </li>
              ) : null}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
