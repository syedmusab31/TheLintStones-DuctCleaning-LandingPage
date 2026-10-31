import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowRight,
  ChevronDown,
  CircleCheck,
  Clock,
  Loader2,
  Lock,
  Mail,
  Phone,
} from 'lucide-react'
import { company, services } from '../data/site'
import { submitLead } from '../lib/leads'
import { easeOut } from '../lib/motion'
import { cn } from '../lib/cn'
import { Button } from '../components/ui/Button'
import { Reveal } from '../components/ui/Reveal'

const fieldClass =
  'mt-2 h-12 w-full rounded-xl border border-line bg-white px-4 text-[15px] text-forest-900 transition-colors placeholder:text-stone-ink/60 hover:border-forest-900/25 focus:border-forest-900 focus:outline-none'

function Field({ label, htmlFor, className, children }) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="text-sm font-medium">
        {label}
      </label>
      {children}
    </div>
  )
}

export function QuoteForm() {
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const [firstName, setFirstName] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()
    const form = event.currentTarget
    const lead = Object.fromEntries(new FormData(form))

    setStatus('submitting')
    try {
      await submitLead(lead)
      setFirstName(String(lead.name).trim().split(' ')[0])
      setStatus('success')
      form.reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="quote" className="py-24 lg:py-32">
      <div className="container-page">
        <div className="grid overflow-hidden rounded-[2rem] bg-forest-900 lg:grid-cols-[1fr_1.2fr]">
          <div className="relative flex flex-col justify-between gap-12 p-8 text-cream sm:p-12">
            <div className="pointer-events-none absolute inset-0 grain" aria-hidden="true" />
            <Reveal className="relative">
              <p className="eyebrow text-gold-400">
                <span className="h-px w-6 bg-current" aria-hidden="true" />
                Free quote
              </p>
              <h2 className="mt-4 text-4xl leading-[1.05] font-semibold sm:text-5xl">
                Lock in ${company.offerPrice} before the offer ends.
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-forest-100/75">
                Leave your details and we'll call back within one business day to confirm a time
                that suits you. No obligation, no pushy sales.
              </p>
            </Reveal>

            <ul className="relative grid gap-5 text-forest-100/85">
              <li className="flex items-center gap-4">
                <span className="grid size-11 place-items-center rounded-full bg-cream/10">
                  <Phone className="size-5 text-gold-400" aria-hidden="true" />
                </span>
                <a
                  href={company.phoneHref}
                  className="font-display text-xl font-semibold text-cream hover:text-gold-300"
                >
                  {company.phone}
                </a>
              </li>
              <li className="flex items-center gap-4">
                <span className="grid size-11 place-items-center rounded-full bg-cream/10">
                  <Mail className="size-5 text-gold-400" aria-hidden="true" />
                </span>
                <a href={`mailto:${company.email}`} className="hover:text-cream">
                  {company.email}
                </a>
              </li>
              <li className="flex items-center gap-4">
                <span className="grid size-11 place-items-center rounded-full bg-cream/10">
                  <Clock className="size-5 text-gold-400" aria-hidden="true" />
                </span>
                Mon – Fri, 9:00 am – 5:00 pm
              </li>
            </ul>
          </div>

          <div className="bg-cream p-6 sm:p-10 lg:m-3 lg:rounded-[1.5rem]">
            <AnimatePresence mode="wait" initial={false}>
              {status === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: easeOut }}
                  className="flex h-full min-h-96 flex-col items-center justify-center text-center"
                  role="status"
                >
                  <CircleCheck
                    className="size-14 text-forest-600"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  <h3 className="mt-6 text-3xl font-semibold">
                    Thanks{firstName && `, ${firstName}`}!
                  </h3>
                  <p className="mt-3 max-w-sm leading-relaxed text-stone-ink">
                    Your request is in. One of our team will call you within one business day to
                    book your ${company.offerPrice} cleaning.
                  </p>
                  <Button variant="outline" className="mt-8" onClick={() => setStatus('idle')}>
                    Send another request
                  </Button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  onSubmit={handleSubmit}
                  className="grid gap-5 sm:grid-cols-2"
                >
                  <Field label="Full name" htmlFor="name">
                    <input
                      id="name"
                      name="name"
                      required
                      autoComplete="name"
                      placeholder="Jane Cooper"
                      className={fieldClass}
                    />
                  </Field>
                  <Field label="Phone" htmlFor="phone">
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      autoComplete="tel"
                      inputMode="tel"
                      placeholder="(555) 123-4567"
                      className={fieldClass}
                    />
                  </Field>
                  <Field label="Email" htmlFor="email">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="Optional"
                      className={fieldClass}
                    />
                  </Field>
                  <Field label="ZIP code" htmlFor="zip">
                    <input
                      id="zip"
                      name="zip"
                      required
                      autoComplete="postal-code"
                      inputMode="numeric"
                      placeholder="12345"
                      className={fieldClass}
                    />
                  </Field>
                  <Field label="Service" htmlFor="service" className="sm:col-span-2">
                    <div className="relative">
                      <select
                        id="service"
                        name="service"
                        defaultValue={services[0].title}
                        className={cn(fieldClass, 'appearance-none pr-10')}
                      >
                        {services.map((service) => (
                          <option key={service.id}>{service.title}</option>
                        ))}
                        <option>Not sure yet</option>
                      </select>
                      <ChevronDown
                        className="pointer-events-none absolute top-1/2 right-4 mt-1 size-4 -translate-y-1/2 text-stone-ink"
                        aria-hidden="true"
                      />
                    </div>
                  </Field>
                  <Field
                    label="Anything we should know?"
                    htmlFor="message"
                    className="sm:col-span-2"
                  >
                    <textarea
                      id="message"
                      name="message"
                      rows={3}
                      placeholder="Number of AC units, pets, best time to call…"
                      className={cn(fieldClass, 'h-auto resize-none py-3')}
                    />
                  </Field>

                  <div className="sm:col-span-2">
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full"
                      disabled={status === 'submitting'}
                    >
                      {status === 'submitting' ? (
                        <>
                          <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                          Sending…
                        </>
                      ) : (
                        <>
                          Request my free quote
                          <ArrowRight
                            className="size-4 transition-transform group-hover:translate-x-0.5"
                            aria-hidden="true"
                          />
                        </>
                      )}
                    </Button>
                    {status === 'error' ? (
                      <p className="mt-3 text-center text-sm text-red-700" role="alert">
                        Something went wrong. Please try again or call us on {company.phone}.
                      </p>
                    ) : (
                      <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-sm text-stone-ink">
                        <Lock className="size-3.5" aria-hidden="true" />
                        We never share your details.
                      </p>
                    )}
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
