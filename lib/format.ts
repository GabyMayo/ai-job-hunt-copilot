export function formatDate(value: Date | null | undefined): string {
  if (!value) return "—";
  return value.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatShortDate(value: Date | null | undefined): string {
  if (!value) return "—";
  return value.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export function toDateInputValue(value: Date | null | undefined): string {
  if (!value) return "";
  const year = value.getFullYear();
  const month = String(value.getMonth() + 1).padStart(2, "0");
  const day = String(value.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

const DAY_MS = 24 * 60 * 60 * 1000;

export function daysUntil(
  value: Date | null | undefined,
  today = new Date()
): number | null {
  if (!value) return null;
  const start = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const target = new Date(value.getFullYear(), value.getMonth(), value.getDate());
  return Math.round((target.getTime() - start.getTime()) / DAY_MS);
}

export function urgencyClass(daysAway: number | null): string {
  if (daysAway === null) return "text-slate-500 dark:text-slate-400";
  if (daysAway < 0) return "text-slate-400 dark:text-slate-500";
  if (daysAway <= 3) return "text-rose-600 dark:text-rose-400";
  if (daysAway <= 7) return "text-amber-600 dark:text-amber-400";
  return "text-slate-600 dark:text-slate-300";
}

export function relativeDayLabel(
  value: Date | null | undefined,
  today = new Date()
): string {
  const days = daysUntil(value, today);
  if (days === null) return "No date set";
  if (days === 0) return "Today";
  if (days === 1) return "Tomorrow";
  if (days === -1) return "Yesterday";
  if (days < 0) return `${Math.abs(days)} days ago`;
  return `In ${days} days`;
}

export function initials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}
