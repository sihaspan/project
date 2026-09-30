"use client";

import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (status === "sending") return;

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(json.error || "Something went wrong. Please try again.");
      }

      form.reset();
      setStatus("success");
      setTimeout(() => setStatus("idle"), 4500);
    } catch (err) {
      setErrorMsg(err.message || "Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  return (
    <>
      <div className="contact-card">
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="name">Full name</label>
            <input id="name" name="name" type="text" required placeholder="Jane Wanjiru" />
          </div>
          <div className="field">
            <label htmlFor="org">Organisation</label>
            <input id="org" name="org" type="text" placeholder="Your organisation" />
          </div>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" required placeholder="you@organisation.com" />
          </div>
          <div className="field">
            <label htmlFor="message">What are you looking to solve?</label>
            <textarea
              id="message"
              name="message"
              required
              placeholder="A short note on your project or challenge"
            />
          </div>

          {/* Honeypot field: hidden from people, bots tend to fill it in */}
          <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", height: 0, overflow: "hidden" }}>
            <label htmlFor="website">Leave this field empty</label>
            <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
          </div>

          <button type="submit" className="send-btn" disabled={status === "sending"}>
            {status === "sending" ? "Sending…" : "Send message"}
          </button>

          {status === "error" && (
            <div className="send-note" role="alert" style={{ color: "#b3261e" }}>
              {errorMsg}
            </div>
          )}
        </form>
      </div>

      <div id="toast" className={status === "success" ? "show" : ""} role="status" aria-live="polite">
        Message sent — we&rsquo;ll be in touch shortly.
      </div>
    </>
  );
}
