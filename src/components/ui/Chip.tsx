import { cn } from "@/lib/cn";

export function Chip({
  children,
  variant = "default",
  className,
}: {
  children: React.ReactNode;
  variant?: "default" | "accent" | "mono";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs",
        variant === "default" &&
          "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-ink-muted)]",
        variant === "accent" &&
          "border-[var(--color-accent-soft)] bg-[var(--color-accent-soft)] text-[var(--color-ink)]",
        variant === "mono" &&
          "border-[var(--color-border)] bg-[var(--color-surface)] font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-ink-muted)]",
        className,
      )}
    >
      {children}
    </span>
  );
}
