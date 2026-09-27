# Siha Span — Website MVP (Next.js)

A single-page marketing site for Siha Span, built with Next.js (App Router).

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Project structure

- `app/layout.js` — root layout, fonts, page metadata
- `app/page.js` — the page content (hero, about, services, approach, who we serve, contact, footer)
- `app/components/EcosystemDiagram.js` — the SVG diagram in the hero
- `app/components/ContactForm.js` — client-side contact form (currently shows a confirmation toast only)
- `app/globals.css` — all styling and design tokens (colors, type, layout), including a dark-mode palette

## Notes for launch

- **Contact form**: currently a placeholder — it resets and shows a toast on submit but does not send anywhere. Wire it up to an email service (e.g. Resend, SendGrid) or an API route under `app/api/contact/route.js` before going live.
- **Social links**: LinkedIn, Facebook, Instagram and TikTok links in `app/page.js` are placeholders (`href="#"`). Replace with the real profile URLs.
- **Client contact number**: `0721 917 972`, set as constants near the top of `app/page.js` (`CLIENT_PHONE_DISPLAY`, `CLIENT_PHONE_TEL`, `CLIENT_PHONE_WHATSAPP`).
- **CMS**: this MVP has static content. Per the proposal, a custom CMS will replace the hardcoded arrays (`SERVICES`, `APPROACH`, `SERVED`) in `app/page.js` so the client can edit copy without a developer.

## Build for production

```bash
npm run build
npm run start
```
