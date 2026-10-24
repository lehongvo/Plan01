import { useSyncExternalStore } from "react";

export const PLAYBACK_RATES = [1, 1.25, 1.5, 1.75, 2];

export type Progress = {
  /** Local date (YYYY-MM-DD) of study day 1, or null when not chosen yet. */
  startDate: string | null;
  watched: Record<string, true>;
  /** Keys are `${day}:${taskIndex}`. */
  tasks: Record<string, true>;
  notes: Record<string, string>;
  rate: number;
};

const STORAGE_KEY = "rust-7-days:progress:v1";

const EMPTY: Progress = {
  startDate: null,
  watched: {},
  tasks: {},
  notes: {},
  rate: 1,
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

function flags(value: unknown): Record<string, true> {
  const out: Record<string, true> = {};
  if (isRecord(value)) {
    for (const [key, on] of Object.entries(value)) if (on === true) out[key] = true;
  }
  return out;
}

function texts(value: unknown): Record<string, string> {
  const out: Record<string, string> = {};
  if (isRecord(value)) {
    for (const [key, text] of Object.entries(value)) if (typeof text === "string") out[key] = text;
  }
  return out;
}

/** Validates stored or imported JSON, dropping anything malformed. Throws if it is not an object. */
function parseProgress(value: unknown): Progress {
  if (!isRecord(value)) throw new Error("Progress must be a JSON object");
  const { startDate, rate } = value;
  return {
    startDate:
      typeof startDate === "string" && /^\d{4}-\d{2}-\d{2}$/.test(startDate) ? startDate : null,
    watched: flags(value.watched),
    tasks: flags(value.tasks),
    notes: texts(value.notes),
    rate: typeof rate === "number" && PLAYBACK_RATES.includes(rate) ? rate : 1,
  };
}

function withFlag(map: Record<string, true>, key: string, on: boolean) {
  const next = { ...map };
  if (on) next[key] = true;
  else delete next[key];
  return next;
}

// localStorage-backed store read through useSyncExternalStore, so the server
// render and the first client render agree (both see EMPTY) and the saved
// progress appears right after hydration.
let cache: Progress | null = null;
const listeners = new Set<() => void>();

function load(): Progress {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? parseProgress(JSON.parse(raw)) : EMPTY;
  } catch {
    return EMPTY;
  }
}

function getSnapshot() {
  return (cache ??= load());
}

function getServerSnapshot() {
  return EMPTY;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  // Keep several open tabs in sync.
  const onStorage = (event: StorageEvent) => {
    if (event.key !== STORAGE_KEY && event.key !== null) return;
    cache = load();
    listener();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

function commit(next: Progress) {
  cache = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Private mode or full storage: keep the progress in memory for this visit.
  }
  listeners.forEach((listener) => listener());
}

export function useProgress() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export const taskKey = (day: number, index: number) => `${day}:${index}`;

export const progressActions = {
  setWatched(videoId: string, watched: boolean) {
    const current = getSnapshot();
    commit({ ...current, watched: withFlag(current.watched, videoId, watched) });
  },
  setTaskDone(key: string, done: boolean) {
    const current = getSnapshot();
    commit({ ...current, tasks: withFlag(current.tasks, key, done) });
  },
  setNote(day: number, text: string) {
    const current = getSnapshot();
    commit({ ...current, notes: { ...current.notes, [day]: text } });
  },
  setStartDate(startDate: string | null) {
    commit({ ...getSnapshot(), startDate });
  },
  setRate(rate: number) {
    commit({ ...getSnapshot(), rate });
  },
  reset() {
    commit(EMPTY);
  },
  exportJson() {
    return JSON.stringify(
      { app: "rust-7-days", version: 1, exportedAt: new Date().toISOString(), progress: getSnapshot() },
      null,
      2,
    );
  },
  /** Accepts a file made by exportJson (or a bare progress object). Throws on invalid input. */
  importJson(text: string) {
    const data: unknown = JSON.parse(text);
    commit(parseProgress(isRecord(data) && "progress" in data ? data.progress : data));
  },
};
