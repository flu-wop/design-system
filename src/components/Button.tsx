"use client";
import * as React from "react";
import { cx } from "../cx";

export type ButtonVariant = "primary" | "outline" | "secondary" | "ghost" | "danger" | "link";
export type ButtonSize = "sm" | "md" | "lg" | "icon";

type Common = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Style the single child element (e.g. Next's <Link>) as the button instead of rendering a <button>. */
  asChild?: boolean;
  className?: string;
  children?: React.ReactNode;
};
export type ButtonProps = Common &
  (
    | ({ href?: undefined } & React.ButtonHTMLAttributes<HTMLButtonElement>)
    | ({ href: string } & React.AnchorHTMLAttributes<HTMLAnchorElement>)
  );

/** Gold `primary` once per view; everything else quieter. Pass `href` for a plain link, or `asChild` to wrap <Link>. */
export const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(function Button(
  { variant = "primary", size = "md", asChild = false, className, children, ...rest },
  ref
) {
  const classes = cx("if-btn", `if-btn--${variant}`, `if-btn--${size}`, className);
  if (asChild && React.isValidElement<{ className?: string }>(children)) {
    return React.cloneElement(children, {
      ...(rest as object),
      className: cx(classes, children.props.className),
    });
  }
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
