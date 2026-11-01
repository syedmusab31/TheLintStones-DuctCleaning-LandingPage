import { motion } from 'framer-motion'
import { easeOut } from '../../lib/motion'

/**
 * Reveals text word by word from behind a mask. `parts` lets a phrase mix plain
 * and accented segments: [{ text: 'Every breath' }, { text: 'ductwork.', accent: true }]
 */
export function SplitReveal({ parts, delay = 0, accentClassName, inView = false }) {
  const words = parts.flatMap(({ text, accent }) =>
    text.split(' ').map((word) => ({ word, accent })),
  )

  const trigger = inView
    ? { initial: 'hidden', whileInView: 'show', viewport: { once: true, margin: '-10% 0px' } }
    : { initial: 'hidden', animate: 'show' }

  return (
    <motion.span
      {...trigger}
      transition={{ staggerChildren: 0.06, delayChildren: delay }}
      aria-label={parts.map((p) => p.text).join(' ')}
      role="text"
    >
      {words.map(({ word, accent }, i) => (
        <span
          key={i}
          className="inline-flex overflow-hidden pb-[0.12em] align-top"
          aria-hidden="true"
        >
          <motion.span
            className={accent ? accentClassName : undefined}
            variants={{
              hidden: { y: '110%' },
              show: { y: '0%', transition: { duration: 0.9, ease: easeOut } },
            }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && <span>&nbsp;</span>}
        </span>
      ))}
    </motion.span>
  )
}
