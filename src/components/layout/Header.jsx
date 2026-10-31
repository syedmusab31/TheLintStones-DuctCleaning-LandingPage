import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, Phone, X } from 'lucide-react'
import { company, navLinks } from '../../data/site'
import { useScrolled } from '../../hooks/useScrolled'
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll'
import { easeOut } from '../../lib/motion'
import { cn } from '../../lib/cn'
import { Button } from '../ui/Button'

export function Header() {
  const scrolled = useScrolled()
  const [open, setOpen] = useState(false)
  useLockBodyScroll(open)

  const close = () => setOpen(false)

  return (
    <header className="sticky top-0 z-50">
      <div
        className={cn(
          'transition-[background-color,box-shadow,backdrop-filter] duration-300',
          scrolled || open
            ? 'bg-cream/85 shadow-[0_1px_0_rgb(18_38_28/0.08)] backdrop-blur-xl'
            : 'bg-transparent',
        )}
      >
        <nav
          className="container-page flex h-18 items-center justify-between gap-6"
          aria-label="Main"
        >
          <a href="#top" className="flex shrink-0 items-center gap-3" onClick={close}>
            <img src="/images/logo.png" alt="" width="48" height="48" className="size-12" />
            <span className="font-display text-lg leading-none font-bold">
              TheLintstones
              <span className="block text-[11px] font-medium tracking-[0.16em] text-stone-ink uppercase">
                Duct Cleaning
              </span>
            </span>
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="rounded-full px-4 py-2 text-[15px] font-medium text-forest-900/75 transition-colors hover:bg-forest-900/5 hover:text-forest-900"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-2 lg:flex">
            <Button href={company.phoneHref} variant="outline" size="sm">
              <Phone className="size-4" aria-hidden="true" />
              {company.phone}
            </Button>
            <Button href="#quote" variant="dark" size="sm">
              Book a cleaning
            </Button>
          </div>

          <button
            type="button"
            className="grid size-11 place-items-center rounded-full border border-forest-900/10 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            className="absolute inset-x-0 top-full h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-line bg-cream lg:hidden"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: easeOut }}
          >
            <ul className="container-page divide-y divide-line pt-4">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i + 0.05, duration: 0.3, ease: easeOut }}
                >
                  <a
                    href={link.href}
                    onClick={close}
                    className="block py-4 font-display text-2xl font-semibold"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="container-page mt-8 grid gap-3 pb-10">
              <Button href="#quote" size="lg" onClick={close}>
                Book a cleaning
              </Button>
              <Button href={company.phoneHref} variant="outline" size="lg">
                <Phone className="size-4" aria-hidden="true" />
                Call {company.phone}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
