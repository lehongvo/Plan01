"use client";

import Link from "next/link";
import { START_DATE, TRACKS } from "@/data/plan";
import { formatHours } from "@/lib/dates";
import { useI18n } from "@/lib/i18n";
import { usePlanProgress } from "@/lib/plan-progress";
import { focusTasksDone, trackMinutes, trackWeeks } from "@/lib/schedule";
import { stagger } from "@/lib/style";
import ProgressRing from "./ProgressRing";
import TrackIcon from "./TrackIcon";

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
        {TRACKS.map((track, index) => {
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
            <li key={track.id} className={`track-${track.id} rise`} style={stagger(index)}>
              <Link href={`/tracks/${track.id}`} className="card track-card">
                <div className="track-card-head">
                  <span className="slot-icon">
                    <TrackIcon track={track.id} />
                  </span>
                  <ProgressRing value={percent / 100} size={52} stroke={6} label={`${percent}%`}>
                    <strong>{percent}%</strong>
                  </ProgressRing>
                </div>
                <span className="track-badge">{tr(track.area)}</span>
                <h3>{tr(track.name)}</h3>
                <p className="day-topic">{tr(track.summary)}</p>
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
