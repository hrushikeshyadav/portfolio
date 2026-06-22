import { useRef } from 'react'
import {
  motion, useInView, useScroll, useTransform, useReducedMotion,
  type MotionValue, type Variants,
} from 'framer-motion'

const PHILOSOPHY = [
  {
    no: '00',
    title: 'Architecture is a feature.',
    body: 'DigiQC has shipped 5,700+ commits over four and a half years without a rewrite — because the module boundaries were drawn right on day one.',
  },
  {
    no: '01',
    title: 'The best UI is invisible.',
    body: 'I build the systems users never think about — debounced autosave, permission layers, tenant isolation — so the product simply does what they expect.',
  },
  {
    no: '02',
    title: 'Build platforms, not pages.',
    body: 'I built the Eugenix admin to mount into the Zinq platform as a Git submodule — its own repo and CI, sharing one design system. Good engineering compounds; I optimise for the second product, not just the first.',
  },
]

const EASE = [0.16, 1, 0.3, 1] as const

// The headline statement, revealed word-by-word as it scrolls up the viewport.
const STATEMENT: { t: string; dim?: boolean }[] = [
  { t: 'I' }, { t: 'build' }, { t: 'the' }, { t: 'parts' }, { t: 'users' },
  { t: 'never' }, { t: 'notice' }, { t: '—' },
  { t: 'because', dim: true }, { t: 'they', dim: true }, { t: 'just', dim: true }, { t: 'work.', dim: true },
]

function Word({ word, range, progress, reduce }: {
  word: { t: string; dim?: boolean }
  range: [number, number]
  progress: MotionValue<number>
  reduce: boolean | null
}) {
  const o = useTransform(progress, range, [0.16, 1])
  const opacity = reduce ? 1 : o
  return (
    <motion.span style={{ opacity, color: word.dim ? 'rgba(var(--text-rgb),0.32)' : 'var(--text)', fontWeight: word.dim ? 300 : 800 }}>
      {word.t}{' '}
    </motion.span>
  )
}

function Statement() {
  const ref = useRef<HTMLHeadingElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'start 0.3'] })
  const n = STATEMENT.length
  const span = 0.62 / n // each word lights over an overlapping slice

  return (
    <h2
      ref={ref}
      style={{
        fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800,
        fontSize: 'clamp(2.2rem, 5.5vw, 4.8rem)', lineHeight: 1.04, letterSpacing: '-0.045em',
        margin: '0 0 1.75rem', maxWidth: 1100,
      }}
    >
      {STATEMENT.map((w, i) => (
        <Word
          key={i}
          word={w}
          progress={scrollYProgress}
          reduce={reduce}
          range={[i * span, i * span + span * 2.2]}
        />
      ))}
    </h2>
  )
}

const rowV: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
}
const itemV: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
}

function Principle({ p }: { p: (typeof PHILOSOPHY)[number] }) {
  const ref = useRef(null)
  const seen = useInView(ref, { once: true, margin: '-20% 0px -20% 0px' })
  return (
    <motion.div
      ref={ref}
      variants={rowV}
      initial="hidden"
      animate={seen ? 'show' : 'hidden'}
      className="phil-row"
      style={{
        position: 'relative',
        display: 'grid', gridTemplateColumns: '1fr', gap: '0.75rem 3rem',
        padding: 'clamp(2rem,4vw,3rem) 0 clamp(2rem,4vw,3rem) clamp(1rem,2vw,1.5rem)',
        borderBottom: '1px solid rgba(var(--border-rgb),0.1)',
      }}
    >
      {/* accent marker — grows on reveal */}
      <motion.span
        initial={{ scaleY: 0 }}
        animate={seen ? { scaleY: 1 } : { scaleY: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
        style={{ position: 'absolute', left: 0, top: 'clamp(2rem,4vw,3rem)', bottom: 'clamp(2rem,4vw,3rem)', width: 2, borderRadius: 2, background: 'var(--accent)', transformOrigin: 'top' }}
      />
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '1.25rem' }}>
        <motion.span variants={itemV} style={{
          fontFamily: "'DM Mono', monospace", fontSize: '0.7rem',
          color: 'var(--accent)', letterSpacing: '0.06em', flexShrink: 0,
        }}>{p.no}</motion.span>
        <motion.h3 variants={itemV} style={{
          fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700,
          fontSize: 'clamp(1.5rem,3.5vw,2.6rem)', letterSpacing: '-0.035em',
          color: 'var(--text)', lineHeight: 1.05, margin: 0,
        }}>{p.title}</motion.h3>
      </div>
      <motion.p variants={itemV} style={{
        fontFamily: "'Bricolage Grotesque', sans-serif",
        fontSize: 'clamp(0.95rem,1.4vw,1.1rem)',
        color: 'rgba(var(--text-rgb),0.45)', lineHeight: 1.7,
        letterSpacing: '-0.01em', margin: 0, maxWidth: 520,
      }}>{p.body}</motion.p>
    </motion.div>
  )
}

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" ref={ref} style={{
      padding: 'clamp(7rem, 14vw, 12rem) clamp(1.5rem,5vw,4rem)',
      background: 'rgba(var(--bg-rgb), 0.72)',
      position: 'relative',
      borderTop: '1px solid rgba(var(--border-rgb),0.06)',
    }}>
      <div style={{
        position: 'absolute', top: '3rem', right: 'clamp(1.5rem,5vw,4rem)',
        fontFamily: "'DM Mono', monospace", fontSize: '0.62rem',
        color: 'rgba(var(--border-rgb),0.06)', letterSpacing: '0.14em', userSelect: 'none',
      }}>00 / ABOUT</div>

      <div style={{ maxWidth: 1280, margin: '0 auto' }}>

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '2.5rem' }}
        >
          <span style={{ width: 28, height: '1.5px', background: 'var(--accent)', display: 'inline-block' }} />
          <span style={{
            fontFamily: "'DM Mono', monospace", fontSize: '0.62rem',
            color: 'var(--accent)', letterSpacing: '0.14em', textTransform: 'uppercase',
          }}>About · Philosophy</span>
        </motion.div>

        {/* Big editorial statement — scroll-revealed word by word */}
        <Statement />

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontSize: 'clamp(1rem, 1.6vw, 1.2rem)',
            color: 'rgba(var(--text-rgb),0.45)',
            lineHeight: 1.75, maxWidth: 620, letterSpacing: '-0.01em',
            margin: '0 0 clamp(4rem,8vw,7rem)',
          }}>
          Senior engineer at{' '}
          <span style={{ color: 'var(--text)', fontWeight: 600 }}>Logicwind</span>
          {' '}— a product studio that ships SaaS from zero to launch. I own the
          frontend architecture, the GraphQL API layer, and the AI integration
          stack across multiple live products.
        </motion.p>

        {/* Philosophy — editorial numbered rows, each revealed in view */}
        <div style={{ borderTop: '1px solid rgba(var(--border-rgb),0.1)' }}>
          {PHILOSOPHY.map((p) => <Principle key={p.no} p={p} />)}
        </div>
      </div>

      <style>{`
        @media (min-width: 900px) {
          .phil-row { grid-template-columns: 1.1fr 0.9fr !important; align-items: baseline; }
        }
      `}</style>
    </section>
  )
}
