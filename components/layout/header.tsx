"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState, type SubmitEvent } from "react";
import { daysUntil, relativeDayLabel } from "@/lib/format";
import { usePageTitleValue } from "@/lib/page-title-context";
import type { UpcomingDeadlineFeedItem } from "@/lib/types";
import { BellIcon, MenuIcon, PlusIcon, SearchIcon } from "../icons";
import { PAGE_TITLES } from "./nav-config";

function usePageTitle() {
  const pathname = usePathname();
  const override = usePageTitleValue();

  if (override) return override;
  if (PAGE_TITLES[pathname]) return PAGE_TITLES[pathname];
  if (pathname.startsWith("/applications/")) return "Application Details";
  return "AI Job Hunt Copilot";
}

interface HeaderProps {
  onOpenMobileMenu: () => void;
  upcomingDeadlines: UpcomingDeadlineFeedItem[];
}

export function Header({ onOpenMobileMenu, upcomingDeadlines }: HeaderProps) {
  const router = useRouter();
  const title = usePageTitle();
  const [query, setQuery] = useState("");
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const notificationsRef = useRef<HTMLDivElement>(null);

  const upcoming = upcomingDeadlines
    .map((deadline) => ({ deadline, days: daysUntil(deadline.date) }))
    .filter((entry) => entry.days !== null && entry.days >= 0 && entry.days <= 5)
    .sort((a, b) => (a.days ?? 0) - (b.days ?? 0))
    .slice(0, 5);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target as Node)
      ) {
        setNotificationsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSearchSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = query.trim();
    router.push(trimmed ? `/applications?q=${encodeURIComponent(trimmed)}` : "/applications");
  }

  return (
    <header className="flex h-16 shrink-0 items-center gap-3 border-b border-slate-200 bg-white px-4 dark:border-slate-800 dark:bg-slate-900 sm:px-6">
      <button
        type="button"
        onClick={onOpenMobileMenu}
        className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 lg:hidden"
        aria-label="Open menu"
      >
        <MenuIcon className="h-5 w-5" aria-hidden="true" />
      </button>

      <h1 className="min-w-0 flex-1 truncate text-lg font-semibold text-slate-900 dark:text-slate-50 sm:flex-none">
        {title}
      </h1>

      <Link
        href="/applications"
        aria-label="Search applications"
        className="ml-auto rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 sm:hidden"
      >
        <SearchIcon className="h-5 w-5" aria-hidden="true" />
      </Link>

      <form
        onSubmit={handleSearchSubmit}
        className="ml-auto hidden min-w-0 flex-1 max-w-sm items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 focus-within:border-indigo-400 focus-within:ring-1 focus-within:ring-indigo-400 dark:border-slate-700 dark:bg-slate-800 sm:flex"
      >
        <SearchIcon className="h-4 w-4 shrink-0 text-slate-400" aria-hidden="true" />
        <label htmlFor="global-search" className="sr-only">
          Search applications by company or position
        </label>
        <input
          id="global-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search company or position…"
          className="w-full min-w-0 bg-transparent text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none dark:text-slate-200"
        />
      </form>

      <div className="relative" ref={notificationsRef}>
        <button
          type="button"
          onClick={() => setNotificationsOpen((open) => !open)}
          className="relative rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
          aria-label="Notifications"
          aria-haspopup="true"
          aria-expanded={notificationsOpen}
        >
          <BellIcon className="h-5 w-5" aria-hidden="true" />
          {upcoming.length > 0 ? (
            <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-semibold text-white">
              {upcoming.length}
            </span>
          ) : null}
        </button>

        {notificationsOpen ? (
          <div className="absolute right-0 z-50 mt-2 w-72 max-w-[calc(100vw-2rem)] rounded-xl border border-slate-200 bg-white p-2 shadow-lg dark:border-slate-800 dark:bg-slate-900 sm:w-80">
            <div className="px-2 py-1.5 text-xs font-semibold uppercase tracking-wide text-slate-400">
              Upcoming (next 5 days)
            </div>
            {upcoming.length === 0 ? (
              <p className="px-2 py-3 text-sm text-slate-500 dark:text-slate-400">
                Nothing due soon. You&apos;re all caught up.
              </p>
            ) : (
              <ul className="max-h-72 overflow-y-auto">
                {upcoming.map(({ deadline }) => (
                  <li key={deadline.id}>
                    <Link
                      href={`/applications/${deadline.applicationId}`}
                      onClick={() => setNotificationsOpen(false)}
                      className="block rounded-lg px-2 py-2 hover:bg-slate-50 dark:hover:bg-slate-800"
                    >
                      <p className="text-sm font-medium text-slate-800 dark:text-slate-100">
                        {deadline.company} — {deadline.label}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {deadline.position} · {relativeDayLabel(deadline.date)}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ) : null}
      </div>

      <Link
        href="/applications/new"
        aria-label="Add Application"
        className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-500"
      >
        <PlusIcon className="h-4 w-4" aria-hidden="true" />
        <span className="hidden sm:inline">Add Application</span>
      </Link>
    </header>
  );
}
