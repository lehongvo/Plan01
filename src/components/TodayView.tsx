"use client";

import { PHASES, TOTAL_DAYS } from "@/data/plan";
import { formatHours, formatStudyDate, useToday } from "@/lib/dates";
import { useI18n, type Messages } from "@/lib/i18n";
import { usePlanProgress } from "@/lib/plan-progress";
import { clampDay, currentStreak, phaseOf, planDayFor, planTotals } from "@/lib/schedule";
import DayPlan from "./DayPlan";

function headline(t: Messages, todayDay: number | null) {
  if (todayDay === null) return t.today.defaultTitle;
  if (todayDay < 1) return t.today.beforeStart(1 - todayDay);
  if (todayDay > TOTAL_DAYS) return t.today.finished;
  return t.today.dayOf(todayDay, TOTAL_DAYS);
}

export default function TodayView() {
  const { lang, t, tr } = useI18n();
  const progress = usePlanProgress();
  const today = useToday();
  const todayDay = today ? planDayFor(progress.startDate, today) : null;
  const day = clampDay(todayDay ?? 1);
  const phase = phaseOf(day);
  const totals = planTotals(progress);
  const streak = todayDay === null ? 0 : currentStreak(progress, todayDay);
  const percent = Math.round((totals.done / totals.planned) * 100);

  return (
    <div className="page">
      <header className="hero">
        <div className="hero-intro">
          <p className="eyebrow">
            {t.today.eyebrow} · {formatStudyDate(progress.startDate, 0, lang)} →{" "}
            {formatStudyDate(progress.startDate, TOTAL_DAYS - 1, lang)}
          </p>
          <h1>{headline(t, todayDay)}</h1>
          <p className="lead">
            {t.common.phase(phase.id, phase.title)}. {t.today.phaseGoal} {tr(phase.goal)}.
          </p>
          <ol className="phase-bar" aria-label={t.today.phases}>
            {PHASES.map((p) => (
              <li
                key={p.id}
                style={{ flexGrow: p.lastDay - p.firstDay + 1 }}
                className={p.id === phase.id ? "is-active" : p.lastDay < day ? "is-past" : undefined}
              >
                <span>{p.title}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="card progress-card">
          <div className="progress-head">
            <span className="percent">{percent}%</span>
            <span className="count">{t.today.hoursLabel}</span>
          </div>
          <div
            className="bar"
            role="progressbar"
            aria-label={t.today.progressLabel}
            aria-valuenow={percent}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <span style={{ width: `${percent}%` }} />
          </div>
          <dl className="stats">
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
            <div>
              <dt>{t.today.streak}</dt>
              <dd>{t.today.streakDays(streak)}</dd>
            </div>
          </dl>
          <p className="start-status">{t.today.tip}</p>
        </div>
      </header>

      <DayPlan key={day} day={day} onTodayPage />
    </div>
  );
}
