"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { APPLICATION_STATUSES, STATUS_LABELS } from "@/lib/status-meta";
import type { ApplicationStatus } from "@/lib/generated/prisma/browser";
import type { ApplicationWithRelations } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { SearchIcon } from "@/components/icons";
import { ApplicationTable } from "./application-table";

type StatusFilter = ApplicationStatus | "All";

export function ApplicationsView({
  applications,
}: {
  applications: ApplicationWithRelations[];
}) {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return applications.filter((app) => {
      const matchesQuery =
        normalizedQuery.length === 0 ||
        app.company.toLowerCase().includes(normalizedQuery) ||
        app.position.toLowerCase().includes(normalizedQuery) ||
        (app.location ?? "").toLowerCase().includes(normalizedQuery);
      const matchesStatus = statusFilter === "All" || app.status === statusFilter;
      return matchesQuery && matchesStatus;
    });
  }, [applications, query, statusFilter]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 dark:border-slate-800 dark:bg-slate-900 sm:w-80">
          <SearchIcon className="h-4 w-4 shrink-0 text-slate-400" aria-hidden="true" />
          <label htmlFor="applications-search" className="sr-only">
            Search applications by company, role, or location
          </label>
          <input
            id="applications-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search company, role, or location…"
            className="w-full bg-transparent text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none dark:text-slate-200"
          />
        </div>

        <label htmlFor="applications-status-filter" className="sr-only">
          Filter by status
        </label>
        <select
          id="applications-status-filter"
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value as StatusFilter)}
          className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:border-indigo-400 focus:outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 sm:w-56"
        >
          <option value="All">All statuses</option>
          {APPLICATION_STATUSES.map((status) => (
            <option key={status} value={status}>
              {STATUS_LABELS[status]}
            </option>
          ))}
        </select>
      </div>

      <p className="text-sm text-slate-500 dark:text-slate-400">
        Showing {filtered.length} of {applications.length} applications
      </p>

      <Card>
        <ApplicationTable
          applications={filtered}
          sortable
          emptyMessage="No applications match your search or filter."
        />
      </Card>
    </div>
  );
}
