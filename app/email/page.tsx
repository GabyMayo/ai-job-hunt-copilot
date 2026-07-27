import { EmptyState } from "@/components/ui/empty-state";
import { MailIcon } from "@/components/icons";

export default function EmailPage() {
  return (
    <div className="flex h-full flex-col">
      <EmptyState
        icon={MailIcon}
        title="Email integration is coming in a future phase"
        description="A future phase will surface recruiter emails and auto-detect status updates. This page is a placeholder in the Phase 1 prototype."
        note="Not yet built"
      />
    </div>
  );
}
