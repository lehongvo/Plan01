import { useSyncExternalStore } from "react";

export const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

/** Keeps only the `true` entries of a stored flag map. */
export function readFlags(value: unknown): Record<string, true> {
  const out: Record<string, true> = {};
  if (isRecord(value)) {
    for (const [key, on] of Object.entries(value)) if (on === true) out[key] = true;
  }
  return out;
}

/** Keeps only the string entries of a stored text map. */
export function readTexts(value: unknown): Record<string, string> {
  const out: Record<string, string> = {};
  if (isRecord(value)) {
    for (const [key, text] of Object.entries(value)) if (typeof text === "string") out[key] = text;
  }
  return out;
}

export function withFlag(map: Record<string, true>, key: string, on: boolean) {
  const next = { ...map };
  if (on) next[key] = true;
  else delete next[key];
  return next;
}

/**
 * A localStorage-backed value read through useSyncExternalStore: the server
 * render and the first client render both see `empty`, and the saved value
 * appears right after hydration. Other open tabs stay in sync.
 */
export function createLocalStore<T>(key: string, empty: T, parse: (value: unknown) => T) {
  let cache: T | null = null;
  const listeners = new Set<() => void>();

  function load(): T {
    try {
      const raw = window.localStorage.getItem(key);
      return raw ? parse(JSON.parse(raw)) : empty;
    } catch {
      return empty;
    }
  }

  function get() {
    return (cache ??= load());
  }

  function set(next: T) {
    cache = next;
    try {
      window.localStorage.setItem(key, JSON.stringify(next));
    } catch {
      // Private mode or full storage: keep the value in memory for this visit.
    }
    listeners.forEach((listener) => listener());
  }

  function subscribe(listener: () => void) {
    listeners.add(listener);
    const onStorage = (event: StorageEvent) => {
      if (event.key !== key && event.key !== null) return;
      cache = load();
      listener();
    };
    window.addEventListener("storage", onStorage);
    return () => {
      listeners.delete(listener);
      window.removeEventListener("storage", onStorage);
    };
  }

  function useValue() {
    return useSyncExternalStore(subscribe, get, () => empty);
  }

  return { get, set, parse, empty, useValue };
}
