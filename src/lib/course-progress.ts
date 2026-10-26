import { createLocalStore, isRecord, readFlags, readTexts, withFlag } from "./local-store";

export const PLAYBACK_RATES = [1, 1.25, 1.5, 1.75, 2];

/** Progress through the 85-video Rust course (week 1 of the plan). */
export type CourseProgress = {
  watched: Record<string, true>;
  /** Keys are `${courseDay}:${taskIndex}`. */
  tasks: Record<string, true>;
  notes: Record<string, string>;
  rate: number;
};

function parseCourseProgress(value: unknown): CourseProgress {
  if (!isRecord(value)) throw new Error("Course progress must be a JSON object");
  const { rate } = value;
  return {
    watched: readFlags(value.watched),
    tasks: readFlags(value.tasks),
    notes: readTexts(value.notes),
    rate: typeof rate === "number" && PLAYBACK_RATES.includes(rate) ? rate : 1,
  };
}

export const courseStore = createLocalStore<CourseProgress>(
  "plan01:rust-course:v3",
  { watched: {}, tasks: {}, notes: {}, rate: 1 },
  parseCourseProgress,
);

export const useCourseProgress = courseStore.useValue;

export const courseTaskKey = (day: number, index: number) => `${day}:${index}`;

export const courseActions = {
  setWatched(videoId: string, watched: boolean) {
    const current = courseStore.get();
    courseStore.set({ ...current, watched: withFlag(current.watched, videoId, watched) });
  },
  setTaskDone(key: string, done: boolean) {
    const current = courseStore.get();
    courseStore.set({ ...current, tasks: withFlag(current.tasks, key, done) });
  },
  setNote(day: number, text: string) {
    const current = courseStore.get();
    courseStore.set({ ...current, notes: { ...current.notes, [day]: text } });
  },
  setRate(rate: number) {
    courseStore.set({ ...courseStore.get(), rate });
  },
};
