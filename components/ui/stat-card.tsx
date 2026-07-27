import type { ComponentType } from "react";
import { Card } from "./card";
import type { IconProps } from "../icons";

interface StatCardProps {
  label: string;
  value: string | number;
  hint?: string;
  icon: ComponentType<IconProps>;
  tone?: "slate" | "blue" | "violet" | "emerald" | "amber";
}

const TONE_STYLES: Record<NonNullable<StatCardProps["tone"]>, string> = {
  slate: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
  blue: "bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-300",
  violet:
    "bg-violet-50 text-violet-600 dark:bg-violet-950 dark:text-violet-300",
  emerald:
    "bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-300",
  amber:
    "bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-300",
};

export function StatCard({
  label,
  value,
  hint,
  icon: Icon,
  tone = "slate",
}: StatCardProps) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
          <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-50">
            {value}
          </p>
          {hint ? (
            <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
              {hint}
            </p>
          ) : null}
        </div>
        <span className={`rounded-lg p-2 ${TONE_STYLES[tone]}`}>
          <Icon className="h-5 w-5" />
        </span>
      </div>
    </Card>
  );
}
