import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'
import { testimonials } from '../data/site'
import { fadeUp, inView, stagger } from '../lib/motion'
import { cn } from '../lib/cn'
import { SectionHeading } from '../components/ui/SectionHeading'
import { Stars } from '../components/ui/Stars'

function initials(name) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
}

export function Testimonials() {
  return (
    <section id="reviews" className="py-24 lg:py-32">
      <div className="container-page">
        <SectionHeading eyebrow="Reviews" title="Homeowners notice the difference on day one." />

        <motion.div
          className="mt-14 grid gap-4 lg:grid-cols-3"
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={inView}
        >
          {testimonials.map((review, i) => {
            const highlighted = i === 0

            return (
              <motion.figure
                key={review.name}
                variants={fadeUp}
                className={cn(
                  'flex flex-col justify-between gap-10 rounded-card p-8',
                  highlighted ? 'bg-gold-400' : 'border border-line bg-white/60',
                )}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <Stars tone={highlighted ? 'text-forest-900' : undefined} />
                    <Quote
                      className={cn(
                        'size-8',
                        highlighted ? 'text-forest-900/20' : 'text-forest-900/10',
                      )}
                      fill="currentColor"
                      strokeWidth={0}
                      aria-hidden="true"
                    />
                  </div>
                  <blockquote className="mt-6 text-lg leading-relaxed">“{review.quote}”</blockquote>
                </div>
                <figcaption className="flex items-center gap-3">
                  <span
                    className={cn(
                      'grid size-11 place-items-center rounded-full font-display text-sm font-bold',
                      highlighted ? 'bg-forest-900 text-gold-400' : 'bg-forest-100 text-forest-700',
                    )}
                    aria-hidden="true"
                  >
                    {initials(review.name)}
                  </span>
                  <span>
                    <span className="block font-semibold">{review.name}</span>
                    <span
                      className={cn(
                        'text-sm',
                        highlighted ? 'text-forest-900/70' : 'text-stone-ink',
                      )}
                    >
                      {review.detail}
                    </span>
                  </span>
                </figcaption>
              </motion.figure>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
