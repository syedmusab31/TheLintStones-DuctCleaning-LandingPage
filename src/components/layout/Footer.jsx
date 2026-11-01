import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUp, ShieldCheck } from 'lucide-react'
import { company, navLinks, services } from '../../data/site'

export function Footer() {
  const year = new Date().getFullYear()
  const wordmarkRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: wordmarkRef, offset: ['start end', 'end end'] })
  const y = useTransform(scrollYProgress, [0, 1], ['40%', '0%'])

  return (
    <footer className="overflow-hidden bg-forest-950 pt-20 text-forest-100/65">
      <div className="container-page">
        <div className="grid gap-12 border-b border-cream/10 pb-16 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
          <div>
            <p className="max-w-sm font-display text-3xl leading-tight font-semibold text-cream">
              Cleaner ducts. Fresher air.{' '}
              <span className="font-serif font-normal text-gold-400 italic">Honest prices.</span>
            </p>
            <p className="mt-6 inline-flex items-center gap-2 text-sm text-cream/80">
              <ShieldCheck className="size-4 text-gold-400" aria-hidden="true" />
              Fully insured & certified
            </p>
          </div>

          <nav aria-label="Footer">
            <h2 className="font-sans text-xs font-semibold tracking-[0.16em] text-cream/50 uppercase">
              Company
            </h2>
            <ul className="mt-5 grid gap-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="transition-colors hover:text-cream">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-sans text-xs font-semibold tracking-[0.16em] text-cream/50 uppercase">
              Services
            </h2>
            <ul className="mt-5 grid gap-3">
              {services.map((service) => (
                <li key={service.id}>{service.title}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-sans text-xs font-semibold tracking-[0.16em] text-cream/50 uppercase">
              Contact
            </h2>
            <a
              href={company.phoneHref}
              className="mt-5 block font-display text-2xl font-semibold text-cream transition-colors hover:text-gold-300"
            >
              {company.phone}
            </a>
            <a
              href={`mailto:${company.email}`}
              className="mt-2 block transition-colors hover:text-cream"
            >
              {company.email}
            </a>
            <dl className="mt-6 grid gap-1.5 text-sm">
              {company.hours.map(({ days, time }) => (
                <div key={days} className="flex justify-between gap-4">
                  <dt>{days}</dt>
                  <dd className="text-cream/85">{time}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="flex flex-col gap-3 py-8 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {company.legalName}. All rights reserved.
          </p>
          <a
            href="#top"
            className="inline-flex items-center gap-2 transition-colors hover:text-cream"
          >
            Back to top
            <ArrowUp className="size-4" aria-hidden="true" />
          </a>
        </div>
      </div>

      <div ref={wordmarkRef} className="pb-24 lg:pb-0" aria-hidden="true">
        <motion.p
          style={{ y }}
          className="-mb-[0.18em] text-center font-display text-[17.5vw] leading-none font-bold tracking-[-0.06em] whitespace-nowrap text-cream/[0.06] select-none"
        >
          TheLintstones
        </motion.p>
      </div>
    </footer>
  )
}
