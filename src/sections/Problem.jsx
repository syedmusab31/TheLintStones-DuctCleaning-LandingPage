import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { facts } from '../data/site'
import { fadeUp, inView, stagger } from '../lib/motion'
import { CountUp } from '../components/ui/CountUp'

const statement = [
  { text: 'You change the filter. You dust the shelves.' },
  { text: 'But the air still passes through' },
  { text: 'years of buildup', accent: true },
  { text: 'before it reaches you.' },
]

function Word({ children, progress, range, accent }) {
  const opacity = useTransform(progress, range, [0.14, 1])
  return (
    <motion.span
      style={{ opacity }}
      className={accent ? 'font-serif font-normal tracking-normal text-forest-600 italic' : ''}
    >
      {children}
    </motion.span>
  )
}

/** Large statement whose words fill in as it scrolls through the viewport. */
function ScrollStatement() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 45%'] })

  const words = statement.flatMap(({ text, accent }) =>
    text.split(' ').map((word) => ({ word, accent })),
  )

  return (
    <p
      ref={ref}
      className="max-w-6xl font-display text-[clamp(2rem,5vw,4.25rem)] leading-[1.05] font-semibold tracking-[-0.03em]"
      aria-label={statement.map((s) => s.text).join(' ')}
    >
      {words.map(({ word, accent }, i) => {
        const start = i / words.length
        return (
          <span key={i} aria-hidden="true">
            <Word
              progress={scrollYProgress}
              range={[start, start + 1 / words.length]}
              accent={accent}
            >
              {word}
            </Word>{' '}
          </span>
        )
      })}
    </p>
  )
}

export function Problem() {
  return (
    <section className="py-24 lg:py-36">
      <div className="container-page">
        <p className="eyebrow text-forest-600">
          <span className="h-px w-6 bg-current" aria-hidden="true" />
          The part nobody sees
        </p>
        <div className="mt-8">
          <ScrollStatement />
        </div>

        <motion.dl
          className="mt-20 grid gap-4 md:grid-cols-2"
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={inView}
        >
          {facts.map((fact) => (
            <motion.div
              key={fact.source}
              variants={fadeUp}
              className="relative flex flex-col justify-between gap-12 overflow-hidden rounded-card border border-line bg-white/60 p-8 sm:p-10"
            >
              <dt className="order-2 max-w-sm text-lg leading-relaxed text-stone-ink">
                {fact.label}
                <span className="mt-3 block text-xs font-semibold tracking-[0.16em] text-forest-600 uppercase">
                  Source: {fact.source}
                </span>
              </dt>
              <dd className="order-1 font-display text-[clamp(4rem,10vw,8rem)] leading-[0.85] font-semibold tracking-[-0.05em] tabular-nums">
                <span className="text-[0.4em] tracking-normal text-stone-ink">{fact.prefix}</span>
                <CountUp to={fact.value} />
                <span className="text-gold-500">{fact.suffix}</span>
              </dd>
            </motion.div>
          ))}
        </motion.dl>
      </div>
    </section>
  )
}
