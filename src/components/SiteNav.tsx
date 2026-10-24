"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useI18n } from "@/lib/i18n";
import { PlayIcon, RoadmapIcon, TodayIcon, TracksIcon } from "./icons";

/** Top links on wide screens; an iOS-style tab bar at the bottom on phones. */
export default function SiteNav() {
  const { t } = useI18n();
  const pathname = usePathname();
  const links = [
    { href: "/", label: t.nav.today, icon: <TodayIcon /> },
    { href: "/roadmap", label: t.nav.roadmap, icon: <RoadmapIcon /> },
    { href: "/tracks", label: t.nav.tracks, icon: <TracksIcon /> },
    { href: "/rust", label: t.nav.rust, icon: <PlayIcon /> },
  ];

  return (
    <nav className="site-nav" aria-label={t.nav.label}>
      {links.map(({ href, label, icon }) => {
        const active = href === "/" ? pathname === "/" || pathname.startsWith("/day/") : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            className={`nav-link${active ? " is-active" : ""}`}
            aria-current={active ? "page" : undefined}
          >
            {icon}
            <span>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
