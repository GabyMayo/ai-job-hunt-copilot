import {
  ApplicationStatus,
  WorkMode,
  DeadlineType,
} from "@/lib/generated/prisma/browser";

export const APPLICATION_STATUSES: ApplicationStatus[] =
  Object.values(ApplicationStatus);

export const WORK_MODES: WorkMode[] = Object.values(WorkMode);

export const STATUS_LABELS: Record<ApplicationStatus, string> = {
  BOOKMARKED: "Bookmarked",
  PREPARING: "Preparing",
  APPLIED: "Applied",
  ONLINE_ASSESSMENT: "Online Assessment",
  RECRUITER_SCREEN: "Recruiter Screen",
  INTERVIEWING: "Interviewing",
  FINAL_INTERVIEW: "Final Interview",
  OFFER: "Offer",
  REJECTED: "Rejected",
  WITHDRAWN: "Withdrawn",
};

export const WORK_MODE_LABELS: Record<WorkMode, string> = {
  REMOTE: "Remote",
  HYBRID: "Hybrid",
  ONSITE: "On-site",
};

export const DEADLINE_TYPE_LABELS: Record<DeadlineType, string> = {
  APPLICATION: "Application due",
  ONLINE_ASSESSMENT: "OA due",
  INTERVIEW: "Interview",
  FOLLOW_UP: "Follow-up",
  OTHER: "Other",
};

export const STATUS_STYLES: Record<
  ApplicationStatus,
  { badge: string; dot: string }
> = {
  BOOKMARKED: {
    badge:
      "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
    dot: "bg-slate-400",
  },
  PREPARING: {
    badge: "bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-300",
    dot: "bg-sky-500",
  },
  APPLIED: {
    badge: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
    dot: "bg-blue-500",
  },
  ONLINE_ASSESSMENT: {
    badge:
      "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
    dot: "bg-amber-500",
  },
  RECRUITER_SCREEN: {
    badge: "bg-teal-50 text-teal-700 dark:bg-teal-950 dark:text-teal-300",
    dot: "bg-teal-500",
  },
  INTERVIEWING: {
    badge:
      "bg-violet-50 text-violet-700 dark:bg-violet-950 dark:text-violet-300",
    dot: "bg-violet-500",
  },
  FINAL_INTERVIEW: {
    badge:
      "bg-fuchsia-50 text-fuchsia-700 dark:bg-fuchsia-950 dark:text-fuchsia-300",
    dot: "bg-fuchsia-500",
  },
  OFFER: {
    badge:
      "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
    dot: "bg-emerald-500",
  },
  REJECTED: {
    badge: "bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300",
    dot: "bg-rose-500",
  },
  WITHDRAWN: {
    badge: "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400",
    dot: "bg-zinc-400",
  },
};

export function isActiveStatus(status: ApplicationStatus) {
  return status !== "REJECTED" && status !== "WITHDRAWN";
}

export function isInterviewStage(status: ApplicationStatus) {
  return (
    status === "RECRUITER_SCREEN" ||
    status === "INTERVIEWING" ||
    status === "FINAL_INTERVIEW"
  );
}
