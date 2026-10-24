"use client";

import Link from "next/link";
import { START_DATE, TRACKS } from "@/data/plan";
import { formatHours } from "@/lib/dates";
import { useI18n } from "@/lib/i18n";
import { usePlanProgress } from "@/lib/plan-progress";
import { focusTasksDone, trackMinutes, trackWeeks } from "@/lib/schedule";

export default function TrackList() {
  const { lang, t, tr } = useI18n();
  const progress = usePlanProgress();

  return (
    <div className="page">
      <header>
        <p className="eyebrow">{t.tracks.eyebrow}</p>
        <h1>{t.tracks.title}</h1>
        <p className="lead">{t.tracks.lead}</p>
      </header>

      <ul className="track-cards">
        {TRACKS.map((track) => {
          const minutes = trackMinutes(track.id, progress);
          let done = 0;
          let total = 0;
          for (const week of trackWeeks(track.id, START_DATE)) {
            const tasks = focusTasksDone(week, track.id, progress);
            done += tasks.done;
            total += tasks.total;
          }
          const percent = minutes.planned ? Math.round((minutes.done / minutes.planned) * 100) : 0;
          return (
            <li key={track.id} className={`track-${track.id}`}>
              <Link href={`/tracks/${track.id}`} className="card track-card">
                <span className="track-badge">{tr(track.area)}</span>
                <h3>{tr(track.name)}</h3>
                <p className="day-topic">{tr(track.summary)}</p>
                <div className="bar track-bar" aria-hidden="true">
                  <span style={{ width: `${percent}%` }} />
                </div>
                <p className="count">
                  {t.tracks.summary(formatHours(minutes.done, lang), formatHours(minutes.planned, lang), done, total)}
                </p>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
