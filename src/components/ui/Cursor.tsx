import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Don't run on touch devices
    if (window.matchMedia('(hover: none)').matches) return

    let mx = -200, my = -200
    let rx = -200, ry = -200
    let raf: number
    let visible = false

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    const tick = () => {
      rx = lerp(rx, mx, 0.12)
      ry = lerp(ry, my, 0.12)

      const dot = dotRef.current
      const ring = ringRef.current
      if (dot) dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`
      if (ring) ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`

      raf = requestAnimationFrame(tick)
    }

    const show = () => {
      if (!visible) {
        visible = true
        dotRef.current?.classList.add('cur-visible')
        ringRef.current?.classList.add('cur-visible')
      }
    }

    const hide = () => {
      visible = false
      dotRef.current?.classList.remove('cur-visible')
      ringRef.current?.classList.remove('cur-visible')
    }

    const onMove = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY
      show()

      const target = e.target as HTMLElement
      const interactive = !!target.closest('a') || !!target.closest('button')
      if (interactive) {
        dotRef.current?.classList.add('cur-hover')
        ringRef.current?.classList.add('cur-hover')
      } else {
        dotRef.current?.classList.remove('cur-hover')
        ringRef.current?.classList.remove('cur-hover')
      }
    }

    const onDown = () => {
      dotRef.current?.classList.add('cur-click')
      ringRef.current?.classList.add('cur-click')
    }

    const onUp = () => {
      dotRef.current?.classList.remove('cur-click')
      ringRef.current?.classList.remove('cur-click')
    }

    raf = requestAnimationFrame(tick)
    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    document.documentElement.addEventListener('mouseleave', hide)
    document.documentElement.addEventListener('mouseenter', show)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      document.documentElement.removeEventListener('mouseleave', hide)
      document.documentElement.removeEventListener('mouseenter', show)
    }
  }, [])

  return (
    <>
      <style>{`
        .cur-dot, .cur-ring {
          position: fixed;
          top: 0; left: 0;
          pointer-events: none;
          z-index: 99999;
          opacity: 0;
          will-change: transform;
          transition: opacity 0.3s ease;
        }
        .cur-dot {
          width: 6px; height: 6px;
          background: var(--text);
          border-radius: 50%;
          z-index: 99999;
          transition: opacity 0.3s ease, width 0.2s ease, height 0.2s ease, background 0.2s ease;
        }
        .cur-ring {
          width: 36px; height: 36px;
          border: 1.5px solid rgba(var(--text-rgb), 0.35);
          border-radius: 50%;
          z-index: 99998;
          transition:
            opacity 0.3s ease,
            width 0.35s cubic-bezier(0.22,1,0.36,1),
            height 0.35s cubic-bezier(0.22,1,0.36,1),
            border-color 0.25s ease,
            background 0.25s ease,
            border-radius 0.3s ease;
        }
        .cur-dot.cur-visible, .cur-ring.cur-visible { opacity: 1; }

        /* Hover state */
        .cur-dot.cur-hover {
          width: 8px; height: 8px;
          background: var(--accent);
        }
        .cur-ring.cur-hover {
          width: 52px; height: 52px;
          border-color: rgba(var(--accent-rgb), 0.6);
          background: rgba(var(--accent-rgb), 0.08);
        }

        /* Click state */
        .cur-dot.cur-click {
          width: 5px; height: 5px;
          background: var(--accent);
        }
        .cur-ring.cur-click {
          width: 26px; height: 26px;
          border-color: rgba(var(--accent-rgb), 0.9);
          background: rgba(var(--accent-rgb), 0.15);
        }
      `}</style>

      <div ref={dotRef} className="cur-dot" />
      <div ref={ringRef} className="cur-ring" />
    </>
  )
}
