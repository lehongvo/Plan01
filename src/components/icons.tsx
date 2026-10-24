const base = {
  className: "icon",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const;

export function CheckIcon() {
  return (
    <svg {...base}>
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  );
}

export function ExternalIcon() {
  return (
    <svg {...base}>
      <path d="M14 5h5v5M19 5l-8 8M18 14v4a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h4" />
    </svg>
  );
}

export function TodayIcon() {
  return (
    <svg {...base}>
      <rect x="4" y="5" width="16" height="15" rx="2.5" />
      <path d="M4 10h16M9 3v4M15 3v4" />
      <circle cx="12" cy="15" r="1.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function RoadmapIcon() {
  return (
    <svg {...base}>
      <path d="M4 6.5l5-2 6 2 5-2v13l-5 2-6-2-5 2z" />
      <path d="M9 4.5v13M15 6.5v13" />
    </svg>
  );
}

export function TracksIcon() {
  return (
    <svg {...base}>
      <path d="M12 4l8 4-8 4-8-4z" />
      <path d="M4 12l8 4 8-4M4 16l8 4 8-4" />
    </svg>
  );
}

export function PlayIcon() {
  return (
    <svg {...base}>
      <rect x="3.5" y="5" width="17" height="14" rx="3" />
      <path d="M10.5 9.5v5l4-2.5z" fill="currentColor" />
    </svg>
  );
}
