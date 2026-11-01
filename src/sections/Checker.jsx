import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'
import { warningSigns } from '../data/site'
import { easeOut } from '../lib/motion'
import { cn } from '../lib/cn'
import { Button } from '../components/ui/Button'
import { Reveal } from '../components/ui/Reveal'
import { SectionHeading } from '../components/ui/SectionHeading'

const verdicts = [
  { min: 0, title: 'Tap any that sound familiar', body: 'Most homes tick at least two.' },
  {
    min: 1,
    title: 'Worth keeping an eye on',
    body: 'One sign alone can be seasonal. Two or more usually means build-up.',
  },
  {
    min: 2,
    title: 'Your ducts are due',
    body: 'A cleaning will make a noticeable difference to dust and smell.',
  },
  {
    min: 4,
    title: 'Overdue — book soon',
    body: "Your system is likely recirculating a lot of debris. We'd prioritise this.",
  },
]

const RADIUS = 88
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

function Gauge({ value, max }) {
  const ratio = value / max

  return (
    <div className="relative mx-auto size-56 sm:size-64">
      <svg viewBox="0 0 200 200" className="size-full -rotate-90">
        <circle
          cx="100"
          cy="100"
          r={RADIUS}
          fill="none"
          stroke="rgb(236 229 212 / 0.12)"
          strokeWidth="14"
        />
        <motion.circle
          cx="100"
          cy="100"
          r={RADIUS}
          fill="none"
          stroke="var(--color-gold-400)"
          strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          animate={{ strokeDashoffset: CIRCUMFERENCE * (1 - ratio) }}
          transition={{ type: 'spring', stiffness: 90, damping: 18 }}
          initial={false}
        />
      </svg>
      <div className="absolute inset-0 grid place-content-center text-center">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={value}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3, ease: easeOut }}
            className="font-display text-7xl leading-none font-semibold tabular-nums"
          >
            {value}
          </motion.span>
        </AnimatePresence>
        <span className="mt-1 text-sm text-cream/60">of {max} signs</span>
      </div>
    </div>
  )
}

export function Checker() {
  const [checked, setChecked] = useState(() => new Set())
  const count = checked.size
  const verdict = [...verdicts].reverse().find((v) => count >= v.min)

  function toggle(sign) {
    setChecked((current) => {
      const next = new Set(current)
      if (next.has(sign)) next.delete(sign)
      else next.add(sign)
      return next
    })
  }

  return (
    <section className="px-3 sm:px-4">
      <div className="relative mx-auto max-w-[96rem] overflow-hidden rounded-[2rem] bg-forest-900 py-20 text-cream sm:rounded-[2.5rem] lg:py-28">
        <div className="pointer-events-none absolute inset-0 grain" aria-hidden="true" />
        <div className="relative container-page grid gap-14 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-20">
          <div>
            <SectionHeading
              tone="light"
              eyebrow="Two-minute check"
              title={
                <>
                  Do your ducts need{' '}
                  <span className="font-serif font-normal text-gold-400 italic">cleaning?</span>
                </>
              }
            />
            <Reveal delay={0.1}>
              <ul className="mt-10 grid gap-2.5 sm:grid-cols-2" aria-label="Warning signs">
                {warningSigns.map((sign) => {
                  const on = checked.has(sign)
                  return (
                    <li key={sign}>
                      <button
                        type="button"
                        aria-pressed={on}
                        onClick={() => toggle(sign)}
                        className={cn(
                          'flex h-full w-full items-start gap-3 rounded-2xl border p-4 text-left transition-colors duration-300',
                          on
                            ? 'border-gold-400 bg-gold-400 text-forest-900'
                            : 'border-cream/12 bg-cream/[0.03] text-cream/85 hover:border-cream/30 hover:bg-cream/[0.06]',
                        )}
                      >
                        <span
                          className={cn(
                            'mt-0.5 grid size-5 shrink-0 place-items-center rounded-md border transition-colors',
                            on
                              ? 'border-forest-900 bg-forest-900 text-gold-400'
                              : 'border-cream/30',
                          )}
                        >
                          <motion.span
                            initial={false}
                            animate={{ scale: on ? 1 : 0 }}
                            transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                          >
                            <Check className="size-3.5" strokeWidth={3} aria-hidden="true" />
                          </motion.span>
                        </span>
                        <span className="leading-snug font-medium">{sign}</span>
                      </button>
                    </li>
                  )
                })}
              </ul>
            </Reveal>
          </div>

          <Reveal
            delay={0.15}
            className="rounded-[1.75rem] border border-cream/10 bg-forest-950/50 p-8 text-center sm:p-10"
          >
            <Gauge value={count} max={warningSigns.length} />
            <div className="mt-8 min-h-28" aria-live="polite">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={verdict.title}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                >
                  <p className="font-display text-2xl font-semibold">{verdict.title}</p>
                  <p className="mx-auto mt-2 max-w-xs text-cream/60">{verdict.body}</p>
                </motion.div>
              </AnimatePresence>
            </div>
            <Button href="#quote" size="lg" className="mt-6 w-full sm:w-auto">
              {count >= 2 ? 'Book my cleaning' : 'Get a free quote'}
              <ArrowRight
                className="size-4 transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
