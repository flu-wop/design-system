"use client";
/**
 * CountUp: counts a leading number up from 0 when it scrolls into view,
 * keeping any suffix ("20+", "3 rooms"). Non-numeric values render as-is.
 */
import { useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { usePrefersLessMotion } from "./useReducedMotionSafe";

export interface CountUpProps { value: string; className?: string }

export function CountUp({ value, className }: CountUpProps) {
  const match = value.match(/^([^\d]*)(\d[\d,]*)(.*)$/);
  const ref = useRef<HTMLSpanElement>(null);
  const less = usePrefersLessMotion();
  const inView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });
  const [display, setDisplay] = useState(match && !less ? `${match[1]}0${match[3]}` : value);
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { duration: 1400, bounce: 0 });

  useEffect(() => {
    if (!match || less) { setDisplay(value); return; }
    if (!inView) return;
    const target = parseInt(match[2].replace(/,/g, ""), 10);
    const unsub = spring.on("change", (v) => setDisplay(`${match[1]}${Math.round(v).toLocaleString("en-US")}${match[3]}`));
    mv.set(target);
    return () => unsub();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, less, value]);

  return <span ref={ref} className={className} aria-label={value}>{display}</span>;
}
