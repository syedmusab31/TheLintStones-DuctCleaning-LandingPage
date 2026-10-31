import { Star } from 'lucide-react'

export function Stars({ count = 5, className = 'size-4', tone = 'text-gold-500' }) {
  return (
    <span className={`inline-flex gap-0.5 ${tone}`} aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }, (_, i) => (
        <Star
          key={i}
          className={className}
          fill="currentColor"
          strokeWidth={0}
          aria-hidden="true"
        />
      ))}
    </span>
  )
}
