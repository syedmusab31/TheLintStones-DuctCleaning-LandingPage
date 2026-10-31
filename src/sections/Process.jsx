import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { steps } from '../data/site'
import { fadeUp, inView, stagger } from '../lib/motion'
import { SectionHeading } from '../components/ui/SectionHeading'

export function Process() {
  const trackRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ['start 85%', 'end 55%'] })
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })

  return (
    <section id="process" className="py-24 lg:py-32">
      <div className="container-page">
        <SectionHeading
          align="center"
          eyebrow="How it works"
          title="From booking to breathing easy."
          description="No upsell visits, no guesswork. Here's exactly what happens on the day."
        />

        <div ref={trackRef} className="relative mt-16">
          <div
            className="absolute top-7 right-[12.5%] left-[12.5%] hidden h-px bg-line lg:block"
            aria-hidden="true"
          >
            <motion.div style={{ scaleX: progress }} className="h-full origin-left bg-forest-900" />
          </div>

          <motion.ol
            className="relative grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8"
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={inView}
          >
            {steps.map(({ icon: Icon, title, body }, i) => (
              <motion.li
                key={title}
                variants={fadeUp}
                className="flex flex-col items-center text-center"
              >
                <span className="relative grid size-14 place-items-center rounded-full border border-line bg-cream text-forest-900 shadow-[0_0_0_8px_var(--color-cream)]">
                  <Icon className="size-6" strokeWidth={1.75} aria-hidden="true" />
                  <span className="absolute -top-1 -right-1 grid size-6 place-items-center rounded-full bg-gold-400 text-xs font-bold tabular-nums">
                    {i + 1}
                  </span>
                </span>
                <h3 className="mt-6 text-xl font-semibold">{title}</h3>
                <p className="mt-2 max-w-xs leading-relaxed text-stone-ink">{body}</p>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </div>
    </section>
  )
}
