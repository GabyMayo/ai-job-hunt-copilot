"use client";

import { useSetPageTitle } from "@/lib/page-title-context";

export function SetPageTitle({ title }: { title: string }) {
  useSetPageTitle(title);
  return null;
}
