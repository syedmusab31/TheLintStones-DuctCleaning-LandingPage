import { useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { Menu, Phone, X } from 'lucide-react'
import { company, navLinks } from '../../data/site'
import { useScrolled } from '../../hooks/useScrolled'
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll'
import { easeOut } from '../../lib/motion'
import { cn } from '../../lib/cn'
import { Button } from '../ui/Button'

export function Header() {
  const scrolled = useScrolled(24)
  const [open, setOpen] = useState(false)
  useLockBodyScroll(open)

  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 })

  const close = () => setOpen(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4">
      <motion.div
        className="fixed inset-x-0 top-0 h-0.5 origin-left bg-gold-400"
        style={{ scaleX: progress }}
        aria-hidden="true"
      />

      <motion.nav
        aria-label="Main"
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: easeOut }}
        className={cn(
          'mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 rounded-full border pr-2 pl-3 transition-[background-color,border-color,box-shadow] duration-500 sm:pl-4',
          scrolled || open
            ? 'border-forest-900/10 bg-cream/85 text-forest-900 shadow-[0_12px_40px_-16px_rgb(12_26_19/0.35)] backdrop-blur-xl'
            : 'border-cream/10 bg-forest-950/40 text-cream backdrop-blur-md',
        )}
      >
        <a href="#top" className="flex shrink-0 items-center gap-2.5" onClick={close}>
          <img
            src="/images/logo.png"
            alt=""
            width="44"
            height="44"
            className="size-11 rounded-full bg-cream object-contain p-0.5"
          />
          <span className="font-display text-[17px] leading-none font-bold">
            TheLintstones
            <span
              className={cn(
                'mt-0.5 block text-[10px] font-medium tracking-[0.18em] uppercase transition-colors',
                scrolled || open ? 'text-stone-ink' : 'text-cream/60',
              )}
            >
              Duct Cleaning
            </span>
          </span>
        </a>

        <ul className="hidden items-center lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={cn(
                  'rounded-full px-4 py-2 text-[15px] font-medium transition-colors',
                  scrolled
                    ? 'text-forest-900/70 hover:bg-forest-900/5 hover:text-forest-900'
                    : 'text-cream/75 hover:bg-cream/10 hover:text-cream',
                )}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={company.phoneHref}
            className={cn(
              'hidden items-center gap-2 px-3 text-sm font-semibold transition-colors xl:inline-flex',
              scrolled ? 'hover:text-forest-600' : 'hover:text-gold-300',
            )}
          >
            <Phone className="size-4" aria-hidden="true" />
            {company.phone}
          </a>
          <span className="hidden sm:block">
            <Button href="#quote" size="sm" className="h-12 px-5">
              Book a cleaning
            </Button>
          </span>
          <button
            type="button"
            className={cn(
              'grid size-12 place-items-center rounded-full transition-colors lg:hidden',
              scrolled || open ? 'bg-forest-900 text-cream' : 'bg-cream text-forest-900',
            )}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            className="mx-auto mt-2 max-w-7xl overflow-hidden rounded-[1.75rem] border border-forest-900/10 bg-cream shadow-[0_24px_60px_-20px_rgb(12_26_19/0.45)] lg:hidden"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.3, ease: easeOut }}
          >
            <ul className="px-6 pt-4">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  className="border-b border-line"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i + 0.08, duration: 0.35, ease: easeOut }}
                >
                  <a
                    href={link.href}
                    onClick={close}
                    className="flex items-baseline justify-between py-4 font-display text-3xl font-semibold"
                  >
                    {link.label}
                    <span className="font-sans text-xs font-medium text-stone-ink tabular-nums">
                      0{i + 1}
                    </span>
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="grid gap-2 p-6">
              <Button href="#quote" size="lg" onClick={close}>
                Book a cleaning
              </Button>
              <Button href={company.phoneHref} variant="outline" size="lg">
                <Phone className="size-4" aria-hidden="true" />
                {company.phone}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
