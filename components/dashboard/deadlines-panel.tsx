import Link from "next/link";
import { daysUntil, formatDate, relativeDayLabel, urgencyClass } from "@/lib/format";
import type { UpcomingDeadlineFeedItem } from "@/lib/types";

export function DeadlinesPanel({
  deadlines,
}: {
  deadlines: UpcomingDeadlineFeedItem[];
}) {
  const upcoming = deadlines
    .map((deadline) => ({ deadline, days: daysUntil(deadline.date) }))
    .filter((entry) => entry.days !== null && entry.days >= 0)
    .sort((a, b) => (a.days ?? 0) - (b.days ?? 0))
    .slice(0, 6);

  if (upcoming.length === 0) {
    return (
      <p className="px-5 py-8 text-center text-sm text-slate-500 dark:text-slate-400">
        No upcoming deadlines. Nice and clear.
      </p>
    );
  }

  return (
    <ul className="divide-y divide-slate-100 dark:divide-slate-800/60">
      {upcoming.map(({ deadline, days }) => (
        <li key={deadline.id}>
          <Link
            href={`/applications/${deadline.applicationId}`}
            className="flex items-center justify-between gap-3 px-5 py-3 hover:bg-slate-50 dark:hover:bg-slate-800/40"
          >
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-slate-900 dark:text-slate-100">
                {deadline.company} · {deadline.label}
              </p>
              <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                {deadline.position}
              </p>
            </div>
            <div className="shrink-0 text-right">
              <p className={`text-sm font-medium ${urgencyClass(days)}`}>
                {formatDate(deadline.date)}
              </p>
              <p className="text-xs text-slate-400 dark:text-slate-500">
                {relativeDayLabel(deadline.date)}
              </p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
