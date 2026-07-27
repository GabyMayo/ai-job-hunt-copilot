"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  createApplication,
  deleteApplication,
  updateApplication,
} from "@/lib/data/applications";
import {
  validateApplicationForm,
  type ApplicationFormValues,
} from "@/lib/validation";
import type { ApplicationActionState } from "@/lib/action-state";

function readFormValues(formData: FormData): ApplicationFormValues {
  const get = (key: string) =>
    (formData.get(key) as string | null)?.toString() ?? "";

  return {
    company: get("company"),
    position: get("position"),
    jobUrl: get("jobUrl"),
    location: get("location"),
    workMode: get("workMode"),
    status: get("status"),
    dateApplied: get("dateApplied"),
    salary: get("salary"),
    recruiterName: get("recruiterName"),
    recruiterEmail: get("recruiterEmail"),
    applicationDeadline: get("applicationDeadline"),
    oaDeadline: get("oaDeadline"),
    interviewDate: get("interviewDate"),
    resumeId: get("resumeId"),
    jobDescription: get("jobDescription"),
    notes: get("notes"),
  };
}

export async function createApplicationAction(
  _prevState: ApplicationActionState,
  formData: FormData
): Promise<ApplicationActionState> {
  const values = readFormValues(formData);
  const { valid, fieldErrors } = validateApplicationForm(values);
  if (!valid) {
    return {
      status: "error",
      error: "Please fix the highlighted fields.",
      fieldErrors,
    };
  }

  let createdId: string;
  try {
    const created = await createApplication(values);
    createdId = created.id;
  } catch {
    return {
      status: "error",
      error: "Could not save the application. Please try again.",
    };
  }

  revalidatePath("/dashboard");
  revalidatePath("/applications");
  redirect(`/applications/${createdId}`);
}

export async function updateApplicationAction(
  id: string,
  _prevState: ApplicationActionState,
  formData: FormData
): Promise<ApplicationActionState> {
  const values = readFormValues(formData);
  const { valid, fieldErrors } = validateApplicationForm(values);
  if (!valid) {
    return {
      status: "error",
      error: "Please fix the highlighted fields.",
      fieldErrors,
    };
  }

  try {
    await updateApplication(id, values);
  } catch {
    return {
      status: "error",
      error: "Could not save changes. Please try again.",
    };
  }

  revalidatePath("/dashboard");
  revalidatePath("/applications");
  revalidatePath(`/applications/${id}`);
  redirect(`/applications/${id}`);
}

export async function deleteApplicationAction(id: string) {
  await deleteApplication(id);
  revalidatePath("/dashboard");
  revalidatePath("/applications");
  redirect("/applications");
}
