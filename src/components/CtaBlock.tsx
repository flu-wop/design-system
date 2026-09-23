"use client";
import * as React from "react";
import { cx } from "../cx";
import { Button } from "./Button";

export interface CtaAction { label: string; href?: string; onClick?: () => void }
export interface CtaBlockProps {
  primary: CtaAction;
  secondary?: CtaAction;
  /** One quiet line that removes the visitor's fear. Always set it on hero CTAs. */
  reassurance?: string;
  size?: "md" | "lg";
  align?: "start" | "center";
  className?: string;
}

function Action({ a, variant, size }: { a: CtaAction; variant: "primary" | "outline"; size: "md" | "lg" }) {
  return a.href ? (
    <Button variant={variant} size={size} href={a.href}>{a.label}</Button>
  ) : (
    <Button variant={variant} size={size} onClick={a.onClick}>{a.label}</Button>
  );
}

export function CtaBlock({ primary, secondary, reassurance, size = "lg", align = "start", className }: CtaBlockProps) {
  return (
    <div className={cx("if-cta", align === "center" && "if-cta--center", className)}>
      <div className="if-cta__actions">
        <Action a={primary} variant="primary" size={size} />
        {secondary && <Action a={secondary} variant="outline" size={size} />}
      </div>
      {reassurance && <p className="if-cta__note">{reassurance}</p>}
    </div>
  );
}
