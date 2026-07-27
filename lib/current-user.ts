/**
 * There's no authentication yet. Every Application/Contact/Deadline/Resume
 * row is scoped to this single seeded user so the schema's userId
 * foreign keys are satisfied. Swap this for a real session lookup once
 * auth ships — nothing else in the data layer should need to change.
 */
export const DEMO_USER_ID = "demo-user";

export async function getCurrentUserId(): Promise<string> {
  return DEMO_USER_ID;
}
