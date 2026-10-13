"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * Route transition: new pages fade/slide in, and a brand-coloured curtain
 * sweeps away on every navigation (skipped on the very first load).
 */
export default function PageFade({ children }) {
  const pathname = usePathname();
  const first = useRef(true);
  const isFirst = first.current;

  useEffect(() => {
    first.current = false;
  }, []);

  return (
    <>
      {!isFirst && <div key={`wipe-${pathname}`} className="route-wipe" aria-hidden="true" />}
      <main key={pathname} className="page-fade">
        {children}
      </main>
    </>
  );
}
