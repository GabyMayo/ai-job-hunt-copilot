import Link from "next/link";
import { EmptyState } from "@/components/ui/empty-state";
import { ArrowLeftIcon, BriefcaseIcon } from "@/components/icons";

export default function ApplicationNotFound() {
  return (
    <div className="flex flex-col gap-6">
      <Link
        href="/applications"
        className="flex w-fit items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
      >
        <ArrowLeftIcon className="h-4 w-4" />
        Back to applications
      </Link>
      <EmptyState
        icon={BriefcaseIcon}
        title="Application not found"
        description="This application may have been deleted, or the link is incorrect."
      />
    </div>
  );
}
