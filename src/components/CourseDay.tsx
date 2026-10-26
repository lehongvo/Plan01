"use client";

import { useState } from "react";
import { course, type StudyDay, type Video } from "@/data/course";
import { PLAYBACK_RATES, courseActions, courseTaskKey, type CourseProgress } from "@/lib/course-progress";
import { getDayStats, nextUnwatched } from "@/lib/course-stats";
import { formatClock, formatMinutes } from "@/lib/dates";
import { useI18n, type Messages } from "@/lib/i18n";
import { CheckIcon, ExternalIcon } from "./icons";
import LinkList from "./LinkList";
import YouTubePlayer, { type PlayRequest } from "./YouTubePlayer";

type Props = {
  day: StudyDay;
  progress: CourseProgress;
  dateLabel: string;
  isToday: boolean;
};

const lessonLabel = (video: Video, t: Messages) =>
  video.lesson === null ? t.course.tip : t.course.lesson(video.lesson);

export default function CourseDay({ day, progress, dateLabel, isToday }: Props) {
  const { lang, t, tr } = useI18n();
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
    courseActions.setWatched(videoId, true);
    const next = nextUnwatched(day, progress, videoId);
    if (next) play(next.id);
    else setPicked(request); // last one: keep it on screen instead of jumping back
  }

  function toggleWatched(videoId: string, watched: boolean) {
    // Pin the current video so ticking boxes never swaps what is playing.
    if (!picked) setPicked(request);
    courseActions.setWatched(videoId, watched);
  }

  const titleId = `course-day-${day.day}-title`;
  const notesId = `course-day-${day.day}-notes`;

  return (
    <section className="day" aria-labelledby={titleId}>
      <header>
        <p className="eyebrow">
          {t.course.dayOf(day.day, course.days.length)} · {dateLabel}
          {isToday && <span className="badge">{t.common.today}</span>}
        </p>
        <h2 id={titleId}>{tr(day.title)}</h2>
        <p className="day-topic">{tr(day.topic)}</p>
        <ul className="meta">
          <li>{t.course.videoCount(day.videos.length)}</li>
          <li>{t.course.videoTime(formatMinutes(stats.videoSeconds / 60, lang))}</li>
          <li>{t.course.practice(day.practice)}</li>
          <li>{t.course.total(formatMinutes(stats.minutesTotal, lang))}</li>
        </ul>
      </header>

      <div className="day-grid">
        <div className="day-column">
          <div className="card player-card">
            <YouTubePlayer request={request} rate={progress.rate} onEnded={finish} />
            <div className="now-playing">
              <div className="now-text">
                <p className="now-label">
                  {lessonLabel(current, t)} · {formatClock(current.seconds)}
                </p>
                <p className="now-title">{current.title}</p>
              </div>
              <div className="player-actions">
                <div className="speed" role="group" aria-label={t.course.speed}>
                  {PLAYBACK_RATES.map((rate) => (
                    <button
                      key={rate}
                      type="button"
                      aria-pressed={progress.rate === rate}
                      onClick={() => courseActions.setRate(rate)}
                    >
                      {rate}×
                    </button>
                  ))}
                </div>
                <div className="player-buttons">
                  <button type="button" className="button button-primary" onClick={() => finish(current.id)}>
                    <CheckIcon />
                    {t.course.watchedNext}
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
          </div>

          <div className="card">
            <div className="card-head">
              <h3>{t.course.videoList}</h3>
              <span className="count">{t.course.watchedCount(stats.videosDone, day.videos.length)}</span>
            </div>
            {stats.videosDone === day.videos.length && <p className="notice">{t.course.allWatched(day.day)}</p>}
            <ol className="video-list">
              {day.videos.map((video) => {
                const watched = Boolean(progress.watched[video.id]);
                const active = video.id === current.id;
                return (
                  <li
                    key={video.id}
                    className={`video-row${active ? " is-active" : ""}${watched ? " is-done" : ""}`}
                  >
                    <label className="check-hit">
                      <input
                        type="checkbox"
                        className="check"
                        checked={watched}
                        onChange={(event) => toggleWatched(video.id, event.target.checked)}
                        aria-label={t.course.markWatched(video.title)}
                      />
                    </label>
                    <button
                      type="button"
                      className="video-play"
                      onClick={() => play(video.id)}
                      aria-current={active ? "true" : undefined}
                    >
                      <span className="video-lesson">{lessonLabel(video, t)}</span>
                      <span className="video-title">{video.title}</span>
                      <span className="video-time">
                        {active ? <span className="playing">{t.course.nowPlaying}</span> : formatClock(video.seconds)}
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
              <h3>{t.course.practiceTitle}</h3>
              <span className="count">
                {stats.tasksDone}/{day.tasks.length}
              </span>
            </div>
            <ul className="task-list">
              {day.tasks.map((task, index) => {
                const key = courseTaskKey(day.day, index);
                return (
                  <li key={key}>
                    <label className="task">
                      <input
                        type="checkbox"
                        className="check"
                        checked={Boolean(progress.tasks[key])}
                        onChange={(event) => courseActions.setTaskDone(key, event.target.checked)}
                      />
                      <span>{tr(task)}</span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="card">
            <div className="card-head">
              <h3>
                <label htmlFor={notesId}>{t.course.notesTitle}</label>
              </h3>
              <span className="count">{t.common.autosave}</span>
            </div>
            <textarea
              id={notesId}
              className="notes"
              rows={6}
              value={progress.notes[day.day] ?? ""}
              onChange={(event) => courseActions.setNote(day.day, event.target.value)}
              placeholder={t.course.notesPlaceholder}
            />
          </div>

          <div className="card">
            <div className="card-head">
              <h3>{t.course.resources}</h3>
            </div>
            <LinkList links={day.links} />
          </div>
        </aside>
      </div>
    </section>
  );
}
