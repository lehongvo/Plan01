"use client";

import Link from "next/link";
import { PHASES, START_DATE, TOTAL_DAYS } from "@/data/plan";
import { formatHours, formatStudyDate, useToday } from "@/lib/dates";
import { useI18n, type Messages } from "@/lib/i18n";
import { usePlanProgress } from "@/lib/plan-progress";
import { clampDay, currentStreak, phaseDays, phaseOf, planDayFor, planTotals, weekOf } from "@/lib/schedule";
import DayPlan from "./DayPlan";

function headline(t: Messages, todayDay: number) {
  if (todayDay < 1) return t.today.beforeStart(1 - todayDay);
  if (todayDay > TOTAL_DAYS) return t.today.finished;
  return t.today.dayOf(todayDay, TOTAL_DAYS);
}

/** Shown until the client knows today's date, so the page never flashes the wrong day. */
function TodaySkeleton() {
  return (
    <div className="skeleton" aria-busy="true">
      <div style={{ height: 18, width: "45%" }} />
      <div style={{ height: 36, width: "70%" }} />
      <div style={{ height: 64 }} />
      <div style={{ height: 72 }} />
      <div style={{ height: 220 }} />
    </div>
  );
}

export default function TodayView() {
  const { lang, t } = useI18n();
  const progress = usePlanProgress();
  const today = useToday();

  if (today === null) {
    return (
      <div className="page">
        <TodaySkeleton />
      </div>
    );
  }

  const todayDay = planDayFor(START_DATE, today);
  const day = clampDay(todayDay);
  const phase = phaseOf(day, START_DATE);
  const totals = planTotals(progress);
  const streak = currentStreak(progress, todayDay);

  return (
    <div className="page">
      <header className="today-hero">
        <div className="today-intro">
          <Link href="/roadmap" className="eyebrow phase-link">
            {t.common.phase(phase.id, phase.title)} →
          </Link>
          <h1>{headline(t, todayDay)}</h1>
          <p className="today-date">
            {formatStudyDate(START_DATE, day - 1, lang)} · {t.common.week(weekOf(day, START_DATE))}
          </p>
          <ol className="phase-bar" aria-label={t.today.phases}>
            {PHASES.map((p) => {
              const span = phaseDays(p.id, START_DATE);
              return (
                <li
                  key={p.id}
                  style={{ flexGrow: span.length }}
                  className={p.id === phase.id ? "is-active" : span.last < day ? "is-past" : undefined}
                >
                  <span>{p.title}</span>
                </li>
              );
            })}
          </ol>
        </div>

        <div className="card today-stats">
          <dl>
            <div>
              <dt>{t.today.streak}</dt>
              <dd>{t.today.streakDays(streak)}</dd>
            </div>
            <div>
              <dt>{t.today.hours}</dt>
              <dd>
                {formatHours(totals.done, lang)}
                <small> / {formatHours(totals.planned, lang)}</small>
              </dd>
            </div>
            <div>
              <dt>{t.today.fullDays}</dt>
              <dd>
                {totals.completeDays}
                <small> / {TOTAL_DAYS}</small>
              </dd>
            </div>
          </dl>
          {totals.done === 0 && <p className="today-tip">{t.today.tip}</p>}
        </div>
      </header>

      <DayPlan key={day} day={day} variant="today" />
    </div>
  );
}
