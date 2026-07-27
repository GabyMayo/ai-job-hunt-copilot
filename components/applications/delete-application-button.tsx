"use client";

import { useState } from "react";
import { deleteApplicationAction } from "@/lib/actions/applications";

export function DeleteApplicationButton({ id }: { id: string }) {
  const [confirming, setConfirming] = useState(false);

  if (!confirming) {
    return (
      <button
        type="button"
        onClick={() => setConfirming(true)}
        className="rounded-lg border border-rose-200 px-3 py-2 text-sm font-medium text-rose-600 hover:bg-rose-50 dark:border-rose-900 dark:text-rose-400 dark:hover:bg-rose-500/10"
      >
        Delete
      </button>
    );
  }

  return (
    <div className="flex items-center gap-2 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 dark:border-rose-900 dark:bg-rose-500/10">
      <span className="text-sm font-medium text-rose-700 dark:text-rose-300">
        Delete this application?
      </span>
      <form action={deleteApplicationAction.bind(null, id)}>
        <button
          type="submit"
          className="rounded-md bg-rose-600 px-2.5 py-1 text-xs font-semibold text-white hover:bg-rose-500"
        >
          Confirm
        </button>
      </form>
      <button
        type="button"
        onClick={() => setConfirming(false)}
        className="rounded-md px-2.5 py-1 text-xs font-medium text-slate-600 hover:bg-white dark:text-slate-300 dark:hover:bg-slate-800"
      >
        Cancel
      </button>
    </div>
  );
}
