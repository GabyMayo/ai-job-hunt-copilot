import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AppShell } from "@/components/layout/app-shell";
import { PageTitleProvider } from "@/lib/page-title-context";
import { listUpcomingDeadlines } from "@/lib/data/applications";
import { toUpcomingDeadlineFeedItems } from "@/lib/application-utils";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Job Hunt Copilot",
  description:
    "Track internship applications, deadlines, and contacts in one place.",
};

// Every page renders deadline urgency and "days away" labels computed from
// the current date. Static prerendering would bake in the build timestamp,
// causing stale content and a hydration mismatch once the client re-computes
// with the real current time. Force dynamic rendering app-wide instead.
export const dynamic = "force-dynamic";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const deadlines = await listUpcomingDeadlines();
  const upcomingDeadlines = toUpcomingDeadlineFeedItems(deadlines);

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="h-full">
        <PageTitleProvider>
          <AppShell upcomingDeadlines={upcomingDeadlines}>
            {children}
          </AppShell>
        </PageTitleProvider>
      </body>
    </html>
  );
}
