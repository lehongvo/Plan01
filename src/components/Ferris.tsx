export type FerrisMood = "wave" | "work" | "party" | "sleep";

type Props = {
  mood?: FerrisMood;
  size?: number;
  className?: string;
};

const MOUTH: Record<FerrisMood, string> = {
  wave: "M52 54 Q60 61 68 54",
  work: "M54 56 Q60 59 66 56",
  party: "M52 53 Q60 65 68 53 Z",
  sleep: "M55 57 Q60 59 65 57",
};

/**
 * A hand-drawn crab in the spirit of Ferris, the Rust community mascot.
 * The animation for each mood lives in globals.css (.ferris-*).
 */
export default function Ferris({ mood = "wave", size = 120, className = "" }: Props) {
  return (
    <svg
      className={`ferris ferris-${mood} ${className}`}
      viewBox="0 0 120 96"
      width={size}
      height={(size * 96) / 120}
      aria-hidden="true"
    >
      <g className="ferris-body">
        <g className="ferris-legs">
          <path d="M34 64 L22 78 M40 68 L30 84 M48 70 L42 88" />
          <path d="M86 64 L98 78 M80 68 L90 84 M72 70 L78 88" />
        </g>
        <g className="ferris-claw ferris-claw-left">
          <path className="ferris-arm" d="M28 56 Q16 54 14 42" />
          <path className="ferris-pincer" d="M14 36 L19 27.3 A10 10 0 1 1 9 27.3 Z" />
        </g>
        <g className="ferris-claw ferris-claw-right">
          <path className="ferris-arm" d="M92 56 Q104 54 106 42" />
          <path className="ferris-pincer" d="M106 36 L111 27.3 A10 10 0 1 1 101 27.3 Z" />
        </g>
        <path
          className="ferris-shell"
          d="M32 40 L35 30 L40 37 L42 34 L46 24 L51 32 L55 31 L60 21 L65 31 L69 32 L74 24 L78 34 L80 37 L85 30 L88 40 C95 44 98 50 98 58 C98 69 82 75 60 75 C38 75 22 69 22 58 C22 50 25 44 32 40 Z"
        />
        <ellipse className="ferris-belly" cx="60" cy="68" rx="28" ry="6" />
        <circle className="ferris-cheek" cx="42" cy="54" r="4" />
        <circle className="ferris-cheek" cx="78" cy="54" r="4" />
        <path className={`ferris-mouth${mood === "party" ? " is-open" : ""}`} d={MOUTH[mood]} />
        <path className="ferris-stalk" d="M50 33 L48 24 M70 33 L72 24" />
        <circle className="ferris-eye" cx="48" cy="18" r="7.5" />
        <circle className="ferris-eye" cx="72" cy="18" r="7.5" />
        <circle className="ferris-pupil" cx="49" cy={mood === "work" ? 21 : 19} r="3.5" />
        <circle className="ferris-pupil" cx="73" cy={mood === "work" ? 21 : 19} r="3.5" />
        <rect className="ferris-lid" x="40.5" y="10.5" width="15" height="15" rx="7.5" />
        <rect className="ferris-lid" x="64.5" y="10.5" width="15" height="15" rx="7.5" />
      </g>
      {mood === "sleep" && (
        <g className="ferris-zs">
          <text x="92" y="22">
            z
          </text>
          <text x="102" y="12">
            z
          </text>
        </g>
      )}
    </svg>
  );
}
