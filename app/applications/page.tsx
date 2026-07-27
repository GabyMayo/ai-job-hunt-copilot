import { Suspense } from "react";
import { listApplications } from "@/lib/data/applications";
import { ApplicationsView } from "@/components/applications/applications-view";

async function ApplicationsData() {
  const applications = await listApplications();
  return <ApplicationsView applications={applications} />;
}

export default function ApplicationsPage() {
  return (
    <Suspense fallback={null}>
      <ApplicationsData />
    </Suspense>
  );
}
