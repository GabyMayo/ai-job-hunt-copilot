import { EmptyState } from "@/components/ui/empty-state";
import { CalendarIcon } from "@/components/icons";

export default function DeadlinesPage() {
  return (
    <div className="flex h-full flex-col">
      <EmptyState
        icon={CalendarIcon}
        title="A dedicated Deadlines view is coming soon"
        description="A full calendar of application, OA, and interview deadlines will live here. For now, check the Upcoming Deadlines panel on the Dashboard."
        note="Not yet built"
      />
    </div>
  );
}
