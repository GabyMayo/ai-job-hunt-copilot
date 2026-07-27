import { EmptyState } from "@/components/ui/empty-state";
import { SettingsIcon } from "@/components/icons";

export default function SettingsPage() {
  return (
    <div className="flex h-full flex-col">
      <EmptyState
        icon={SettingsIcon}
        title="Settings are coming in a future phase"
        description="Profile, notification, and integration preferences will live here. This page is a placeholder in the Phase 1 prototype."
        note="Not yet built"
      />
    </div>
  );
}
