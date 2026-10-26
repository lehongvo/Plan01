"use client";

import type { Focus, TrackId } from "@/data/plan";
import { useI18n } from "@/lib/i18n";
import { planActions, planTaskKey, type PlanProgress } from "@/lib/plan-progress";
import { rewardAt } from "@/lib/rewards";
import { XP, currentLevel } from "@/lib/xp";

type Props = {
  week: number;
  track: TrackId;
  focus: Focus;
  progress: PlanProgress;
};

/** The week's checklist for one track; the same boxes show on every day of that week. */
export default function FocusTasks({ week, track, focus, progress }: Props) {
  const { t, tr } = useI18n();

  return (
    <ul className="task-list">
      {focus.tasks.map((task, index) => {
        const key = planTaskKey(week, track, index);
        return (
          <li key={key}>
            <label className="task">
              <input
                type="checkbox"
                className="check"
                checked={Boolean(progress.tasks[key])}
                onChange={(event) => {
                  const checked = event.target.checked;
                  const levelBefore = currentLevel().level;
                  planActions.setTaskDone(key, checked);
                  if (checked) rewardAt(event.target, XP.task, levelBefore, t);
                }}
              />
              <span>{tr(task)}</span>
            </label>
          </li>
        );
      })}
    </ul>
  );
}
