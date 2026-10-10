"use client";
/**
 * SmoothScroll: Lenis inertial scrolling for the whole page. Drives every
 * scroll-linked effect (Parallax reads it through framer-motion's useScroll).
 * Skipped entirely when the visitor prefers reduced motion.
 */
import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";
import { usePrefersLessMotion } from "./useReducedMotionSafe";

export interface SmoothScrollProps {
  children: ReactNode;
  /** How heavy the glide feels. Lower = more inertia. */
  lerp?: number;
}

export function SmoothScroll({ children, lerp = 0.09 }: SmoothScrollProps) {
  const less = usePrefersLessMotion();
  if (less) return <>{children}</>;
  return (
    <ReactLenis root options={{ lerp, duration: 1.2, smoothWheel: true, wheelMultiplier: 1, touchMultiplier: 1.6 }}>
      {children}
    </ReactLenis>
  );
}
