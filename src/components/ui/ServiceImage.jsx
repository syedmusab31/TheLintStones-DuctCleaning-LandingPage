import { useId, useState } from 'react'
import { cn } from '../../lib/cn'

/**
 * Service photo with a branded fallback, used when a service has no photo yet
 * or a remote image fails to load.
 */
export function ServiceImage({ image, icon: Icon, className }) {
  const [failed, setFailed] = useState(false)
  const patternId = useId()

  if (!image || failed) {
    return (
      <div
        className={cn('relative grid place-items-center overflow-hidden bg-forest-800', className)}
        aria-hidden="true"
      >
        <svg className="absolute inset-0 size-full text-forest-700" fill="none">
          <defs>
            <pattern id={patternId} width="18" height="18" patternUnits="userSpaceOnUse">
              <path d="M0 9h18" stroke="currentColor" strokeWidth="2" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#${patternId})`} />
        </svg>
        <span className="relative grid size-24 place-items-center rounded-full bg-forest-900 ring-8 ring-forest-900/40">
          <Icon className="size-10 text-gold-400" strokeWidth={1.5} />
        </span>
      </div>
    )
  }

  return (
    <img
      src={image.src}
      alt={image.alt}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className={cn('object-cover', className)}
    />
  )
}
