import { EmptyState } from "@/components/ui/empty-state";
import { UsersIcon } from "@/components/icons";

export default function ContactsPage() {
  return (
    <div className="flex h-full flex-col">
      <EmptyState
        icon={UsersIcon}
        title="Contacts is coming in a future phase"
        description="Track recruiters, referrals, and interviewers linked to each application. This page is a placeholder in the Phase 1 prototype."
        note="Not yet built"
      />
    </div>
  );
}
