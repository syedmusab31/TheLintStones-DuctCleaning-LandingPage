import { motion } from 'framer-motion'
import { reasons, company } from '../data/site'
import { fadeUp, inView, stagger } from '../lib/motion'
import { SectionHeading } from '../components/ui/SectionHeading'
import { Reveal } from '../components/ui/Reveal'

export function WhyUs() {
  return (
    <section
      id="why-us"
      className="relative overflow-hidden bg-forest-900 py-24 text-cream lg:py-32"
    >
      <div className="pointer-events-none absolute inset-0 grain" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -top-40 -right-40 size-[32rem] rounded-full bg-forest-700/60 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative container-page">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-end">
          <SectionHeading
            tone="light"
            eyebrow="Why TheLintstones"
            title="Honest work you can actually see."
          />
          <Reveal as="p" delay={0.1} className="text-lg leading-relaxed text-forest-100/75 lg:pb-2">
            We've spent {company.yearsInBusiness}+ years cleaning ducts in homes, offices and
            restaurants. Big job or small, we treat every system like it's the one our own families
            breathe from.
          </Reveal>
        </div>

        <motion.ul
          className="mt-16 grid gap-px overflow-hidden rounded-card bg-cream/10 sm:grid-cols-2 lg:grid-cols-4"
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={inView}
        >
          {reasons.map(({ icon: Icon, title, body }) => (
            <motion.li
              key={title}
              variants={fadeUp}
              className="flex flex-col bg-forest-900 p-7 lg:p-8"
            >
              <Icon className="size-7 text-gold-400" strokeWidth={1.5} aria-hidden="true" />
              <h3 className="mt-10 text-xl font-semibold text-cream">{title}</h3>
              <p className="mt-3 leading-relaxed text-forest-100/70">{body}</p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
