"use client";

import type { CSSProperties } from "react";
import { PHASES, START_DATE, TOTAL_DAYS } from "@/data/plan";
import { formatHours } from "@/lib/dates";
import { useI18n } from "@/lib/i18n";
import type { PlanProgress } from "@/lib/plan-progress";
import { phaseDays, planTotals } from "@/lib/schedule";
import Ferris from "./Ferris";

type Props = {
  progress: PlanProgress;
  /** Today's plan day, or null before it is known; < 1 before the start. */
  todayDay: number | null;
};

/** The 100 days as a trail split into the 4 phases, with Ferris walking along it. */
export default function JourneyTrail({ progress, todayDay }: Props) {
  const { lang, t } = useI18n();
  const day = todayDay === null ? 0 : Math.min(Math.max(todayDay, 0), TOTAL_DAYS);
  const position = day < 1 ? 0 : ((day - 0.5) / TOTAL_DAYS) * 100;
  const totals = planTotals(progress);

  return (
    <section className="card trail-card">
      <div className="card-head">
        <h3>{t.today.journey}</h3>
        <span className="count">
          {t.today.journeyHours(formatHours(totals.done, lang), formatHours(totals.planned, lang))}
        </span>
      </div>
      <div className="trail">
        <div className="trail-track">
          {PHASES.map((phase) => {
            const span = phaseDays(phase.id, START_DATE);
            const filled = Math.min(1, Math.max(0, (day - span.first + 1) / span.length));
            return (
              <div key={phase.id} className="trail-seg" style={{ flexGrow: span.length }}>
                <span style={{ width: `${filled * 100}%` }} />
              </div>
            );
          })}
        </div>
        <div className="trail-ferris" style={{ "--pos": `${position}%` } as CSSProperties}>
          <Ferris mood="wave" size={40} />
        </div>
      </div>
      <ol className="trail-labels">
        {PHASES.map((phase) => {
          const span = phaseDays(phase.id, START_DATE);
          const active = day >= span.first && day <= span.last;
          return (
            <li key={phase.id} style={{ flexGrow: span.length }} className={active ? "is-active" : undefined}>
              {phase.title}
            </li>
          );
        })}
      </ol>
    </section>
  );
}
