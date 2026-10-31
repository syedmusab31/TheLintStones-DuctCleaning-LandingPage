import { cn } from '../../lib/cn'
import { Reveal } from './Reveal'

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  tone = 'dark',
  className,
}) {
  const centered = align === 'center'
  const light = tone === 'light'

  return (
    <Reveal className={cn('max-w-2xl', centered && 'mx-auto text-center', className)}>
      {eyebrow && (
        <p className={cn('eyebrow', light ? 'text-gold-400' : 'text-forest-600')}>
          <span className="h-px w-6 bg-current" aria-hidden="true" />
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          'mt-4 text-4xl leading-[1.05] font-semibold sm:text-5xl',
          light ? 'text-cream' : 'text-forest-900',
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            'mt-5 text-lg leading-relaxed',
            light ? 'text-forest-100/75' : 'text-stone-ink',
          )}
        >
          {description}
        </p>
      )}
    </Reveal>
  )
}
