import { trustPoints } from '../data/site'

function Burst() {
  return (
    <svg viewBox="0 0 24 24" className="size-6 shrink-0 text-forest-900" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 0l2.4 7.6L22 5l-5 6.2L24 12l-7 .8 5 6.2-7.6-2.6L12 24l-2.4-7.6L2 19l5-6.2L0 12l7-.8L2 5l7.6 2.6z"
      />
    </svg>
  )
}

export function TrustMarquee() {
  const items = [...trustPoints, ...trustPoints]

  return (
    <div className="relative z-10 -mx-[5vw] -my-6 w-[110vw] -rotate-[1.5deg] overflow-hidden bg-gold-400 py-5 shadow-[0_20px_40px_-20px_rgb(12_26_19/0.5)]">
      <ul
        className="flex w-max animate-marquee items-center motion-reduce:animate-none"
        aria-label="Why customers trust us"
      >
        {items.map((point, i) => (
          <li
            key={i}
            aria-hidden={i >= trustPoints.length}
            className="flex items-center gap-8 pr-8 font-display text-xl font-semibold whitespace-nowrap text-forest-900 sm:text-2xl"
          >
            {point}
            <Burst />
          </li>
        ))}
      </ul>
    </div>
  )
}
