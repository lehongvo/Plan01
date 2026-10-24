"use client";

import { useEffect } from "react";
import { setLang, useI18n, type Lang } from "@/lib/i18n";

const OPTIONS: { lang: Lang; label: string }[] = [
  { lang: "en", label: "EN" },
  { lang: "vi", label: "VI" },
];

export default function LangSwitch() {
  const { lang, t } = useI18n();

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <div className="lang-switch" role="group" aria-label={t.nav.language}>
      {OPTIONS.map((option) => (
        <button
          key={option.lang}
          type="button"
          aria-pressed={lang === option.lang}
          onClick={() => setLang(option.lang)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
