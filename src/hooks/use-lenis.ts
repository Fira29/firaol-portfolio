"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Initialises Lenis smooth scrolling.
 * Call this once at the root layout level.
 * Respects prefers-reduced-motion automatically via Lenis options.
 */
export function useLenis() {
  useEffect(() => {
    // Respect user reduced-motion preference
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);
}
