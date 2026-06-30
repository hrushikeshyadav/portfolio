import { useEffect } from 'react'
import Lenis from 'lenis'

/**
 * Lenis inertial smooth-scroll. The single biggest "premium feel" upgrade.
 * Respects prefers-reduced-motion (skips entirely) and exposes the instance
 * on window so the Navbar can drive anchor jumps through it.
 */
export default function SmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    })

    ;(window as unknown as { lenis?: Lenis }).lenis = lenis

    let raf = 0
    const loop = (time: number) => {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
      delete (window as unknown as { lenis?: Lenis }).lenis
    }
  }, [])

  return null
}
