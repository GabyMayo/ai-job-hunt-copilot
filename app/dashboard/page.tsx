import Link from "next/link";
import { listApplications, listUpcomingDeadlines } from "@/lib/data/applications";
import { daysUntil } from "@/lib/format";
import { isActiveStatus, isInterviewStage } from "@/lib/status-meta";
import { toUpcomingDeadlineFeedItems } from "@/lib/application-utils";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/ui/stat-card";
import { ApplicationTable } from "@/components/applications/application-table";
import { PipelineBoard } from "@/components/dashboard/pipeline-board";
import { DeadlinesPanel } from "@/components/dashboard/deadlines-panel";
import {
  BriefcaseIcon,
  CalendarIcon,
  TrendingUpIcon,
  UsersIcon,
} from "@/components/icons";

export default async function DashboardPage() {
  const [applications, deadlineRows] = await Promise.all([
    listApplications(),
    listUpcomingDeadlines(),
  ]);
  const deadlines = toUpcomingDeadlineFeedItems(deadlineRows);

  const total = applications.length;
  const active = applications.filter((app) => isActiveStatus(app.status)).length;
  const interviewing = applications.filter((app) =>
    isInterviewStage(app.status)
  ).length;
  const upcomingDeadlines = deadlines.filter((deadline) => {
    const days = daysUntil(deadline.date);
    return days !== null && days >= 0 && days <= 14;
  }).length;

  const recent = [...applications]
    .filter((app) => app.dateApplied)
    .sort(
      (a, b) => (b.dateApplied?.getTime() ?? 0) - (a.dateApplied?.getTime() ?? 0)
    )
    .slice(0, 5);

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total Applications"
          value={total}
          hint="All time"
          icon={BriefcaseIcon}
          tone="blue"
        />
        <StatCard
          label="Active Applications"
          value={active}
          hint="Excludes rejected & withdrawn"
          icon={TrendingUpIcon}
          tone="emerald"
        />
        <StatCard
          label="Interviews"
          value={interviewing}
          hint="Screen, interview, or final round"
          icon={UsersIcon}
          tone="violet"
        />
        <StatCard
          label="Upcoming Deadlines"
          value={upcomingDeadlines}
          hint="Next 14 days"
          icon={CalendarIcon}
          tone="amber"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Application Pipeline</CardTitle>
        </CardHeader>
        <CardBody>
          <PipelineBoard applications={applications} />
        </CardBody>
      </Card>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>Recent Applications</CardTitle>
            <Link
              href="/applications"
              className="text-xs font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
            >
              View all
            </Link>
          </CardHeader>
          <ApplicationTable
            applications={recent}
            emptyMessage="No applications yet. Add your first one to get started."
          />
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Deadlines</CardTitle>
            <Link
              href="/deadlines"
              className="text-xs font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
            >
              View all
            </Link>
          </CardHeader>
          <DeadlinesPanel deadlines={deadlines} />
        </Card>
      </div>
    </div>
  );
}
