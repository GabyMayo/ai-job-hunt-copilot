"use client";

import { useEffect } from "react";
import Link from "next/link";
import { EmptyState } from "@/components/ui/empty-state";
import { ConstructionIcon } from "@/components/icons";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col gap-6">
      <EmptyState
        icon={ConstructionIcon}
        title="Something went wrong"
        description="We couldn't load this page. This is usually a temporary database connection issue."
        note={error.digest ? `Error ref: ${error.digest}` : undefined}
      />
      <div className="flex justify-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-500"
        >
          Try again
        </button>
        <Link
          href="/dashboard"
          className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
