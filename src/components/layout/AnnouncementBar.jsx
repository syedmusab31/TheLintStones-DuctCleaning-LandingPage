import { Phone } from 'lucide-react'
import { company } from '../../data/site'

export function AnnouncementBar() {
  return (
    <div className="bg-forest-950 text-cream">
      <div className="container-page flex h-10 items-center justify-center gap-6 text-[13px] sm:justify-between">
        <p className="truncate">
          <span className="font-semibold text-gold-400">This month:</span>
          <span className="hidden sm:inline"> air duct cleaning for a</span> flat $
          {company.offerPrice} per AC unit.{' '}
          <a
            href="#quote"
            className="underline decoration-gold-400/60 underline-offset-4 hover:decoration-gold-400"
          >
            Claim it
          </a>
        </p>
        <a
          href={company.phoneHref}
          className="hidden items-center gap-2 font-medium text-cream/80 transition-colors hover:text-cream sm:inline-flex"
        >
          <Phone className="size-3.5" aria-hidden="true" />
          {company.phone}
        </a>
      </div>
    </div>
  )
}
