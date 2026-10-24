"use client";

import { useRef, useState } from "react";
import { course } from "@/data/course";
import { progressActions } from "@/lib/progress";

export default function DataTools() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [confirmingReset, setConfirmingReset] = useState(false);

  function exportProgress() {
    const blob = new Blob([progressActions.exportJson()], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "rust-7-ngay-tien-do.json";
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setMessage("Đã tải file tiến độ.");
  }

  async function importProgress(file: File) {
    try {
      progressActions.importJson(await file.text());
      setMessage("Đã nhập tiến độ từ file.");
    } catch {
      setMessage("File không hợp lệ, tiến độ hiện tại vẫn giữ nguyên.");
    }
  }

  function reset() {
    if (!confirmingReset) {
      setConfirmingReset(true);
      return;
    }
    progressActions.reset();
    setConfirmingReset(false);
    setMessage("Đã xoá toàn bộ tiến độ và ghi chú.");
  }

  return (
    <footer className="footer">
      <div>
        <p>Tiến độ và ghi chú được lưu trong trình duyệt này. Muốn học tiếp trên máy khác thì Export rồi Import file.</p>
        {message && (
          <p className="footer-message" role="status">
            {message}
          </p>
        )}
      </div>
      <div className="footer-actions">
        <button type="button" className="button" onClick={exportProgress}>
          Export
        </button>
        <button type="button" className="button" onClick={() => fileRef.current?.click()}>
          Import
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="application/json,.json"
          hidden
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) importProgress(file);
            event.target.value = "";
          }}
        />
        <button
          type="button"
          className={`button${confirmingReset ? " button-danger" : ""}`}
          onClick={reset}
          onBlur={() => setConfirmingReset(false)}
        >
          {confirmingReset ? "Bấm lần nữa để xoá hết" : "Reset"}
        </button>
      </div>
      <p className="credit">
        Video:{" "}
        <a href={course.playlist} target="_blank" rel="noreferrer">
          {course.title}
        </a>{" "}
        của {course.channel} trên YouTube.
      </p>
    </footer>
  );
}
