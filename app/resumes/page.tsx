import { EmptyState } from "@/components/ui/empty-state";
import { FileIcon } from "@/components/icons";

export default function ResumesPage() {
  return (
    <div className="flex h-full flex-col">
      <EmptyState
        icon={FileIcon}
        title="Resume management is coming in a future phase"
        description="Upload and version resumes, then tie each version to specific applications. This page is a placeholder in the Phase 1 prototype."
        note="Not yet built"
      />
    </div>
  );
}
