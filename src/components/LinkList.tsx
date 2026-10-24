"use client";

import Link from "next/link";
import type { Link as ResourceLink } from "@/data/plan";
import { useI18n } from "@/lib/i18n";
import { ExternalIcon } from "./icons";

/** Resource links; app routes open in place, everything else in a new tab. */
export default function LinkList({ links }: { links: ResourceLink[] }) {
  const { tr } = useI18n();

  return (
    <ul className="chip-links">
      {links.map((link) =>
        link.url.startsWith("/") ? (
          <li key={link.url}>
            <Link href={link.url}>{tr(link.label)} →</Link>
          </li>
        ) : (
          <li key={link.url}>
            <a href={link.url} target="_blank" rel="noreferrer">
              {tr(link.label)}
              <ExternalIcon />
            </a>
          </li>
        ),
      )}
    </ul>
  );
}
