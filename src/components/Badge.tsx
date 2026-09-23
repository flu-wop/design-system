import * as React from "react";
import { cx } from "../cx";

export type BadgeVariant = "gold" | "outline" | "neutral" | "success" | "danger";
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** success and danger add a status dot; always include a word. */
  variant?: BadgeVariant;
}

export function Badge({ variant = "gold", className, children, ...rest }: BadgeProps) {
  return (
    <span className={cx("if-badge", `if-badge--${variant}`, className)} {...rest}>
      {(variant === "success" || variant === "danger") && <span className="if-dot" aria-hidden="true" />}
      {children}
    </span>
  );
}
