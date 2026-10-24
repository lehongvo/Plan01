import {
  PHASES,
  REVIEW_FOCUS,
  SLOTS,
  START_DATE,
  TOTAL_DAYS,
  TRACKS,
  WEEKS,
  type Focus,
  type Slot,
  type TrackId,
} from "@/data/plan";
import { pickQuote } from "@/data/quotes";
import { daysBetween, weekdayOf } from "./dates";
import { planTaskKey, slotKey, type PlanProgress } from "./plan-progress";

export const DAYS = Array.from({ length: TOTAL_DAYS }, (_, i) => i + 1);

export const trackById = (id: TrackId) => TRACKS.find((t) => t.id === id) ?? TRACKS[0];

/** Weekday of plan day 1, counted from Monday: 0 = Monday … 6 = Sunday. */
const mondayIndex = (startDate: string) => (weekdayOf(startDate) + 6) % 7;

/**
 * Plan weeks follow calendar weeks (Monday–Sunday), so the Sunday interview,
 * mock and review slots always come after that week's learning. Days before
 * the first Monday form week 0, the kickoff (just day 1 for a Sunday start).
 */
export function weekOf(day: number, startDate: string) {
  const offset = mondayIndex(startDate);
  return Math.floor((offset + day - 1) / 7) + (offset === 0 ? 1 : 0);
}

export const daysOfWeek = (week: number, startDate: string) => DAYS.filter((day) => weekOf(day, startDate) === week);

/** Week numbers that have at least one plan day, in order. */
export function planWeeks(startDate: string) {
  return [...new Set(DAYS.map((day) => weekOf(day, startDate)))];
}

/** Study slots for a plan day, by its calendar weekday. */
export function slotsFor(day: number, startDate: string): Slot[] {
  const dow = (weekdayOf(startDate) + day - 1) % 7;
  if (dow === 6) return SLOTS.saturday;
  if (dow === 0) return SLOTS.sunday;
  return SLOTS.weekday;
}

export const hasSlot = (week: number, track: TrackId, startDate: string) =>
  daysOfWeek(week, startDate).some((day) => slotsFor(day, startDate).some((slot) => slot.track === track));

/** Weeks in which the track has at least one slot. */
export const trackWeeks = (track: TrackId, startDate: string) =>
  planWeeks(startDate).filter((week) => hasSlot(week, track, startDate));

export function focusFor(week: number, track: TrackId): Focus | null {
  const focus = WEEKS.find((w) => w.week === week)?.focus[track];
  if (focus) return focus;
  return track === "review" ? REVIEW_FOCUS : null;
}

export function phaseOf(day: number, startDate: string) {
  const week = weekOf(day, startDate);
  return PHASES.find((p) => week >= p.firstWeek && week <= p.lastWeek) ?? PHASES[PHASES.length - 1];
}

/** First and last plan day of a phase for this start date. */
export function phaseDays(phaseId: number, startDate: string) {
  const days = DAYS.filter((day) => phaseOf(day, startDate).id === phaseId);
  return { first: days[0], last: days[days.length - 1], length: days.length };
}

export function quoteFor(day: number, startDate: string) {
  const phase = phaseOf(day, startDate);
  const { first, length } = phaseDays(phase.id, startDate);
  return pickQuote(day, phase.id, day - first, length);
}

/** Plan day for a date: may be < 1 before the start or > 100 after the end. */
export function planDayFor(startDate: string, today: string) {
  return daysBetween(startDate, today) + 1;
}

export const clampDay = (day: number) => Math.min(TOTAL_DAYS, Math.max(1, day));

export function dayMinutes(day: number, progress: PlanProgress) {
  let planned = 0;
  let done = 0;
  for (const slot of slotsFor(day, START_DATE)) {
    planned += slot.minutes;
    if (progress.slots[slotKey(day, slot.id)]) done += slot.minutes;
  }
  return { planned, done, complete: done === planned };
}

export function trackMinutes(track: TrackId, progress: PlanProgress) {
  let planned = 0;
  let done = 0;
  for (const day of DAYS) {
    for (const slot of slotsFor(day, START_DATE)) {
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
