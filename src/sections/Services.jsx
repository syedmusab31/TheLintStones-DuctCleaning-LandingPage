import { useId, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Check, Clock, Sparkle } from 'lucide-react'
import { services } from '../data/site'
import { easeOut } from '../lib/motion'
import { cn } from '../lib/cn'
import { Button } from '../components/ui/Button'
import { Reveal } from '../components/ui/Reveal'
import { SectionHeading } from '../components/ui/SectionHeading'
import { ServiceImage } from '../components/ui/ServiceImage'

function useRovingTabs(count, activeIndex, onChange) {
  const refs = useRef([])

  function onKeyDown(event) {
    const keys = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }
    let next
    if (event.key in keys) next = (activeIndex + keys[event.key] + count) % count
    else if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = count - 1
    else return

    event.preventDefault()
    onChange(next)
    refs.current[next]?.focus()
  }

  return { refs, onKeyDown }
}

function ServicePanel({ service, panelId, tabId, onBook }) {
  return (
    <motion.div
      key={service.id}
      id={panelId}
      role="tabpanel"
      aria-labelledby={tabId}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.4, ease: easeOut }}
      className="flex h-full flex-col overflow-hidden rounded-card border border-line bg-white"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-forest-800 sm:aspect-[16/9]">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.06 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: easeOut }}
        >
          <ServiceImage image={service.image} icon={service.icon} className="size-full" />
        </motion.div>
        <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-cream/95 px-3 py-1.5 text-xs font-semibold shadow-sm backdrop-blur">
          <Sparkle className="size-3.5 text-gold-600" fill="currentColor" aria-hidden="true" />
          {service.tagline}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <h3 className="text-2xl font-semibold sm:text-3xl">{service.title}</h3>
        <p className="mt-3 leading-relaxed text-stone-ink">{service.blurb}</p>

        <ul className="mt-6 grid gap-2.5">
          {service.includes.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-forest-100 text-forest-700">
                <Check className="size-3" strokeWidth={3} aria-hidden="true" />
              </span>
              {item}
            </li>
          ))}
        </ul>

        <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-line pt-6 text-sm">
          <div>
            <dt className="text-stone-ink">Typical time</dt>
            <dd className="mt-1 flex items-center gap-1.5 font-semibold">
              <Clock className="size-4 text-forest-600" aria-hidden="true" />
              {service.duration}
            </dd>
          </div>
          <div>
            <dt className="text-stone-ink">Best for</dt>
            <dd className="mt-1 font-semibold">{service.bestFor}</dd>
          </div>
        </dl>

        <Button
          href="#quote"
          variant="dark"
          className="mt-8 self-start"
          onClick={() => onBook(service.title)}
        >
          Book {service.title.toLowerCase()}
          <ArrowRight
            className="size-4 transition-transform group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </Button>
      </div>
    </motion.div>
  )
}

export function Services({ activeIndex, onActiveChange, onBook }) {
  const baseId = useId()
  const { refs, onKeyDown } = useRovingTabs(services.length, activeIndex, onActiveChange)
  const active = services[activeIndex]

  const tabId = (i) => `${baseId}-tab-${i}`
  const panelId = `${baseId}-panel`

  return (
    <section id="services" className="bg-sand/60 py-24 lg:py-32">
      <div className="container-page">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-end">
          <SectionHeading eyebrow="Services" title="Everything that moves air through your home." />
          <Reveal
            as="p"
            delay={0.1}
            className="max-w-lg text-lg leading-relaxed text-stone-ink lg:justify-self-end lg:pb-1"
          >
            One crew, one visit. From a single dryer vent to a full commercial system, every job
            comes with camera proof and a price you approve first.
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-8">
          <Reveal className="min-w-0 lg:sticky lg:top-28 lg:self-start">
            <div
              role="tablist"
              aria-label="Our services"
              onKeyDown={onKeyDown}
              className="-mx-4 flex snap-x [scrollbar-width:none] gap-2 overflow-x-auto px-4 pb-1 sm:-mx-6 sm:px-6 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0 lg:pb-0 [&::-webkit-scrollbar]:hidden"
            >
              {services.map((service, i) => {
                const selected = i === activeIndex
                const Icon = service.icon

                return (
                  <button
                    key={service.id}
                    ref={(node) => (refs.current[i] = node)}
                    id={tabId(i)}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    aria-controls={panelId}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => onActiveChange(i)}
                    className={cn(
                      'group relative flex shrink-0 snap-start items-center gap-4 rounded-2xl text-left transition-colors duration-300',
                      'px-4 py-3 lg:px-5 lg:py-5',
                      selected ? 'text-cream' : 'bg-white/60 hover:bg-white',
                    )}
                  >
                    {selected && (
                      <motion.span
                        layoutId={`${baseId}-active`}
                        className="absolute inset-0 rounded-2xl bg-forest-900"
                        transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                      />
                    )}
                    <span
                      className={cn(
                        'relative grid size-10 shrink-0 place-items-center rounded-xl transition-colors lg:size-11',
                        selected ? 'bg-gold-400 text-forest-900' : 'bg-forest-100 text-forest-700',
                      )}
                    >
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <span className="relative min-w-0 flex-1">
                      <span className="block font-display font-semibold whitespace-nowrap lg:text-lg">
                        {service.title}
                      </span>
                      <span
                        className={cn(
                          'mt-0.5 hidden text-sm lg:block',
                          selected ? 'text-forest-100/70' : 'text-stone-ink',
                        )}
                      >
                        {service.tagline}
                      </span>
                    </span>
                    <ArrowRight
                      className={cn(
                        'relative hidden size-5 shrink-0 transition-all duration-300 lg:block',
                        selected
                          ? 'text-gold-400'
                          : '-translate-x-2 text-forest-900/30 opacity-0 group-hover:translate-x-0 group-hover:opacity-100',
                      )}
                      aria-hidden="true"
                    />
                  </button>
                )
              })}
            </div>
          </Reveal>

          <Reveal delay={0.1} className="grid min-w-0">
            <AnimatePresence mode="wait" initial={false}>
              <ServicePanel
                key={active.id}
                service={active}
                panelId={panelId}
                tabId={tabId(activeIndex)}
                onBook={onBook}
              />
            </AnimatePresence>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
