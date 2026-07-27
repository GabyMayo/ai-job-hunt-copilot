import { APPLICATION_STATUSES, WORK_MODES } from "@/lib/status-meta";
import type { ApplicationStatus, WorkMode } from "@/lib/generated/prisma/browser";

export interface ApplicationFormValues {
  company: string;
  position: string;
  jobUrl: string;
  location: string;
  workMode: string;
  status: string;
  dateApplied: string;
  salary: string;
  recruiterName: string;
  recruiterEmail: string;
  applicationDeadline: string;
  oaDeadline: string;
  interviewDate: string;
  resumeId: string;
  jobDescription: string;
  notes: string;
}

export type ApplicationFieldErrors = Partial<
  Record<keyof ApplicationFormValues, string>
>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isValidDateString(value: string) {
  if (!value) return true;
  return !Number.isNaN(new Date(`${value}T00:00:00`).getTime());
}

function isValidUrl(value: string) {
  if (!value) return true;
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export function validateApplicationForm(
  values: ApplicationFormValues
): { valid: boolean; fieldErrors: ApplicationFieldErrors } {
  const fieldErrors: ApplicationFieldErrors = {};

  if (!values.company.trim()) {
    fieldErrors.company = "Company is required.";
  }
  if (!values.position.trim()) {
    fieldErrors.position = "Position is required.";
  }
  if (!isValidUrl(values.jobUrl.trim())) {
    fieldErrors.jobUrl = "Enter a valid http(s) URL.";
  }
  if (values.recruiterEmail.trim() && !EMAIL_RE.test(values.recruiterEmail.trim())) {
    fieldErrors.recruiterEmail = "Enter a valid email address.";
  }
  if (!APPLICATION_STATUSES.includes(values.status as ApplicationStatus)) {
    fieldErrors.status = "Choose a valid status.";
  }
  if (!WORK_MODES.includes(values.workMode as WorkMode)) {
    fieldErrors.workMode = "Choose a valid work mode.";
  }
  if (!isValidDateString(values.dateApplied)) {
    fieldErrors.dateApplied = "Enter a valid date.";
  }
  if (!isValidDateString(values.applicationDeadline)) {
    fieldErrors.applicationDeadline = "Enter a valid date.";
  }
  if (!isValidDateString(values.oaDeadline)) {
    fieldErrors.oaDeadline = "Enter a valid date.";
  }
  if (!isValidDateString(values.interviewDate)) {
    fieldErrors.interviewDate = "Enter a valid date.";
  }

  return { valid: Object.keys(fieldErrors).length === 0, fieldErrors };
}
