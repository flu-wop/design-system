"use client";
import * as React from "react";
import { cx } from "../cx";

export type ButtonVariant = "primary" | "outline" | "secondary" | "ghost" | "danger" | "link";
export type ButtonSize = "sm" | "md" | "lg";

type Common = { variant?: ButtonVariant; size?: ButtonSize; className?: string; children?: React.ReactNode };
export type ButtonProps = Common &
  (
    | ({ href?: undefined } & React.ButtonHTMLAttributes<HTMLButtonElement>)
    | ({ href: string } & React.AnchorHTMLAttributes<HTMLAnchorElement>)
  );

/** Gold `primary` once per view; everything else quieter. Pass `href` to render a link styled as a button. */
export const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(function Button(
  { variant = "primary", size = "md", className, children, ...rest },
  ref
) {
  const classes = cx("if-btn", `if-btn--${variant}`, `if-btn--${size}`, className);
  if ("href" in rest && rest.href !== undefined) {
    return (
      <a ref={ref as React.Ref<HTMLAnchorElement>} className={classes} {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    );
  }
  const btn = rest as React.ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button ref={ref as React.Ref<HTMLButtonElement>} type={btn.type ?? "button"} className={classes} {...btn}>
      {children}
    </button>
  );
});
