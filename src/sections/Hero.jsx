import { motion } from 'framer-motion'
import { ArrowDownRight, ArrowRight, Phone, ShieldCheck, Star } from 'lucide-react'
import { company } from '../data/site'
import { easeOut, fadeUp, stagger } from '../lib/motion'
import { Button } from '../components/ui/Button'
import { SplitReveal } from '../components/ui/SplitReveal'
import { DuctTunnel } from '../components/visuals/DuctTunnel'

const proof = [
  { icon: Star, label: '5-star rated', detail: 'by local homeowners' },
  { icon: ShieldCheck, label: 'Fully insured', detail: 'certified technicians' },
]

export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate overflow-hidden bg-forest-950 pt-32 pb-16 text-cream sm:pt-40 lg:pb-24"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 grain" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -top-1/3 left-1/2 -z-10 h-[60rem] w-[60rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(39_90_63/0.55),transparent)]"
        aria-hidden="true"
      />

      <div className="container-page">
        <motion.a
          href="#pricing"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easeOut }}
          className="group inline-flex items-center gap-3 rounded-full border border-cream/15 bg-cream/5 py-1.5 pr-4 pl-1.5 text-sm text-cream/80 backdrop-blur transition-colors hover:border-cream/30"
        >
          <span className="rounded-full bg-gold-400 px-2.5 py-0.5 text-xs font-bold text-forest-900">
            ${company.offerPrice}
          </span>
          Flat rate per AC unit this month
          <ArrowRight
            className="size-3.5 transition-transform group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </motion.a>

        <h1 className="mt-8 max-w-6xl text-[clamp(2.75rem,8.4vw,7.5rem)] leading-[0.92] font-semibold tracking-[-0.035em]">
          <SplitReveal
            delay={0.15}
            parts={[{ text: 'Every breath starts in your' }, { text: 'ductwork.', accent: true }]}
            accentClassName="font-serif font-normal tracking-normal text-gold-400 italic"
          />
        </h1>

        <div className="mt-12 grid gap-12 lg:mt-16 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <motion.div
            variants={stagger(0.1, 0.6)}
            initial="hidden"
            animate="show"
            className="flex flex-col"
          >
            <motion.p
              variants={fadeUp}
              className="max-w-md text-lg leading-relaxed text-cream/70 sm:text-xl"
            >
              Years of dust, dander and allergens build up in your air ducts and get blown into
              every room. We pull it all out, show you the camera footage, and charge one flat
              price.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button href="#quote" size="lg" magnetic>
                Book my ${company.offerPrice} cleaning
                <ArrowRight
                  className="size-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Button>
              <Button href={company.phoneHref} variant="ghostLight" size="lg">
                <Phone className="size-4" aria-hidden="true" />
                {company.phone}
              </Button>
            </motion.div>

            <motion.ul
              variants={fadeUp}
              className="mt-auto grid grid-cols-2 gap-6 border-t border-cream/10 pt-8 max-lg:mt-12"
            >
              {proof.map(({ icon: Icon, label, detail }) => (
                <li key={label} className="flex items-start gap-3">
                  <Icon className="mt-0.5 size-5 shrink-0 text-gold-400" aria-hidden="true" />
                  <span>
                    <span className="block font-semibold">{label}</span>
                    <span className="text-sm text-cream/55">{detail}</span>
                  </span>
                </li>
              ))}
            </motion.ul>
          </motion.div>

          <motion.figure
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.35, ease: easeOut }}
          >
            <DuctTunnel className="aspect-[4/3] rounded-[1.75rem] ring-1 ring-cream/10 sm:aspect-[16/11] sm:rounded-[2rem]" />
            <figcaption className="mt-4 flex items-center justify-between gap-4 text-sm text-cream/55">
              <span>Inside a typical duct — before and after our clean.</span>
              <span className="hidden items-center gap-1.5 text-cream/80 sm:inline-flex">
                Drag to compare
                <ArrowDownRight className="size-4 -rotate-45" aria-hidden="true" />
              </span>
            </figcaption>
          </motion.figure>
        </div>
      </div>
    </section>
  )
}
