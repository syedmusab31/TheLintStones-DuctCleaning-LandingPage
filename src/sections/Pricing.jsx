import { ArrowRight, Building2, Check, Phone } from 'lucide-react'
import { company, offerIncludes } from '../data/site'
import { Button } from '../components/ui/Button'
import { Reveal } from '../components/ui/Reveal'
import { SectionHeading } from '../components/ui/SectionHeading'

/**
 * Half-circle cut-outs where the perforation meets the outer edge, so the offer reads
 * as a tear-off ticket. Positioned from the stub's corner; the card's overflow clips them.
 */
function Notches() {
  const base = 'absolute z-10 size-10 rounded-full bg-sand'
  return (
    <>
      <span className={`${base} -top-5 -left-5`} aria-hidden="true" />
      <span
        className={`${base} -top-5 -right-5 lg:top-auto lg:right-auto lg:-bottom-5 lg:-left-5`}
        aria-hidden="true"
      />
    </>
  )
}

export function Pricing() {
  return (
    <section id="pricing" className="bg-sand py-24 lg:py-36">
      <div className="container-page">
        <SectionHeading
          align="center"
          eyebrow="Pricing"
          title={
            <>
              One price.{' '}
              <span className="font-serif font-normal text-forest-600 italic">Everything</span>{' '}
              included.
            </>
          }
          description="Most companies advertise a low number and make it back with add-ons on the day. We don't."
        />

        <Reveal className="relative mx-auto mt-16 max-w-5xl">
          <div className="relative grid overflow-hidden rounded-[2rem] shadow-[0_40px_80px_-40px_rgb(12_26_19/0.5)] lg:grid-cols-[62%_38%]">
            <div className="relative bg-forest-900 p-8 text-cream sm:p-12">
              <div className="pointer-events-none absolute inset-0 grain" aria-hidden="true" />
              <div className="relative flex items-center justify-between gap-4">
                <p className="rounded-full bg-gold-400 px-3 py-1 text-xs font-bold tracking-wide text-forest-900 uppercase">
                  Limited-time special
                </p>
                <p className="text-xs tracking-[0.2em] text-cream/40 uppercase">Residential</p>
              </div>

              <p className="relative mt-8 flex items-start font-display leading-[0.8] font-semibold tracking-[-0.05em]">
                <span className="mt-3 text-4xl text-gold-400">$</span>
                <span className="text-[clamp(7rem,18vw,11rem)]">{company.offerPrice}</span>
              </p>
              <p className="relative mt-4 text-cream/60">
                per AC unit · flat rate · no add-on fees
              </p>

              <ul className="relative mt-10 grid gap-3 sm:grid-cols-2">
                {offerIncludes.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-cream/85">
                    <Check className="mt-0.5 size-5 shrink-0 text-gold-400" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative flex flex-col justify-between gap-10 border-dashed border-forest-900/25 bg-cream p-8 max-lg:border-t-2 sm:p-10 lg:border-l-2">
              <Notches />
              <div>
                <p className="font-display text-2xl font-semibold">Claim it in 60 seconds</p>
                <p className="mt-3 leading-relaxed text-stone-ink">
                  Leave your number and we'll confirm a time. The price is locked before we start.
                </p>
              </div>
              <div className="grid gap-3">
                <Button href="#quote" size="lg" magnetic>
                  Claim ${company.offerPrice} special
                  <ArrowRight
                    className="size-4 transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </Button>
                <Button href={company.phoneHref} variant="outline" size="lg">
                  <Phone className="size-4" aria-hidden="true" />
                  {company.phone}
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-col items-center justify-center gap-3 text-center text-stone-ink sm:flex-row">
            <Building2 className="size-5 text-forest-600" aria-hidden="true" />
            <p>
              Commercial or multi-unit property?{' '}
              <a
                href={company.phoneHref}
                className="font-semibold text-forest-900 underline decoration-gold-500 decoration-2 underline-offset-4"
              >
                Call for a fixed site quote
              </a>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
