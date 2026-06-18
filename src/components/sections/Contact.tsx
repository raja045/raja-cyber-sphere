"use client";

import { useState } from "react";
import { ArrowRight, Calendar, Check, Mail } from "lucide-react";
import { Section } from "@/components/site/Section";
import { site } from "@/lib/site";

export function Contact() {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errMsg, setErrMsg] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    setErrMsg(null);
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error((await res.text()) || "Request failed");
      setState("sent");
      form.reset();
    } catch (err) {
      setState("error");
      setErrMsg(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  return (
    <Section
      id="contact"
      eyebrow="Get in touch"
      title="Let's build something safer."
      description="Open to security engineering roles, AI red-teaming research, and interesting one-offs."
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        <div className="flex flex-col gap-4">
          <a
            href={`mailto:${site.email}`}
            className="group glass rounded-2xl p-5 transition-colors hover:bg-[var(--color-surface-2)]"
          >
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-md border border-[var(--color-border-strong)] bg-[var(--color-surface)] text-[var(--color-ink)]">
                <Mail size={16} />
              </span>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-ink-muted)]">
                  Email
                </p>
                <p className="text-sm text-[var(--color-ink)]">{site.email}</p>
              </div>
              <ArrowRight
                size={16}
                className="ml-auto text-[var(--color-ink-faint)] transition-all group-hover:text-[var(--color-accent)] group-hover:translate-x-0.5"
              />
            </div>
          </a>

          {site.calUrl ? (
            <a
              href={site.calUrl}
              target="_blank"
              rel="noreferrer"
              className="group glass rounded-2xl p-5 transition-colors hover:bg-[var(--color-surface-2)]"
            >
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-md border border-[var(--color-border-strong)] bg-[var(--color-surface)] text-[var(--color-ink)]">
                  <Calendar size={16} />
                </span>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-ink-muted)]">
                    Book a call
                  </p>
                  <p className="text-sm text-[var(--color-ink)]">
                    15 or 30-min slot — same day if I&apos;m free
                  </p>
                </div>
                <ArrowRight
                  size={16}
                  className="ml-auto text-[var(--color-ink-faint)] transition-all group-hover:text-[var(--color-accent)] group-hover:translate-x-0.5"
                />
              </div>
            </a>
          ) : (
            <div className="glass rounded-2xl p-5 opacity-60">
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-md border border-[var(--color-border-strong)] bg-[var(--color-surface)] text-[var(--color-ink)]">
                  <Calendar size={16} />
                </span>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-ink-muted)]">
                    Book a call
                  </p>
                  <p className="text-sm text-[var(--color-ink-muted)]">
                    Calendar coming soon — email me to schedule
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="glass rounded-2xl p-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-ink-muted)]">
              Best signal
            </p>
            <p className="mt-2 text-sm text-[var(--color-ink-muted)]">
              Subject line that tells me the role and company gets read first. Skip
              the templated outreach.
            </p>
          </div>
        </div>

        <form
          onSubmit={onSubmit}
          className="glass-strong rounded-2xl p-6 sm:p-8"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              name="name"
              label="Your name"
              placeholder="Jane Recruiter"
              required
            />
            <Field
              name="email"
              type="email"
              label="Email"
              placeholder="jane@company.com"
              required
            />
          </div>
          <Field
            className="mt-4"
            name="subject"
            label="Subject"
            placeholder="Security Engineer — Acme Inc."
          />
          <div className="mt-4">
            <label
              htmlFor="message"
              className="mb-2 block font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-ink-muted)]"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              placeholder="A bit of context goes a long way."
              className="block w-full resize-none rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2.5 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-ink-faint)] focus:border-[var(--color-accent)] focus:outline-none"
            />
          </div>

          {/* honeypot */}
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            className="absolute -left-[9999px] h-0 w-0 opacity-0"
          />

          <div className="mt-6 flex items-center justify-between gap-3">
            <p className="text-xs text-[var(--color-ink-faint)]">
              Replies usually within 24h on weekdays.
            </p>
            <button
              type="submit"
              disabled={state === "sending"}
              className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-ink)] px-4 py-2.5 text-sm font-medium text-[var(--color-bg)] transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {state === "sent" ? (
                <>
                  <Check size={16} /> Sent
                </>
              ) : state === "sending" ? (
                "Sending…"
              ) : (
                <>
                  Send message <ArrowRight size={16} />
                </>
              )}
            </button>
          </div>

          {state === "sent" && (
            <p
              role="status"
              className="mt-4 rounded-md border border-[var(--color-accent-soft)] bg-[var(--color-accent-soft)] px-3 py-2 text-sm text-[var(--color-ink)]"
            >
              Got it — I&apos;ll get back to you shortly.
            </p>
          )}
          {state === "error" && (
            <p
              role="alert"
              className="mt-4 rounded-md border border-[rgba(255,84,112,0.3)] bg-[rgba(255,84,112,0.08)] px-3 py-2 text-sm text-[var(--color-danger)]"
            >
              {errMsg ?? "Something went wrong"} — or email me directly.
            </p>
          )}
        </form>
      </div>
    </Section>
  );
}

function Field({
  name,
  label,
  type = "text",
  placeholder,
  required,
  className,
}: {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <label
        htmlFor={name}
        className="mb-2 block font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-ink-muted)]"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="block w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2.5 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-ink-faint)] focus:border-[var(--color-accent)] focus:outline-none"
      />
    </div>
  );
}
