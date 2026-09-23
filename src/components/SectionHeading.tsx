import * as React from "react";
import { cx } from "../cx";

export interface SectionHeadingProps {
  eyebrow?: string;
  /** Outcome-voiced: "Booked while you sleep", never "Our Services". */
  title: string;
  /** The ONE word of `title` set italic in accent-text. */
  emphasis?: string;
  intro?: React.ReactNode;
  /** 1 = hero (display-xl, once per page); 2 = section (heading-1, default); 3 = sub-section. */
  level?: 1 | 2 | 3;
  align?: "start" | "center";
  className?: string;
}

export function SectionHeading({ eyebrow, title, emphasis, intro, level = 2, align = "start", className }: SectionHeadingProps) {
  const Tag = `h${level}` as "h1" | "h2" | "h3";
  let content: React.ReactNode = title;
  if (emphasis && title.includes(emphasis)) {
    const i = title.indexOf(emphasis);
    content = (
      <>
        {title.slice(0, i)}
        <em className="if-em">{emphasis}</em>
        {title.slice(i + emphasis.length)}
      </>
    );
  }
  return (
    <div className={cx("if-sh", align === "center" && "if-sh--center", className)}>
      {eyebrow && <p className="if-eyebrow">{eyebrow}</p>}
      <Tag className={cx("if-sh__title", level === 1 && "if-sh__title--hero")}>{content}</Tag>
      {intro && <p className="if-sh__intro">{intro}</p>}
    </div>
  );
}
