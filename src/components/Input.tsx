"use client";
import * as React from "react";
import { cx } from "../cx";

type FieldProps = {
  label?: string;
  hint?: string;
  /** Replaces the hint and marks the field invalid. Say how to fix it. */
  error?: string;
  /** Classes for the wrapper (layout: width, grid/flex placement). */
  className?: string;
  /** Classes for the <input>/<textarea> itself, e.g. a height or font override. */
  inputClassName?: string;
};
export type InputProps = FieldProps &
  (
    | ({ multiline?: false } & Omit<React.InputHTMLAttributes<HTMLInputElement>, "className">)
    | ({ multiline: true } & Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "className">)
  );

export function Input({ label, hint, error, className, inputClassName, id, multiline, ...rest }: InputProps) {
  const auto = React.useId();
  const fieldId = id ?? `if-${auto}`;
  const noteId = `${fieldId}-note`;
  const shared = {
    id: fieldId,
    className: cx("if-input", error && "if-input--error", inputClassName),
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error || hint ? noteId : undefined,
  };
  return (
    <div className={cx("if-field", className)}>
      {label && <label htmlFor={fieldId} className="if-label">{label}</label>}
      {multiline ? (
        <textarea {...shared} {...(rest as React.TextareaHTMLAttributes<HTMLTextAreaElement>)} />
      ) : (
        <input {...shared} {...(rest as React.InputHTMLAttributes<HTMLInputElement>)} />
      )}
      {error ? <p id={noteId} className="if-error">{error}</p> : hint ? <p id={noteId} className="if-hint">{hint}</p> : null}
    </div>
  );
}
