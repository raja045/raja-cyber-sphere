import { Container } from "./Container";
import { cn } from "@/lib/cn";

export function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  className,
  innerClassName,
}: {
  id?: string;
  eyebrow?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
}) {
  return (
    <section id={id} className={cn("relative py-24 sm:py-32", className)}>
      <Container className={innerClassName}>
        {(eyebrow || title || description) && (
          <header className="mb-12 max-w-2xl">
            {eyebrow && (
              <p className="mb-3 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-ink-muted)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="text-balance text-3xl sm:text-4xl font-semibold tracking-tight gradient-text">
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-3 text-pretty text-base text-[var(--color-ink-muted)]">
                {description}
              </p>
            )}
          </header>
        )}
        {children}
      </Container>
    </section>
  );
}
