import { courseStore, type CourseProgress } from "./course-progress";
import { planStore, type PlanProgress } from "./plan-progress";
import { planTotals } from "./schedule";

/** XP for everything besides study time, which earns 1 XP per minute. */
export const XP = { task: 10, video: 5, courseTask: 10 } as const;

export type Level = { level: number; name: string; min: number };

// Rust-flavoured ranks. The whole plan is worth ~42,000 XP, so the last rank
// arrives around 80% of the way, and the first ranks come within days.
export const LEVELS: Level[] = [
  { level: 1, name: "Hatchling Rustacean", min: 0 },
  { level: 2, name: "Cargo Cadet", min: 600 },
  { level: 3, name: "Borrow Checker Apprentice", min: 1800 },
  { level: 4, name: "Lifetime Wrangler", min: 3600 },
  { level: 5, name: "Trait Tamer", min: 6000 },
  { level: 6, name: "Async Adept", min: 9000 },
  { level: 7, name: "Anchor Architect", min: 13000 },
  { level: 8, name: "Chain Smith", min: 18000 },
  { level: 9, name: "Rollup Engineer", min: 24000 },
  { level: 10, name: "Core Rustacean", min: 32000 },
];

export function totalXp(plan: PlanProgress, course: CourseProgress) {
  return (
    planTotals(plan).done +
    Object.keys(plan.tasks).length * XP.task +
    Object.keys(course.watched).length * XP.video +
    Object.keys(course.tasks).length * XP.courseTask
  );
}

export function levelInfo(xp: number) {
  const current = [...LEVELS].reverse().find((l) => xp >= l.min) ?? LEVELS[0];
  const next = LEVELS.find((l) => l.min > xp) ?? null;
  const progress = next ? (xp - current.min) / (next.min - current.min) : 1;
  return { ...current, next, progress, xp };
}

/** Level from the stores right now; for event handlers comparing before and after an action. */
export const currentLevel = () => levelInfo(totalXp(planStore.get(), courseStore.get()));
