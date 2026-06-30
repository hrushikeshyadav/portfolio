import { useEffect, useRef, useState } from 'react'

/**
 * "Hacking-movie" decode effect. Each glyph flickers through binary/hex noise
 * (0101…AF) and then locks to its real letter, resolving left-to-right. While a
 * glyph is still scrambling it renders in the accent colour as a solid digit;
 * once locked it inherits the parent's real type styling (so an outlined/stroked
 * heading still resolves into outlined letters).
 */

const GLYPHS = '01001011010110100011XYZ#%&<>/01'.split('')
const HEX = '0123456789ABCDEF'.split('')

function randGlyph(i: number, tick: number) {
  // deterministic-ish noise that still churns — favour 0/1 for the binary feel
  const pool = (i + tick) % 3 === 0 ? HEX : GLYPHS
  return pool[(i * 7 + tick * 13 + ((i * tick) % 5)) % pool.length]
}

export default function ScrambleText({
  text,
  start = true,
  delay = 0,
  speed = 1,
}: {
  text: string
  start?: boolean
  /** ms before the decode begins */
  delay?: number
  /** glyphs locked per ~16ms frame multiplier (lower = slower reveal) */
  speed?: number
}) {
  const [resolved, setResolved] = useState(0) // how many leading chars are locked
  const [tick, setTick] = useState(0) // drives the scramble churn
  const raf = useRef(0)

  useEffect(() => {
    if (!start) return
    let frame = 0
    let running = true
    let startedAt = -1

    const loop = (t: number) => {
      if (!running) return
      if (startedAt < 0) startedAt = t
      if (t - startedAt < delay) {
        raf.current = requestAnimationFrame(loop)
        return
      }
      frame++
      setTick(frame)
      // reveal one more glyph roughly every 3 frames, scaled by speed
      const locked = Math.floor((frame * speed) / 3)
      setResolved(Math.min(locked, text.length))
      if (locked < text.length) raf.current = requestAnimationFrame(loop)
    }
    raf.current = requestAnimationFrame(loop)
    return () => {
      running = false
      cancelAnimationFrame(raf.current)
    }
  }, [start, text, delay, speed])

  return (
    <>
      {text.split('').map((ch, i) => {
        if (ch === ' ') return <span key={i}>&nbsp;</span>
        const locked = i < resolved || !start
        if (locked) return <span key={i}>{ch}</span>
        return (
          <span
            key={i}
            aria-hidden
            style={{
              color: 'var(--accent)',
              WebkitTextStroke: '0',
              textShadow: '0 0 18px rgba(var(--accent-rgb),0.55)',
            }}
          >
            {randGlyph(i, tick)}
          </span>
        )
      })}
    </>
  )
}
