"use client";
/**
 * GrainOverlay: fixed full-viewport film grain plus a faint accent vignette.
 * Uses --if-accent so each site's theme tints it (gold on MCS, ember on FOTB).
 */
export interface GrainOverlayProps {
  /** Grain opacity, 0–1. */
  opacity?: number;
  /** Vignette tint strength, 0–1. */
  glow?: number;
}

const NOISE = "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

export function GrainOverlay({ opacity = 0.05, glow = 0.07 }: GrainOverlayProps) {
  return (
    <>
      <div aria-hidden className="pointer-events-none fixed inset-0 z-[60] mix-blend-overlay"
        style={{ opacity, backgroundImage: NOISE, backgroundSize: "180px 180px" }} />
      <div aria-hidden className="pointer-events-none fixed inset-0 z-[55]"
        style={{ background: `radial-gradient(120% 120% at 50% 0%, transparent 55%, color-mix(in srgb, var(--if-accent) ${Math.round(glow * 100)}%, transparent) 100%)` }} />
    </>
  );
}
