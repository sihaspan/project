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

- `keystatic.config.js` — CMS schema (what the client can edit)
- `content/` — the editable content, stored as JSON and committed to Git
- `lib/content.js` — reads `content/` for the pages
- `app/(site)/` — the public website
- `app/(admin)/keystatic/` and `app/api/keystatic/` — the CMS (`/admin` redirects to it)

- `app/(site)/layout.js` — root layout: fonts, metadata, and wraps every page with the shared `Header`, `Footer` and page-transition wrapper
- `app/(site)/components/Header.js` — sticky nav with active-link state and an animated mobile menu (client component)
- `app/(site)/components/Footer.js` — sitemap, contact details and social links
- `app/(site)/components/PageFade.js` — fades each page in on navigation (client component, keyed by route)
- `app/(site)/components/Reveal.js` — scroll-triggered fade/rise-in wrapper used throughout the pages (client component, `IntersectionObserver`)
- `app/(site)/components/EcosystemDiagram.js` — the SVG diagram in the hero, with a staggered draw-in animation
- `app/(site)/components/ContactForm.js` — contact form (client component) that opens a pre-filled `mailto:` email
- `app/(site)/globals.css` — all styling, design tokens (colors, type, layout) and animation keyframes, including a dark-mode palette

All animations respect `prefers-reduced-motion`.

## Notes for launch

- **Contact form**: uses a `mailto:` link. On submit it opens the visitor's email app with a message to `info@sihaspan.com` pre-filled (name, organisation, email, message); the visitor presses Send. No server or email service is needed. Note that enquiries only arrive if the visitor completes the send.
- **Social links**: empty by default and hidden until filled in under *Site settings → Social media* in the CMS.
- **Client contact number**: editable under *Site settings → Contact details* in the CMS.
- **CMS**: page copy now lives in `content/*.json` and is edited through a GitHub-authenticated CMS at `/admin` (Keystatic). See **CMS-SETUP.md** for setup and the client guide. Site-wide phone/WhatsApp/social links are in the *Site settings* entry — no more editing constants in code.
- **Security**: `next` is pinned to `14.2.35` and `postcss` is pinned via an `overrides` entry to `^8.5.10` to avoid known CVEs in older versions. Keep both current when you next update dependencies.

## Build for production

```bash
npm run build
npm run start
```
