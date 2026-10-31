import { useId, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { company, faqs } from '../data/site'
import { easeOut } from '../lib/motion'
import { SectionHeading } from '../components/ui/SectionHeading'
import { Reveal } from '../components/ui/Reveal'

function FaqItem({ question, answer, open, onToggle }) {
  const id = useId()

  return (
    <li className="border-b border-line">
      <h3>
        <button
          type="button"
          className="flex w-full items-center justify-between gap-6 py-6 text-left font-display text-lg font-semibold sm:text-xl"
          aria-expanded={open}
          aria-controls={id}
          onClick={onToggle}
        >
          {question}
          <motion.span
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.25, ease: easeOut }}
            className="grid size-9 shrink-0 place-items-center rounded-full border border-forest-900/15"
          >
            <Plus className="size-4" aria-hidden="true" />
          </motion.span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={id}
            role="region"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: easeOut }}
            className="overflow-hidden"
          >
            <p className="max-w-2xl pb-6 leading-relaxed text-stone-ink">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  )
}

export function Faq() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section id="faq" className="bg-sand/60 py-24 lg:py-32">
      <div className="container-page grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            eyebrow="FAQ"
            title="Questions, answered."
            description="Can't find what you're looking for? Our team picks up the phone."
          />
          <Reveal delay={0.1}>
            <a
              href={company.phoneHref}
              className="mt-6 inline-block font-display text-2xl font-semibold underline decoration-gold-400 decoration-2 underline-offset-8 transition-colors hover:text-forest-600"
            >
              {company.phone}
            </a>
          </Reveal>
        </div>

        <Reveal as="ul" className="border-t border-line">
          {faqs.map((faq, i) => (
            <FaqItem
              key={faq.q}
              question={faq.q}
              answer={faq.a}
              open={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
        </Reveal>
      </div>
    </section>
  )
}
