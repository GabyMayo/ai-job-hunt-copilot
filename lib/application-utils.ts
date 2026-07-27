import { daysUntil } from "./format";
import { APPLICATION_STATUSES } from "./status-meta";
import type { ApplicationStatus } from "@/lib/generated/prisma/browser";
import type {
  ApplicationWithRelations,
  Deadline,
  UpcomingDeadlineFeedItem,
} from "./types";

interface DeadlineWithApplication extends Deadline {
  application: { id: string; company: string; position: string } | null;
}

export function toUpcomingDeadlineFeedItems(
  deadlines: DeadlineWithApplication[]
): UpcomingDeadlineFeedItem[] {
  return deadlines
    .filter((deadline) => deadline.application)
    .map((deadline) => ({
      id: deadline.id,
      applicationId: deadline.application!.id,
      company: deadline.application!.company,
      position: deadline.application!.position,
      label: deadline.title,
      date: deadline.dueAt,
    }));
}

export interface UpcomingDeadlineView {
  date: Date;
  label: string;
}

export function getUpcomingDeadline(
  deadlines: Deadline[]
): UpcomingDeadlineView | null {
  const active = deadlines.filter((deadline) => !deadline.completed);
  if (active.length === 0) return null;

  const withDays = active.map((deadline) => ({
    date: deadline.dueAt,
    label: deadline.title,
    days: daysUntil(deadline.dueAt),
  }));

  const upcoming = withDays
    .filter((entry) => entry.days !== null && entry.days >= 0)
    .sort((a, b) => (a.days ?? 0) - (b.days ?? 0));

  if (upcoming.length > 0) {
    const [next] = upcoming;
    return { date: next.date, label: next.label };
  }

  const past = [...withDays].sort((a, b) => (b.days ?? 0) - (a.days ?? 0));
  return past[0] ?? null;
}

export function groupByStatus(
  applications: ApplicationWithRelations[]
): Record<ApplicationStatus, ApplicationWithRelations[]> {
  const groups = Object.fromEntries(
    APPLICATION_STATUSES.map((status) => [status, [] as ApplicationWithRelations[]])
  ) as Record<ApplicationStatus, ApplicationWithRelations[]>;

  for (const app of applications) {
    groups[app.status].push(app);
  }

  return groups;
}
