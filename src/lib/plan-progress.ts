import { DEFAULT_START_DATE } from "@/data/plan";
import { createLocalStore, isRecord, readFlags, readTexts, withFlag } from "./local-store";

export type PlanProgress = {
  /** Local date (YYYY-MM-DD) of plan day 1. */
  startDate: string;
  /** Finished study slots, keyed by `${day}:${slotId}`. */
  slots: Record<string, true>;
  /** Weekly checklist items, keyed by `${week}:${trackId}:${taskIndex}`. */
  tasks: Record<string, true>;
  /** Notes per plan day. */
  notes: Record<string, string>;
};

const DATE_KEY = /^\d{4}-\d{2}-\d{2}$/;

function parsePlanProgress(value: unknown): PlanProgress {
  if (!isRecord(value)) throw new Error("Plan progress must be a JSON object");
  const { startDate } = value;
  return {
    startDate: typeof startDate === "string" && DATE_KEY.test(startDate) ? startDate : DEFAULT_START_DATE,
    slots: readFlags(value.slots),
    tasks: readFlags(value.tasks),
    notes: readTexts(value.notes),
  };
}

export const planStore = createLocalStore<PlanProgress>(
  "plan01:plan:v1",
  { startDate: DEFAULT_START_DATE, slots: {}, tasks: {}, notes: {} },
  parsePlanProgress,
);

export const usePlanProgress = planStore.useValue;

export const slotKey = (day: number, slotId: string) => `${day}:${slotId}`;
export const planTaskKey = (week: number, track: string, index: number) => `${week}:${track}:${index}`;

export const planActions = {
  setSlotDone(key: string, done: boolean) {
    const current = planStore.get();
    planStore.set({ ...current, slots: withFlag(current.slots, key, done) });
  },
  setTaskDone(key: string, done: boolean) {
    const current = planStore.get();
    planStore.set({ ...current, tasks: withFlag(current.tasks, key, done) });
  },
  setNote(day: number, text: string) {
    const current = planStore.get();
    planStore.set({ ...current, notes: { ...current.notes, [day]: text } });
  },
  setStartDate(startDate: string) {
    if (DATE_KEY.test(startDate)) planStore.set({ ...planStore.get(), startDate });
  },
};
