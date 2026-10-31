import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { warningSigns } from '../data/site'
import { fadeUp, inView, stagger } from '../lib/motion'
import { Button } from '../components/ui/Button'
import { SectionHeading } from '../components/ui/SectionHeading'

export function WarningSigns() {
  return (
    <section className="py-24 lg:py-32">
      <div className="container-page grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            eyebrow="Is it time?"
            title="Your ducts are the lungs of your home."
            description="Every time your system runs, it moves the same air through the same ducts. If they're coated in dust, so is everything that comes out of the vents. Tick two or more of these and a cleaning will make a noticeable difference."
          />
          <Button href="#quote" variant="dark" className="mt-8">
            Book an inspection
          </Button>
        </div>

        <motion.ul
          className="grid gap-3 sm:grid-cols-2"
          variants={stagger(0.07)}
          initial="hidden"
          whileInView="show"
          viewport={inView}
        >
          {warningSigns.map((sign, i) => (
            <motion.li
              key={sign}
              variants={fadeUp}
              className="group flex flex-col justify-between gap-6 rounded-3xl border border-line bg-white/50 p-5 transition-colors duration-300 hover:border-forest-900/20 hover:bg-white sm:min-h-44 sm:p-6"
            >
              <span className="font-display text-sm font-semibold text-stone-ink tabular-nums">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="flex items-end justify-between gap-4">
                <span className="text-lg leading-snug font-medium">{sign}</span>
                <span className="grid size-8 shrink-0 place-items-center rounded-full border border-forest-900/15 text-transparent transition-colors duration-300 group-hover:border-forest-900 group-hover:bg-forest-900 group-hover:text-gold-400">
                  <Check className="size-4" aria-hidden="true" />
                </span>
              </span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
