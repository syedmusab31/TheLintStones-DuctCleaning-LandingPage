import { Asterisk } from 'lucide-react'
import { trustPoints } from '../data/site'

export function TrustMarquee() {
  // Rendered twice so the -50% keyframe loops seamlessly.
  const items = [...trustPoints, ...trustPoints]

  return (
    <div className="relative overflow-hidden border-y border-forest-900/10 bg-forest-900 py-5 text-cream">
      <ul
        className="flex w-max animate-marquee items-center motion-reduce:animate-none"
        aria-label="Why customers trust us"
      >
        {items.map((point, i) => (
          <li
            key={i}
            aria-hidden={i >= trustPoints.length}
            className="flex items-center gap-6 pr-6 font-display text-lg font-medium whitespace-nowrap sm:text-xl"
          >
            {point}
            <Asterisk className="size-5 text-gold-400" aria-hidden="true" />
          </li>
        ))}
      </ul>
    </div>
  )
}
