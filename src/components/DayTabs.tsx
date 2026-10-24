"use client";

import type { StudyDay } from "@/data/course";
import type { DayStats } from "@/lib/stats";
import { CheckIcon } from "./icons";

type Props = {
  days: StudyDay[];
  stats: DayStats[];
  activeDay: number;
  todayDay: number | null;
  onSelect: (day: number) => void;
};

export default function DayTabs({ days, stats, activeDay, todayDay, onSelect }: Props) {
  return (
    <nav className="tabs" aria-label="Các ngày học">
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
                  Ngày {day.day}
                  {complete ? (
                    <span className="tab-check" title="Đã hoàn thành">
                      <CheckIcon />
                    </span>
                  ) : (
                    todayDay === day.day && <span className="badge">Hôm nay</span>
                  )}
                </span>
                <span className="tab-title">{day.title}</span>
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
