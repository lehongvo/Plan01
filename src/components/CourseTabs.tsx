"use client";

import type { StudyDay } from "@/data/course";
import type { DayStats } from "@/lib/course-stats";
import { useI18n } from "@/lib/i18n";
import { CheckIcon } from "./icons";

type Props = {
  days: StudyDay[];
  stats: DayStats[];
  activeDay: number;
  todayDay: number | null;
  onSelect: (day: number) => void;
};

export default function CourseTabs({ days, stats, activeDay, todayDay, onSelect }: Props) {
  const { t, tr } = useI18n();

  return (
    <nav className="tabs" aria-label={t.course.tabsLabel}>
      <ol>
        {days.map((day, index) => {
          const { complete, minutesDone, minutesTotal } = stats[index];
          const active = day.day === activeDay;
          return (
            <li key={day.day}>
              <button
                type="button"
                className={`tab${active ? " is-active" : ""}${complete ? " is-done" : ""}`}
                aria-current={active ? "true" : undefined}
                onClick={() => onSelect(day.day)}
              >
                <span className="tab-top">
                  {t.common.day(day.day)}
                  {complete ? (
                    <span className="tab-check" title={t.course.completed}>
                      <CheckIcon />
                    </span>
                  ) : (
                    todayDay === day.day && <span className="badge">{t.common.today}</span>
                  )}
                </span>
                <span className="tab-title">{tr(day.title)}</span>
                <span className="tab-bar" aria-hidden="true">
                  <span style={{ width: `${Math.round((minutesDone / minutesTotal) * 100)}%` }} />
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
