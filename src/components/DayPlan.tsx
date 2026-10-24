"use client";

import Link from "next/link";
import { course } from "@/data/course";
import { TOTAL_DAYS, type Slot } from "@/data/plan";
import { QUOTES } from "@/data/quotes";
import { useCourseProgress, type CourseProgress } from "@/lib/course-progress";
import { getDayStats } from "@/lib/course-stats";
import { formatHours, formatMinutes, formatStudyDate, useToday } from "@/lib/dates";
import { useI18n } from "@/lib/i18n";
import { planActions, slotKey, usePlanProgress, type PlanProgress } from "@/lib/plan-progress";
import { dayMinutes, focusFor, phaseOf, planDayFor, slotsFor, trackById, weekOf } from "@/lib/schedule";
import FocusTasks from "./FocusTasks";
import { CheckIcon } from "./icons";
import LinkList from "./LinkList";

/** Week 1 Rust slots follow the matching day of the Rust course. */
function CourseSlotInfo({ day, progress }: { day: number; progress: CourseProgress }) {
  const { t, tr } = useI18n();
  const courseDay = course.days[day - 1];
  if (!courseDay) return null;
  const stats = getDayStats(courseDay, progress);
  return (
    <div className="course-link">
      <div>
        <p className="now-label">{t.day.courseDay(courseDay.day)}</p>
        <p className="now-title">{tr(courseDay.title)}</p>
        <p className="count">
          {t.day.courseCounts(
            `${stats.videosDone}/${courseDay.videos.length}`,
            `${stats.tasksDone}/${courseDay.tasks.length}`,
          )}
        </p>
      </div>
      <Link className="button button-primary" href="/rust">
        {t.day.openCourse}
      </Link>
    </div>
  );
}

type SlotCardProps = {
  day: number;
  slot: Slot;
  progress: PlanProgress;
  courseProgress: CourseProgress;
};

function SlotCard({ day, slot, progress, courseProgress }: SlotCardProps) {
  const { lang, t, tr } = useI18n();
  const week = weekOf(day);
  const key = slotKey(day, slot.id);
  const done = Boolean(progress.slots[key]);
  const focus = focusFor(week, slot.track);

  return (
    <li className={`card slot track-${slot.track}${done ? " is-done" : ""}`}>
      <div className="slot-head">
        <div className="slot-when">
          <span className="track-badge">{slot.label ?? tr(trackById(slot.track).name)}</span>
          <span className="slot-time">
            {slot.start}–{slot.end} · {formatMinutes(slot.minutes, lang)}
          </span>
        </div>
        <button
          type="button"
          className={`slot-toggle${done ? " is-on" : ""}`}
          aria-pressed={done}
          onClick={() => planActions.setSlotDone(key, !done)}
        >
          <CheckIcon />
          {done ? t.day.done : t.day.markDone}
        </button>
      </div>
      {focus && <h3 className="slot-title">{tr(focus.title)}</h3>}
      {slot.track === "rust" && week === 1 && <CourseSlotInfo day={day} progress={courseProgress} />}
      {focus && <FocusTasks week={week} track={slot.track} focus={focus} progress={progress} />}
      {focus?.links && <LinkList links={focus.links} />}
    </li>
  );
}

/** `onTodayPage` hides the "Today" link when this already is the today view. */
export default function DayPlan({ day, onTodayPage = false }: { day: number; onTodayPage?: boolean }) {
  const { lang, t, tr } = useI18n();
  const progress = usePlanProgress();
  const courseProgress = useCourseProgress();
  const today = useToday();
  const isToday = today !== null && planDayFor(progress.startDate, today) === day;
  const week = weekOf(day);
  const phase = phaseOf(day);
  const minutes = dayMinutes(day, progress);
  const notesId = `plan-day-${day}-notes`;

  return (
    <section className="plan-day" aria-labelledby={`plan-day-${day}`}>
      <header className="plan-day-head">
        <div>
          <p className="eyebrow">
            {t.day.header(day, TOTAL_DAYS, week)}
            {isToday && <span className="badge">{t.common.today}</span>}
          </p>
          <h2 id={`plan-day-${day}`}>{formatStudyDate(progress.startDate, day - 1, lang)}</h2>
          <p className="day-topic">{t.common.phase(phase.id, phase.title)}</p>
        </div>
        <nav className="day-nav" aria-label={t.day.navLabel}>
          {day > 1 && (
            <Link className="button" href={`/day/${day - 1}`}>
              {t.day.prev(day - 1)}
            </Link>
          )}
          {!isToday && !onTodayPage && (
            <Link className="button" href="/">
              {t.common.today}
            </Link>
          )}
          {day < TOTAL_DAYS && (
            <Link className="button" href={`/day/${day + 1}`}>
              {t.day.next(day + 1)}
            </Link>
          )}
        </nav>
      </header>

      <figure className="quote">
        <blockquote>{tr(QUOTES[day - 1])}</blockquote>
      </figure>

      <div className={`day-progress${minutes.complete ? " is-complete" : ""}`}>
        <div className="bar" aria-hidden="true">
          <span style={{ width: `${Math.round((minutes.done / minutes.planned) * 100)}%` }} />
        </div>
        <p>
          {minutes.complete
            ? t.day.complete(formatHours(minutes.done, lang))
            : t.day.studied(formatHours(minutes.done, lang), formatHours(minutes.planned, lang))}
        </p>
      </div>

      <ol className="slots">
        {slotsFor(day, progress.startDate).map((slot) => (
          <SlotCard key={slot.id} day={day} slot={slot} progress={progress} courseProgress={courseProgress} />
        ))}
      </ol>

      <div className="card">
        <div className="card-head">
          <h3>
            <label htmlFor={notesId}>{t.day.notes(day)}</label>
          </h3>
          <span className="count">{t.common.autosave}</span>
        </div>
        <textarea
          id={notesId}
          className="notes"
          rows={5}
          value={progress.notes[day] ?? ""}
          onChange={(event) => planActions.setNote(day, event.target.value)}
          placeholder={t.day.notesPlaceholder}
        />
      </div>
    </section>
  );
}
