import { useSyncExternalStore } from "react";

const DAY_MS = 86_400_000;

/** Today's local date as YYYY-MM-DD. */
function todayKey() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
}

function subscribeToClock(onChange: () => void) {
  const id = window.setInterval(onChange, 60_000);
  return () => window.clearInterval(id);
}

/** Today's date on the client (rechecked every minute); null during the server render. */
export function useToday(): string | null {
  return useSyncExternalStore(subscribeToClock, todayKey, () => null);
}

function toUtc(key: string) {
  const [year, month, day] = key.split("-").map(Number);
  return Date.UTC(year, month - 1, day);
}

export function daysBetween(from: string, to: string) {
  return Math.round((toUtc(to) - toUtc(from)) / DAY_MS);
}

const dayLabel = new Intl.DateTimeFormat("vi-VN", {
  weekday: "long",
  day: "2-digit",
  month: "2-digit",
  timeZone: "UTC",
});

/** "Thứ Hai, 26/10" for the given start date plus an offset in days. */
export function formatStudyDate(startDate: string, offset: number) {
  const label = dayLabel.format(new Date(toUtc(startDate) + offset * DAY_MS));
  return label.charAt(0).toUpperCase() + label.slice(1);
}

/** 408 → "6:48" */
export function formatClock(seconds: number) {
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
}

/** 142 → "2h22", 45 → "45 phút" */
export function formatMinutes(minutes: number) {
  const rounded = Math.round(minutes);
  if (rounded < 60) return `${rounded} phút`;
  return `${Math.floor(rounded / 60)}h${String(rounded % 60).padStart(2, "0")}`;
}
