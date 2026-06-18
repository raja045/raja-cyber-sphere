import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Github, Mail } from "lucide-react";
import { Container } from "@/components/site/Container";
import { site } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28">
      <div className="absolute inset-0 grid-lines pointer-events-none" />
      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16 lg:items-center">
          <div className="flex flex-col">
            <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-[var(--color-border-strong)] bg-[var(--color-surface)] px-3 py-1.5">
              <span className="relative grid h-2 w-2 place-items-center">
                <span className="absolute inset-0 rounded-full bg-[var(--color-accent-2)] animate-pulse-soft" />
                <span className="relative h-1.5 w-1.5 rounded-full bg-[var(--color-accent-2)]" />
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-ink-muted)]">
                Open to new roles · {site.location}
              </span>
            </div>

            <h1 className="text-balance text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.02]">
              <span className="gradient-text">Building secure systems</span>
              <br />
              <span className="accent-gradient-text">that scale.</span>
            </h1>

            <p className="mt-6 max-w-xl text-pretty text-lg text-[var(--color-ink-muted)] leading-relaxed">
              I&apos;m <span className="text-[var(--color-ink)]">Raja Shekar Reddy Seelam</span> — a
              security engineer working at the intersection of{" "}
              <span className="text-[var(--color-ink)]">LLM red-teaming</span>,{" "}
              <span className="text-[var(--color-ink)]">cloud hardening</span>, and{" "}
              <span className="text-[var(--color-ink)]">SOC operations</span>. M.S. Cybersecurity at FIU.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href={`mailto:${site.email}`}
                className="group inline-flex items-center gap-2 rounded-lg bg-[var(--color-ink)] px-4 py-2.5 text-sm font-medium text-[var(--color-bg)] transition-all hover:opacity-90"
              >
                <Mail size={16} />
                Let&apos;s talk
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </Link>
              <Link
                href={site.resumeUrl}
                target="_blank"
                className="inline-flex items-center gap-2 rounded-lg border border-[var(--color-border-strong)] bg-[var(--color-surface)] px-4 py-2.5 text-sm font-medium text-[var(--color-ink)] transition-colors hover:bg-[var(--color-surface-2)]"
              >
                View résumé
                <ArrowUpRight size={16} />
              </Link>
              <Link
                href={site.social.github}
                target="_blank"
                className="inline-flex items-center gap-2 rounded-lg border border-[var(--color-border)] px-4 py-2.5 text-sm font-medium text-[var(--color-ink-muted)] transition-colors hover:text-[var(--color-ink)] hover:bg-[var(--color-surface)]"
              >
                <Github size={16} />
                GitHub
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 -z-10 rounded-3xl bg-[radial-gradient(60%_60%_at_50%_30%,rgba(124,92,255,0.18),transparent_70%)]" />
            <div className="glass-strong rounded-2xl p-2">
              <div className="relative overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-2)]">
                <Image
                  src="/photos/raja-photo.png"
                  alt={site.name}
                  width={520}
                  height={520}
                  priority
                  className="h-auto w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(7,7,11,0.85)] via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-ink-faint)]">
                    Currently
                  </p>
                  <p className="text-sm text-[var(--color-ink)]">
                    Graduate Researcher · FIU
                  </p>
                  <p className="text-xs text-[var(--color-ink-muted)]">
                    LLM adversarial robustness · Garak automation
                  </p>
                </div>
              </div>
            </div>

            <ul className="mt-4 grid grid-cols-2 gap-2">
              {site.proof.map((p) => (
                <li
                  key={p.label}
                  className="glass rounded-xl px-4 py-3 transition-colors hover:bg-[var(--color-surface-2)]"
                >
                  <p className="font-mono text-2xl font-semibold tracking-tight text-[var(--color-ink)]">
                    {p.value}
                  </p>
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--color-ink-muted)]">
                    {p.label}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-20 flex items-center gap-4 text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--color-ink-faint)]">
          <span>Trusted experience in</span>
          <span className="h-px flex-1 bg-[var(--color-border)]" />
        </div>
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {[
            "Splunk",
            "AWS",
            "Burp Suite",
            "Metasploit",
            "Wireshark",
            "Garak",
            "Kubernetes",
          ].map((tool) => (
            <div
              key={tool}
              className="glass rounded-lg px-3 py-2 text-center font-mono text-xs text-[var(--color-ink-muted)]"
            >
              {tool}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
