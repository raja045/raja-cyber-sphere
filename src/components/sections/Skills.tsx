import { Section } from "@/components/site/Section";
import { Chip } from "@/components/ui/Chip";
import { skillGroups, certifications, education, volunteering } from "@/lib/cv";

export function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Skills, certs, and the rest"
      title="The toolbox."
      description="What I reach for first. Grouped roughly by where in the stack it lives."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((g) => (
          <div
            key={g.label}
            className="glass rounded-2xl p-5 transition-colors hover:bg-[var(--color-surface-2)]"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-ink-muted)]">
              {g.label}
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {g.items.map((i) => (
                <Chip key={i}>{i}</Chip>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 grid gap-4 lg:grid-cols-3">
        <div className="glass rounded-2xl p-5 lg:col-span-1">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-ink-muted)]">
            Certifications
          </p>
          <ul className="mt-3 space-y-1.5 text-sm text-[var(--color-ink)]">
            {certifications.map((c) => (
              <li key={c} className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-[var(--color-accent)]" />
                {c}
              </li>
            ))}
          </ul>
        </div>

        <div className="glass rounded-2xl p-5 lg:col-span-1">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-ink-muted)]">
            Education
          </p>
          <ul className="mt-3 space-y-3 text-sm">
            {education.map((e) => (
              <li key={e.school}>
                <p className="font-medium text-[var(--color-ink)]">{e.degree}</p>
                <p className="text-[var(--color-ink-muted)]">{e.school}</p>
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--color-ink-faint)]">
                  {e.start} — {e.end} · {e.detail}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className="glass rounded-2xl p-5 lg:col-span-1">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-ink-muted)]">
            Beyond the day-job
          </p>
          <ul className="mt-3 space-y-3 text-sm">
            {volunteering.map((v) => (
              <li key={v.org}>
                <p className="font-medium text-[var(--color-ink)]">
                  {v.title}{" "}
                  <span className="font-normal text-[var(--color-ink-muted)]">
                    · {v.org}
                  </span>
                </p>
                <p className="text-[var(--color-ink-muted)]">{v.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
