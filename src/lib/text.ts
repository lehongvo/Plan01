// Plain bilingual text helpers, safe to import from server and client code.

export type Lang = "en" | "vi";

/** User-facing text: a plain string reads the same in both languages. */
export type Text = string | { en: string; vi: string };

export const bi = (en: string, vi: string): Text => ({ en, vi });

export const tr = (text: Text, lang: Lang) => (typeof text === "string" ? text : text[lang]);
