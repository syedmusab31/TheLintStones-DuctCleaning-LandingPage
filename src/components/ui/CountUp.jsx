import { useEffect, useRef } from 'react'
import { animate, useInView, useReducedMotion } from 'framer-motion'

export function CountUp({ to, duration = 1.6, className }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-15% 0px' })
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (!isInView) return
    if (reduceMotion) {
      ref.current.textContent = String(to)
      return
    }
    const controls = animate(0, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (value) => {
        if (ref.current) ref.current.textContent = Math.round(value).toString()
      },
    })
    return () => controls.stop()
  }, [isInView, to, duration, reduceMotion])

  return (
    <span ref={ref} className={className}>
      0
    </span>
  )
}
