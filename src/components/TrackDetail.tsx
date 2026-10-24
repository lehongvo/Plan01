"use client";

import Link from "next/link";
import { START_DATE, TOTAL_DAYS, type TrackId } from "@/data/plan";
import { formatHours, formatShortDate, useToday } from "@/lib/dates";
import { useI18n } from "@/lib/i18n";
import { usePlanProgress } from "@/lib/plan-progress";
import {
  daysOfWeek,
  focusFor,
  focusTasksDone,
  planDayFor,
  trackById,
  trackMinutes,
  trackWeeks,
  weekOf,
} from "@/lib/schedule";
import FocusTasks from "./FocusTasks";
import LinkList from "./LinkList";

export default function TrackDetail({ trackId }: { trackId: TrackId }) {
  const { lang, t, tr } = useI18n();
  const progress = usePlanProgress();
  const today = useToday();
  const track = trackById(trackId);
  const minutes = trackMinutes(trackId, progress);
  const todayDay = today ? planDayFor(START_DATE, today) : null;
  const currentWeek =
    todayDay !== null && todayDay >= 1 && todayDay <= TOTAL_DAYS ? weekOf(todayDay, START_DATE) : null;

  const weeks = trackWeeks(trackId, START_DATE);

  return (
    <div className={`page track-${trackId}`}>
      <header>
        <p className="eyebrow">
          <Link href="/tracks">{t.tracks.title}</Link> · {tr(track.area)}
        </p>
        <h1>{tr(track.name)}</h1>
        <p className="lead">{tr(track.summary)}</p>
        <p className="count">{t.tracks.studied(formatHours(minutes.done, lang), formatHours(minutes.planned, lang))}</p>
      </header>

      <div className="track-weeks">
        {weeks.map((week) => {
          const focus = focusFor(week, trackId);
          if (!focus) return null;
          const days = daysOfWeek(week, START_DATE);
          const tasks = focusTasksDone(week, trackId, progress);
          return (
            <section
              key={week}
              id={`week-${week}`}
              className={`card track-week${week === currentWeek ? " is-active" : ""}`}
            >
              <div className="card-head">
                <p className="eyebrow">
                  {t.common.week(week)} · {formatShortDate(START_DATE, days[0] - 1, lang)} –{" "}
                  {formatShortDate(START_DATE, days[days.length - 1] - 1, lang)}
                  {week === currentWeek && <span className="badge">{t.common.thisWeek}</span>}
                </p>
                <span className="count">
                  {tasks.done}/{tasks.total}
                </span>
              </div>
              <h3 className="slot-title">{tr(focus.title)}</h3>
              <FocusTasks week={week} track={trackId} focus={focus} progress={progress} />
              {focus.links && <LinkList links={focus.links} />}
            </section>
          );
        })}
      </div>
    </div>
  );
}
