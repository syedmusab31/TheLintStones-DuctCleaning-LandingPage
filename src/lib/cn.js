import { extendTailwindMerge } from 'tailwind-merge'

// Teach the merger about the custom radius token so `rounded-card` overrides `rounded-*`.
const twMerge = extendTailwindMerge({
  extend: { theme: { radius: ['card'] } },
})

/** Joins class names and lets later Tailwind utilities override earlier conflicting ones. */
export function cn(...classes) {
  return twMerge(classes.filter(Boolean).join(' '))
}
