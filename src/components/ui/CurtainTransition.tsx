import { useEffect, useState, type CSSProperties, type ReactNode } from 'react'
import { motion } from 'framer-motion'

/**
 * Full-screen curtain page-transition. Listens for a `curtain` CustomEvent
 * (dispatched by the tab bar) and plays a cover → hold → reveal sweep so the
 * section can be jumped to underneath, hidden. Each tab fires a different,
 * visually distinct variant: door / shutter / blinds / pixel / stagger / iris.
 */

type Detail = { variant: string; label?: string }

const EASE = [0.76, 0, 0.24, 1] as const
const BG = 'linear-gradient(135deg, var(--bg-2) 0%, var(--surface) 55%, var(--bg) 100%)'

// The ms at which each variant is fully opaque — the tab bar jumps to the new
// section at this moment so the scroll is never seen. Kept in sync with the
// animation timings below.
export const CURTAIN_COVER_MS: Record<string, number> = {
  door: 430, iris: 430, split: 430, rise: 430, shutter: 700, blinds: 700, pixel: 740, stagger: 700,
}
const CLEAR_MS = 1650

const wrap: CSSProperties = {
  position: 'fixed', inset: 0, zIndex: 900, pointerEvents: 'none', overflow: 'hidden',
}
const panel: CSSProperties = {
  position: 'absolute', background: BG, willChange: 'transform, clip-path, opacity',
  boxShadow: 'inset 0 0 120px -40px rgba(var(--accent-rgb),0.5)',
}

// simple, single-element timing (door / iris)
const SOLO = { duration: 1.0, times: [0, 0.42, 0.54, 1], ease: EASE }
// staggered element timing — long hold so the union of all pieces is fully
// opaque across a window even while individual pieces stagger in/out
const PIECE = { duration: 1.1, times: [0, 0.22, 0.8, 1], ease: EASE }

function Label({ text }: { text?: string }) {
  if (!text) return null
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: [0, 1, 1, 0], y: [16, 0, 0, -16] }}
      transition={{ duration: 1.1, times: [0, 0.3, 0.72, 1], ease: EASE }}
      style={{
        position: 'absolute', inset: 0, zIndex: 3,
        display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none',
      }}
    >
      <span style={{
        fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800,
        fontSize: 'clamp(2.5rem, 9vw, 7rem)', letterSpacing: '-0.05em',
        color: 'transparent', WebkitTextStroke: '1.5px rgba(var(--text-rgb),0.5)',
      }}>{text}</span>
    </motion.div>
  )
}

function Curtain({ variant, label }: { variant: string; label?: string }) {
  let body: ReactNode = null

  if (variant === 'door') {
    body = (
      <>
        <motion.div
          initial={{ x: '-101%' }} animate={{ x: ['-101%', '0%', '0%', '-101%'] }} transition={SOLO}
          style={{ ...panel, top: 0, bottom: 0, left: 0, width: '50.6%', borderRight: '1px solid rgba(var(--accent-rgb),0.3)' }}
        />
        <motion.div
          initial={{ x: '101%' }} animate={{ x: ['101%', '0%', '0%', '101%'] }} transition={SOLO}
          style={{ ...panel, top: 0, bottom: 0, right: 0, width: '50.6%', borderLeft: '1px solid rgba(var(--accent-rgb),0.3)' }}
        />
      </>
    )
  } else if (variant === 'iris') {
    const open = 'circle(85% at 50% 50%)'
    const shut = 'circle(0% at 50% 50%)'
    body = (
      <motion.div
        initial={{ clipPath: shut }} animate={{ clipPath: [shut, open, open, shut] }} transition={SOLO}
        style={{ ...panel, inset: 0, WebkitClipPath: shut }}
      />
    )
  } else if (variant === 'split') {
    // top & bottom panels glide in to meet at the centre line, then part again
    body = (
      <>
        <motion.div
          initial={{ y: '-101%' }} animate={{ y: ['-101%', '0%', '0%', '-101%'] }} transition={SOLO}
          style={{ ...panel, left: 0, right: 0, top: 0, height: '50.6%', borderBottom: '1px solid rgba(var(--accent-rgb),0.3)' }}
        />
        <motion.div
          initial={{ y: '101%' }} animate={{ y: ['101%', '0%', '0%', '101%'] }} transition={SOLO}
          style={{ ...panel, left: 0, right: 0, bottom: 0, height: '50.6%', borderTop: '1px solid rgba(var(--accent-rgb),0.3)' }}
        />
      </>
    )
  } else if (variant === 'rise') {
    // a single sheet sweeps up to cover, holds, then keeps rising to reveal
    body = (
      <motion.div
        initial={{ y: '101%' }} animate={{ y: ['101%', '0%', '0%', '-101%'] }} transition={SOLO}
        style={{ ...panel, inset: 0, borderTop: '1px solid rgba(var(--accent-rgb),0.3)' }}
      />
    )
  } else if (variant === 'shutter') {
    // horizontal slats sliding in from alternating sides — interlocking shutter
    const N = 7
    body = (
      <>
        {Array.from({ length: N }).map((_, i) => {
          const from = i % 2 ? '101%' : '-101%'
          return (
            <motion.div
              key={i}
              initial={{ x: from }} animate={{ x: [from, '0%', '0%', from] }}
              transition={{ ...PIECE, delay: i * 0.04 }}
              style={{
                ...panel, left: 0, right: 0,
                top: `${(i * 100) / N}%`, height: `${100 / N + 0.4}%`,
                borderBottom: '1px solid rgba(var(--accent-rgb),0.14)',
              }}
            />
          )
        })}
      </>
    )
  } else if (variant === 'blinds') {
    // vertical slats dropping down (venetian blinds)
    const N = 8
    body = (
      <>
        {Array.from({ length: N }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ scaleY: 0 }} animate={{ scaleY: [0, 1, 1, 0] }}
            transition={{ ...PIECE, delay: i * 0.035 }}
            style={{
              ...panel, top: 0, bottom: 0,
              left: `${(i * 100) / N}%`, width: `${100 / N + 0.3}%`,
              transformOrigin: 'top',
              borderRight: '1px solid rgba(var(--accent-rgb),0.14)',
            }}
          />
        ))}
      </>
    )
  } else {
    // grid mosaic — 'pixel' = random delay, 'stagger' = diagonal wave
    const COLS = 10
    const ROWS = 6
    const tiles: ReactNode[] = []
    let i = 0
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const idx = i++
        const delay = variant === 'pixel'
          ? (((idx * 2654435761) % 1000) / 1000) * 0.3
          : ((r + c) / (ROWS + COLS - 2)) * 0.3
        tiles.push(
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.35 }}
            animate={{ opacity: [0, 1, 1, 0], scale: [0.35, 1, 1, 0.35] }}
            transition={{ ...PIECE, delay }}
            style={{ background: BG, borderRadius: 2 }}
          />
        )
      }
    }
    body = (
      <div style={{
        position: 'absolute', inset: 0, display: 'grid', gap: 2,
        gridTemplateColumns: `repeat(${COLS}, 1fr)`, gridTemplateRows: `repeat(${ROWS}, 1fr)`,
      }}>{tiles}</div>
    )
  }

  return (
    <div style={wrap} aria-hidden>
      {body}
      <Label text={label} />
    </div>
  )
}

export default function CurtainTransition() {
  const [state, setState] = useState<{ id: number; variant: string; label?: string } | null>(null)

  useEffect(() => {
    let n = 0
    const onCurtain = (e: Event) => {
      const d = (e as CustomEvent<Detail>).detail
      n += 1
      const id = n
      setState({ id, variant: d.variant, label: d.label })
      window.setTimeout(() => setState((s) => (s && s.id === id ? null : s)), CLEAR_MS)
    }
    window.addEventListener('curtain', onCurtain as EventListener)
    return () => window.removeEventListener('curtain', onCurtain as EventListener)
  }, [])

  if (!state) return null
  return <Curtain key={state.id} variant={state.variant} label={state.label} />
}
