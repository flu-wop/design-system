"use client";
/** Reveal: children fade and rise into place the first time they enter view. */
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { usePrefersLessMotion } from "./useReducedMotionSafe";

export const EASE_CINEMATIC = [0.22, 1, 0.36, 1] as const;

export interface RevealProps {
  children: ReactNode;
  delay?: number;
  /** Starting vertical offset in px. */
  y?: number;
  className?: string;
  as?: "div" | "section" | "li" | "span" | "article";
}

export function Reveal({ children, delay = 0, y = 28, className, as = "div" }: RevealProps) {
  const less = usePrefersLessMotion();
  const M = motion[as];
  if (less) return <M className={className}>{children}</M>;
  return (
    <M
      className={className}
      initial={{ opacity: 0, y, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-12% 0px -12% 0px" }}
      transition={{ duration: 0.9, ease: EASE_CINEMATIC, delay }}
    >
      {children}
    </M>
  );
}
