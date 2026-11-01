import { motion } from 'framer-motion'
import { ArrowUpRight, Check, Clock } from 'lucide-react'
import { services } from '../data/site'
import { fadeUp, inView, stagger } from '../lib/motion'
import { cn } from '../lib/cn'
import { Reveal } from '../components/ui/Reveal'
import { SectionHeading } from '../components/ui/SectionHeading'
import {
  CoilArt,
  CommercialArt,
  DryerArt,
  DuctArt,
  MoldArt,
  SanitizeArt,
} from '../components/visuals/ServiceArt'

const art = {
  'air-ducts': DuctArt,
  'hvac-coil': CoilArt,
  'dryer-vent': DryerArt,
  commercial: CommercialArt,
  mold: MoldArt,
  sanitize: SanitizeArt,
}

// Bento placement and colourway per service, keyed by id so the data stays layout-free.
const layout = {
  'air-ducts': { span: 'sm:col-span-2 lg:col-span-4', tone: 'dark', size: 'lg' },
  'hvac-coil': { span: 'lg:col-span-2', tone: 'light' },
  'dryer-vent': { span: 'lg:col-span-2', tone: 'light' },
  mold: { span: 'lg:col-span-3', tone: 'light' },
  sanitize: { span: 'lg:col-span-3', tone: 'light' },
  commercial: { span: 'sm:col-span-2 lg:col-span-6', tone: 'gold', size: 'wide' },
}

const tones = {
  dark: 'bg-forest-900 text-cream [--spot:rgb(246_196_55/0.16)]',
  light: 'bg-white text-forest-900 border border-line [--spot:rgb(39_90_63/0.08)]',
  gold: 'bg-gold-400 text-forest-900 [--spot:rgb(255_255_255/0.35)]',
}

function trackSpotlight(event) {
  const rect = event.currentTarget.getBoundingClientRect()
  event.currentTarget.style.setProperty('--x', `${event.clientX - rect.left}px`)
  event.currentTarget.style.setProperty('--y', `${event.clientY - rect.top}px`)
}

function ServiceCard({ service, onBook }) {
  const { span, tone, size } = layout[service.id]
  const Art = art[service.id]
  const dark = tone === 'dark'
  const muted = dark ? 'text-cream/65' : 'text-forest-900/65'

  return (
    <motion.article
      variants={fadeUp}
      onPointerMove={trackSpotlight}
      className={cn(
        'group relative isolate flex flex-col overflow-hidden rounded-card spotlight p-6 transition-shadow duration-500 hover:shadow-[0_30px_60px_-30px_rgb(12_26_19/0.45)] sm:p-8',
        tones[tone],
        span,
        size === 'lg' && 'lg:row-span-2',
        size === 'wide' && 'lg:grid lg:grid-cols-[1.2fr_1fr_auto] lg:items-center lg:gap-10',
      )}
    >
      <Art
        className={cn(
          'w-full transition-transform duration-700 ease-out-soft group-hover:scale-[1.04]',
          size === 'lg'
            ? 'order-2 mx-auto mt-10 max-w-xl lg:mt-auto lg:pt-6 [&_*]:[vector-effect:non-scaling-stroke]'
            : 'h-36',
          size === 'wide' && 'lg:order-2 lg:h-40',
          dark ? 'text-cream/80' : 'text-forest-800',
        )}
      />

      <div
        className={cn(
          'flex flex-1 flex-col',
          size !== 'wide' && size !== 'lg' && 'mt-6',
          size === 'lg' && 'order-1 flex-none',
          size === 'wide' && 'mt-6 lg:mt-0',
        )}
      >
        <div>
          <p
            className={cn(
              'text-xs font-semibold tracking-[0.16em] uppercase',
              dark ? 'text-gold-400' : 'text-forest-600',
              tone === 'gold' && 'text-forest-900/70',
            )}
          >
            {service.tagline}
          </p>
          <h3
            className={cn(
              'mt-3 leading-[1.05] font-semibold',
              size === 'lg' ? 'text-4xl sm:text-5xl' : 'text-2xl',
              size === 'wide' && 'sm:text-4xl',
            )}
          >
            {service.title}
          </h3>
          <p className={cn('mt-3 leading-relaxed', muted)}>{service.blurb}</p>

          {size === 'lg' && (
            <ul className="mt-6 grid gap-2.5 sm:grid-cols-2 sm:gap-x-6">
              {service.includes.map((item) => (
                <li key={item} className="flex items-start gap-3 text-cream/85">
                  <Check className="mt-0.5 size-4 shrink-0 text-gold-400" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div
          className={cn(
            'mt-8 flex items-center justify-between gap-4',
            size === 'wide' && 'lg:hidden',
          )}
        >
          <span className={cn('inline-flex items-center gap-1.5 text-sm', muted)}>
            <Clock className="size-4" aria-hidden="true" />
            {service.duration}
          </span>
          <BookLink service={service} onBook={onBook} tone={tone} />
        </div>
      </div>

      {size === 'wide' && (
        <div className="hidden lg:order-3 lg:block">
          <BookLink service={service} onBook={onBook} tone={tone} large />
        </div>
      )}
    </motion.article>
  )
}

function BookLink({ service, onBook, tone, large }) {
  return (
    <a
      href="#quote"
      onClick={() => onBook(service.title)}
      className={cn(
        'relative z-10 inline-flex shrink-0 items-center gap-2 rounded-full font-semibold transition-colors',
        large ? 'h-14 px-7' : 'h-11 pr-2 pl-4 text-sm',
        tone === 'dark' && 'bg-gold-400 text-forest-900 hover:bg-gold-300',
        tone === 'light' && 'bg-forest-900 text-cream hover:bg-forest-700',
        tone === 'gold' && 'bg-forest-900 text-cream hover:bg-forest-700',
      )}
      aria-label={`Book ${service.title}`}
    >
      Book
      <span
        className={cn(
          'grid size-7 place-items-center rounded-full transition-transform duration-300 group-hover:rotate-45',
          tone === 'dark' ? 'bg-forest-900 text-gold-400' : 'bg-gold-400 text-forest-900',
        )}
      >
        <ArrowUpRight className="size-4" aria-hidden="true" />
      </span>
    </a>
  )
}

export function Services({ onBook }) {
  return (
    <section id="services" className="py-24 lg:py-36">
      <div className="container-page">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-end">
          <SectionHeading
            eyebrow="Services"
            title={
              <>
                Everything that moves air through your{' '}
                <span className="font-serif font-normal italic">home.</span>
              </>
            }
          />
          <Reveal
            as="p"
            delay={0.1}
            className="max-w-md text-lg leading-relaxed text-stone-ink lg:justify-self-end lg:pb-2"
          >
            One crew, one visit. Every job comes with camera proof and a price you approve before we
            start.
          </Reveal>
        </div>

        <motion.div
          className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-6"
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={inView}
        >
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} onBook={onBook} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
