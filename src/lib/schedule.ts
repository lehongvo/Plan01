import {
  PHASES,
  REVIEW_FOCUS,
  SLOTS,
  TOTAL_DAYS,
  TRACKS,
  WEEKS,
  type Focus,
  type Slot,
  type TrackId,
} from "@/data/plan";
import { daysBetween, weekdayOf } from "./dates";
import { planTaskKey, slotKey, type PlanProgress } from "./plan-progress";

export const DAYS = Array.from({ length: TOTAL_DAYS }, (_, i) => i + 1);

export const weekOf = (day: number) => Math.ceil(day / 7);

export const daysOfWeek = (week: number) => DAYS.filter((day) => weekOf(day) === week);

export const phaseOf = (day: number) => PHASES.find((p) => day >= p.firstDay && day <= p.lastDay) ?? PHASES[0];

export const trackById = (id: TrackId) => TRACKS.find((t) => t.id === id) ?? TRACKS[0];

/** Study slots for a plan day; weekend days follow the calendar, not the plan week. */
export function slotsFor(day: number, startDate: string): Slot[] {
  const weekday = weekdayOf(startDate) + day - 1;
  const dow = ((weekday % 7) + 7) % 7;
  if (dow === 6) return SLOTS.saturday;
  if (dow === 0) return SLOTS.sunday;
  return SLOTS.weekday;
}

export function focusFor(week: number, track: TrackId): Focus | null {
  if (track === "review") return REVIEW_FOCUS;
  return WEEKS.find((w) => w.week === week)?.focus[track] ?? null;
}

/** Plan day for a date: may be < 1 before the start or > 100 after the end. */
export function planDayFor(startDate: string, today: string) {
  return daysBetween(startDate, today) + 1;
}

export const clampDay = (day: number) => Math.min(TOTAL_DAYS, Math.max(1, day));

export function dayMinutes(day: number, progress: PlanProgress) {
  let planned = 0;
  let done = 0;
  for (const slot of slotsFor(day, progress.startDate)) {
    planned += slot.minutes;
    if (progress.slots[slotKey(day, slot.id)]) done += slot.minutes;
  }
  return { planned, done, complete: done === planned };
}

export function trackMinutes(track: TrackId, progress: PlanProgress) {
  let planned = 0;
  let done = 0;
  for (const day of DAYS) {
    for (const slot of slotsFor(day, progress.startDate)) {
      if (slot.track !== track) continue;
      planned += slot.minutes;
      if (progress.slots[slotKey(day, slot.id)]) done += slot.minutes;
    }
  }
  return { planned, done };
}

export function planTotals(progress: PlanProgress) {
  let planned = 0;
  let done = 0;
  let completeDays = 0;
  for (const day of DAYS) {
    const minutes = dayMinutes(day, progress);
    planned += minutes.planned;
    done += minutes.done;
    if (minutes.complete) completeDays += 1;
  }
  return { planned, done, completeDays };
}

/**
 * Fully completed days in a row, ending today, or yesterday while today is
 * still in progress.
 */
export function currentStreak(progress: PlanProgress, today: number) {
  let day = Math.min(today, TOTAL_DAYS);
  if (day >= 1 && !dayMinutes(day, progress).complete) day -= 1;
  let streak = 0;
  while (day >= 1 && dayMinutes(day, progress).complete) {
    streak += 1;
    day -= 1;
  }
  return streak;
}

export function focusTasksDone(week: number, track: TrackId, progress: PlanProgress) {
  const focus = focusFor(week, track);
  if (!focus) return { done: 0, total: 0 };
  const done = focus.tasks.filter((_, i) => progress.tasks[planTaskKey(week, track, i)]).length;
  return { done, total: focus.tasks.length };
}
