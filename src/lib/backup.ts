import { courseStore } from "./course-progress";
import { isRecord } from "./local-store";
import { planStore } from "./plan-progress";

/** One JSON file holding both the 100-day plan and the Rust course progress. */
export function exportBackup() {
  return JSON.stringify(
    { app: "plan01", version: 1, exportedAt: new Date().toISOString(), plan: planStore.get(), course: courseStore.get() },
    null,
    2,
  );
}

/** Restores a file made by exportBackup. Throws, changing nothing, if the file is invalid. */
export function importBackup(text: string) {
  const data: unknown = JSON.parse(text);
  if (!isRecord(data) || data.app !== "plan01") throw new Error("Not a Plan01 backup");
  const plan = planStore.parse(data.plan);
  const course = courseStore.parse(data.course);
  planStore.set(plan);
  courseStore.set(course);
}

/** Clears all progress and notes. */
export function resetAll() {
  planStore.set(planStore.empty);
  courseStore.set(courseStore.empty);
}
