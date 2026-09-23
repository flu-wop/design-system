import * as React from "react";
import { cx } from "../cx";
import { Badge, type BadgeVariant } from "./Badge";

export interface VignetteRow {
  primary: string;
  secondary?: string;
  status?: string;
  tone?: BadgeVariant;
}
export interface VignetteProps {
  /** Eyebrow title, e.g. "Tonight's sessions". */
  title: string;
  /** Mono meta at right, e.g. "Sat · Sep 26". */
  meta?: string;
  /** 2–3 rows of specific, plausible data for THIS client. */
  rows: VignetteRow[];
  /** What the miniature pictures, read as one image. */
  label?: string;
  className?: string;
}

/** A miniature of the real working system — show the product, never just describe it. */
export function Vignette({ title, meta, rows, label, className }: VignetteProps) {
  return (
    <div className={cx("if-vig", className)} role="img" aria-label={label ?? title}>
      <div className="if-vig__head">
        <span className="if-eyebrow">{title}</span>
        {meta && <span className="if-vig__meta">{meta}</span>}
      </div>
      {rows.map((r, i) => (
        <div key={i} className="if-vig__row">
          <div className="if-vig__main">
            <span className="if-vig__primary">{r.primary}</span>
            {r.secondary && <span className="if-vig__secondary">{r.secondary}</span>}
          </div>
          {r.status && <Badge variant={r.tone ?? "success"}>{r.status}</Badge>}
        </div>
      ))}
    </div>
  );
}
