import { prisma } from "@/lib/prisma";
import { getCurrentUserId } from "@/lib/current-user";
import { DeadlineType } from "@/lib/generated/prisma/client";
import type { ApplicationFormValues } from "@/lib/validation";
import type { ApplicationStatus, WorkMode } from "@/lib/generated/prisma/client";

const applicationInclude = {
  deadlines: true,
  resume: true,
} as const;

export async function listApplications() {
  const userId = await getCurrentUserId();
  return prisma.application.findMany({
    where: { userId },
    include: applicationInclude,
    orderBy: { createdAt: "desc" },
  });
}

export async function getApplicationById(id: string) {
  const userId = await getCurrentUserId();
  return prisma.application.findFirst({
    where: { id, userId },
    include: applicationInclude,
  });
}

export async function listResumeOptions() {
  const userId = await getCurrentUserId();
  return prisma.resume.findMany({
    where: { userId },
    select: { id: true, name: true },
    orderBy: { name: "asc" },
  });
}

export async function listUpcomingDeadlines() {
  const userId = await getCurrentUserId();
  return prisma.deadline.findMany({
    where: { userId, completed: false },
    include: {
      application: { select: { id: true, company: true, position: true } },
    },
    orderBy: { dueAt: "asc" },
  });
}

function parseDate(value: string): Date | null {
  return value ? new Date(`${value}T00:00:00`) : null;
}

function buildDeadlineInputs(values: ApplicationFormValues) {
  const entries: { type: DeadlineType; title: string; dueAt: Date }[] = [];

  if (values.applicationDeadline) {
    entries.push({
      type: DeadlineType.APPLICATION,
      title: "Application due",
      dueAt: parseDate(values.applicationDeadline)!,
    });
  }
  if (values.oaDeadline) {
    entries.push({
      type: DeadlineType.ONLINE_ASSESSMENT,
      title: "Online assessment due",
      dueAt: parseDate(values.oaDeadline)!,
    });
  }
  if (values.interviewDate) {
    entries.push({
      type: DeadlineType.INTERVIEW,
      title: "Interview",
      dueAt: parseDate(values.interviewDate)!,
    });
  }

  return entries;
}

function buildApplicationData(values: ApplicationFormValues) {
  return {
    company: values.company.trim(),
    position: values.position.trim(),
    jobUrl: values.jobUrl.trim() || null,
    location: values.location.trim() || null,
    workMode: values.workMode as WorkMode,
    salary: values.salary.trim() || null,
    status: values.status as ApplicationStatus,
    dateApplied: parseDate(values.dateApplied),
    recruiterName: values.recruiterName.trim() || null,
    recruiterEmail: values.recruiterEmail.trim() || null,
    jobDescription: values.jobDescription.trim() || null,
    notes: values.notes.trim() || null,
    resumeId: values.resumeId || null,
  };
}

export async function createApplication(values: ApplicationFormValues) {
  const userId = await getCurrentUserId();
  const deadlines = buildDeadlineInputs(values);

  return prisma.application.create({
    data: {
      ...buildApplicationData(values),
      userId,
      deadlines: deadlines.length
        ? { create: deadlines.map((deadline) => ({ ...deadline, userId })) }
        : undefined,
    },
    include: applicationInclude,
  });
}

export async function updateApplication(
  id: string,
  values: ApplicationFormValues
) {
  const userId = await getCurrentUserId();
  const deadlines = buildDeadlineInputs(values);

  return prisma.$transaction(async (tx) => {
    const existing = await tx.application.findFirst({
      where: { id, userId },
      select: { id: true },
    });
    if (!existing) {
      throw new Error("Application not found.");
    }

    await tx.deadline.deleteMany({
      where: {
        applicationId: id,
        type: {
          in: [
            DeadlineType.APPLICATION,
            DeadlineType.ONLINE_ASSESSMENT,
            DeadlineType.INTERVIEW,
          ],
        },
      },
    });

    return tx.application.update({
      where: { id },
      data: {
        ...buildApplicationData(values),
        deadlines: deadlines.length
          ? { create: deadlines.map((deadline) => ({ ...deadline, userId })) }
          : undefined,
      },
      include: applicationInclude,
    });
  });
}

export async function deleteApplication(id: string) {
  const userId = await getCurrentUserId();
  const existing = await prisma.application.findFirst({
    where: { id, userId },
    select: { id: true },
  });
  if (!existing) {
    throw new Error("Application not found.");
  }
  await prisma.application.delete({ where: { id } });
}
