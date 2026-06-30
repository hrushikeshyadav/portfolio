import { motion, useReducedMotion } from 'framer-motion'

/**
 * Lightweight animated aurora — a handful of big, soft, theme-tinted blobs that
 * drift behind everything. Pure transform/opacity animation on pre-rasterised
 * blurred layers, so it's GPU-composited and effectively free compared to the
 * WebGL ambient scene or backdrop-filter.
 *
 * It runs in EVERY performance tier — including phones and perf-lite, where the
 * WebGL scene is disabled — so the page always feels alive. On capable desktops
 * it sits quietly behind the 3D node-network. Honours reduced-motion by holding
 * the blobs still.
 */

type Blob = {
  color: string          // CSS var name for the rgb triplet
  alpha: number
  size: string           // vmax
  top: string
  left: string
  drift: { x: number[]; y: number[]; s: number[] }
  dur: number
}

const BLOBS: Blob[] = [
  {
    color: '--accent-rgb', alpha: 0.16, size: '62vmax', top: '-18%', left: '-12%',
    drift: { x: [0, 60, -30, 0], y: [0, 40, 80, 0], s: [1, 1.12, 0.95, 1] }, dur: 26,
  },
  {
    color: '--accent2-rgb', alpha: 0.12, size: '52vmax', top: '8%', left: '58%',
    drift: { x: [0, -70, 20, 0], y: [0, 50, -30, 0], s: [1, 0.9, 1.15, 1] }, dur: 32,
  },
  {
    color: '--accent-rgb', alpha: 0.10, size: '48vmax', top: '55%', left: '20%',
    drift: { x: [0, 40, -50, 0], y: [0, -40, 30, 0], s: [1, 1.1, 0.92, 1] }, dur: 38,
  },
]

export default function AuroraBackground() {
  const reduce = useReducedMotion()

  return (
    <div
      aria-hidden
      style={{
        position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden',
      }}
    >
      {BLOBS.map((b, i) => (
        <motion.div
          key={i}
          initial={false}
          animate={reduce ? undefined : { x: b.drift.x, y: b.drift.y, scale: b.drift.s }}
          transition={{ duration: b.dur, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            top: b.top, left: b.left,
            width: b.size, height: b.size,
            borderRadius: '50%',
            background: `radial-gradient(circle at 50% 50%, rgba(var(${b.color}), ${b.alpha}) 0%, transparent 68%)`,
            filter: 'blur(60px)',
            willChange: 'transform',
          }}
        />
      ))}
    </div>
  )
}
