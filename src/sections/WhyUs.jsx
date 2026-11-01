import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { company, reasons } from '../data/site'
import { fadeUp, inView, stagger } from '../lib/motion'
import { Reveal } from '../components/ui/Reveal'

export function WhyUs() {
  const photoRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: photoRef, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <section id="why-us" className="py-24 lg:py-36">
      <div className="container-page grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          {/* Duotone treatment keeps our real crew photo on-brand */}
          <Reveal className="relative">
            <div
              ref={photoRef}
              className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-forest-900"
            >
              <motion.img
                src="/images/expert-technician.png"
                alt="TheLintstones technician opening a ceiling vent"
                loading="lazy"
                style={{ y }}
                className="absolute inset-0 h-[116%] w-full object-cover object-[62%_center] contrast-110 grayscale"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-950/70 via-transparent to-transparent" />
              <blockquote className="absolute inset-x-0 bottom-0 p-7 text-cream sm:p-9">
                <p className="font-serif text-3xl leading-tight sm:text-4xl">
                  “The person who shows up is the person who does the work.”
                </p>
              </blockquote>
            </div>
            <div className="absolute -top-5 right-3 grid size-28 rotate-12 place-content-center rounded-full bg-forest-900 text-center text-cream shadow-xl sm:-right-6 sm:size-36">
              <span className="font-display text-5xl leading-none font-semibold text-gold-400">
                {company.yearsInBusiness}+
              </span>
              <span className="mt-1 text-xs font-semibold tracking-[0.14em] uppercase">years</span>
            </div>
          </Reveal>
        </div>

        <div>
          <Reveal>
            <p className="eyebrow text-forest-600">
              <span className="h-px w-6 bg-current" aria-hidden="true" />
              Why TheLintstones
            </p>
            <h2 className="mt-4 text-[clamp(2.5rem,5vw,4rem)] leading-[1] font-semibold">
              Honest work you can{' '}
              <span className="font-serif font-normal text-forest-600 italic">actually see.</span>
            </h2>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-stone-ink">
              We've spent over a decade cleaning ducts in homes, offices and restaurants. Big job or
              small, we treat every system like it's the one our own families breathe from.
            </p>
          </Reveal>

          <motion.ol
            className="mt-12 border-t border-line"
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={inView}
          >
            {reasons.map(({ icon: Icon, title, body }, i) => (
              <motion.li
                key={title}
                variants={fadeUp}
                className="group grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 border-b border-line py-8 sm:grid-cols-[3rem_auto_1fr]"
              >
                <span className="hidden pt-1 text-sm font-semibold text-stone-ink tabular-nums sm:block">
                  0{i + 1}
                </span>
                <span className="grid size-12 place-items-center rounded-2xl bg-forest-100 text-forest-700 transition-colors duration-300 group-hover:bg-forest-900 group-hover:text-gold-400">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-2xl font-semibold">{title}</h3>
                  <p className="mt-2 max-w-md leading-relaxed text-stone-ink">{body}</p>
                </div>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </div>
    </section>
  )
}
