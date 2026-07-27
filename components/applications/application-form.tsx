"use client";

import { useActionState } from "react";
import { useRouter } from "next/navigation";
import {
  initialApplicationActionState,
  type ApplicationActionState,
} from "@/lib/action-state";
import { APPLICATION_STATUSES, STATUS_LABELS, WORK_MODES, WORK_MODE_LABELS } from "@/lib/status-meta";
import type { ApplicationFormValues } from "@/lib/validation";
import type { ResumeOption } from "@/lib/types";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";
import { FormField, inputClasses, errorInputClasses } from "@/components/ui/form-field";

type ActionFn = (
  prevState: ApplicationActionState,
  formData: FormData
) => Promise<ApplicationActionState>;

interface ApplicationFormProps {
  action: ActionFn;
  defaultValues: ApplicationFormValues;
  resumeOptions: ResumeOption[];
  submitLabel: string;
}

function cx(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function ApplicationForm({
  action,
  defaultValues,
  resumeOptions,
  submitLabel,
}: ApplicationFormProps) {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(
    action,
    initialApplicationActionState
  );
  const fieldErrors = state.fieldErrors ?? {};

  return (
    <form action={formAction} className="flex flex-col gap-6">
      <p className="rounded-lg border border-indigo-100 bg-indigo-50 px-4 py-3 text-sm text-indigo-700 dark:border-indigo-900 dark:bg-indigo-500/10 dark:text-indigo-300">
        Changes are saved to your PostgreSQL database.
      </p>

      {state.status === "error" && state.error ? (
        <p
          id="form-error"
          role="alert"
          className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:border-rose-900 dark:bg-rose-500/10 dark:text-rose-300"
        >
          {state.error}
        </p>
      ) : null}

      <Card>
        <CardHeader>
          <CardTitle>Role details</CardTitle>
        </CardHeader>
        <CardBody className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField
            label="Company"
            htmlFor="company"
            required
            error={fieldErrors.company}
          >
            <input
              id="company"
              name="company"
              required
              aria-required="true"
              aria-invalid={Boolean(fieldErrors.company)}
              defaultValue={defaultValues.company}
              className={cx(inputClasses, fieldErrors.company && errorInputClasses)}
              placeholder="e.g. Google"
            />
          </FormField>
          <FormField
            label="Position"
            htmlFor="position"
            required
            error={fieldErrors.position}
          >
            <input
              id="position"
              name="position"
              required
              aria-required="true"
              aria-invalid={Boolean(fieldErrors.position)}
              defaultValue={defaultValues.position}
              className={cx(inputClasses, fieldErrors.position && errorInputClasses)}
              placeholder="e.g. Software Engineering Intern"
            />
          </FormField>
          <FormField
            label="Job URL"
            htmlFor="jobUrl"
            className="sm:col-span-2"
            error={fieldErrors.jobUrl}
          >
            <input
              id="jobUrl"
              name="jobUrl"
              type="url"
              defaultValue={defaultValues.jobUrl}
              className={cx(inputClasses, fieldErrors.jobUrl && errorInputClasses)}
              placeholder="https://…"
            />
          </FormField>
          <FormField label="Location" htmlFor="location">
            <input
              id="location"
              name="location"
              defaultValue={defaultValues.location}
              className={inputClasses}
              placeholder="e.g. San Francisco, CA"
            />
          </FormField>
          <FormField label="Work Mode" htmlFor="workMode">
            <select
              id="workMode"
              name="workMode"
              defaultValue={defaultValues.workMode}
              className={inputClasses}
            >
              {WORK_MODES.map((mode) => (
                <option key={mode} value={mode}>
                  {WORK_MODE_LABELS[mode]}
                </option>
              ))}
            </select>
          </FormField>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Status & timeline</CardTitle>
        </CardHeader>
        <CardBody className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <FormField label="Status" htmlFor="status">
            <select
              id="status"
              name="status"
              defaultValue={defaultValues.status}
              className={inputClasses}
            >
              {APPLICATION_STATUSES.map((status) => (
                <option key={status} value={status}>
                  {STATUS_LABELS[status]}
                </option>
              ))}
            </select>
          </FormField>
          <FormField
            label="Date Applied"
            htmlFor="dateApplied"
            error={fieldErrors.dateApplied}
          >
            <input
              id="dateApplied"
              name="dateApplied"
              type="date"
              defaultValue={defaultValues.dateApplied}
              className={cx(inputClasses, fieldErrors.dateApplied && errorInputClasses)}
            />
          </FormField>
          <FormField label="Salary" htmlFor="salary">
            <input
              id="salary"
              name="salary"
              defaultValue={defaultValues.salary}
              className={inputClasses}
              placeholder="e.g. $50/hr"
            />
          </FormField>
          <FormField label="Recruiter Name" htmlFor="recruiterName">
            <input
              id="recruiterName"
              name="recruiterName"
              defaultValue={defaultValues.recruiterName}
              className={inputClasses}
              placeholder="Recruiter or contact name"
            />
          </FormField>
          <FormField
            label="Recruiter Email"
            htmlFor="recruiterEmail"
            error={fieldErrors.recruiterEmail}
          >
            <input
              id="recruiterEmail"
              name="recruiterEmail"
              type="email"
              defaultValue={defaultValues.recruiterEmail}
              className={cx(
                inputClasses,
                fieldErrors.recruiterEmail && errorInputClasses
              )}
              placeholder="recruiter@company.com"
            />
          </FormField>
          <FormField
            label="Application Deadline"
            htmlFor="applicationDeadline"
            error={fieldErrors.applicationDeadline}
          >
            <input
              id="applicationDeadline"
              name="applicationDeadline"
              type="date"
              defaultValue={defaultValues.applicationDeadline}
              className={cx(
                inputClasses,
                fieldErrors.applicationDeadline && errorInputClasses
              )}
            />
          </FormField>
          <FormField
            label="OA Deadline"
            htmlFor="oaDeadline"
            error={fieldErrors.oaDeadline}
          >
            <input
              id="oaDeadline"
              name="oaDeadline"
              type="date"
              defaultValue={defaultValues.oaDeadline}
              className={cx(inputClasses, fieldErrors.oaDeadline && errorInputClasses)}
            />
          </FormField>
          <FormField
            label="Interview Date"
            htmlFor="interviewDate"
            error={fieldErrors.interviewDate}
          >
            <input
              id="interviewDate"
              name="interviewDate"
              type="date"
              defaultValue={defaultValues.interviewDate}
              className={cx(
                inputClasses,
                fieldErrors.interviewDate && errorInputClasses
              )}
            />
          </FormField>
          <FormField label="Resume Version" htmlFor="resumeId">
            <select
              id="resumeId"
              name="resumeId"
              defaultValue={defaultValues.resumeId}
              className={inputClasses}
            >
              <option value="">No resume selected</option>
              {resumeOptions.map((resume) => (
                <option key={resume.id} value={resume.id}>
                  {resume.name}
                </option>
              ))}
            </select>
          </FormField>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notes</CardTitle>
        </CardHeader>
        <CardBody className="grid grid-cols-1 gap-4">
          <FormField label="Job Description" htmlFor="jobDescription">
            <textarea
              id="jobDescription"
              name="jobDescription"
              rows={4}
              defaultValue={defaultValues.jobDescription}
              className={inputClasses}
              placeholder="Paste or summarize the job description…"
            />
          </FormField>
          <FormField label="Notes" htmlFor="notes">
            <textarea
              id="notes"
              name="notes"
              rows={3}
              defaultValue={defaultValues.notes}
              className={inputClasses}
              placeholder="Personal notes, referral info, interview prep…"
            />
          </FormField>
        </CardBody>
      </Card>

      <div className="flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={pending}
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? "Saving…" : submitLabel}
        </button>
      </div>
    </form>
  );
}
