import { ArrowRight, Building2, Check, Phone } from 'lucide-react'
import { company, offerIncludes } from '../data/site'
import { Button } from '../components/ui/Button'
import { Reveal } from '../components/ui/Reveal'
import { SectionHeading } from '../components/ui/SectionHeading'

export function Pricing() {
  return (
    <section id="pricing" className="bg-sand/60 py-24 lg:py-32">
      <div className="container-page">
        <SectionHeading
          eyebrow="Pricing"
          title="One price. Everything included."
          description="Most companies advertise a low number and make it back with add-ons on the day. We don't."
        />

        <div className="mt-14 grid gap-4 lg:grid-cols-[1.5fr_1fr]">
          <Reveal className="relative overflow-hidden rounded-card bg-forest-900 p-8 text-cream sm:p-12">
            <div className="pointer-events-none absolute inset-0 grain" aria-hidden="true" />
            <div className="relative grid gap-10 md:grid-cols-[auto_1fr] md:gap-14">
              <div>
                <p className="inline-flex rounded-full bg-gold-400 px-3 py-1 text-xs font-bold tracking-wide text-forest-900 uppercase">
                  Limited-time special
                </p>
                <p className="mt-6 flex items-start font-display leading-none font-bold">
                  <span className="mt-2 text-3xl text-gold-400">$</span>
                  <span className="text-8xl tracking-tighter sm:text-9xl">
                    {company.offerPrice}
                  </span>
                </p>
                <p className="mt-3 text-forest-100/70">per AC unit · residential</p>
              </div>

              <div className="md:border-l md:border-cream/10 md:pl-14">
                <p className="font-display text-lg font-semibold">What's included</p>
                <ul className="mt-5 grid gap-3">
                  {offerIncludes.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-forest-100/85">
                      <Check className="mt-0.5 size-5 shrink-0 text-gold-400" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="relative mt-10 flex flex-col gap-4 border-t border-cream/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-forest-100/60">
                Price confirmed on-site before any work begins.
              </p>
              <Button href="#quote" size="lg">
                Claim the ${company.offerPrice} special
                <ArrowRight
                  className="size-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Button>
            </div>
          </Reveal>

          <Reveal
            delay={0.1}
            className="flex flex-col justify-between rounded-card border border-line bg-cream p-8 sm:p-10"
          >
            <div>
              <span className="grid size-12 place-items-center rounded-2xl bg-forest-100 text-forest-700">
                <Building2 className="size-6" aria-hidden="true" />
              </span>
              <h3 className="mt-8 text-2xl font-semibold">Commercial or multi-unit?</h3>
              <p className="mt-3 leading-relaxed text-stone-ink">
                Offices, restaurants, retail and apartment buildings are quoted per site. Tell us
                about the space and we'll come back with a fixed price, usually the same day.
              </p>
            </div>
            <Button href={company.phoneHref} variant="outline" className="mt-10 self-start">
              <Phone className="size-4" aria-hidden="true" />
              Talk to our team
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
