"use client";

import { usePathname } from "next/navigation";

export default function PageFade({ children }) {
  const pathname = usePathname();

  return (
    <main key={pathname} className="page-fade">
      {children}
    </main>
  );
}
