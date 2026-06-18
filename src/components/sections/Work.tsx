"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, ExternalLink, Github, X } from "lucide-react";
import { Section } from "@/components/site/Section";
import { Chip } from "@/components/ui/Chip";
import {
  featuredProjects,
  otherProjects,
  type Project,
} from "@/lib/projects";
import { cn } from "@/lib/cn";

export function Work() {
  const [active, setActive] = useState<Project | null>(null);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active]);

  return (
    <Section
      id="work"
      eyebrow="Selected work"
      title={<>What I&apos;ve been building.</>}
      description="A small sample of production-shaped work — picked for what they say about how I solve security problems, not for resume real estate."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 auto-rows-[minmax(220px,auto)]">
        {featuredProjects.map((p, i) => (
          <ProjectCard
            key={p.slug}
            project={p}
            onOpen={() => setActive(p)}
            className={cn(
              p.span === "wide" && "lg:col-span-2",
              p.span === "tall" && "lg:row-span-2",
              i === 0 && "animate-fade-up",
            )}
          />
        ))}
      </div>

      {otherProjects.length > 0 && (
        <div className="mt-16">
          <div className="mb-5 flex items-center gap-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-ink-faint)]">
              Other work
            </p>
            <span className="h-px flex-1 bg-[var(--color-border)]" />
          </div>
          <ul className="grid gap-2 sm:grid-cols-2">
            {otherProjects.map((p) => (
              <li key={p.slug}>
                <button
                  onClick={() => setActive(p)}
                  className="group flex w-full items-start justify-between gap-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3.5 text-left transition-colors hover:bg-[var(--color-surface-2)] hover:border-[var(--color-border-strong)]"
                >
                  <div className="min-w-0">
                    <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--color-ink-faint)]">
                      {p.category}
                    </p>
                    <p className="mt-0.5 truncate text-sm font-medium text-[var(--color-ink)]">
                      {p.title}
                    </p>
                  </div>
                  <ArrowUpRight
                    size={16}
                    className="mt-1 shrink-0 text-[var(--color-ink-faint)] transition-all group-hover:text-[var(--color-accent)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {active && <ProjectModal project={active} onClose={() => setActive(null)} />}
    </Section>
  );
}

function ProjectCard({
  project,
  onOpen,
  className,
}: {
  project: Project;
  onOpen: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={onOpen}
      aria-label={`Open case study: ${project.title}`}
      className={cn(
        "group relative flex flex-col justify-between gap-6 overflow-hidden rounded-2xl glass p-6 text-left transition-all duration-300 hover:bg-[var(--color-surface-2)] hover:border-[var(--color-border-strong)] hover:translate-y-[-2px]",
        className,
      )}
    >
      <div className="absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(60% 60% at 20% 0%, rgba(124,92,255,0.10), transparent 70%)",
        }}
      />
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-ink-muted)]">
          {project.category}
        </p>
        <h3 className="mt-2 text-balance text-xl sm:text-2xl font-semibold tracking-tight text-[var(--color-ink)] group-hover:accent-gradient-text">
          {project.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-[var(--color-ink-muted)]">
          {project.summary}
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {project.stack.slice(0, 4).map((s) => (
          <Chip key={s} variant="mono">
            {s}
          </Chip>
        ))}
        {project.stack.length > 4 && (
          <Chip variant="mono">+{project.stack.length - 4}</Chip>
        )}
        <span className="ml-auto inline-flex items-center gap-1.5 font-mono text-[11px] text-[var(--color-ink-muted)] transition-colors group-hover:text-[var(--color-accent)]">
          Case study
          <ArrowUpRight size={14} />
        </span>
      </div>
    </button>
  );
}

function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={`p-${project.slug}-title`}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6"
    >
      <button
        aria-label="Close case study"
        onClick={onClose}
        className="absolute inset-0 bg-[rgba(7,7,11,0.78)] backdrop-blur-sm animate-fade-up"
      />
      <div className="relative max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-2xl sm:rounded-2xl glass-strong p-6 sm:p-8 animate-fade-up scrollbar-thin">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-ink-muted)]">
              {project.category}
            </p>
            <h3
              id={`p-${project.slug}-title`}
              className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight gradient-text"
            >
              {project.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-md border border-[var(--color-border-strong)] bg-[var(--color-surface)] text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]"
          >
            <X size={16} />
          </button>
        </div>

        <p className="mt-6 text-sm leading-relaxed text-[var(--color-ink)]">
          {project.context}
        </p>

        <div className="mt-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-ink-muted)]">
            Outcomes
          </p>
          <ul className="mt-3 space-y-2">
            {project.outcomes.map((o, i) => (
              <li key={i} className="flex gap-3 text-sm text-[var(--color-ink-muted)]">
                <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent)]" />
                <span>{o}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-ink-muted)]">
            Stack
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {project.stack.map((s) => (
              <Chip key={s} variant="mono">
                {s}
              </Chip>
            ))}
          </div>
        </div>

        {(project.github || project.href) && (
          <div className="mt-8 flex flex-wrap gap-3 border-t border-[var(--color-border)] pt-6">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-[var(--color-border-strong)] bg-[var(--color-surface)] px-3 py-2 text-sm font-medium text-[var(--color-ink)] hover:bg-[var(--color-surface-2)]"
              >
                <Github size={14} />
                Repository
              </a>
            )}
            {project.href && (
              <a
                href={project.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-ink)] px-3 py-2 text-sm font-medium text-[var(--color-bg)]"
              >
                <ExternalLink size={14} />
                Live
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
