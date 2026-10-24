"use client";

import Link from "next/link";
import { course } from "@/data/course";
import type { DayStats } from "@/lib/course-stats";
import { formatMinutes, formatStudyDate } from "@/lib/dates";
import { useI18n, type Messages } from "@/lib/i18n";

type Props = {
  stats: DayStats[];
  startDate: string;
  /** Plan day of today (1 = first day of the plan); null until known. */
  todayPlanDay: number | null;
};

function courseStatus(t: Messages, todayPlanDay: number | null, allDone: boolean) {
  if (allDone) return t.course.allDone;
  if (todayPlanDay === null) return null;
  if (todayPlanDay < 1) return t.course.beforeStart(1 - todayPlanDay);
  if (todayPlanDay <= course.days.length) return t.course.todayIs(todayPlanDay, course.days.length);
  return t.course.over;
}

export default function CourseOverview({ stats, startDate, todayPlanDay }: Props) {
  const { lang, t } = useI18n();
  const totals = stats.reduce(
    (sum, day) => ({
      minutesDone: sum.minutesDone + day.minutesDone,
      minutesTotal: sum.minutesTotal + day.minutesTotal,
      watchedSeconds: sum.watchedSeconds + day.watchedSeconds,
      videoSeconds: sum.videoSeconds + day.videoSeconds,
      videosDone: sum.videosDone + day.videosDone,
      tasksDone: sum.tasksDone + day.tasksDone,
    }),
    { minutesDone: 0, minutesTotal: 0, watchedSeconds: 0, videoSeconds: 0, videosDone: 0, tasksDone: 0 },
  );
  const videoCount = course.days.reduce((sum, day) => sum + day.videos.length, 0);
  const taskCount = course.days.reduce((sum, day) => sum + day.tasks.length, 0);
  const percent = Math.round((totals.minutesDone / totals.minutesTotal) * 100);
  const status = courseStatus(t, todayPlanDay, stats.every((day) => day.complete));

  return (
    <header className="hero">
      <div className="hero-intro">
        <p className="eyebrow">{t.course.eyebrow}</p>
        <h1>
          {t.course.titlePrefix}{" "}
          <a href={course.playlist} target="_blank" rel="noreferrer">
            {course.title}
          </a>
        </h1>
        <p className="lead">{t.course.lead(videoCount, course.channel)}</p>
      </div>

      <div className="card progress-card">
        <div className="progress-head">
          <span className="percent">{percent}%</span>
          <span className="count">{t.course.unit}</span>
        </div>
        <div
          className="bar"
          role="progressbar"
          aria-label={t.course.progressLabel}
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <span style={{ width: `${percent}%` }} />
        </div>
        <dl className="stats">
          <div>
            <dt>{t.course.videos}</dt>
            <dd>
              {totals.videosDone}/{videoCount}
            </dd>
          </div>
          <div>
            <dt>{t.course.watched}</dt>
            <dd>
              {formatMinutes(totals.watchedSeconds / 60, lang)} / {formatMinutes(totals.videoSeconds / 60, lang)}
            </dd>
          </div>
          <div>
            <dt>{t.course.exercises}</dt>
            <dd>
              {totals.tasksDone}/{taskCount}
            </dd>
          </div>
        </dl>
        <p className="start-status">
          {t.course.range(
            formatStudyDate(startDate, 0, lang),
            formatStudyDate(startDate, course.days.length - 1, lang),
          )}{" "}
          {status} <Link href="/">{t.course.backToToday}</Link>
        </p>
      </div>
    </header>
  );
}
