import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, CalendarCheck, Camera, Phone } from 'lucide-react'
import { company } from '../data/site'
import { easeOut, fadeUp, stagger } from '../lib/motion'
import { Button } from '../components/ui/Button'
import { Stars } from '../components/ui/Stars'

function AirflowLines() {
  const reduceMotion = useReducedMotion()

  return (
    <svg
      viewBox="0 0 240 120"
      preserveAspectRatio="none"
      fill="none"
      className="absolute inset-x-0 bottom-0 h-24 w-full text-gold-400/40"
      aria-hidden="true"
    >
      {[0, 1, 2].map((i) => (
        <motion.path
          key={i}
          d={`M-10 ${70 + i * 16} C 50 ${40 + i * 16}, 110 ${100 + i * 16}, 170 ${60 + i * 16} S 250 ${50 + i * 16}, 260 ${60 + i * 16}`}
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={{ pathLength: reduceMotion ? 1 : 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.8, delay: 0.6 + i * 0.15, ease: easeOut }}
        />
      ))}
    </svg>
  )
}

export function Hero() {
  const mediaRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: mediaRef, offset: ['start start', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])

  return (
    <section id="top" className="relative overflow-hidden pt-6 pb-20 sm:pt-10 lg:pb-28">
      <div className="container-page grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-12">
        <motion.div variants={stagger(0.1)} initial="hidden" animate="show">
          <motion.p
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-forest-900/10 bg-white/60 py-1.5 pr-4 pl-1.5 text-sm font-medium"
          >
            <span className="shrink-0 rounded-full bg-forest-900 px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap text-gold-400">
              {company.yearsInBusiness}+ yrs
            </span>
            Certified duct & HVAC cleaning
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="mt-6 text-[clamp(2.25rem,11vw,2.75rem)] leading-[0.98] font-bold sm:text-6xl xl:text-7xl"
          >
            Cleaner ducts.
            <br />
            Air you can{' '}
            <span className="relative inline-block whitespace-nowrap">
              actually breathe.
              <svg
                viewBox="0 0 300 16"
                preserveAspectRatio="none"
                className="absolute -bottom-2 left-0 h-3 w-full text-gold-400"
                aria-hidden="true"
              >
                <motion.path
                  d="M2 11 C 80 3, 200 3, 298 9"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.9, delay: 0.7, ease: easeOut }}
                />
              </svg>
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-7 max-w-xl text-lg leading-relaxed text-stone-ink sm:text-xl"
          >
            Years of dust, pet dander and allergens collect in your ductwork and get blown back into
            every room. We pull it all out, show you the photos, and charge one flat price.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button href="#quote" size="lg">
              Get my ${company.offerPrice} cleaning
              <ArrowRight
                className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Button>
            <Button href={company.phoneHref} variant="outline" size="lg">
              <Phone className="size-4" aria-hidden="true" />
              {company.phone}
            </Button>
          </motion.div>

          <motion.dl
            variants={fadeUp}
            className="mt-10 grid max-w-lg grid-cols-3 gap-4 border-t border-line pt-6"
          >
            <div>
              <dt className="sr-only">Rating</dt>
              <dd>
                <Stars />
                <span className="mt-1.5 block text-sm text-stone-ink">5-star rated service</span>
              </dd>
            </div>
            <div>
              <dt className="sr-only">Availability</dt>
              <dd className="flex items-start gap-2 text-sm text-stone-ink">
                <CalendarCheck
                  className="mt-0.5 size-4 shrink-0 text-forest-600"
                  aria-hidden="true"
                />
                Same-week appointments
              </dd>
            </div>
            <div>
              <dt className="sr-only">Proof of work</dt>
              <dd className="flex items-start gap-2 text-sm text-stone-ink">
                <Camera className="mt-0.5 size-4 shrink-0 text-forest-600" aria-hidden="true" />
                Before & after photos
              </dd>
            </div>
          </motion.dl>
        </motion.div>

        <div
          ref={mediaRef}
          className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-2"
        >
          <motion.figure
            className="relative col-span-2 aspect-[16/10] overflow-hidden rounded-card bg-forest-800 sm:row-span-2 sm:aspect-auto sm:min-h-80 lg:row-span-1 lg:aspect-[16/10] lg:min-h-0"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: easeOut }}
          >
            <motion.img
              src="/images/expert-technician.png"
              alt="TheLintstones technician cleaning a ceiling air vent"
              width="1240"
              height="619"
              fetchPriority="high"
              style={{ y: imageY }}
              className="absolute inset-0 h-[115%] w-full object-cover object-[60%_30%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest-950/50 via-transparent" />
            <motion.figcaption
              className="absolute bottom-4 left-4 flex items-center gap-2.5 rounded-full bg-cream/95 py-2 pr-4 pl-2 text-sm font-medium shadow-lg backdrop-blur"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6, ease: easeOut }}
            >
              <span className="relative grid size-7 place-items-center rounded-full bg-forest-900">
                <span className="absolute size-2 animate-ping rounded-full bg-gold-400/70" />
                <span className="size-2 rounded-full bg-gold-400" />
              </span>
              Camera inspection included
            </motion.figcaption>
          </motion.figure>

          <motion.div
            className="relative overflow-hidden rounded-card bg-forest-900 p-5 text-cream sm:p-7"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.8, ease: easeOut }}
          >
            <p className="text-xs font-semibold tracking-[0.16em] text-gold-400 uppercase">
              Flat rate
            </p>
            <p className="mt-3 font-display text-5xl leading-none font-bold sm:text-6xl">
              ${company.offerPrice}
            </p>
            <p className="mt-2 text-sm text-cream/70">per AC unit, all-in</p>
            <AirflowLines />
            <div className="h-10" />
          </motion.div>

          <motion.div
            className="flex flex-col justify-between rounded-card bg-gold-400 p-5 sm:p-7"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.8, ease: easeOut }}
          >
            <p className="font-display text-5xl leading-none font-bold sm:text-6xl">0</p>
            <p className="mt-6 text-sm leading-snug font-medium text-forest-900/80 sm:text-base">
              hidden fees. You approve the total before we start.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
