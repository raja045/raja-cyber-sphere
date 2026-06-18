import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";
import { Container } from "./Container";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-32 border-t border-[var(--color-border)] py-12">
      <Container className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-ink-faint)]">
            {site.location} · available for hire
          </p>
          <p className="text-sm text-[var(--color-ink-muted)]">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href={site.social.github}
            target="_blank"
            aria-label="GitHub"
            className="grid h-9 w-9 place-items-center rounded-md border border-[var(--color-border-strong)] bg-[var(--color-surface)] text-[var(--color-ink-muted)] transition-colors hover:text-[var(--color-ink)] hover:bg-[var(--color-surface-2)]"
          >
            <Github size={16} />
          </Link>
          <Link
            href={site.social.linkedin}
            target="_blank"
            aria-label="LinkedIn"
            className="grid h-9 w-9 place-items-center rounded-md border border-[var(--color-border-strong)] bg-[var(--color-surface)] text-[var(--color-ink-muted)] transition-colors hover:text-[var(--color-ink)] hover:bg-[var(--color-surface-2)]"
          >
            <Linkedin size={16} />
          </Link>
          <Link
            href={`mailto:${site.email}`}
            aria-label="Email"
            className="grid h-9 w-9 place-items-center rounded-md border border-[var(--color-border-strong)] bg-[var(--color-surface)] text-[var(--color-ink-muted)] transition-colors hover:text-[var(--color-ink)] hover:bg-[var(--color-surface-2)]"
          >
            <Mail size={16} />
          </Link>
        </div>
      </Container>
    </footer>
  );
}
