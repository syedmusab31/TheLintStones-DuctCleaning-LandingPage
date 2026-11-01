import { useLayoutEffect, useRef, useState } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { steps } from '../data/site'
import { fadeUp, inView, stagger } from '../lib/motion'
import { cn } from '../lib/cn'
import { SectionHeading } from '../components/ui/SectionHeading'

function StepCard({ step, index, className }) {
  const Icon = step.icon
  const highlight = index === steps.length - 1

  return (
    <article
      className={cn(
        'relative flex flex-col justify-between overflow-hidden rounded-card p-8 sm:p-10',
        highlight ? 'bg-gold-400 text-forest-900' : 'bg-cream text-forest-900',
        className,
      )}
    >
      <div className="flex items-start justify-between">
        <span className="grid size-14 place-items-center rounded-2xl bg-forest-900 text-gold-400">
          <Icon className="size-6" strokeWidth={1.75} aria-hidden="true" />
        </span>
        <span className="text-sm font-semibold tracking-[0.16em] text-forest-900/50 uppercase">
          Step {index + 1}
        </span>
      </div>
      <span
        className="pointer-events-none absolute -right-2 -bottom-14 font-display text-[13rem] leading-none font-bold text-forest-900/[0.06] select-none lg:-right-4 lg:-bottom-16 lg:text-[16rem]"
        aria-hidden="true"
      >
        {index + 1}
      </span>
      <div className="relative mt-16">
        <h3 className="text-3xl font-semibold sm:text-4xl">{step.title}</h3>
        <p className="mt-3 max-w-sm text-lg leading-relaxed text-forest-900/70">{step.body}</p>
      </div>
    </article>
  )
}

/** Desktop: the section pins and the steps travel sideways as you scroll down. */
function HorizontalTrack() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const [distance, setDistance] = useState(0)

  useLayoutEffect(() => {
    const measure = () => {
      if (!trackRef.current) return
      setDistance(Math.max(0, trackRef.current.scrollWidth - window.innerWidth))
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(trackRef.current)
    window.addEventListener('resize', measure)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [])

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] })
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })
  const x = useTransform(smooth, [0, 1], [0, -distance])
  const bar = useTransform(smooth, [0, 1], ['0%', '100%'])

  return (
    <div
      ref={sectionRef}
      className="relative hidden lg:block"
      style={{ height: `calc(100vh + ${distance}px)` }}
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <motion.div
          ref={trackRef}
          style={{ x }}
          className="flex w-max items-stretch gap-6 pr-[8vw] pl-[max(2rem,calc((100vw-80rem)/2+2rem))]"
        >
          <div className="flex w-[30rem] shrink-0 flex-col justify-center pr-10">
            <SectionHeading
              tone="light"
              eyebrow="How it works"
              title={
                <>
                  From booking to{' '}
                  <span className="font-serif font-normal text-gold-400 italic">
                    breathing easy.
                  </span>
                </>
              }
              description="No upsell visits and no guesswork. Here's exactly what happens on the day."
            />
          </div>
          {steps.map((step, i) => (
            <StepCard
              key={step.title}
              step={step}
              index={i}
              className="h-[min(30rem,64vh)] w-[26rem] shrink-0"
            />
          ))}
        </motion.div>

        <div className="container-page mt-12">
          <div className="h-px bg-cream/15">
            <motion.div style={{ width: bar }} className="h-full bg-gold-400" />
          </div>
        </div>
      </div>
    </div>
  )
}

export function Process() {
  return (
    <section id="process" className="relative bg-forest-950 text-cream">
      <div className="pointer-events-none absolute inset-0 grain" aria-hidden="true" />
      <HorizontalTrack />

      <div className="relative container-page py-24 lg:hidden">
        <SectionHeading
          tone="light"
          eyebrow="How it works"
          title={
            <>
              From booking to{' '}
              <span className="font-serif font-normal text-gold-400 italic">breathing easy.</span>
            </>
          }
          description="No upsell visits and no guesswork. Here's exactly what happens on the day."
        />
        <motion.ol
          className="mt-12 grid gap-4 sm:grid-cols-2"
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={inView}
        >
          {steps.map((step, i) => (
            <motion.li key={step.title} variants={fadeUp}>
              <StepCard step={step} index={i} className="min-h-80" />
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  )
}
