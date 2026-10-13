"use client";

import { useEffect, useRef } from "react";

/**
 * Full-bleed looping background video for the hero.
 * Muted + playsInline are required for browsers to allow autoplay.
 */
export default function HeroVideo() {
  const ref = useRef(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    video.muted = true; // React doesn't always set the muted attribute on first render
    const attempt = video.play();
    if (attempt && typeof attempt.catch === "function") attempt.catch(() => {});
  }, []);

  return (
    <div className="hero-video" aria-hidden="true">
      <video
        ref={ref}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/video/hero1-poster.jpg"
        tabIndex={-1}
      >
        <source src="/video/hero1-web.mp4" type="video/mp4" />
      </video>
      <div className="hero-video-overlay" />
    </div>
  );
}
