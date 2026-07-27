import Link from "next/link";
import { notFound } from "next/navigation";
import { getApplicationById } from "@/lib/data/applications";
import { formatDate, initials } from "@/lib/format";
import { DEADLINE_TYPE_LABELS, WORK_MODE_LABELS } from "@/lib/status-meta";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { SetPageTitle } from "@/components/layout/set-page-title";
import { DeleteApplicationButton } from "@/components/applications/delete-application-button";
import { ArrowLeftIcon, ExternalLinkIcon } from "@/components/icons";

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-medium uppercase tracking-wide text-slate-400 dark:text-slate-500">
        {label}
      </dt>
      <dd className="mt-1 text-sm text-slate-800 dark:text-slate-100">
        {value || "—"}
      </dd>
    </div>
  );
}

export default async function ApplicationDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const application = await getApplicationById(id);

  if (!application) {
    notFound();
  }

  const sortedDeadlines = [...application.deadlines].sort(
    (a, b) => a.dueAt.getTime() - b.dueAt.getTime()
  );

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6">
      <SetPageTitle title={`${application.company} · ${application.position}`} />

      <Link
        href="/applications"
        className="flex w-fit items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
      >
        <ArrowLeftIcon className="h-4 w-4" />
        Back to applications
      </Link>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-lg font-semibold text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300">
            {initials(application.company)}
          </span>
          <div>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-50">
              {application.position}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {application.company}
              {application.location ? ` · ${application.location}` : ""}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <StatusBadge status={application.status} />
          {application.jobUrl ? (
            <a
              href={application.jobUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              Job Posting
              <ExternalLinkIcon className="h-4 w-4" />
            </a>
          ) : null}
          <Link
            href={`/applications/${application.id}/edit`}
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            Edit
          </Link>
          <DeleteApplicationButton id={application.id} />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Overview</CardTitle>
        </CardHeader>
        <CardBody>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3">
            <DetailRow label="Work Mode" value={WORK_MODE_LABELS[application.workMode]} />
            <DetailRow label="Salary" value={application.salary ?? ""} />
            <DetailRow
              label="Date Applied"
              value={formatDate(application.dateApplied)}
            />
            <DetailRow label="Recruiter" value={application.recruiterName ?? ""} />
            <DetailRow
              label="Recruiter Email"
              value={application.recruiterEmail ?? ""}
            />
            <DetailRow label="Resume" value={application.resume?.name ?? ""} />
          </dl>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Timeline</CardTitle>
        </CardHeader>
        <CardBody>
          {sortedDeadlines.length === 0 ? (
            <p className="text-sm text-slate-500 dark:text-slate-400">
              No deadlines recorded for this application yet.
            </p>
          ) : (
            <dl className="grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3">
              {sortedDeadlines.map((deadline) => (
                <DetailRow
                  key={deadline.id}
                  label={DEADLINE_TYPE_LABELS[deadline.type]}
                  value={formatDate(deadline.dueAt)}
                />
              ))}
            </dl>
          )}
        </CardBody>
      </Card>

      {application.jobDescription ? (
        <Card>
          <CardHeader>
            <CardTitle>Job Description</CardTitle>
          </CardHeader>
          <CardBody>
            <p className="whitespace-pre-line text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              {application.jobDescription}
            </p>
          </CardBody>
        </Card>
      ) : null}

      {application.notes ? (
        <Card>
          <CardHeader>
            <CardTitle>Notes</CardTitle>
          </CardHeader>
          <CardBody>
            <p className="whitespace-pre-line text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              {application.notes}
            </p>
          </CardBody>
        </Card>
      ) : null}
    </div>
  );
}
