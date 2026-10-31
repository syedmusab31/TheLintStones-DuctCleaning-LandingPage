# TheLintstones Duct Cleaning

Marketing and lead-generation site for **TheLintstones Duct Cleaning**, an air duct, dryer vent and HVAC cleaning company serving homes and businesses.

Built with React, Tailwind CSS v4 and Framer Motion on Vite.

## Highlights

- Conversion-focused single page: hero offer, warning-sign checklist, services, process, flat-rate pricing, reviews, FAQ and a quote form
- Brand palette taken from the logo and uniform: forest green, mustard gold and a warm sand neutral
- Scroll-triggered reveals, a scroll-linked process timeline and a parallax hero, all respecting `prefers-reduced-motion`
- Sticky call / book bar on mobile once the hero CTAs leave the screen
- Accessible by default: skip link, semantic landmarks, labelled form fields, keyboard-friendly accordion and menu
- Copy, services, FAQs and contact details live in one file, `src/data/site.js`

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
│   ├── layout/      # Announcement bar, header, footer, mobile action bar
│   └── ui/          # Button, Reveal, SectionHeading, Stars
├── data/site.js     # All copy, services, FAQs, contact details
├── hooks/           # useScrolled, useLockBodyScroll
├── lib/             # Motion variants, lead submission, class helper
├── sections/        # One component per page section
├── App.jsx
└── index.css        # Tailwind theme tokens and base styles
public/              # Favicons, manifest and images
```

## Before going live

- Replace the placeholder testimonials in `src/data/site.js` with real customer reviews.
- Set `VITE_LEAD_ENDPOINT` in your hosting provider's environment variables.
- Swap in higher-resolution job photos in `public/images/` for sharper service cards.

## Deployment

Any static host works (Vercel, Netlify, Cloudflare Pages, GitHub Pages). Build command `npm run build`, output directory `dist`.

## License

© TheLintstones Duct Cleaning. All rights reserved.
