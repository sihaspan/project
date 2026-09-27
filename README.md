# Siha Span — Website MVP (Next.js)

A single-page marketing site for Siha Span, built with Next.js (App Router).

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Pages

- `/` — home: hero with an animated ecosystem diagram, highlights, a services preview and a closing call-to-action
- `/about` — company overview, key stats, and the "how we work" process
- `/services` — the four practice areas in detail
- `/who-we-serve` — the six sectors served
- `/contact` — contact form and details

## Project structure

- `app/layout.js` — root layout: fonts, metadata, and wraps every page with the shared `Header`, `Footer` and page-transition wrapper
- `app/components/Header.js` — sticky nav with active-link state and an animated mobile menu (client component)
- `app/components/Footer.js` — sitemap, contact details and social links
- `app/components/PageFade.js` — fades each page in on navigation (client component, keyed by route)
- `app/components/Reveal.js` — scroll-triggered fade/rise-in wrapper used throughout the pages (client component, `IntersectionObserver`)
- `app/components/EcosystemDiagram.js` — the SVG diagram in the hero, with a staggered draw-in animation
- `app/components/ContactForm.js` — client-side contact form (currently shows a confirmation toast only)
- `app/globals.css` — all styling, design tokens (colors, type, layout) and animation keyframes, including a dark-mode palette

All animations respect `prefers-reduced-motion`.

## Notes for launch

- **Contact form**: currently a placeholder — it resets and shows a toast on submit but does not send anywhere. Wire it up to an email service (e.g. Resend, SendGrid) or an API route under `app/api/contact/route.js` before going live.
- **Social links**: LinkedIn, Facebook, Instagram and TikTok links are placeholders (`href="#"`) in `app/components/Footer.js` and `app/contact/page.js`. Replace with the real profile URLs.
- **Client contact number**: `0721 917 972`, set as constants near the top of `app/contact/page.js` and `app/components/Footer.js` (`CLIENT_PHONE_DISPLAY`, `CLIENT_PHONE_TEL`, `CLIENT_PHONE_WHATSAPP`).
- **CMS**: this MVP has static content. Per the proposal, a custom CMS will replace the hardcoded arrays in each page file (e.g. `SERVICES` in `app/services/page.js`) so the client can edit copy without a developer.
- **Security**: `next` is pinned to `14.2.35` and `postcss` is pinned via an `overrides` entry to `^8.5.10` to avoid known CVEs in older versions. Keep both current when you next update dependencies.

## Build for production

```bash
npm run build
npm run start
```
