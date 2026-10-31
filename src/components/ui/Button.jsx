import { cn } from '../../lib/cn'

const base =
  'group inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-[background-color,color,box-shadow,transform] duration-200 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60'

const variants = {
  primary: 'bg-gold-400 text-forest-900 shadow-[inset_0_-2px_0_rgb(0_0_0/0.12)] hover:bg-gold-300',
  dark: 'bg-forest-900 text-cream hover:bg-forest-700',
  outline:
    'border border-forest-900/15 text-forest-900 hover:border-forest-900/40 hover:bg-white/60',
  ghostLight: 'border border-cream/20 text-cream hover:border-cream/50 hover:bg-cream/5',
}

const sizes = {
  sm: 'h-10 px-4 text-sm',
  md: 'h-12 px-6 text-[15px]',
  lg: 'h-14 px-7 text-base',
}

export function Button({ href, variant = 'primary', size = 'md', className, children, ...props }) {
  const classes = cn(base, variants[variant], sizes[size], className)

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    )
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  )
}
