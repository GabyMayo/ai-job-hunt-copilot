"use client";

import { useMemo, useState, type KeyboardEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getUpcomingDeadline } from "@/lib/application-utils";
import { formatDate, initials, urgencyClass, daysUntil } from "@/lib/format";
import { WORK_MODE_LABELS } from "@/lib/status-meta";
import type { ApplicationWithRelations } from "@/lib/types";
import { StatusBadge } from "../ui/status-badge";
import { ArrowUpDownIcon } from "../icons";

type SortKey = "company" | "status" | "dateApplied" | "deadline";
type SortDirection = "asc" | "desc";

const AVATAR_PALETTE = [
  "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300",
  "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300",
  "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300",
  "bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-300",
  "bg-sky-100 text-sky-700 dark:bg-sky-500/10 dark:text-sky-300",
  "bg-violet-100 text-violet-700 dark:bg-violet-500/10 dark:text-violet-300",
];

function avatarTone(company: string) {
  let hash = 0;
  for (let i = 0; i < company.length; i += 1) {
    hash = (hash + company.charCodeAt(i)) % AVATAR_PALETTE.length;
  }
  return AVATAR_PALETTE[hash];
}

interface ApplicationTableProps {
  applications: ApplicationWithRelations[];
  sortable?: boolean;
  emptyMessage?: string;
}

function SortHeader({
  label,
  active,
  direction,
  onClick,
}: {
  label: string;
  active: boolean;
  direction: SortDirection;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-1 text-xs font-semibold uppercase tracking-wide ${
        active
          ? "text-slate-900 dark:text-slate-100"
          : "text-slate-500 dark:text-slate-400"
      }`}
    >
      {label}
      <ArrowUpDownIcon
        className={`h-3.5 w-3.5 ${
          active ? "opacity-100" : "opacity-30"
        } ${active && direction === "asc" ? "rotate-180" : ""}`}
      />
    </button>
  );
}

export function ApplicationTable({
  applications,
  sortable = false,
  emptyMessage = "No applications to show.",
}: ApplicationTableProps) {
  const router = useRouter();
  const [sortKey, setSortKey] = useState<SortKey>("dateApplied");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  const rows = useMemo(() => {
    const withMeta = applications.map((app) => ({
      app,
      deadline: getUpcomingDeadline(app.deadlines),
    }));

    if (!sortable) return withMeta;

    const sorted = [...withMeta].sort((a, b) => {
      let compare = 0;
      if (sortKey === "company") {
        compare = a.app.company.localeCompare(b.app.company);
      } else if (sortKey === "status") {
        compare = a.app.status.localeCompare(b.app.status);
      } else if (sortKey === "dateApplied") {
        compare =
          (a.app.dateApplied?.getTime() ?? 0) -
          (b.app.dateApplied?.getTime() ?? 0);
      } else if (sortKey === "deadline") {
        compare =
          (a.deadline?.date.getTime() ?? 0) - (b.deadline?.date.getTime() ?? 0);
      }
      return sortDirection === "asc" ? compare : -compare;
    });

    return sorted;
  }, [applications, sortable, sortKey, sortDirection]);

  function toggleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDirection((direction) => (direction === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  }

  if (applications.length === 0) {
    return (
      <p className="px-5 py-10 text-center text-sm text-slate-500 dark:text-slate-400">
        {emptyMessage}
      </p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[720px] text-left text-sm">
        <thead>
          <tr className="border-b border-slate-200 dark:border-slate-800">
            <th scope="col" className="px-5 py-3">
              {sortable ? (
                <SortHeader
                  label="Company"
                  active={sortKey === "company"}
                  direction={sortDirection}
                  onClick={() => toggleSort("company")}
                />
              ) : (
                <span className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Company
                </span>
              )}
            </th>
            <th scope="col" className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Location
            </th>
            <th scope="col" className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Mode
            </th>
            <th scope="col" className="px-5 py-3">
              {sortable ? (
                <SortHeader
                  label="Status"
                  active={sortKey === "status"}
                  direction={sortDirection}
                  onClick={() => toggleSort("status")}
                />
              ) : (
                <span className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Status
                </span>
              )}
            </th>
            <th scope="col" className="px-5 py-3">
              {sortable ? (
                <SortHeader
                  label="Applied"
                  active={sortKey === "dateApplied"}
                  direction={sortDirection}
                  onClick={() => toggleSort("dateApplied")}
                />
              ) : (
                <span className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Applied
                </span>
              )}
            </th>
            <th scope="col" className="px-5 py-3">
              {sortable ? (
                <SortHeader
                  label="Next Deadline"
                  active={sortKey === "deadline"}
                  direction={sortDirection}
                  onClick={() => toggleSort("deadline")}
                />
              ) : (
                <span className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Next Deadline
                </span>
              )}
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map(({ app, deadline }) => {
            function handleRowKeyDown(event: KeyboardEvent<HTMLTableRowElement>) {
              if (event.target !== event.currentTarget) return;
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                router.push(`/applications/${app.id}`);
              }
            }

            return (
              <tr
                key={app.id}
                tabIndex={0}
                onClick={() => router.push(`/applications/${app.id}`)}
                onKeyDown={handleRowKeyDown}
                aria-label={`View details for ${app.company}, ${app.position}`}
                className="cursor-pointer border-b border-slate-100 outline-none last:border-0 hover:bg-slate-50 focus-visible:bg-slate-50 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-400 dark:border-slate-800/60 dark:hover:bg-slate-800/40 dark:focus-visible:bg-slate-800/40"
              >
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <span
                      aria-hidden="true"
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${avatarTone(
                        app.company
                      )}`}
                    >
                      {initials(app.company)}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate font-medium text-slate-900 dark:text-slate-100">
                        <Link
                          href={`/applications/${app.id}`}
                          tabIndex={-1}
                          className="hover:underline focus:outline-none"
                        >
                          {app.company}
                        </Link>
                      </p>
                      <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                        {app.position}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3 text-slate-600 dark:text-slate-300">
                  {app.location || "—"}
                </td>
                <td className="px-5 py-3 text-slate-600 dark:text-slate-300">
                  {WORK_MODE_LABELS[app.workMode]}
                </td>
                <td className="px-5 py-3">
                  <StatusBadge status={app.status} />
                </td>
                <td className="px-5 py-3 text-slate-600 dark:text-slate-300">
                  {formatDate(app.dateApplied)}
                </td>
                <td className="px-5 py-3">
                  {deadline ? (
                    <span className={`text-sm ${urgencyClass(daysUntil(deadline.date))}`}>
                      {deadline.label} · {formatDate(deadline.date)}
                    </span>
                  ) : (
                    <span className="text-slate-400 dark:text-slate-500">—</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
