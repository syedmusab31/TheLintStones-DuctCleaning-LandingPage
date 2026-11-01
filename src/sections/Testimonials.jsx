import { Quote } from 'lucide-react'
import { testimonials } from '../data/site'
import { cn } from '../lib/cn'
import { SectionHeading } from '../components/ui/SectionHeading'
import { Stars } from '../components/ui/Stars'

function initials(name) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
}

function ReviewCard({ review, highlighted }) {
  return (
    <figure
      className={cn(
        'flex w-[min(24rem,82vw)] shrink-0 flex-col justify-between gap-10 rounded-card p-8',
        highlighted ? 'bg-forest-900 text-cream' : 'border border-line bg-white',
      )}
    >
      <div>
        <div className="flex items-center justify-between">
          <Stars />
          <Quote
            className={cn('size-8', highlighted ? 'text-cream/15' : 'text-forest-900/10')}
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
            highlighted ? 'bg-gold-400 text-forest-900' : 'bg-forest-100 text-forest-700',
          )}
          aria-hidden="true"
        >
          {initials(review.name)}
        </span>
        <span>
          <span className="block font-semibold">{review.name}</span>
          <span className={cn('text-sm', highlighted ? 'text-cream/60' : 'text-stone-ink')}>
            {review.detail}
          </span>
        </span>
      </figcaption>
    </figure>
  )
}

/** Two rows drifting in opposite directions; hovering a row pauses it. */
function Row({ items, reverse }) {
  // Doubled so the -50% keyframe loops seamlessly on very wide screens.
  const loop = [...items, ...items]
  return (
    <div className="group flex overflow-hidden">
      <ul
        className={cn(
          'flex w-max gap-4 pr-4 group-hover:[animation-play-state:paused] motion-reduce:animate-none',
          'animate-[marquee_60s_linear_infinite]',
          reverse && '[animation-direction:reverse]',
        )}
      >
        {loop.map((review, i) => (
          <li key={i} aria-hidden={i >= items.length}>
            <ReviewCard review={review} highlighted={i % 4 === (reverse ? 2 : 0)} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export function Testimonials() {
  const half = Math.ceil(testimonials.length / 2)
  const rowA = [...testimonials.slice(0, half), ...testimonials.slice(0, half)]
  const rowB = [...testimonials.slice(half), ...testimonials.slice(half)]

  return (
    <section id="reviews" className="overflow-hidden py-24 lg:py-36">
      <div className="container-page">
        <SectionHeading
          align="center"
          eyebrow="Reviews"
          title={
            <>
              Homeowners notice on{' '}
              <span className="font-serif font-normal text-forest-600 italic">day one.</span>
            </>
          }
        />
      </div>

      <div className="mt-16 grid gap-4 [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
        <Row items={rowA} />
        <Row items={rowB} reverse />
      </div>
    </section>
  )
}
