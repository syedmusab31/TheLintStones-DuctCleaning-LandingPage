import { useEffect, useRef, useState } from 'react'
import {
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
} from 'framer-motion'
import { MoveHorizontal } from 'lucide-react'

const RING_COUNT = 16
const FAR = 13
const PARTICLE_COUNT = 280
const CLEAN_PARTICLES = 70

const palette = {
  dirty: {
    bgInner: '#3b3122',
    bgOuter: '#120f0a',
    ring: [150, 124, 84],
    dust: [
      [118, 98, 72],
      [92, 80, 64],
      [160, 140, 110],
    ],
  },
  clean: {
    bgInner: '#24513c',
    bgOuter: '#0b1912',
    ring: [236, 229, 212],
    streak: [246, 196, 55],
  },
}

function seededParticles() {
  let seed = 7
  const rand = () => (seed = (seed * 16807) % 2147483647) / 2147483647

  return Array.from({ length: PARTICLE_COUNT }, () => {
    // Dust settles: bias the cross-section position toward the duct floor.
    const floorBias = rand() < 0.45
    return {
      x: rand() * 1.8 - 0.9,
      y: floorBias ? 0.55 + rand() * 0.35 : rand() * 1.6 - 0.8,
      d: 1 + rand() * (FAR - 1),
      r: 0.6 + rand() * 1.8,
      clump: rand() < 0.12,
      shade: Math.floor(rand() * 3),
      drift: rand() * Math.PI * 2,
    }
  })
}

function roundedRect(ctx, x, y, w, h, r) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.arcTo(x + w, y, x + w, y + h, r)
  ctx.arcTo(x + w, y + h, x, y + h, r)
  ctx.arcTo(x, y + h, x, y, r)
  ctx.arcTo(x, y, x + w, y, r)
  ctx.closePath()
}

/**
 * A perspective duct "fly-through" rendered twice — dusty and clean — and split by a
 * draggable divider. Everything is procedural, so it stays crisp at any size.
 */
export function DuctTunnel({ className }) {
  const wrapRef = useRef(null)
  const canvasRef = useRef(null)
  const reduceMotion = useReducedMotion()

  const split = useMotionValue(0.94)
  const splitPercent = useTransform(split, (v) => `${v * 100}%`)
  const pointer = useRef({ x: 0, y: 0, tx: 0, ty: 0 })
  const [ariaValue, setAriaValue] = useState(94)
  useMotionValueEvent(split, 'change', (v) => setAriaValue(Math.round(v * 100)))

  // Hint at the interaction by sweeping the divider in once.
  useEffect(() => {
    const controls = animate(split, 0.5, { duration: 1.8, delay: 0.9, ease: [0.65, 0, 0.35, 1] })
    return () => controls.stop()
  }, [split])

  useEffect(() => {
    const canvas = canvasRef.current
    const wrap = wrapRef.current
    const ctx = canvas.getContext('2d')
    const particles = seededParticles()
    const rings = Array.from({ length: RING_COUNT }, (_, i) => 1 + (i * (FAR - 1)) / RING_COUNT)

    let width = 0
    let height = 0
    let frame = 0
    let last = performance.now()
    let visible = true

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = wrap.clientWidth
      height = wrap.clientHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const project = (d, vp) => {
      const s = 1 / d
      return {
        s,
        cx: vp.x + (width / 2 - vp.x) * s,
        cy: vp.y + (height / 2 - vp.y) * s,
        w: width * 1.15 * s,
        h: height * 1.05 * s,
      }
    }

    const depthAlpha = (d) => Math.min(1, (FAR - d) / 4) * Math.min(1, (d - 0.85) / 0.5)

    function drawScene(state, vp, time) {
      const theme = palette[state]
      const glow = ctx.createRadialGradient(
        vp.x,
        vp.y,
        0,
        vp.x,
        vp.y,
        Math.max(width, height) * 0.75,
      )
      glow.addColorStop(0, theme.bgInner)
      glow.addColorStop(1, theme.bgOuter)
      ctx.fillStyle = glow
      ctx.fillRect(0, 0, width, height)

      // Duct segments, far to near.
      const ordered = [...rings].sort((a, b) => b - a)
      for (const d of ordered) {
        const p = project(d, vp)
        const a = depthAlpha(d)
        if (a <= 0) continue
        const [r, g, b] = theme.ring
        const radius = Math.min(p.w, p.h) * 0.09

        ctx.lineWidth = Math.max(0.5, 3 * p.s)
        ctx.strokeStyle = `rgba(${r},${g},${b},${a * (state === 'clean' ? 0.7 : 0.4)})`
        roundedRect(ctx, p.cx - p.w / 2, p.cy - p.h / 2, p.w, p.h, radius)
        ctx.stroke()

        if (state === 'dirty') {
          // Grime collecting along the floor of each segment.
          ctx.lineWidth = Math.max(1, 14 * p.s)
          ctx.strokeStyle = `rgba(98,80,56,${a * 0.55})`
          ctx.beginPath()
          ctx.moveTo(p.cx - p.w / 2 + radius, p.cy + p.h / 2 - ctx.lineWidth / 2)
          ctx.lineTo(p.cx + p.w / 2 - radius, p.cy + p.h / 2 - ctx.lineWidth / 2)
          ctx.stroke()
        }
      }

      if (state === 'dirty') {
        for (const pt of particles) {
          const p = project(pt.d, vp)
          const a = depthAlpha(pt.d)
          if (a <= 0) continue
          const wobble = Math.sin(time * 0.0009 + pt.drift) * 0.03
          const x = p.cx + (pt.x + wobble) * (p.w / 2)
          const y = p.cy + pt.y * (p.h / 2)
          const [r, g, b] = palette.dirty.dust[pt.shade]
          const size = pt.r * p.s * (pt.clump ? 22 : 9)

          ctx.fillStyle = `rgba(${r},${g},${b},${a * (pt.clump ? 0.35 : 0.85)})`
          ctx.beginPath()
          ctx.arc(x, y, Math.max(0.4, size), 0, Math.PI * 2)
          ctx.fill()
        }
      } else {
        const [r, g, b] = palette.clean.streak
        ctx.lineCap = 'round'
        for (let i = 0; i < CLEAN_PARTICLES; i++) {
          const pt = particles[i]
          const a = depthAlpha(pt.d)
          if (a <= 0) continue
          const head = project(pt.d, vp)
          const tail = project(pt.d + 0.9, vp)
          const y = pt.y * 0.7
          ctx.strokeStyle = `rgba(${r},${g},${b},${a * 0.7})`
          ctx.lineWidth = Math.max(0.5, 2.4 * head.s)
          ctx.beginPath()
          ctx.moveTo(tail.cx + pt.x * (tail.w / 2), tail.cy + y * (tail.h / 2))
          ctx.lineTo(head.cx + pt.x * (head.w / 2), head.cy + y * (head.h / 2))
          ctx.stroke()
        }
      }
    }

    function tick(now) {
      const dt = Math.min(64, now - last)
      last = now
      const speed = reduceMotion ? 0 : dt * 0.0011

      for (let i = 0; i < rings.length; i++) {
        rings[i] -= speed
        if (rings[i] < 0.85) rings[i] += FAR - 0.85
      }
      for (const pt of particles) {
        pt.d -= speed * (pt.clump ? 0.8 : 1.15)
        if (pt.d < 0.85) pt.d += FAR - 0.85
      }

      const ptr = pointer.current
      ptr.x += (ptr.tx - ptr.x) * 0.06
      ptr.y += (ptr.ty - ptr.y) * 0.06
      const vp = { x: width / 2 + ptr.x * width * 0.08, y: height * 0.46 + ptr.y * height * 0.08 }
      const cut = split.get() * width

      ctx.save()
      ctx.beginPath()
      ctx.rect(0, 0, cut, height)
      ctx.clip()
      drawScene('dirty', vp, now)
      ctx.restore()

      ctx.save()
      ctx.beginPath()
      ctx.rect(cut, 0, width - cut, height)
      ctx.clip()
      drawScene('clean', vp, now)
      ctx.restore()

      if (visible) frame = requestAnimationFrame(tick)
    }

    resize()
    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(wrap)

    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) {
        last = performance.now()
        cancelAnimationFrame(frame)
        frame = requestAnimationFrame(tick)
      }
    })
    intersection.observe(wrap)

    frame = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(frame)
      resizeObserver.disconnect()
      intersection.disconnect()
    }
  }, [reduceMotion, split])

  function setSplitFromEvent(event) {
    const rect = wrapRef.current.getBoundingClientRect()
    const value = (event.clientX - rect.left) / rect.width
    split.set(Math.min(0.98, Math.max(0.02, value)))
  }

  function handlePointerMove(event) {
    const rect = wrapRef.current.getBoundingClientRect()
    pointer.current.tx = (event.clientX - rect.left) / rect.width - 0.5
    pointer.current.ty = (event.clientY - rect.top) / rect.height - 0.5
    if (event.buttons === 1 || event.pointerType === 'touch') setSplitFromEvent(event)
  }

  function handleKeyDown(event) {
    const step = event.shiftKey ? 0.1 : 0.03
    if (event.key === 'ArrowLeft') split.set(Math.max(0.02, split.get() - step))
    else if (event.key === 'ArrowRight') split.set(Math.min(0.98, split.get() + step))
    else return
    event.preventDefault()
  }

  return (
    <div
      ref={wrapRef}
      className={`relative cursor-ew-resize touch-pan-y overflow-hidden select-none ${className ?? ''}`}
      onPointerDown={(event) => {
        event.currentTarget.setPointerCapture(event.pointerId)
        animate(split, split.get(), { duration: 0 })
        setSplitFromEvent(event)
      }}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => {
        pointer.current.tx = 0
        pointer.current.ty = 0
      }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 size-full" aria-hidden="true" />

      <span className="pointer-events-none absolute top-4 left-4 rounded-full bg-black/40 px-3 py-1 text-xs font-semibold tracking-wider text-[#d8c9ab] uppercase backdrop-blur-md">
        Before
      </span>
      <span className="pointer-events-none absolute top-4 right-4 rounded-full bg-gold-400 px-3 py-1 text-xs font-semibold tracking-wider text-forest-900 uppercase">
        After
      </span>

      <motion.div
        className="pointer-events-none absolute inset-y-0 w-px bg-cream/80"
        style={{ left: splitPercent }}
      >
        <div
          role="slider"
          tabIndex={0}
          aria-label="Compare a dirty duct with a cleaned duct"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={ariaValue}
          aria-valuetext={`${ariaValue}% before, ${100 - ariaValue}% after`}
          onKeyDown={handleKeyDown}
          className="pointer-events-auto absolute top-1/2 left-1/2 grid size-12 -translate-1/2 place-items-center rounded-full bg-cream text-forest-900 shadow-[0_8px_30px_rgb(0_0_0/0.35)] ring-4 ring-cream/25"
        >
          <MoveHorizontal className="size-5" aria-hidden="true" />
        </div>
      </motion.div>
    </div>
  )
}
