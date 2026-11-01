import { motion, useMotionValue, useSpring } from 'framer-motion'
import { cn } from '../../lib/cn'

const base =
  'group relative inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-[background-color,color,border-color,box-shadow] duration-200 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60'

const variants = {
  primary:
    'bg-gold-400 text-forest-900 shadow-[inset_0_-2px_0_rgb(0_0_0/0.12),0_10px_30px_-10px_rgb(246_196_55/0.6)] hover:bg-gold-300',
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

const spring = { stiffness: 220, damping: 16, mass: 0.4 }

/** Pulls gently toward the cursor — reserved for the primary call to action. */
function useMagnet(strength = 0.25) {
  const x = useSpring(useMotionValue(0), spring)
  const y = useSpring(useMotionValue(0), spring)

  return {
    style: { x, y },
    onPointerMove(event) {
      if (event.pointerType !== 'mouse') return
      const rect = event.currentTarget.getBoundingClientRect()
      x.set((event.clientX - rect.left - rect.width / 2) * strength)
      y.set((event.clientY - rect.top - rect.height / 2) * strength)
    },
    onPointerLeave() {
      x.set(0)
      y.set(0)
    },
  }
}

export function Button({
  href,
  variant = 'primary',
  size = 'md',
  magnetic = false,
  className,
  children,
  ...props
}) {
  const magnet = useMagnet()
  const classes = cn(base, variants[variant], sizes[size], className)
  const motionProps = magnetic ? magnet : {}

  if (href) {
    return (
      <motion.a href={href} className={classes} {...motionProps} {...props}>
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button type="button" className={classes} {...motionProps} {...props}>
      {children}
    </motion.button>
  )
}
