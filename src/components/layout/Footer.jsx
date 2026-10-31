import { ShieldCheck } from 'lucide-react'
import { company, navLinks, services } from '../../data/site'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-forest-950 pt-20 pb-28 text-forest-100/70 lg:pb-10">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <a href="#top" className="inline-flex items-center gap-3 text-cream">
              <img
                src="/images/logo.png"
                alt=""
                width="56"
                height="56"
                loading="lazy"
                className="size-14"
              />
              <span className="font-display text-2xl font-bold">TheLintstones</span>
            </a>
            <p className="mt-5 max-w-sm leading-relaxed">
              Air duct, dryer vent and HVAC cleaning for homes and businesses. Cleaner air for over
              a decade.
            </p>
            <p className="mt-6 inline-flex items-center gap-2 text-sm text-cream">
              <ShieldCheck className="size-4 text-gold-400" aria-hidden="true" />
              Fully insured & certified
            </p>
          </div>

          <nav aria-label="Footer">
            <h2 className="font-sans text-sm font-semibold tracking-wide text-cream">Company</h2>
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
            <h2 className="font-sans text-sm font-semibold tracking-wide text-cream">Services</h2>
            <ul className="mt-5 grid gap-3">
              {services.map((service) => (
                <li key={service.id}>{service.title}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-sans text-sm font-semibold tracking-wide text-cream">Contact</h2>
            <ul className="mt-5 grid gap-3">
              <li>
                <a
                  href={company.phoneHref}
                  className="text-cream transition-colors hover:text-gold-300"
                >
                  {company.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${company.email}`} className="transition-colors hover:text-cream">
                  {company.email}
                </a>
              </li>
            </ul>
            <dl className="mt-6 grid gap-1.5 text-sm">
              {company.hours.map(({ days, time }) => (
                <div key={days} className="flex justify-between gap-4">
                  <dt>{days}</dt>
                  <dd className="text-cream/90">{time}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-cream/10 pt-8 text-sm sm:flex-row sm:justify-between">
          <p>
            © {year} {company.legalName}. All rights reserved.
          </p>
          <a href="#top" className="transition-colors hover:text-cream">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  )
}
