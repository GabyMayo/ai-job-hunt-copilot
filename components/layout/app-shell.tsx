"use client";

import { useState, type ReactNode } from "react";
import type { UpcomingDeadlineFeedItem } from "@/lib/types";
import { Header } from "./header";
import { Sidebar } from "./sidebar";

interface AppShellProps {
  children: ReactNode;
  upcomingDeadlines: UpcomingDeadlineFeedItem[];
}

export function AppShell({ children, upcomingDeadlines }: AppShellProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-dvh overflow-hidden bg-slate-50 dark:bg-slate-950">
      <Sidebar
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed((value) => !value)}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <Header
          onOpenMobileMenu={() => setMobileOpen(true)}
          upcomingDeadlines={upcomingDeadlines}
        />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
