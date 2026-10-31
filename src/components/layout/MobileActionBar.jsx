import { AnimatePresence, motion } from 'framer-motion'
import { Phone } from 'lucide-react'
import { company } from '../../data/site'
import { useScrolled } from '../../hooks/useScrolled'
import { easeOut } from '../../lib/motion'
import { Button } from '../ui/Button'

/** Thumb-reachable call/book actions on small screens once the hero CTAs are out of view. */
export function MobileActionBar() {
  const visible = useScrolled(640)

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-cream/90 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-xl lg:hidden"
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ duration: 0.35, ease: easeOut }}
        >
          <div className="mx-auto grid max-w-md grid-cols-[auto_1fr] gap-2">
            <Button href={company.phoneHref} variant="outline" aria-label={`Call ${company.phone}`}>
              <Phone className="size-4" aria-hidden="true" />
              Call
            </Button>
            <Button href="#quote">Book for ${company.offerPrice}</Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
