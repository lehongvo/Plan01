"use client";

import { useRef, useState } from "react";
import { course } from "@/data/course";
import { exportBackup, importBackup, resetAll } from "@/lib/backup";
import { useI18n } from "@/lib/i18n";
import { planActions, usePlanProgress } from "@/lib/plan-progress";

type Notice = "exported" | "imported" | "invalid" | "cleared";

export default function SiteFooter() {
  const { t } = useI18n();
  const { startDate } = usePlanProgress();
  const fileRef = useRef<HTMLInputElement>(null);
  const [notice, setNotice] = useState<Notice | null>(null);
  const [confirmingReset, setConfirmingReset] = useState(false);

  function download() {
    const blob = new Blob([exportBackup()], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "plan01-progress.json";
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setNotice("exported");
  }

  async function restore(file: File) {
    try {
      importBackup(await file.text());
      setNotice("imported");
    } catch {
      setNotice("invalid");
    }
  }

  function reset() {
    if (!confirmingReset) {
      setConfirmingReset(true);
      return;
    }
    resetAll();
    setConfirmingReset(false);
    setNotice("cleared");
  }

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-settings">
          <label htmlFor="start-date">{t.footer.startDate}</label>
          <input
            id="start-date"
            type="date"
            value={startDate}
            onChange={(event) => planActions.setStartDate(event.target.value)}
          />
        </div>
        <div className="footer-actions">
          <button type="button" className="button" onClick={download}>
            {t.footer.export}
          </button>
          <button type="button" className="button" onClick={() => fileRef.current?.click()}>
            {t.footer.import}
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="application/json,.json"
            hidden
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) restore(file);
              event.target.value = "";
            }}
          />
          <button
            type="button"
            className={`button${confirmingReset ? " button-danger" : ""}`}
            onClick={reset}
            onBlur={() => setConfirmingReset(false)}
          >
            {confirmingReset ? t.footer.confirmReset : t.footer.reset}
          </button>
        </div>
        <p className="footer-note">
          {t.footer.note}
          {notice && (
            <span className="footer-message" role="status">
              {" "}
              {t.footer[notice]}
            </span>
          )}
        </p>
        <p className="credit">
          {t.footer.credit}{" "}
          <a href={course.playlist} target="_blank" rel="noreferrer">
            {course.title}
          </a>{" "}
          {t.footer.creditBy(course.channel)}
        </p>
      </div>
    </footer>
  );
}
