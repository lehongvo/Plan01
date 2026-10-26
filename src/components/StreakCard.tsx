"use client";

import { TOTAL_DAYS } from "@/data/plan";
import { useI18n } from "@/lib/i18n";
import type { PlanProgress } from "@/lib/plan-progress";
import { dayMinutes } from "@/lib/schedule";

type Props = {
  progress: PlanProgress;
  /** Today's plan day; < 1 before the start. */
  todayDay: number;
  streak: number;
};

type LinkState = "done" | "partial" | "today" | "missed" | "future";

/** Streak flame plus a 7-link chain: one link per plan day around today. */
export default function StreakCard({ progress, todayDay, streak }: Props) {
  const { t } = useI18n();
  const end = Math.min(Math.max(todayDay, 1), TOTAL_DAYS);
  const first = Math.max(1, Math.min(end - 6, TOTAL_DAYS - 6));
  const links = Array.from({ length: 7 }, (_, i) => {
    const day = first + i;
    const minutes = dayMinutes(day, progress);
    let state: LinkState = "missed";
    if (day > todayDay) state = "future";
    else if (minutes.complete) state = "done";
    else if (day === todayDay) state = "today";
    else if (minutes.done > 0) state = "partial";
    return { day, state };
  });

  return (
    <div className="card streak-card">
      <div className="streak-top">
        <svg className={`flame${streak > 0 ? " is-lit" : ""}`} viewBox="0 0 24 32" aria-hidden="true">
          <path d="M12 1c1.5 5 7 8.5 7 16a7 7 0 0 1-14 0c0-3.5 1.5-5.5 3-7 .2 2.4 1.2 3.8 2.6 4.4C9.8 10 10.8 5 12 1z" />
          <path className="flame-core" d="M12 15c1 2.6 3.5 4 3.5 7.2a3.5 3.5 0 0 1-7 0c0-2.2 1.3-3.2 2.2-4.2.2 1 .7 1.6 1.3 1.8-.2-1.8 0-3.4 0-4.8z" />
        </svg>
        <strong>{t.today.streakDays(streak)}</strong>
      </div>
      <ol className="chain" aria-label={t.today.chain}>
        {links.map(({ day, state }) => (
          <li key={day} className={`chain-link is-${state}`} title={t.common.day(day)} />
        ))}
      </ol>
      <p className="count">{todayDay < 1 ? t.today.chainNotStarted : t.today.chain}</p>
    </div>
  );
}
