import type { ComponentType } from "react";
import type { IconProps } from "../icons";

interface EmptyStateProps {
  icon: ComponentType<IconProps>;
  title: string;
  description: string;
  note?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  note,
}: EmptyStateProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white px-6 py-20 text-center dark:border-slate-700 dark:bg-slate-900">
      <span className="rounded-full bg-slate-100 p-3 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
        <Icon className="h-6 w-6" />
      </span>
      <h2 className="mt-4 text-base font-semibold text-slate-900 dark:text-slate-100">
        {title}
      </h2>
      <p className="mt-2 max-w-sm text-sm text-slate-500 dark:text-slate-400">
        {description}
      </p>
      {note ? (
        <p className="mt-4 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500 dark:bg-slate-800 dark:text-slate-400">
          {note}
        </p>
      ) : null}
    </div>
  );
}
