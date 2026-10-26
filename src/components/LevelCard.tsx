"use client";

import { useI18n } from "@/lib/i18n";
import { levelInfo } from "@/lib/xp";

export default function LevelCard({ xp }: { xp: number }) {
  const { lang, t } = useI18n();
  const level = levelInfo(xp);

  return (
    <div className="card level-card">
      <div className="level-hex" aria-hidden="true">
        <span>{level.level}</span>
      </div>
      <div className="level-text">
        <p className="level-label">{t.today.level(level.level)}</p>
        <p className="level-name">{level.name}</p>
        <div className="xp-bar" aria-hidden="true">
          <span style={{ width: `${Math.round(level.progress * 100)}%` }} />
        </div>
        <p className="count">
          {level.next ? t.today.toNext(level.next.min - xp) : t.today.maxLevel} ·{" "}
          {xp.toLocaleString(lang === "vi" ? "vi-VN" : "en-US")} XP
        </p>
      </div>
    </div>
  );
}
