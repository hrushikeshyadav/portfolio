import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

/**
 * Custom cursor — a single dot that springs to the pointer. No trailing ring
 * (it read as laggy/glitchy); instead the dot itself grows into a soft accent
 * highlight over interactive elements and pulses in on click. The native cursor
 * is hidden globally via `* { cursor: none }` in index.css.
 */

const SIZE = 12

export default function Cursor() {
  const [enabled, setEnabled] = useState(false)
  const [visible, setVisible] = useState(false)
  const [hover, setHover] = useState(false)
  const [down, setDown] = useState(false)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  // Tight spring — enough life to feel responsive, not enough to trail.
  const sx = useSpring(x, { stiffness: 700, damping: 40, mass: 0.3 })
  const sy = useSpring(y, { stiffness: 700, damping: 40, mass: 0.3 })

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return
    setEnabled(true)

    let isHover = false
    const onMove = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setVisible(true)
      const t = e.target as HTMLElement
      const skip = !!t.closest('[data-cursor-skip]')
      const interactive =
        !skip && !!t.closest('a, button, [role="button"], input, textarea, select, label')
      if (interactive !== isHover) {
        isHover = interactive
        setHover(interactive)
      }
    }
    const onDown = () => setDown(true)
    const onUp = () => setDown(false)
    const onLeave = () => setVisible(false)
    const onEnter = () => setVisible(true)

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    document.documentElement.addEventListener('mouseleave', onLeave)
    document.documentElement.addEventListener('mouseenter', onEnter)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      document.documentElement.removeEventListener('mouseenter', onEnter)
    }
  }, [x, y])

  if (!enabled) return null

  const scale = down ? 0.7 : hover ? 2.6 : 1

  return (
    <motion.div
      style={{
        position: 'fixed', top: 0, left: 0, x: sx, y: sy,
        zIndex: 99999, pointerEvents: 'none',
      }}
      aria-hidden
    >
      <motion.div
        animate={{ scale, opacity: visible ? (hover ? 0.4 : 0.95) : 0 }}
        transition={{ scale: { type: 'spring', stiffness: 500, damping: 30 }, opacity: { duration: 0.25 } }}
        style={{
          position: 'absolute', top: 0, left: 0,
          width: SIZE, height: SIZE, marginLeft: -SIZE / 2, marginTop: -SIZE / 2,
          borderRadius: '50%',
          background: hover ? 'var(--accent)' : 'var(--text)',
          transition: 'background-color 0.2s ease',
        }}
      />
    </motion.div>
  )
}
