import type { ReactNode } from "react";

export function FormField({
  label,
  htmlFor,
  required,
  className,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  className?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <label
        htmlFor={htmlFor}
        className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300"
      >
        {label}
        {required ? <span className="ml-0.5 text-rose-500">*</span> : null}
      </label>
      {children}
      {error ? (
        <p className="mt-1 text-xs text-rose-600 dark:text-rose-400">{error}</p>
      ) : null}
    </div>
  );
}

export const inputClasses =
  "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-1 focus:ring-indigo-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100";

export const errorInputClasses =
  "border-rose-400 focus:border-rose-400 focus:ring-rose-400 dark:border-rose-500";
