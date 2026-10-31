import { motion } from 'framer-motion'
import { fadeUp, inView } from '../../lib/motion'

/** Fades and lifts its children into place the first time they scroll into view. */
export function Reveal({ as = 'div', delay = 0, className, children }) {
  const MotionTag = motion[as]

  return (
    <MotionTag
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={inView}
      custom={delay}
    >
      {children}
    </MotionTag>
  )
}
