"use client";
/**
 * ScrollToTop: a round back-to-top button after 1.5 screens, plus a scroll
 * reset on every route change (Lenis can otherwise keep the old position).
 * Pass `hidden` on routes that shouldn't show it (e.g. /admin).
 */
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react";

export function ScrollToTop({ hidden = false }: { hidden?: boolean }) {
  const pathname = usePathname();
  const [show, setShow] = useState(false);
  const lenis = useLenis(({ scroll }) => setShow(scroll > window.innerHeight * 1.5));

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 1.5);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (window.location.hash) return;
    if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
    else window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  if (hidden) return null;

  function toTop() {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (lenis && !reduce) lenis.scrollTo(0, { duration: 1.4 });
    else window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    document.querySelector<HTMLElement>("header a, header button")?.focus({ preventScroll: true });
  }

  return (
    <button type="button" onClick={toTop} aria-label="Back to top" tabIndex={show ? 0 : -1}
      className={`if-totop ${show ? "is-shown" : ""}`}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
        <path d="M8 13V3M3.5 7.5 8 3l4.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
