"use client";
import { useReducedMotion } from "framer-motion";

/** True when the visitor asked for less motion. SSR-safe (false until hydrated). */
export function usePrefersLessMotion(): boolean {
  return useReducedMotion() ?? false;
}
