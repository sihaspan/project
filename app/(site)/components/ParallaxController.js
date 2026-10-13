"use client";

import { useEffect } from "react";

/**
 * Scroll-driven parallax with no dependencies.
 *
 * Mark any element with:
 *   data-parallax="0.3"   vertical drift speed (positive = lags behind the scroll,
 *                         negative = moves faster than the scroll)
 *   data-parallax-max="120"  optional clamp in px (default 400)
 *   data-parallax-fade    optional: fade the element out as it scrolls away
 *
 * Elements are measured against the viewport centre, so it works anywhere on the page.
 * Skipped entirely when the visitor prefers reduced motion.
 */
export default function ParallaxController() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const els = Array.from(document.querySelectorAll("[data-parallax]"));
    if (!els.length) return;

    let ticking = false;

    const update = () => {
      ticking = false;
      const vh = window.innerHeight;
      for (const el of els) {
        const rect = el.getBoundingClientRect();
        if (rect.bottom < -300 || rect.top > vh + 300) continue; // off-screen, skip
        const speed = parseFloat(el.dataset.parallax) || 0;
        const max = parseFloat(el.dataset.parallaxMax) || 400;
        // distance of the element's centre from the viewport centre (ignoring our own shift)
        const current = parseFloat(el.dataset.shift) || 0;
        const centre = rect.top - current + rect.height / 2 - vh / 2;
        let y = -centre * speed;
        y = Math.max(-max, Math.min(max, y));
        el.dataset.shift = y;
        el.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0)`;

        if (el.hasAttribute("data-parallax-fade")) {
          const progress = Math.min(1, Math.max(0, window.scrollY / (vh * 0.7)));
          el.style.opacity = String(1 - progress * 0.85);
        }
      }
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      for (const el of els) {
        el.style.transform = "";
        el.style.opacity = "";
        delete el.dataset.shift;
      }
    };
  }, []);

  return null;
}
