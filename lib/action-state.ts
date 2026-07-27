import type { ApplicationFieldErrors } from "./validation";

export interface ApplicationActionState {
  status: "idle" | "error";
  error?: string;
  fieldErrors?: ApplicationFieldErrors;
}

export const initialApplicationActionState: ApplicationActionState = {
  status: "idle",
};
