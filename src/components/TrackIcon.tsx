import type { TrackId } from "@/data/plan";

/** A gear outline (100×100 box) with `teeth` square-ish teeth and a round hole. */
function gearPath(teeth: number, outer: number, inner: number, hole: number) {
  const steps = teeth * 4;
  const points = Array.from({ length: steps }, (_, i) => {
    const radius = i % 4 < 2 ? outer : inner;
    const angle = (i / steps) * Math.PI * 2;
    return `${(50 + radius * Math.cos(angle)).toFixed(2)} ${(50 + radius * Math.sin(angle)).toFixed(2)}`;
  });
  return `M${points.join("L")}Z M${50 + hole} 50 A${hole} ${hole} 0 1 0 ${50 - hole} 50 A${hole} ${hole} 0 1 0 ${50 + hole} 50Z`;
}

export const GEAR_PATH = gearPath(10, 46, 37, 15);

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

export default function TrackIcon({ track }: { track: TrackId }) {
  if (track === "rust") {
    return (
      <svg className="icon track-icon" viewBox="0 0 100 100" aria-hidden="true">
        <path d={GEAR_PATH} fill="currentColor" fillRule="evenodd" />
      </svg>
    );
  }
  return (
    <svg className="icon track-icon" viewBox="0 0 24 24" aria-hidden="true" {...stroke}>
      {track === "solidity" && (
        <>
          <path d="M12 2.5 18 12l-6 3.6L6 12z" />
          <path d="M6 13.6 12 21.5l6-7.9-6 3.6z" />
        </>
      )}
      {track === "english" && (
        <>
          <path d="M4 5.5h16v10H10l-4.5 3.5V15.5H4z" />
          <path d="M8 9.5h8M8 12.5h5" />
        </>
      )}
      {track === "interview" && (
        <>
          <rect x="9" y="3" width="6" height="11" rx="3" />
          <path d="M6 11a6 6 0 0 0 12 0M12 17v4M9 21h6" />
        </>
      )}
      {track === "upwork" && (
        <>
          <rect x="3.5" y="7.5" width="17" height="12" rx="2" />
          <path d="M9 7.5V5.5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M3.5 12.5h17" />
        </>
      )}
      {track === "review" && (
        <>
          <rect x="5" y="3.5" width="14" height="17" rx="2" />
          <path d="M8.5 8.5l1.5 1.5 3-3M8.5 14l1.5 1.5 3-3M15 9h1M15 14.5h1" />
        </>
      )}
    </svg>
  );
}

/** Slowly turning Rust gears for page backgrounds. */
export function GearField() {
  return (
    <div className="gear-field" aria-hidden="true">
      {[1, 2, 3].map((n) => (
        <svg key={n} className={`gear gear-${n}`} viewBox="0 0 100 100">
          <path d={GEAR_PATH} fillRule="evenodd" />
        </svg>
      ))}
    </div>
  );
}
