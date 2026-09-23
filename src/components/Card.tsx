import * as React from "react";
import { cx } from "../cx";

export interface CardProps {
  eyebrow?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  footer?: React.ReactNode;
  /** Lift 4px with shadow-lift on hover — clickable cards only. */
  lift?: boolean;
  /** Heading level for the title (default h3). */
  as?: "h2" | "h3" | "h4";
  className?: string;
  children?: React.ReactNode;
}

export function Card({ eyebrow, title, description, footer, lift, as: Title = "h3", className, children }: CardProps) {
  return (
    <div className={cx("if-card", lift && "if-card--lift", className)}>
      {eyebrow && <p className="if-eyebrow">{eyebrow}</p>}
      {title && <Title className="if-card__title">{title}</Title>}
      {description && <p className="if-card__desc">{description}</p>}
      {children && <div className="if-card__body">{children}</div>}
      {footer && <div className="if-card__footer">{footer}</div>}
    </div>
  );
}
