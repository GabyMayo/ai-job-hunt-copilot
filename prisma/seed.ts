import "dotenv/config";
import { prisma } from "../lib/prisma";
import { DEMO_USER_ID } from "../lib/current-user";
import {
  ApplicationStatus,
  DeadlineType,
  WorkMode,
} from "../lib/generated/prisma/client";

interface SeedApplication {
  company: string;
  position: string;
  jobUrl: string;
  location: string;
  workMode: WorkMode;
  status: ApplicationStatus;
  dateApplied: string;
  salary: string;
  recruiterName: string;
  applicationDeadline: string;
  oaDeadline: string;
  interviewDate: string;
  resumeVersion: string;
  jobDescription: string;
  notes: string;
}

const RESUME_VERSIONS = [
  "SWE_Resume_v1.pdf",
  "SWE_Resume_v2.pdf",
  "SWE_Resume_v3.pdf",
];

const SEED_APPLICATIONS: SeedApplication[] = [
  {
    company: "Google",
    position: "Software Engineering Intern",
    jobUrl: "https://careers.google.com/jobs/results/",
    location: "Mountain View, CA",
    workMode: WorkMode.HYBRID,
    status: ApplicationStatus.INTERVIEWING,
    dateApplied: "2026-06-02",
    salary: "$52/hr",
    recruiterName: "Priya Nandakumar",
    applicationDeadline: "2026-06-05",
    oaDeadline: "2026-06-20",
    interviewDate: "2026-08-04",
    resumeVersion: "SWE_Resume_v3.pdf",
    jobDescription:
      "Work with a product team to design, build, and ship features used by millions of users. Rotations available across Search, Cloud, and YouTube.",
    notes: "Referral from Alex on the Cloud team. Final loop scheduled.",
  },
  {
    company: "Stripe",
    position: "Software Engineer Intern, Payments",
    jobUrl: "https://stripe.com/jobs/listing/",
    location: "San Francisco, CA",
    workMode: WorkMode.REMOTE,
    status: ApplicationStatus.APPLIED,
    dateApplied: "2026-07-10",
    salary: "$8,800/mo",
    recruiterName: "Jordan Meyers",
    applicationDeadline: "2026-07-15",
    oaDeadline: "",
    interviewDate: "",
    resumeVersion: "SWE_Resume_v3.pdf",
    jobDescription:
      "Build reliable, high-throughput payment infrastructure used by millions of businesses worldwide.",
    notes: "Applied through university portal.",
  },
  {
    company: "Meta",
    position: "Software Engineer Intern",
    jobUrl: "https://www.metacareers.com/jobs/",
    location: "Menlo Park, CA",
    workMode: WorkMode.ONSITE,
    status: ApplicationStatus.ONLINE_ASSESSMENT,
    dateApplied: "2026-06-18",
    salary: "$9,200/mo",
    recruiterName: "Devon Wu",
    applicationDeadline: "2026-06-20",
    oaDeadline: "2026-08-01",
    interviewDate: "",
    resumeVersion: "SWE_Resume_v2.pdf",
    jobDescription:
      "Contribute to core infrastructure or product surfaces across the family of apps, with mentorship from senior engineers.",
    notes: "OA covers data structures + a product sense question.",
  },
  {
    company: "Databricks",
    position: "SWE Intern, Data Platform",
    jobUrl: "https://www.databricks.com/company/careers/",
    location: "San Francisco, CA",
    workMode: WorkMode.HYBRID,
    status: ApplicationStatus.OFFER,
    dateApplied: "2026-05-14",
    salary: "$55/hr",
    recruiterName: "Elena Torres",
    applicationDeadline: "2026-05-16",
    oaDeadline: "2026-05-30",
    interviewDate: "2026-06-25",
    resumeVersion: "SWE_Resume_v2.pdf",
    jobDescription:
      "Work on the distributed systems team powering large-scale data pipelines on the Lakehouse platform.",
    notes: "Offer received, deadline to respond is 2026-08-15.",
  },
  {
    company: "Airbnb",
    position: "Software Engineering Intern",
    jobUrl: "https://careers.airbnb.com/positions/",
    location: "San Francisco, CA",
    workMode: WorkMode.HYBRID,
    status: ApplicationStatus.REJECTED,
    dateApplied: "2026-05-02",
    salary: "$9,000/mo",
    recruiterName: "Michael Ortiz",
    applicationDeadline: "2026-05-05",
    oaDeadline: "2026-05-20",
    interviewDate: "2026-06-03",
    resumeVersion: "SWE_Resume_v1.pdf",
    jobDescription:
      "Full-stack internship on the Guest Experience team, working across React frontend and Ruby backend services.",
    notes: "Made it to final round, passed on more backend-heavy candidate.",
  },
  {
    company: "Two Sigma",
    position: "Software Engineer Intern",
    jobUrl: "https://careers.twosigma.com/",
    location: "New York, NY",
    workMode: WorkMode.ONSITE,
    status: ApplicationStatus.BOOKMARKED,
    dateApplied: "",
    salary: "$60/hr",
    recruiterName: "",
    applicationDeadline: "2026-08-15",
    oaDeadline: "",
    interviewDate: "",
    resumeVersion: "SWE_Resume_v3.pdf",
    jobDescription:
      "Build tools and infrastructure for quantitative research teams, with exposure to distributed systems at scale.",
    notes: "Need to tailor resume bullets toward systems work before applying.",
  },
  {
    company: "Jane Street",
    position: "Software Engineering Intern",
    jobUrl: "https://www.janestreet.com/join-jane-street/",
    location: "New York, NY",
    workMode: WorkMode.ONSITE,
    status: ApplicationStatus.APPLIED,
    dateApplied: "2026-07-05",
    salary: "$11,000/mo",
    recruiterName: "Casey Lin",
    applicationDeadline: "2026-07-08",
    oaDeadline: "2026-08-10",
    interviewDate: "",
    resumeVersion: "SWE_Resume_v3.pdf",
    jobDescription:
      "Rotational internship across trading systems, tooling, and infrastructure teams using OCaml and Python.",
    notes: "Known for a hard OA — brush up on functional programming.",
  },
  {
    company: "Bloomberg",
    position: "Software Engineer Intern",
    jobUrl: "https://careers.bloomberg.com/job/detail/",
    location: "New York, NY",
    workMode: WorkMode.HYBRID,
    status: ApplicationStatus.ONLINE_ASSESSMENT,
    dateApplied: "2026-06-22",
    salary: "$48/hr",
    recruiterName: "Nina Petrov",
    applicationDeadline: "2026-06-25",
    oaDeadline: "2026-08-06",
    interviewDate: "",
    resumeVersion: "SWE_Resume_v2.pdf",
    jobDescription:
      "Join an engineering team building tools for the financial data terminal used by professionals worldwide.",
    notes: "",
  },
  {
    company: "Palantir",
    position: "Software Engineer Intern",
    jobUrl: "https://jobs.lever.co/palantir/",
    location: "Denver, CO",
    workMode: WorkMode.REMOTE,
    status: ApplicationStatus.INTERVIEWING,
    dateApplied: "2026-06-10",
    salary: "$50/hr",
    recruiterName: "Sam Whitfield",
    applicationDeadline: "2026-06-12",
    oaDeadline: "2026-06-28",
    interviewDate: "2026-07-31",
    resumeVersion: "SWE_Resume_v3.pdf",
    jobDescription:
      "Deployed engineering internship embedded with a customer team, shipping software directly into production workflows.",
    notes: "First-round behavioral went well, technical round upcoming.",
  },
  {
    company: "Notion",
    position: "Software Engineering Intern",
    jobUrl: "https://www.notion.so/careers/",
    location: "San Francisco, CA",
    workMode: WorkMode.HYBRID,
    status: ApplicationStatus.APPLIED,
    dateApplied: "2026-07-14",
    salary: "$9,500/mo",
    recruiterName: "",
    applicationDeadline: "2026-07-18",
    oaDeadline: "",
    interviewDate: "",
    resumeVersion: "SWE_Resume_v3.pdf",
    jobDescription:
      "Small, high-leverage engineering team; interns own real product surfaces from day one.",
    notes: "Cover letter emphasized side project built with their API.",
  },
  {
    company: "Figma",
    position: "Software Engineer Intern",
    jobUrl: "https://www.figma.com/careers/",
    location: "San Francisco, CA",
    workMode: WorkMode.REMOTE,
    status: ApplicationStatus.BOOKMARKED,
    dateApplied: "",
    salary: "$54/hr",
    recruiterName: "",
    applicationDeadline: "2026-08-22",
    oaDeadline: "",
    interviewDate: "",
    resumeVersion: "SWE_Resume_v3.pdf",
    jobDescription:
      "Work on the performance team optimizing the multiplayer canvas engine used by millions of designers.",
    notes: "Portfolio site should highlight the canvas rendering project.",
  },
  {
    company: "Rippling",
    position: "Software Engineering Intern",
    jobUrl: "https://www.rippling.com/careers/",
    location: "San Francisco, CA",
    workMode: WorkMode.ONSITE,
    status: ApplicationStatus.APPLIED,
    dateApplied: "2026-07-01",
    salary: "$46/hr",
    recruiterName: "Grace Kim",
    applicationDeadline: "2026-07-03",
    oaDeadline: "2026-07-25",
    interviewDate: "",
    resumeVersion: "SWE_Resume_v2.pdf",
    jobDescription:
      "Ship full-stack features across Rippling's unified HR, IT, and Finance platform.",
    notes: "",
  },
  {
    company: "Datadog",
    position: "Software Engineer Intern",
    jobUrl: "https://careers.datadoghq.com/",
    location: "New York, NY",
    workMode: WorkMode.HYBRID,
    status: ApplicationStatus.REJECTED,
    dateApplied: "2026-04-20",
    salary: "$45/hr",
    recruiterName: "Tom Bracey",
    applicationDeadline: "2026-04-22",
    oaDeadline: "2026-05-05",
    interviewDate: "2026-05-19",
    resumeVersion: "SWE_Resume_v1.pdf",
    jobDescription:
      "Internship on the metrics ingestion pipeline team, working in Go and distributed systems at scale.",
    notes: "Good practice interview, team was already full for the cycle.",
  },
  {
    company: "Snowflake",
    position: "Software Engineering Intern",
    jobUrl: "https://careers.snowflake.com/",
    location: "Bozeman, MT",
    workMode: WorkMode.REMOTE,
    status: ApplicationStatus.OFFER,
    dateApplied: "2026-05-08",
    salary: "$53/hr",
    recruiterName: "Hannah Ostrowski",
    applicationDeadline: "2026-05-10",
    oaDeadline: "2026-05-24",
    interviewDate: "2026-06-15",
    resumeVersion: "SWE_Resume_v2.pdf",
    jobDescription:
      "Contribute to the query execution engine team, focused on performance and reliability at petabyte scale.",
    notes: "Offer deadline 2026-08-01 — decide after Google and Palantir loops.",
  },
];

function parseDate(value: string): Date | null {
  return value ? new Date(`${value}T00:00:00`) : null;
}

async function main() {
  console.log(`Seeding as user ${DEMO_USER_ID}...`);

  // Idempotent: clear this user's existing seeded data before recreating it.
  // Deadlines/contacts cascade or unlink automatically when applications are deleted.
  await prisma.application.deleteMany({ where: { userId: DEMO_USER_ID } });
  await prisma.resume.deleteMany({ where: { userId: DEMO_USER_ID } });
  await prisma.contact.deleteMany({ where: { userId: DEMO_USER_ID } });
  await prisma.deadline.deleteMany({ where: { userId: DEMO_USER_ID } });

  await prisma.user.upsert({
    where: { id: DEMO_USER_ID },
    update: {},
    create: {
      id: DEMO_USER_ID,
      name: "Demo User",
      email: "demo@ai-job-hunt-copilot.local",
    },
  });

  const resumeByVersion = new Map<string, string>();
  for (const [index, name] of RESUME_VERSIONS.entries()) {
    const resume = await prisma.resume.create({
      data: {
        userId: DEMO_USER_ID,
        name,
        isDefault: index === RESUME_VERSIONS.length - 1,
      },
    });
    resumeByVersion.set(name, resume.id);
  }

  for (const app of SEED_APPLICATIONS) {
    const deadlines: { type: DeadlineType; title: string; dueAt: Date; userId: string }[] =
      [];

    if (app.applicationDeadline) {
      deadlines.push({
        type: DeadlineType.APPLICATION,
        title: "Application due",
        dueAt: parseDate(app.applicationDeadline)!,
        userId: DEMO_USER_ID,
      });
    }
    if (app.oaDeadline) {
      deadlines.push({
        type: DeadlineType.ONLINE_ASSESSMENT,
        title: "Online assessment due",
        dueAt: parseDate(app.oaDeadline)!,
        userId: DEMO_USER_ID,
      });
    }
    if (app.interviewDate) {
      deadlines.push({
        type: DeadlineType.INTERVIEW,
        title: "Interview",
        dueAt: parseDate(app.interviewDate)!,
        userId: DEMO_USER_ID,
      });
    }

    await prisma.application.create({
      data: {
        userId: DEMO_USER_ID,
        company: app.company,
        position: app.position,
        jobUrl: app.jobUrl || null,
        location: app.location || null,
        workMode: app.workMode,
        salary: app.salary || null,
        status: app.status,
        dateApplied: parseDate(app.dateApplied),
        recruiterName: app.recruiterName || null,
        jobDescription: app.jobDescription || null,
        notes: app.notes || null,
        resumeId: resumeByVersion.get(app.resumeVersion) ?? null,
        deadlines: deadlines.length ? { create: deadlines } : undefined,
      },
    });
  }

  console.log(
    `Seeded ${SEED_APPLICATIONS.length} applications and ${RESUME_VERSIONS.length} resumes.`
  );
}

main()
  .catch((err) => {
    console.error("Seed failed:", err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
