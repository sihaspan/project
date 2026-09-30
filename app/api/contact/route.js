import { NextResponse } from "next/server";

export const runtime = "nodejs";

const TO_EMAIL = process.env.CONTACT_TO_EMAIL || "info@sihaspan.com";
// Must be an address on a domain verified in Resend (e.g. sihaspan.com).
const FROM_EMAIL =
  process.env.CONTACT_FROM_EMAIL || "Siha Span Website <no-reply@sihaspan.com>";

const escapeHtml = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const clean = (v, max) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const noNewlines = (s) => s.replace(/[\r\n]+/g, " ");

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real users never fill this in. Pretend success for bots.
  if (body.website) return NextResponse.json({ ok: true });

  const name = noNewlines(clean(body.name, 120));
  const org = noNewlines(clean(body.org, 160));
  const email = noNewlines(clean(body.email, 200));
  const message = clean(body.message, 5000);

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Please fill in all required fields." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("Contact form: RESEND_API_KEY is not set.");
    return NextResponse.json(
      { error: "Email is not configured yet. Please email info@sihaspan.com directly." },
      { status: 500 }
    );
  }

  const text = `New enquiry from the Siha Span website

Name: ${name}
Organisation: ${org || "—"}
Email: ${email}

Message:
${message}`;

  const html = `
    <h2 style="margin:0 0 16px">New enquiry from the Siha Span website</h2>
    <p><strong>Name:</strong> ${escapeHtml(name)}<br/>
    <strong>Organisation:</strong> ${escapeHtml(org || "—")}<br/>
    <strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
    <p><strong>Message:</strong></p>
    <p style="white-space:pre-wrap">${escapeHtml(message)}</p>`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [TO_EMAIL],
        reply_to: email, // hitting "Reply" answers the enquirer
        subject: `Website enquiry from ${name}${org ? ` (${org})` : ""}`,
        text,
        html,
      }),
    });

    if (!res.ok) {
      console.error("Contact form: Resend error", res.status, await res.text());
      return NextResponse.json(
        { error: "We couldn't send your message. Please try again or email info@sihaspan.com." },
        { status: 502 }
      );
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact form: send failed", err);
    return NextResponse.json(
      { error: "We couldn't send your message. Please try again or email info@sihaspan.com." },
      { status: 502 }
    );
  }
}
