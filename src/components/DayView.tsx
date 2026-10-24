"use client";

import { useState } from "react";
import type { StudyDay } from "@/data/course";
import { formatClock, formatMinutes } from "@/lib/dates";
import { PLAYBACK_RATES, progressActions, taskKey, type Progress } from "@/lib/progress";
import { getDayStats, lessonLabel, nextUnwatched } from "@/lib/stats";
import { CheckIcon, ExternalIcon } from "./icons";
import YouTubePlayer, { type PlayRequest } from "./YouTubePlayer";

type Props = {
  day: StudyDay;
  progress: Progress;
  dateLabel: string | null;
  isToday: boolean;
};

export default function DayView({ day, progress, dateLabel, isToday }: Props) {
  const [picked, setPicked] = useState<PlayRequest | null>(null);
  const stats = getDayStats(day, progress);

  // Until the learner picks a video, the player shows the first unwatched one.
  const request: PlayRequest = picked ?? {
    videoId: (nextUnwatched(day, progress) ?? day.videos[0]).id,
    autoplay: false,
    nonce: 0,
  };
  const current = day.videos.find((v) => v.id === request.videoId) ?? day.videos[0];

  function play(videoId: string) {
    setPicked((prev) => ({ videoId, autoplay: true, nonce: (prev?.nonce ?? 0) + 1 }));
  }

  function finish(videoId: string) {
    progressActions.setWatched(videoId, true);
    const next = nextUnwatched(day, progress, videoId);
    if (next) play(next.id);
    else setPicked(request); // last one: keep it on screen instead of jumping back
  }

  function toggleWatched(videoId: string, watched: boolean) {
    // Pin the current video so ticking boxes never swaps what is playing.
    if (!picked) setPicked(request);
    progressActions.setWatched(videoId, watched);
  }

  const titleId = `day-${day.day}-title`;
  const notesId = `day-${day.day}-notes`;

  return (
    <section className="day" aria-labelledby={titleId}>
      <header>
        <p className="eyebrow">
          Ngày {day.day}/7{dateLabel && ` · ${dateLabel}`}
          {isToday && <span className="badge">Hôm nay</span>}
        </p>
        <h2 id={titleId}>{day.title}</h2>
        <p className="day-topic">{day.topic}</p>
        <ul className="meta">
          <li>{day.videos.length} video</li>
          <li>{formatMinutes(stats.videoSeconds / 60)} xem video</li>
          <li>~{day.practice} phút thực hành</li>
          <li>≈ {formatMinutes(stats.minutesTotal)} tổng</li>
        </ul>
      </header>

      <div className="day-grid">
        <div className="day-column">
          <div className="card player-card">
            <YouTubePlayer request={request} rate={progress.rate} onEnded={finish} />
            <div className="now-playing">
              <div className="now-text">
                <p className="now-label">
                  {lessonLabel(current)} · {formatClock(current.seconds)}
                </p>
                <p className="now-title">{current.title}</p>
              </div>
              <div className="player-actions">
                <div className="speed" role="group" aria-label="Tốc độ phát">
                  {PLAYBACK_RATES.map((rate) => (
                    <button
                      key={rate}
                      type="button"
                      aria-pressed={progress.rate === rate}
                      onClick={() => progressActions.setRate(rate)}
                    >
                      {rate}×
                    </button>
                  ))}
                </div>
                <button type="button" className="button button-primary" onClick={() => finish(current.id)}>
                  <CheckIcon />
                  Đã xem, bài tiếp
                </button>
                <a
                  className="button"
                  href={`https://www.youtube.com/watch?v=${current.id}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  YouTube
                  <ExternalIcon />
                </a>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-head">
              <h3>Video</h3>
              <span className="count">
                {stats.videosDone}/{day.videos.length} đã xem
              </span>
            </div>
            {stats.videosDone === day.videos.length && (
              <p className="notice">Đã xem hết video của ngày {day.day}. Làm nốt phần thực hành để hoàn thành ngày.</p>
            )}
            <ol className="video-list">
              {day.videos.map((video) => {
                const watched = Boolean(progress.watched[video.id]);
                const active = video.id === current.id;
                return (
                  <li
                    key={video.id}
                    className={`video-row${active ? " is-active" : ""}${watched ? " is-done" : ""}`}
                  >
                    <input
                      type="checkbox"
                      className="check"
                      checked={watched}
                      onChange={(event) => toggleWatched(video.id, event.target.checked)}
                      aria-label={`Đã xem: ${video.title}`}
                    />
                    <button
                      type="button"
                      className="video-play"
                      onClick={() => play(video.id)}
                      aria-current={active ? "true" : undefined}
                    >
                      <span className="video-lesson">{lessonLabel(video)}</span>
                      <span className="video-title">{video.title}</span>
                      <span className="video-time">
                        {active ? <span className="playing">Đang mở</span> : formatClock(video.seconds)}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>

        <aside className="day-column">
          <div className="card">
            <div className="card-head">
              <h3>Thực hành</h3>
              <span className="count">
                {stats.tasksDone}/{day.tasks.length}
              </span>
            </div>
            <ul className="task-list">
              {day.tasks.map((task, index) => {
                const key = taskKey(day.day, index);
                return (
                  <li key={key}>
                    <label className="task">
                      <input
                        type="checkbox"
                        className="check"
                        checked={Boolean(progress.tasks[key])}
                        onChange={(event) => progressActions.setTaskDone(key, event.target.checked)}
                      />
                      <span>{task}</span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="card">
            <div className="card-head">
              <h3>
                <label htmlFor={notesId}>Ghi chú</label>
              </h3>
              <span className="count">Tự động lưu</span>
            </div>
            <textarea
              id={notesId}
              className="notes"
              rows={7}
              value={progress.notes[day.day] ?? ""}
              onChange={(event) => progressActions.setNote(day.day, event.target.value)}
              placeholder="Điều cần nhớ, lỗi hay gặp, câu hỏi để tra thêm…"
            />
          </div>

          <div className="card">
            <div className="card-head">
              <h3>Tài liệu</h3>
            </div>
            <ul className="link-list">
              {day.links.map((link) => (
                <li key={link.url}>
                  <a href={link.url} target="_blank" rel="noreferrer">
                    {link.label}
                    <ExternalIcon />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </section>
  );
}
