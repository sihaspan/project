"use client";

import { useState } from "react";

const TO_EMAIL = "info@sihaspan.com";

export default function ContactForm() {
  const [showToast, setShowToast] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    const subject = `Website enquiry from ${data.name}${data.org ? ` (${data.org})` : ""}`;
    const body = [
      `Name: ${data.name}`,
      `Organisation: ${data.org || "-"}`,
      `Email: ${data.email}`,
      "",
      "Message:",
      data.message,
    ].join("\r\n");

    // Opens the visitor's default email app with everything filled in.
    window.location.href = `mailto:${TO_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    form.reset();
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4500);
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
          <button type="submit" className="send-btn">
            Send message
          </button>
          <div className="send-note">
            This opens your email app with your message ready to send. If nothing opens, email us
            directly at <a href={`mailto:${TO_EMAIL}`}>{TO_EMAIL}</a>.
          </div>
        </form>
      </div>

      <div id="toast" className={showToast ? "show" : ""} role="status" aria-live="polite">
        Opening your email app — press Send there to finish.
      </div>
    </>
  );
}
