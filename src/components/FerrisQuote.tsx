"use client";

import type { Text } from "@/lib/text";
import { useI18n } from "@/lib/i18n";
import Ferris, { type FerrisMood } from "./Ferris";

type Props = {
  quote: Text;
  mood: FerrisMood;
  size?: number;
};

/** Ferris delivering the day's motivational line in a speech bubble. */
export default function FerrisQuote({ quote, mood, size = 96 }: Props) {
  const { t, tr } = useI18n();

  return (
    <div className="ferris-quote">
      <Ferris mood={mood} size={size} />
      <figure className="bubble">
        <figcaption>{t.today.ferrisSays}</figcaption>
        <blockquote>{tr(quote)}</blockquote>
      </figure>
    </div>
  );
}
