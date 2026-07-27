import type {
  Application,
  Contact,
  Deadline,
  Resume,
} from "@/lib/generated/prisma/browser";

export type {
  ApplicationStatus,
  WorkMode,
  DeadlineType,
} from "@/lib/generated/prisma/browser";
export type { Application, Contact, Deadline, Resume };

export type ApplicationWithRelations = Application & {
  deadlines: Deadline[];
  resume: Resume | null;
};

export interface ResumeOption {
  id: string;
  name: string;
}

export interface UpcomingDeadlineFeedItem {
  id: string;
  applicationId: string;
  company: string;
  position: string;
  label: string;
  date: Date;
}
