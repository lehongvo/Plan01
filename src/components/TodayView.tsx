"use client";

import Link from "next/link";
import { START_DATE, TOTAL_DAYS } from "@/data/plan";
import { useCourseProgress } from "@/lib/course-progress";
import { formatHours, formatStudyDate, toMinutes, useNowMinutes, useToday } from "@/lib/dates";
import { useI18n, type Messages } from "@/lib/i18n";
import { slotKey, usePlanProgress } from "@/lib/plan-progress";
import {
  clampDay,
  currentStreak,
  dayMinutes,
  phaseOf,
  planDayFor,
  planTotals,
  quoteFor,
  slotsFor,
  weekOf,
} from "@/lib/schedule";
import { stagger } from "@/lib/style";
import { totalXp } from "@/lib/xp";
import DayPlan from "./DayPlan";
import type { FerrisMood } from "./Ferris";
import FerrisQuote from "./FerrisQuote";
import JourneyTrail from "./JourneyTrail";
import LevelCard from "./LevelCard";
import ProgressRing from "./ProgressRing";
import StreakCard from "./StreakCard";
import { GearField } from "./TrackIcon";

function headline(t: Messages, todayDay: number) {
  if (todayDay < 1) return t.today.beforeStart(1 - todayDay);
  if (todayDay > TOTAL_DAYS) return t.today.finished;
  return t.today.dayOf(todayDay, TOTAL_DAYS);
}

/** Shown until the client knows today's date, so the page never flashes the wrong day. */
function TodaySkeleton() {
  return (
    <div className="skeleton" aria-busy="true">
      <div style={{ height: 210 }} />
      <div style={{ height: 120 }} />
      <div style={{ height: 90 }} />
      <div style={{ height: 220 }} />
    </div>
  );
}

export default function TodayView() {
  const { lang, t } = useI18n();
  const progress = usePlanProgress();
  const course = useCourseProgress();
  const today = useToday();
  const nowMinutes = useNowMinutes();

  if (today === null) {
    return (
      <div className="page">
        <TodaySkeleton />
      </div>
    );
  }

  const todayDay = planDayFor(START_DATE, today);
  const day = clampDay(todayDay);
  const isPlanDay = todayDay >= 1 && todayDay <= TOTAL_DAYS;
  const phase = phaseOf(day, START_DATE);
  const minutes = dayMinutes(day, progress);
  const totals = planTotals(progress);

  // Ferris celebrates a finished day, works during an open slot and sleeps at night.
  const working =
    isPlanDay &&
    nowMinutes !== null &&
    slotsFor(day, START_DATE).some(
      (s) =>
        !progress.slots[slotKey(day, s.id)] && nowMinutes >= toMinutes(s.start) && nowMinutes < toMinutes(s.end),
    );
  const night = nowMinutes !== null && (nowMinutes < 4 * 60 + 30 || nowMinutes >= 21 * 60);
  const mood: FerrisMood = isPlanDay && minutes.complete ? "party" : working ? "work" : night ? "sleep" : "wave";

  return (
    <div className="page">
      <section className="forge rise">
        <GearField />
        <div className="forge-head">
          <Link href="/roadmap" className="eyebrow phase-link">
            {t.common.phase(phase.id, phase.title)} →
          </Link>
          <h1>{headline(t, todayDay)}</h1>
          <p className="today-date">
            {formatStudyDate(START_DATE, day - 1, lang)} · {t.common.week(weekOf(day, START_DATE))}
          </p>
        </div>
        <FerrisQuote quote={quoteFor(day, START_DATE)} mood={mood} />
      </section>

      <section className="stat-grid rise" style={stagger(1)}>
        <div className="card ring-card">
          <ProgressRing
            value={minutes.done / minutes.planned}
            label={`${t.today.todayRing}: ${formatHours(minutes.done, lang)} / ${formatHours(minutes.planned, lang)}`}
          >
            <strong>{formatHours(minutes.done, lang)}</strong>
            <small>/ {formatHours(minutes.planned, lang)}</small>
          </ProgressRing>
          <p className="count">{t.today.todayRing}</p>
        </div>
        <LevelCard xp={totalXp(progress, course)} />
        <StreakCard progress={progress} todayDay={todayDay} streak={currentStreak(progress, todayDay)} />
      </section>

      {totals.done === 0 && (
        <p className="today-tip rise" style={stagger(2)}>
          {t.today.tip}
        </p>
      )}

      <div className="rise" style={stagger(2)}>
        <JourneyTrail progress={progress} todayDay={todayDay} />
      </div>

      <DayPlan key={day} day={day} variant="today" />
    </div>
  );
}
