"use client";

import Link from "next/link";
import { useState, type MouseEvent } from "react";
import { course } from "@/data/course";
import { START_DATE, TOTAL_DAYS, type Slot } from "@/data/plan";
import { useCourseProgress, type CourseProgress } from "@/lib/course-progress";
import { getDayStats } from "@/lib/course-stats";
import {
  formatHours,
  formatMinutes,
  formatShortDate,
  formatStudyDate,
  toMinutes,
  useNowMinutes,
  useToday,
} from "@/lib/dates";
import { useI18n } from "@/lib/i18n";
import {
  planActions,
  planStore,
  planTaskKey,
  slotKey,
  usePlanProgress,
  type PlanProgress,
} from "@/lib/plan-progress";
import { rewardAt } from "@/lib/rewards";
import { dayMinutes, focusFor, phaseOf, planDayFor, quoteFor, slotsFor, trackById, weekOf } from "@/lib/schedule";
import { stagger } from "@/lib/style";
import { currentLevel } from "@/lib/xp";
import FerrisQuote from "./FerrisQuote";
import FocusTasks from "./FocusTasks";
import { CheckIcon } from "./icons";
import LinkList from "./LinkList";
import TrackIcon from "./TrackIcon";

/** Rust slots on plan days 1–6 follow the matching day of the Rust course. */
function CourseSlotInfo({ day, progress }: { day: number; progress: CourseProgress }) {
  const { t, tr } = useI18n();
  const courseDay = course.days[day - 1];
  if (!courseDay) return null;
  const stats = getDayStats(courseDay, progress);
  return (
    <div className="course-link">
      <div>
        <p className="now-label">{t.day.courseDay(courseDay.day, course.days.length)}</p>
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
  index: number;
  /** An earlier slot of the same track that day (weekend Rust 16:00); it carries the checklist. */
  firstOfTrack: Slot | null;
  progress: PlanProgress;
  courseProgress: CourseProgress;
  isNow: boolean;
  /** Days that have not started yet cannot be marked done. */
  locked: boolean;
};

function SlotCard({ day, slot, index, firstOfTrack, progress, courseProgress, isNow, locked }: SlotCardProps) {
  const { lang, t, tr } = useI18n();
  const [expanded, setExpanded] = useState(false);
  const week = weekOf(day, START_DATE);
  const key = slotKey(day, slot.id);
  const done = Boolean(progress.slots[key]);
  const focus = focusFor(week, slot.track);
  // A finished quest folds its checklist away so the open ones stand out.
  const showBody = !done || expanded;
  const tasksDone = focus ? focus.tasks.filter((_, i) => progress.tasks[planTaskKey(week, slot.track, i)]).length : 0;

  function toggle(event: MouseEvent<HTMLButtonElement>) {
    if (done) {
      planActions.setSlotDone(key, false);
      return;
    }
    const button = event.currentTarget;
    const levelBefore = currentLevel().level;
    planActions.setSlotDone(key, true);
    const dayDone = dayMinutes(day, planStore.get()).complete;
    rewardAt(button, slot.minutes, levelBefore, t, dayDone ? [t.celebrate.dayDone] : []);
  }

  return (
    <li
      id={`slot-${slot.id}`}
      className={`card slot rise track-${slot.track}${done ? " is-done" : ""}${isNow ? " is-now" : ""}`}
      style={stagger(index + 3)}
    >
      <div className="slot-head">
        <span className="slot-icon">
          <TrackIcon track={slot.track} />
        </span>
        <div className="slot-when">
          <span className="track-badge">
            {tr(trackById(slot.track).name)}
            {isNow && <span className="badge">{t.day.nowBadge}</span>}
          </span>
          <span className="slot-time">
            {slot.start}–{slot.end} · {formatMinutes(slot.minutes, lang)}
          </span>
        </div>
        <button
          type="button"
          className={`slot-toggle${done ? " is-on" : ""}`}
          aria-pressed={done}
          disabled={locked && !done}
          onClick={toggle}
        >
          <CheckIcon />
          {locked && !done
            ? t.day.opensOn(formatShortDate(START_DATE, day - 1, lang))
            : done
              ? t.day.done
              : t.day.markDone}
        </button>
      </div>
      {done && (
        <span className="stamp" aria-hidden="true">
          {t.day.stamp}
        </span>
      )}
      {focus && <h3 className="slot-title">{tr(focus.title)}</h3>}
      {firstOfTrack ? (
        <p className="weekly-hint">{t.day.continues(firstOfTrack.start)}</p>
      ) : (
        showBody && (
          <>
            {slot.track === "rust" && day <= course.days.length && (
              <CourseSlotInfo day={day} progress={courseProgress} />
            )}
            {focus && (
              <>
                <p className="weekly-hint">{t.day.weeklyHint}</p>
                <FocusTasks week={week} track={slot.track} focus={focus} progress={progress} />
              </>
            )}
            {focus?.links && <LinkList links={focus.links} />}
          </>
        )
      )}
      {done && focus && !firstOfTrack && (
        <button type="button" className="slot-more" aria-expanded={expanded} onClick={() => setExpanded(!expanded)}>
          {expanded ? t.day.hideTasks : t.day.showTasks(tasksDone, focus.tasks.length)}
        </button>
      )}
    </li>
  );
}

/** The day's progress as a little `cargo run` build log. */
function BuildLog({ day, slotsDone, slotCount, minutesDone, minutesPlanned }: {
  day: number;
  slotsDone: number;
  slotCount: number;
  minutesDone: number;
  minutesPlanned: number;
}) {
  const { lang, t } = useI18n();
  const complete = slotsDone === slotCount;
  return (
    <div className={`build rise${complete ? " is-done" : ""}`} style={stagger(2)}>
      <p className="build-cmd">
        <span className="build-prompt">$</span> <span className="build-typed">{t.day.buildCmd(day)}</span>
      </p>
      <p className="build-line">
        {complete ? (
          <>
            <span className="build-ok">✔</span> {t.day.finished(formatHours(minutesDone, lang))}
          </>
        ) : (
          <>
            <span className="build-spin" aria-hidden="true" /> {t.day.compiling(slotsDone, slotCount)}
          </>
        )}
      </p>
      <div className="build-bar" aria-hidden="true">
        <span style={{ width: `${Math.round((minutesDone / minutesPlanned) * 100)}%` }} />
      </div>
    </div>
  );
}

type Status = { tone: "now" | "next" | "over" | "done"; text: string; slotId?: string };

type DayPlanProps = {
  day: number;
  /** "today" drops the date header and quote (the today hero shows them) and moves day navigation to the end. */
  variant?: "page" | "today";
};

export default function DayPlan({ day, variant = "page" }: DayPlanProps) {
  const { lang, t, tr } = useI18n();
  const progress = usePlanProgress();
  const courseProgress = useCourseProgress();
  const today = useToday();
  const nowMinutes = useNowMinutes();
  const todayDay = today === null ? null : planDayFor(START_DATE, today);
  const isToday = todayDay === day;
  const locked = todayDay !== null && day > todayDay;
  const week = weekOf(day, START_DATE);
  const phase = phaseOf(day, START_DATE);
  const slots = slotsFor(day, START_DATE);
  const minutes = dayMinutes(day, progress);
  const slotsDone = slots.filter((s) => progress.slots[slotKey(day, s.id)]).length;
  const notesId = `plan-day-${day}-notes`;
  const earlierOfTrack = (slot: Slot) =>
    slots.find((s) => s.track === slot.track && toMinutes(s.start) < toMinutes(slot.start)) ?? null;

  // Which slot is running now, or comes next, while viewing today.
  let nowSlot: Slot | undefined;
  let status: Status | null = null;
  if (minutes.complete) {
    status = { tone: "done", text: t.day.dayDone(formatHours(minutes.done, lang)) };
  } else if (isToday && nowMinutes !== null) {
    const open = (s: Slot) => !progress.slots[slotKey(day, s.id)];
    const name = (s: Slot) => tr(trackById(s.track).name);
    nowSlot = slots.find((s) => nowMinutes >= toMinutes(s.start) && nowMinutes < toMinutes(s.end));
    // Once the running slot is ticked, point at the next open one instead.
    const nextSlot = slots.find((s) => toMinutes(s.start) > nowMinutes && open(s));
    if (nowSlot && open(nowSlot)) {
      status = { tone: "now", text: t.day.now(name(nowSlot), nowSlot.start, nowSlot.end), slotId: nowSlot.id };
    } else if (nextSlot) {
      status = { tone: "next", text: t.day.upNext(name(nextSlot), nextSlot.start), slotId: nextSlot.id };
    } else {
      status = { tone: "over", text: t.day.over };
    }
  }

  const dayNav = (
    <nav className="day-nav" aria-label={t.day.navLabel}>
      {day > 1 && (
        <Link className="button" href={`/day/${day - 1}`}>
          {t.day.prev(day - 1)}
        </Link>
      )}
      {!isToday && variant === "page" && (
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
  );

  return (
    <section className="plan-day" aria-labelledby={variant === "page" ? `plan-day-${day}` : undefined}>
      {variant === "page" && (
        <>
          <header className="plan-day-head rise">
            <div>
              <p className="eyebrow">
                {t.day.header(day, TOTAL_DAYS, t.common.week(week))}
                {isToday && <span className="badge">{t.common.today}</span>}
              </p>
              <h2 id={`plan-day-${day}`}>{formatStudyDate(START_DATE, day - 1, lang)}</h2>
              <p className="day-topic">{t.common.phase(phase.id, phase.title)}</p>
            </div>
            {dayNav}
          </header>
          <div className="rise" style={stagger(1)}>
            <FerrisQuote quote={quoteFor(day, START_DATE)} mood={minutes.complete ? "party" : "wave"} size={80} />
          </div>
        </>
      )}

      {status && (
        <div className={`status status-${status.tone} rise`} role="status" style={stagger(1)}>
          <span>{status.text}</span>
          {status.slotId && (
            <a className="status-go" href={`#slot-${status.slotId}`}>
              {t.day.go} ↓
            </a>
          )}
        </div>
      )}

      <BuildLog
        day={day}
        slotsDone={slotsDone}
        slotCount={slots.length}
        minutesDone={minutes.done}
        minutesPlanned={minutes.planned}
      />

      <h2 className="section-title">{t.day.quests}</h2>
      <ol className="slots">
        {slots.map((slot, index) => (
          <SlotCard
            key={slot.id}
            day={day}
            slot={slot}
            index={index}
            firstOfTrack={earlierOfTrack(slot)}
            progress={progress}
            courseProgress={courseProgress}
            isNow={slot.id === nowSlot?.id && !progress.slots[slotKey(day, slot.id)]}
            locked={locked}
          />
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

      {variant === "today" && dayNav}
    </section>
  );
}
