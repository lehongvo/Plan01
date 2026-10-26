import { createLocalStore, isRecord, readFlags, readTexts, withFlag } from "./local-store";

export type PlanProgress = {
  /** Finished study slots, keyed by `${day}:${slotId}`. */
  slots: Record<string, true>;
  /** Weekly checklist items, keyed by `${week}:${trackId}:${taskIndex}`. */
  tasks: Record<string, true>;
  /** Notes per plan day. */
  notes: Record<string, string>;
};

function parsePlanProgress(value: unknown): PlanProgress {
  if (!isRecord(value)) throw new Error("Plan progress must be a JSON object");
  return { slots: readFlags(value.slots), tasks: readFlags(value.tasks), notes: readTexts(value.notes) };
}

export const planStore = createLocalStore<PlanProgress>(
  "plan01:plan:v3",
  { slots: {}, tasks: {}, notes: {} },
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
};
