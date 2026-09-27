"use client";

import { useState } from "react";

export default function ContactForm() {
  const [showToast, setShowToast] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setShowToast(true);
    e.target.reset();
    setTimeout(() => setShowToast(false), 3200);
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
            This form is a placeholder for the MVP — connect it to email or the CMS backend at launch.
          </div>
        </form>
      </div>

      <div id="toast" className={showToast ? "show" : ""}>
        Message sent — we&rsquo;ll be in touch shortly.
      </div>
    </>
  );
}
