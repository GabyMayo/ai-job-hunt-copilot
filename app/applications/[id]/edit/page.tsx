import Link from "next/link";
import { notFound } from "next/navigation";
import { getApplicationById, listResumeOptions } from "@/lib/data/applications";
import { updateApplicationAction } from "@/lib/actions/applications";
import { toDateInputValue } from "@/lib/format";
import type { ApplicationFormValues } from "@/lib/validation";
import { ArrowLeftIcon } from "@/components/icons";
import { ApplicationForm } from "@/components/applications/application-form";
import { SetPageTitle } from "@/components/layout/set-page-title";

export default async function EditApplicationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [application, resumeOptions] = await Promise.all([
    getApplicationById(id),
    listResumeOptions(),
  ]);

  if (!application) {
    notFound();
  }

  const applicationDeadline = application.deadlines.find(
    (deadline) => deadline.type === "APPLICATION"
  );
  const oaDeadline = application.deadlines.find(
    (deadline) => deadline.type === "ONLINE_ASSESSMENT"
  );
  const interviewDeadline = application.deadlines.find(
    (deadline) => deadline.type === "INTERVIEW"
  );

  const defaultValues: ApplicationFormValues = {
    company: application.company,
    position: application.position,
    jobUrl: application.jobUrl ?? "",
    location: application.location ?? "",
    workMode: application.workMode,
    status: application.status,
    dateApplied: toDateInputValue(application.dateApplied),
    salary: application.salary ?? "",
    recruiterName: application.recruiterName ?? "",
    recruiterEmail: application.recruiterEmail ?? "",
    applicationDeadline: toDateInputValue(applicationDeadline?.dueAt),
    oaDeadline: toDateInputValue(oaDeadline?.dueAt),
    interviewDate: toDateInputValue(interviewDeadline?.dueAt),
    resumeId: application.resumeId ?? "",
    jobDescription: application.jobDescription ?? "",
    notes: application.notes ?? "",
  };

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6">
      <SetPageTitle title={`Edit · ${application.company} · ${application.position}`} />
      <Link
        href={`/applications/${application.id}`}
        className="flex w-fit items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
      >
        <ArrowLeftIcon className="h-4 w-4" />
        Back to application
      </Link>
      <ApplicationForm
        action={updateApplicationAction.bind(null, application.id)}
        defaultValues={defaultValues}
        resumeOptions={resumeOptions}
        submitLabel="Save Changes"
      />
    </div>
  );
}
