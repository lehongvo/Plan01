import { useId, type ReactNode } from "react";

type Props = {
  /** 0–1 */
  value: number;
  size?: number;
  stroke?: number;
  label: string;
  children?: ReactNode;
};

/** A circular progress ring that sweeps in when it appears. */
export default function ProgressRing({ value, size = 88, stroke = 9, label, children }: Props) {
  const gradientId = `ring-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - Math.min(1, Math.max(0, value)));
  const middle = size / 2;

  return (
    <div className="ring" style={{ width: size, height: size }} role="img" aria-label={label}>
      <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size}>
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffc53d" />
            <stop offset="100%" stopColor="#f74c00" />
          </linearGradient>
        </defs>
        <circle className="ring-track" cx={middle} cy={middle} r={radius} strokeWidth={stroke} />
        <circle
          className="ring-value"
          cx={middle}
          cy={middle}
          r={radius}
          strokeWidth={stroke}
          stroke={`url(#${gradientId})`}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${middle} ${middle})`}
          style={{ ["--circumference" as string]: `${circumference}` }}
        />
      </svg>
      <div className="ring-label">{children}</div>
    </div>
  );
}
