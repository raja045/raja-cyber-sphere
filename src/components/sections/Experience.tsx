import { Section } from "@/components/site/Section";
import { Chip } from "@/components/ui/Chip";
import { experience } from "@/lib/cv";

export function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title="Where I&apos;ve put it to work."
      description="Three roles, one through-line: turn messy security signal into something defenders can act on."
    >
      <ol className="relative space-y-12 before:absolute before:left-[7px] before:top-1 before:bottom-1 before:w-px before:bg-[var(--color-border)]">
        {experience.map((r) => (
          <li key={r.company} className="relative pl-10">
            <span className="absolute left-0 top-1.5 grid h-4 w-4 place-items-center">
              <span className="absolute inset-0 rounded-full bg-[var(--color-accent-soft)]" />
              <span className="relative h-2 w-2 rounded-full bg-[var(--color-accent)]" />
            </span>
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
              <div>
                <h3 className="text-lg font-semibold tracking-tight text-[var(--color-ink)]">
                  {r.title}{" "}
                  <span className="font-normal text-[var(--color-ink-muted)]">
                    · {r.company}
                  </span>
                </h3>
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--color-ink-faint)]">
                  {r.location}
                </p>
              </div>
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--color-ink-muted)]">
                {r.start} — {r.end}
              </p>
            </div>
            <ul className="mt-4 space-y-2">
              {r.bullets.map((b, i) => (
                <li
                  key={i}
                  className="flex gap-3 text-sm leading-relaxed text-[var(--color-ink-muted)]"
                >
                  <span className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full bg-[var(--color-ink-faint)]" />
                  <span className="text-pretty">{b}</span>
                </li>
              ))}
            </ul>
            {r.tags && (
              <div className="mt-4 flex flex-wrap gap-1.5">
                {r.tags.map((t) => (
                  <Chip key={t} variant="mono">
                    {t}
                  </Chip>
                ))}
              </div>
            )}
          </li>
        ))}
      </ol>
    </Section>
  );
}
