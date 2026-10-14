"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import BrandLockup from "./BrandLockup";
import Icon from "./Icons";
import ThemeToggle from "./ThemeToggle";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/insights", label: "Insights" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header>
      <div className="nav">
        <Link href="/" className="brand" onClick={() => setOpen(false)}>
          <BrandLockup />
        </Link>

        <nav className={`links${open ? " open" : ""}`} aria-label="Main">
          {NAV_LINKS.map((link) => {
            const active =
              pathname === link.href || (link.href !== "/" && pathname.startsWith(`${link.href}/`));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={active ? "active" : ""}
                aria-current={active ? "page" : undefined}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="nav-right">
          <ThemeToggle />
          <Link href="/contact" className="nav-cta" onClick={() => setOpen(false)}>
            Get in Touch
            <Icon name="arrow" size={20} strokeWidth={1.6} />
          </Link>
          <button
            type="button"
            className="menu-btn"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <span className={`burger${open ? " burger-open" : ""}`} />
          </button>
        </div>
      </div>
    </header>
  );
}
