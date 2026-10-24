import { useSyncExternalStore } from "react";
import type { Lang } from "./text";

const DAY_MS = 86_400_000;
const LOCALES: Record<Lang, string> = { en: "en-US", vi: "vi-VN" };

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

function minutesNow() {
  const now = new Date();
  return now.getHours() * 60 + now.getMinutes();
}

/** Minutes since local midnight (rechecked every minute); null during the server render. */
export function useNowMinutes(): number | null {
  return useSyncExternalStore(subscribeToClock, minutesNow, () => null);
}

/** "04:30" → 270 */
export const toMinutes = (time: string) => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

function toUtc(key: string) {
  const [year, month, day] = key.split("-").map(Number);
  return Date.UTC(year, month - 1, day);
}

const dateAt = (startDate: string, offset: number) => new Date(toUtc(startDate) + offset * DAY_MS);

export function daysBetween(from: string, to: string) {
  return Math.round((toUtc(to) - toUtc(from)) / DAY_MS);
}

/** 0 = Sunday … 6 = Saturday */
export function weekdayOf(key: string) {
  return new Date(toUtc(key)).getUTCDay();
}

const shortEn = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", timeZone: "UTC" });

const longFormat = {
  en: new Intl.DateTimeFormat("en-US", { weekday: "long", month: "short", day: "numeric", timeZone: "UTC" }),
  vi: new Intl.DateTimeFormat("vi-VN", { weekday: "long", day: "2-digit", month: "2-digit", timeZone: "UTC" }),
};

/** "Oct 26" / "26/10" for the start date plus an offset in days. */
export function formatShortDate(startDate: string, offset: number, lang: Lang) {
  const date = dateAt(startDate, offset);
  if (lang === "en") return shortEn.format(date);
  // Intl's vi-VN short form is "09-11"; Vietnamese readers expect "09/11".
  return `${String(date.getUTCDate()).padStart(2, "0")}/${String(date.getUTCMonth() + 1).padStart(2, "0")}`;
}

/** "Monday, Oct 26" / "Thứ Hai, 26/10" for the start date plus an offset in days. */
export function formatStudyDate(startDate: string, offset: number, lang: Lang) {
  const label = longFormat[lang].format(dateAt(startDate, offset));
  return label.charAt(0).toUpperCase() + label.slice(1);
}

const weekdayName = {
  en: new Intl.DateTimeFormat("en-US", { weekday: "long", timeZone: "UTC" }),
  vi: new Intl.DateTimeFormat("vi-VN", { weekday: "long", timeZone: "UTC" }),
};

/** "Sunday, Oct 25, 2026" / "Chủ Nhật, 25/10/2026" */
export function formatFullDate(startDate: string, offset: number, lang: Lang) {
  const date = dateAt(startDate, offset);
  const weekday = weekdayName[lang].format(date);
  const day = date.getUTCDate();
  const month = date.getUTCMonth() + 1;
  const year = date.getUTCFullYear();
  if (lang === "en") return `${weekday}, ${shortEn.format(date)}, ${year}`;
  const label = `${weekday}, ${String(day).padStart(2, "0")}/${String(month).padStart(2, "0")}/${year}`;
  return label.charAt(0).toUpperCase() + label.slice(1);
}

/** 408 → "6:48" */
export function formatClock(seconds: number) {
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
}

/** 34080 → "568h", 150 → "2.5h" / "2,5h" */
export function formatHours(minutes: number, lang: Lang) {
  return `${(Math.round((minutes / 60) * 10) / 10).toLocaleString(LOCALES[lang])}h`;
}

/** 142 → "2h22", 45 → "45 min" / "45 phút" */
export function formatMinutes(minutes: number, lang: Lang) {
  const rounded = Math.round(minutes);
  if (rounded < 60) return `${rounded} ${lang === "vi" ? "phút" : "min"}`;
  return `${Math.floor(rounded / 60)}h${String(rounded % 60).padStart(2, "0")}`;
}
