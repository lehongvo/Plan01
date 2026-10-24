import type { StudyDay, Video } from "@/data/course";
import { taskKey, type Progress } from "./progress";

export type DayStats = {
  videosDone: number;
  videoSeconds: number;
  watchedSeconds: number;
  tasksDone: number;
  /** Study minutes done, counting each task as an equal share of the practice time. */
  minutesDone: number;
  minutesTotal: number;
  complete: boolean;
};

export function getDayStats(day: StudyDay, progress: Progress): DayStats {
  let videosDone = 0;
  let videoSeconds = 0;
  let watchedSeconds = 0;
  for (const video of day.videos) {
    videoSeconds += video.seconds;
    if (progress.watched[video.id]) {
      videosDone += 1;
      watchedSeconds += video.seconds;
    }
  }
  const tasksDone = day.tasks.filter((_, i) => progress.tasks[taskKey(day.day, i)]).length;
  const minutesPerTask = day.tasks.length ? day.practice / day.tasks.length : 0;
  return {
    videosDone,
    videoSeconds,
    watchedSeconds,
    tasksDone,
    minutesDone: watchedSeconds / 60 + tasksDone * minutesPerTask,
    minutesTotal: videoSeconds / 60 + day.practice,
    complete: videosDone === day.videos.length && tasksDone === day.tasks.length,
  };
}

/** The first unwatched video after `fromId`, wrapping to the start of the day; null when all are watched. */
export function nextUnwatched(day: StudyDay, progress: Progress, fromId?: string): Video | null {
  const start = fromId ? day.videos.findIndex((v) => v.id === fromId) + 1 : 0;
  const ordered = [...day.videos.slice(start), ...day.videos.slice(0, start)];
  return ordered.find((v) => v.id !== fromId && !progress.watched[v.id]) ?? null;
}

export function lessonLabel(video: Video) {
  return video.lesson === null ? "Tip" : `Bài ${video.lesson}`;
}
