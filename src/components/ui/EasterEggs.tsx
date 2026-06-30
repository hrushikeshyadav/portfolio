import { useEffect } from 'react'

/**
 * Tiny playful micro-interactions, all dependency-free:
 *  • Tab-away → swaps the document title to a "come back" nudge, restores it
 *    when you return.
 *  • Konami code (↑↑↓↓←→←→ b a) → a short, self-cleaning confetti burst.
 * Confetti respects prefers-reduced-motion.
 */

const KONAMI = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a',
]

const CONFETTI_COLORS = ['#5a8cff', '#ff8fb4', '#9678ff', '#34d399', '#ffd166']

function showToast(text: string) {
  const el = document.createElement('div')
  el.className = 'egg-toast'
  el.textContent = text
  document.body.appendChild(el)
  window.setTimeout(() => el.remove(), 3200)
}

function triggerKonami() {
  showToast('🎉 Konami unlocked!')
  burstConfetti()
}

function burstConfetti() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const layer = document.createElement('div')
  layer.className = 'confetti-layer'
  for (let i = 0; i < 80; i++) {
    const bit = document.createElement('span')
    const left = Math.round((i / 80) * 100)
    const delay = (i % 10) * 30
    const drift = (i % 7) - 3
    bit.className = 'confetti-bit'
    bit.style.left = `${left}%`
    bit.style.background = CONFETTI_COLORS[i % CONFETTI_COLORS.length]
    bit.style.animationDelay = `${delay}ms`
    bit.style.setProperty('--drift', `${drift * 24}px`)
    bit.style.setProperty('--spin', `${drift * 220}deg`)
    layer.appendChild(bit)
  }
  document.body.appendChild(layer)
  window.setTimeout(() => layer.remove(), 2600)
}

export default function EasterEggs() {
  // ── tab-away title swap ──────────────────────────────────────────────────
  useEffect(() => {
    let original = document.title
    const onVisibility = () => {
      if (document.hidden) {
        original = document.title
        document.title = '👋 Come back!'
      } else {
        document.title = original
      }
    }
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [])

  // ── Konami code ──────────────────────────────────────────────────────────
  useEffect(() => {
    let idx = 0
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA') return
      const want = KONAMI[idx]
      if (e.key.toLowerCase() === want.toLowerCase()) {
        idx++
        if (idx === KONAMI.length) {
          idx = 0
          triggerKonami()
        }
      } else {
        idx = e.key === KONAMI[0] ? 1 : 0
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return null
}
