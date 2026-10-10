// @flu-wop/design-system/motion — needs framer-motion and lenis installed.
// Kept out of the main entry so sites without those deps never import them.
export { SmoothScroll, type SmoothScrollProps } from "./SmoothScroll";
export { Reveal, EASE_CINEMATIC, type RevealProps } from "./Reveal";
export { Parallax, type ParallaxProps } from "./Parallax";
export { Magnetic, type MagneticProps } from "./Magnetic";
export { CountUp, type CountUpProps } from "./CountUp";
export { GrainOverlay, type GrainOverlayProps } from "./GrainOverlay";
export { ScrollToTop } from "./ScrollToTop";
export { usePrefersLessMotion } from "./useReducedMotionSafe";
