import { NextResponse } from "next/server";

export const runtime = "nodejs";

type ContactPayload = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  website?: string;
};

function isEmail(s: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

export async function POST(req: Request) {
  let body: ContactPayload;
  try {
    body = (await req.json()) as ContactPayload;
  } catch {
    return new NextResponse("Invalid JSON", { status: 400 });
  }

  // Honeypot — bots will fill this, humans won't see it
  if (body.website && body.website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const subject = (body.subject ?? "").trim();
  const message = (body.message ?? "").trim();

  if (!name || !email || !message) {
    return new NextResponse("Missing required fields", { status: 400 });
  }
  if (!isEmail(email)) {
    return new NextResponse("Invalid email", { status: 400 });
  }
  if (message.length > 5000 || name.length > 200 || subject.length > 200) {
    return new NextResponse("Field too long", { status: 400 });
  }

  // Optional Resend integration (zero config when RESEND_API_KEY is unset)
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? "rajacollegeevents@gmail.com";

  if (apiKey) {
    try {
      const r = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.CONTACT_FROM_EMAIL ?? "site@rajareddy.site",
          to,
          reply_to: email,
          subject: subject
            ? `[rajareddy.site] ${subject}`
            : `[rajareddy.site] New message from ${name}`,
          text: [
            `From: ${name} <${email}>`,
            subject ? `Subject: ${subject}` : null,
            "",
            message,
          ]
            .filter(Boolean)
            .join("\n"),
        }),
      });
      if (!r.ok) {
        const t = await r.text();
        return new NextResponse(`Email send failed: ${t}`, { status: 502 });
      }
    } catch (e) {
      return new NextResponse(
        `Email send failed: ${e instanceof Error ? e.message : "unknown"}`,
        { status: 502 },
      );
    }
  } else {
    // No email backend configured — log to stdout so Vercel captures it
    console.log("[contact]", { name, email, subject, message });
  }

  return NextResponse.json({ ok: true });
}
