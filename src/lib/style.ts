import type { CSSProperties } from "react";

/** Staggers the `.rise` entrance animation: element i starts i × 60ms later. */
export const stagger = (i: number) => ({ "--i": i }) as CSSProperties;
