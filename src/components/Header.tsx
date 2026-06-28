"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";

import PathLink from "@/components/PathLink";
import { navLinks, siteConfig } from "@/lib/data";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed top-0 z-50 w-full border-b border-outline bg-background/90 backdrop-blur-xl">
      <div className="relative mx-auto flex h-20 max-w-[1280px] items-center justify-between px-5 md:px-16">
        <a
          href="/"
          className="font-display text-[1.35rem] font-medium text-on-surface transition-opacity hover:opacity-80"
        >
          {siteConfig.logo}
        </a>

        <nav
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => (
            <PathLink
              key={link.href}
              href={link.href}
              path={link.href}
              className={
                pathname === link.href
                  ? "border-b border-on-surface text-on-surface"
                  : ""
              }
            />
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <a
            href={siteConfig.resumeUrl}
            className="hidden border border-outline px-4 py-2 font-label text-[10px] font-medium uppercase tracking-[0.14em] text-on-surface transition-colors duration-300 hover:border-outline-strong hover:bg-surface-elevated md:inline-flex"
          >
            Resume
          </a>

          <button
            type="button"
            className="text-on-surface md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label="Toggle menu"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              {menuOpen ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav
          id="mobile-nav"
          className="border-t border-outline bg-background px-5 py-6 md:hidden"
          aria-label="Mobile navigation"
        >
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <PathLink
                key={link.href}
                href={link.href}
                path={link.href}
                onClick={() => setMenuOpen(false)}
                className={
                  pathname === link.href
                    ? "border-b border-on-surface text-on-surface"
                    : ""
                }
              />
            ))}
            <a
              href={siteConfig.resumeUrl}
              className="mt-2 w-fit border border-outline px-4 py-2 font-label text-[10px] font-medium uppercase tracking-[0.14em] text-on-surface"
            >
              Resume
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
