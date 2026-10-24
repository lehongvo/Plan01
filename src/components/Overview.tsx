"use client";

import { course } from "@/data/course";
import { formatMinutes } from "@/lib/dates";
import { progressActions } from "@/lib/progress";
import type { DayStats } from "@/lib/stats";

type Props = {
  stats: DayStats[];
  startDate: string | null;
  /** Days from the start date to today (0 = day 1); null until known. */
  offset: number | null;
};

function startStatus(startDate: string | null, offset: number | null, allDone: boolean) {
  if (allDone) return "Bạn đã hoàn thành cả khoá. Tuyệt vời!";
  if (!startDate) return "Chọn ngày bắt đầu để web tự mở đúng bài của hôm nay.";
  if (offset === null) return null;
  if (offset < 0) return `Còn ${-offset} ngày nữa là bắt đầu.`;
  if (offset < course.days.length) return `Hôm nay là Ngày ${offset + 1}/${course.days.length}.`;
  return "Đã qua 7 ngày, hoàn thành nốt phần còn lại nhé.";
}

export default function Overview({ stats, startDate, offset }: Props) {
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
  const status = startStatus(startDate, offset, stats.every((day) => day.complete));

  return (
    <header className="hero">
      <div className="hero-intro">
        <p className="brand">
          <span className="logo" aria-hidden="true">
            R
          </span>
          Rust trong 7 ngày
        </p>
        <h1>
          Học trọn playlist{" "}
          <a href={course.playlist} target="_blank" rel="noreferrer">
            {course.title}
          </a>{" "}
          trong 1 tuần
        </h1>
        <p className="lead">
          {videoCount} video của {course.channel} chia thành 7 ngày, mỗi ngày khoảng 2,5 giờ: xem video, làm
          Rustlings và một bài mini để nhớ lâu.
        </p>
      </div>

      <div className="card progress-card">
        <div className="progress-head">
          <span className="percent">{percent}%</span>
          <span className="count">hoàn thành</span>
        </div>
        <div
          className="bar"
          role="progressbar"
          aria-label="Tiến độ cả khoá"
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <span style={{ width: `${percent}%` }} />
        </div>
        <dl className="stats">
          <div>
            <dt>Video</dt>
            <dd>
              {totals.videosDone}/{videoCount}
            </dd>
          </div>
          <div>
            <dt>Đã xem</dt>
            <dd>
              {formatMinutes(totals.watchedSeconds / 60)} / {formatMinutes(totals.videoSeconds / 60)}
            </dd>
          </div>
          <div>
            <dt>Bài tập</dt>
            <dd>
              {totals.tasksDone}/{taskCount}
            </dd>
          </div>
        </dl>
        <div className="start">
          <label htmlFor="start-date">Ngày bắt đầu</label>
          <input
            id="start-date"
            type="date"
            value={startDate ?? ""}
            onChange={(event) => progressActions.setStartDate(event.target.value || null)}
          />
        </div>
        {status && <p className="start-status">{status}</p>}
      </div>
    </header>
  );
}
