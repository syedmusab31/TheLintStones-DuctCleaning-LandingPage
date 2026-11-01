# TheLintstones Duct Cleaning

Marketing and lead-generation site for **TheLintstones Duct Cleaning**, an air duct, dryer vent and HVAC cleaning company serving homes and businesses.

Built with React, Tailwind CSS v4 and Framer Motion on Vite.

## Highlights

- **Interactive duct fly-through** — a procedural Canvas 2D scene in the hero renders a dusty and a cleaned duct side by side. Drag (or use the arrow keys) to compare. It pauses off-screen and respects `prefers-reduced-motion`.
- **Duct health check** — tick the warning signs and an animated gauge gives a verdict and a matching call to action.
- **Hand-drawn service illustrations** — custom SVG line art with animated airflow, in place of stock photography.
- **Scroll storytelling** — a statement that fills in word by word as you scroll, counters, a pinned horizontal process track on desktop, parallax and a progress bar.
- **Details** — magnetic primary buttons, cursor-following card highlights, a tear-off pricing ticket, review marquees that pause on hover, and Lenis smooth scrolling.
- **Conversion** — flat-rate offer throughout, "Book" on any service pre-fills the quote form, sticky call/book bar on mobile.
- **Accessible** — skip link, semantic landmarks, keyboard-operable slider, toggles, accordion and menu, `aria-live` results.
- All copy, services, FAQs and contact details live in `src/data/site.js`.

## Design system

| Token   | Value                                             |
| ------- | ------------------------------------------------- |
| Forest  | `#12261c` → `#0c1a13` (from the uniform and logo) |
| Gold    | `#f6c437` (from the logo lettering)               |
| Cream   | `#f6f2e9` with a sand `#ece5d4` secondary         |
| Display | Bricolage Grotesque                               |
| Accent  | Instrument Serif italic                           |
| Body    | Figtree                                           |

## Getting started

Requires Node.js 20.19+.

```bash
npm install
```

```bash
npm run dev
```

| Script            | Description                        |
| ----------------- | ---------------------------------- |
| `npm run dev`     | Start the dev server               |
| `npm run build`   | Production build to `dist/`        |
| `npm run preview` | Serve the production build locally |
| `npm run lint`    | Lint with ESLint                   |

## Quote form

The form POSTs JSON to `VITE_LEAD_ENDPOINT` (Formspree, a CRM webhook, a serverless function, etc.). Copy `.env.example` to `.env` and set the URL. Without it, submissions are logged to the console so the form still works locally.

Payload:

```json
{
  "name": "Jane Cooper",
  "phone": "(555) 123-4567",
  "email": "jane@example.com",
  "zip": "12345",
  "service": "Air Duct Cleaning",
  "message": "Two AC units, one dog",
  "source": "website-quote-form",
  "submittedAt": "2026-10-31T12:00:00.000Z"
}
```

## Project structure

```
src/
├── components/
│   ├── layout/      # Header, footer, mobile action bar
│   ├── ui/          # Button, Reveal, SplitReveal, CountUp, SectionHeading, Stars
│   └── visuals/     # DuctTunnel canvas, service illustrations
├── data/site.js     # All copy, services, FAQs, contact details
├── hooks/           # useScrolled, useLockBodyScroll, useSmoothScroll
├── lib/             # Motion variants, lead submission, class helper
├── sections/        # One component per page section
├── App.jsx
└── index.css        # Tailwind theme tokens and base styles
public/              # Favicons, manifest and images
```

## Before going live

- Replace the placeholder testimonials in `src/data/site.js` with real customer reviews.
- Set `VITE_LEAD_ENDPOINT` in your hosting provider's environment variables.
- Add higher-resolution crew photos to `public/images/` for the "Why TheLintstones" section.

## Deployment

Any static host works (Vercel, Netlify, Cloudflare Pages, GitHub Pages). Build command `npm run build`, output directory `dist`.

## License

© TheLintstones Duct Cleaning. All rights reserved.
