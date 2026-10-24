"use client";

import Link from "next/link";
import { PHASES, START_DATE, TOTAL_DAYS, type TrackId } from "@/data/plan";
import { formatShortDate, formatStudyDate, useToday } from "@/lib/dates";
import { useI18n } from "@/lib/i18n";
import { usePlanProgress } from "@/lib/plan-progress";
import {
  dayMinutes,
  daysOfWeek,
  focusFor,
  focusTasksDone,
  hasSlot,
  phaseDays,
  planDayFor,
  planWeeks,
  trackById,
  weekOf,
} from "@/lib/schedule";

const WEEK_TRACKS: TrackId[] = ["rust", "solidity", "english", "interview", "upwork"];

export default function Roadmap() {
  const { lang, t, tr } = useI18n();
  const progress = usePlanProgress();
  const today = useToday();
  const startDate = START_DATE;
  const todayDay = today ? planDayFor(startDate, today) : null;
  const weeks = planWeeks(startDate);
  const currentWeek =
    todayDay !== null && todayDay >= 1 && todayDay <= TOTAL_DAYS ? weekOf(todayDay, startDate) : null;

  return (
    <div className="page">
      <header>
        <p className="eyebrow">
          {formatStudyDate(startDate, 0, lang)} → {formatStudyDate(startDate, TOTAL_DAYS - 1, lang)}
        </p>
        <h1>{t.roadmap.title}</h1>
        <p className="lead">{t.roadmap.lead(weeks.length)}</p>
        {currentWeek !== null && (
          <a className="button button-primary jump" href={`#week-${currentWeek}`}>
            {t.roadmap.jump} ↓
          </a>
        )}
      </header>

      <ol className="phase-cards">
        {PHASES.map((phase) => {
          const span = phaseDays(phase.id, startDate);
          const days = span.length;
          let complete = 0;
          for (let d = span.first; d <= span.last; d++) if (dayMinutes(d, progress).complete) complete += 1;
          const active = todayDay !== null && todayDay >= span.first && todayDay <= span.last;
          return (
            <li key={phase.id} className={`card phase-card${active ? " is-active" : ""}`}>
              <p className="eyebrow">{t.roadmap.phaseDays(phase.id, span.first, span.last)}</p>
              <h3>{phase.title}</h3>
              <p className="count">
                {formatShortDate(startDate, span.first - 1, lang)} –{" "}
                {formatShortDate(startDate, span.last - 1, lang)}
              </p>
              <p className="phase-goal">{tr(phase.goal)}</p>
              <div className="bar" aria-hidden="true">
                <span style={{ width: `${Math.round((complete / days) * 100)}%` }} />
              </div>
              <p className="count">{t.roadmap.fullDays(complete, days)}</p>
            </li>
          );
        })}
      </ol>

      <div className="weeks">
        {weeks.map((week) => {
          const days = daysOfWeek(week, startDate);
          const current = week === currentWeek;
          return (
            <section key={week} id={`week-${week}`} className={`card week-card${current ? " is-active" : ""}`}>
              <div className="card-head">
                <h3>
                  {t.common.week(week)}
                  {current && <span className="badge">{t.common.thisWeek}</span>}
                </h3>
                <span className="count">
                  {formatShortDate(startDate, days[0] - 1, lang)} –{" "}
                  {formatShortDate(startDate, days[days.length - 1] - 1, lang)}
                </span>
              </div>
              <ol className="day-chips">
                {days.map((day) => {
                  const minutes = dayMinutes(day, progress);
                  const state = minutes.complete ? " is-done" : minutes.done > 0 ? " is-partial" : "";
                  return (
                    <li key={day}>
                      <Link
                        href={`/day/${day}`}
                        className={`day-chip${state}${day === todayDay ? " is-today" : ""}`}
                        aria-label={formatStudyDate(startDate, day - 1, lang)}
                      >
                        {day}
                      </Link>
                    </li>
                  );
                })}
              </ol>
              <ul className="week-tracks">
                {WEEK_TRACKS.map((track) => {
                  const focus = focusFor(week, track);
                  if (!focus || !hasSlot(week, track, startDate)) return null;
                  const tasks = focusTasksDone(week, track, progress);
                  return (
                    <li key={track} className={`track-${track}`}>
                      <Link href={`/tracks/${track}#week-${week}`} className="week-track-link">
                        <span className="track-badge">{tr(trackById(track).short)}</span>
                        <span className="week-focus">{tr(focus.title)}</span>
                        <span className="count">
                          {tasks.done}/{tasks.total}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}
