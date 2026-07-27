"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeftIcon, XIcon } from "../icons";
import { NAV_ITEMS } from "./nav-config";

interface SidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Sidebar({
  collapsed,
  onToggleCollapse,
  mobileOpen,
  onCloseMobile,
}: SidebarProps) {
  const pathname = usePathname();

  const nav = (
    <nav className="flex flex-1 flex-col gap-1 px-3 py-2">
      {NAV_ITEMS.map((item) => {
        const active = isActive(pathname, item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onCloseMobile}
            title={collapsed ? item.label : undefined}
            aria-label={item.label}
            aria-current={active ? "page" : undefined}
            className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
              active
                ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
            }`}
          >
            <item.icon
              aria-hidden="true"
              className={`h-5 w-5 shrink-0 ${
                active
                  ? "text-indigo-600 dark:text-indigo-300"
                  : "text-slate-400 group-hover:text-slate-600 dark:text-slate-500 dark:group-hover:text-slate-300"
              }`}
            />
            <span
              className={`truncate transition-opacity ${
                collapsed ? "lg:hidden lg:opacity-0" : "opacity-100"
              }`}
            >
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen ? (
        <div
          className="fixed inset-0 z-40 bg-slate-900/40 lg:hidden"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      ) : null}

      {/* Mobile drawer */}
      <aside
        inert={!mobileOpen}
        className={`fixed inset-y-0 left-0 z-50 w-72 transform border-r border-slate-200 bg-white transition-transform duration-200 ease-out dark:border-slate-800 dark:bg-slate-900 lg:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-slate-200 px-4 dark:border-slate-800">
          <span className="text-base font-semibold text-slate-900 dark:text-slate-50">
            AI Job Hunt Copilot
          </span>
          <button
            type="button"
            onClick={onCloseMobile}
            className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
            aria-label="Close menu"
          >
            <XIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        {nav}
      </aside>

      {/* Desktop sidebar */}
      <aside
        className={`hidden shrink-0 border-r border-slate-200 bg-white transition-all duration-200 ease-out dark:border-slate-800 dark:bg-slate-900 lg:flex lg:flex-col ${
          collapsed ? "lg:w-[76px]" : "lg:w-64"
        }`}
      >
        <div className="flex h-16 items-center gap-2 border-b border-slate-200 px-4 dark:border-slate-800">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-600 text-sm font-bold text-white">
            AI
          </span>
          <span
            className={`truncate text-sm font-semibold text-slate-900 transition-opacity dark:text-slate-50 ${
              collapsed ? "opacity-0" : "opacity-100"
            }`}
          >
            Job Hunt Copilot
          </span>
        </div>
        {nav}
        <div className="border-t border-slate-200 p-3 dark:border-slate-800">
          <button
            type="button"
            onClick={onToggleCollapse}
            className="flex w-full items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <ChevronLeftIcon
              aria-hidden="true"
              className={`h-4 w-4 transition-transform ${
                collapsed ? "rotate-180" : ""
              }`}
            />
            <span className={collapsed ? "hidden" : "inline"}>Collapse</span>
          </button>
        </div>
      </aside>
    </>
  );
}
