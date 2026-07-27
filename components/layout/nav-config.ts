import type { ComponentType } from "react";
import {
  BriefcaseIcon,
  CalendarIcon,
  DashboardIcon,
  FileIcon,
  MailIcon,
  SettingsIcon,
  UsersIcon,
  type IconProps,
} from "../icons";

export interface NavItem {
  href: string;
  label: string;
  icon: ComponentType<IconProps>;
}

export const NAV_ITEMS: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: DashboardIcon },
  { href: "/applications", label: "Applications", icon: BriefcaseIcon },
  { href: "/contacts", label: "Contacts", icon: UsersIcon },
  { href: "/deadlines", label: "Deadlines", icon: CalendarIcon },
  { href: "/resumes", label: "Resumes", icon: FileIcon },
  { href: "/email", label: "Email", icon: MailIcon },
  { href: "/settings", label: "Settings", icon: SettingsIcon },
];

export const PAGE_TITLES: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/applications": "Applications",
  "/applications/new": "New Application",
  "/contacts": "Contacts",
  "/deadlines": "Deadlines",
  "/resumes": "Resumes",
  "/email": "Email",
  "/settings": "Settings",
};
