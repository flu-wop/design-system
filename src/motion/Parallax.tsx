"use client";
/**
 * Parallax: scroll-linked drift. speed > 0 recedes (slower than scroll),
 * speed < 0 advances. Static when the visitor prefers reduced motion.
 */
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { usePrefersLessMotion } from "./useReducedMotionSafe";

export interface ParallaxProps {
  children: ReactNode;
  speed?: number;
  className?: string;
}

export function Parallax({ children, speed = 0.3, className }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const less = usePrefersLessMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [200 * speed, -200 * speed]);
  return (
    <motion.div ref={ref} style={less ? undefined : { y }} className={className}>
      {children}
    </motion.div>
  );
}
