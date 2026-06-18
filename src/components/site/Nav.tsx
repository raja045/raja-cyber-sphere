"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { site } from "@/lib/site";
import { cn } from "@/lib/cn";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-300",
        scrolled ? "py-2" : "py-4",
      )}
    >
      <div
        className={cn(
          "mx-auto flex max-w-6xl items-center justify-between px-5 sm:px-8 lg:px-12 transition-all",
          scrolled &&
            "max-w-[68rem] rounded-2xl glass-strong shadow-[0_8px_32px_-12px_rgba(0,0,0,0.6)] py-3 px-4 sm:px-6",
        )}
      >
        <Link
          href="/"
          className="flex items-center gap-2 font-mono text-sm tracking-wide"
        >
          <span className="grid h-7 w-7 place-items-center rounded-md border border-[var(--color-border-strong)] bg-[var(--color-surface)] text-[11px] font-semibold text-[var(--color-ink)]">
            {site.initials}
          </span>
          <span className="hidden sm:inline text-[var(--color-ink-muted)]">
            rajareddy<span className="text-[var(--color-ink-faint)]">.site</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-1.5 text-sm text-[var(--color-ink-muted)] transition-colors hover:text-[var(--color-ink)] hover:bg-[var(--color-surface)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <Link
            href={site.resumeUrl}
            target="_blank"
            className="rounded-md border border-[var(--color-border-strong)] bg-[var(--color-surface)] px-3 py-1.5 text-sm font-medium text-[var(--color-ink)] transition-colors hover:bg-[var(--color-surface-2)]"
          >
            Resume
          </Link>
          <Link
            href={`mailto:${site.email}`}
            className="rounded-md bg-[var(--color-ink)] px-3 py-1.5 text-sm font-medium text-[var(--color-bg)] transition-opacity hover:opacity-90"
          >
            Get in touch
          </Link>
        </div>

        <button
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden grid h-9 w-9 place-items-center rounded-md border border-[var(--color-border-strong)] bg-[var(--color-surface)]"
        >
          {open ? <X size={16} /> : <Menu size={16} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden mx-5 mt-2 rounded-xl glass-strong p-3">
          <div className="flex flex-col">
            {site.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] hover:bg-[var(--color-surface)]"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-2 grid grid-cols-2 gap-2 border-t border-[var(--color-border)] pt-3">
              <Link
                href={site.resumeUrl}
                target="_blank"
                onClick={() => setOpen(false)}
                className="rounded-md border border-[var(--color-border-strong)] bg-[var(--color-surface)] px-3 py-2 text-center text-sm font-medium"
              >
                Resume
              </Link>
              <Link
                href={`mailto:${site.email}`}
                onClick={() => setOpen(false)}
                className="rounded-md bg-[var(--color-ink)] px-3 py-2 text-center text-sm font-medium text-[var(--color-bg)]"
              >
                Get in touch
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
