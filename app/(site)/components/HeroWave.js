"use client";

import { useEffect, useState } from "react";

const A = "M0,40 C240,80 480,0 720,36 C960,72 1200,8 1440,44 L1440,80 L0,80 Z";
const B = "M0,52 C240,10 480,70 720,34 C960,0 1200,66 1440,30 L1440,80 L0,80 Z";

/** Gently morphing wave that blends the hero into the section below. */
export default function HeroWave() {
  const [still, setStill] = useState(false);

  useEffect(() => {
    setStill(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  return (
    <svg className="hero-wave" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true">
      <path d={A} fill="var(--paper-alt)">
        {still ? null : (
          <animate
            attributeName="d"
            dur="9s"
            repeatCount="indefinite"
            values={`${A};${B};${A}`}
            calcMode="spline"
            keySplines="0.45 0 0.55 1;0.45 0 0.55 1"
          />
        )}
      </path>
    </svg>
  );
}
