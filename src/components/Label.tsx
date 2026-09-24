import * as React from "react";
import { cx } from "../cx";

export type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;

/** The field label on its own — for controls that aren't a text Input (date pickers, option buttons, a code field beside a button). */
export function Label({ className, ...rest }: LabelProps) {
  return <label className={cx("if-label", className)} {...rest} />;
}
