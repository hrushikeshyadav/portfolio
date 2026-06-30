import { useEffect } from 'react'

/**
 * Cursor spotlight — one delegated pointermove listener for the whole page.
 * Any element tagged `data-spotlight` gets `--spot-x` / `--spot-y` set to the
 * pointer's position within it; the glow itself is drawn by a CSS `::before`
 * (see index.css). No per-card listeners, no state, hover-devices only.
 */
export default function Spotlight() {
  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return

    let raf = 0
    let pending: { el: HTMLElement; x: number; y: number } | null = null

    const flush = () => {
      raf = 0
      if (!pending) return
      pending.el.style.setProperty('--spot-x', `${pending.x}%`)
      pending.el.style.setProperty('--spot-y', `${pending.y}%`)
    }

    const onMove = (e: PointerEvent) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>('[data-spotlight]')
      if (!el) return
      const r = el.getBoundingClientRect()
      pending = {
        el,
        x: ((e.clientX - r.left) / r.width) * 100,
        y: ((e.clientY - r.top) / r.height) * 100,
      }
      if (!raf) raf = requestAnimationFrame(flush)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return null
}
