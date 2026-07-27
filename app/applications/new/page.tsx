import Link from "next/link";
import { listResumeOptions } from "@/lib/data/applications";
import { createApplicationAction } from "@/lib/actions/applications";
import type { ApplicationFormValues } from "@/lib/validation";
import { ArrowLeftIcon } from "@/components/icons";
import { ApplicationForm } from "@/components/applications/application-form";

const EMPTY_FORM_VALUES: ApplicationFormValues = {
  company: "",
  position: "",
  jobUrl: "",
  location: "",
  workMode: "HYBRID",
  status: "BOOKMARKED",
  dateApplied: "",
  salary: "",
  recruiterName: "",
  recruiterEmail: "",
  applicationDeadline: "",
  oaDeadline: "",
  interviewDate: "",
  resumeId: "",
  jobDescription: "",
  notes: "",
};

export default async function NewApplicationPage() {
  const resumeOptions = await listResumeOptions();

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6">
      <Link
        href="/applications"
        className="flex w-fit items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
      >
        <ArrowLeftIcon className="h-4 w-4" />
        Back to applications
      </Link>
      <ApplicationForm
        action={createApplicationAction}
        defaultValues={EMPTY_FORM_VALUES}
        resumeOptions={resumeOptions}
        submitLabel="Save Application"
      />
    </div>
  );
}
