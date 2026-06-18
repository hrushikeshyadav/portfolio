import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import AnimatedHeading from '../ui/AnimatedHeading'

/**
 * The stack as a quiet editorial ledger — one line per discipline. `core` tools
 * are set large and bright (what I reach for daily); the supporting set is a dim
 * monospace spec line; a short note gives the "why". Monochrome on purpose —
 * type weight encodes proficiency, not colour.
 */
const STACK = [
  {
    label: 'Frontend', note: 'Component architecture, state, performance.',
    core: ['React', 'Next.js', 'TypeScript'], rest: ['JavaScript (ES6+)', 'Ant Design', 'HTML5', 'CSS3'],
  },
  {
    label: 'APIs', note: 'Typed graphs, normalized caching, codegen.',
    core: ['GraphQL', 'Apollo Client'], rest: ['REST', 'GraphQL Codegen'],
  },
  {
    label: 'Backend', note: 'Node services, resolvers, scraping pipelines.',
    core: ['Node.js'], rest: ['Express.js', 'Puppeteer'],
  },
  {
    label: 'Databases', note: 'Relational + document modelling, multi-tenant.',
    core: ['PostgreSQL', 'MongoDB'], rest: ['MySQL', 'Firestore'],
  },
  {
    label: 'Integrations', note: 'Auth, analytics, notifications, platform APIs.',
    core: ['Firebase'], rest: ['MSG91', 'OneSignal', 'HubSpot', 'Amplitude', 'Git / GitLab / Bitbucket APIs'],
  },
  {
    label: 'Platforms', note: 'Ship, version and host across CI and the edge.',
    core: ['Git', 'Vercel'], rest: ['Firebase Hosting', 'GitLab CI'],
  },
]

function Row({ row, i, inView }: { row: (typeof STACK)[0]; i: number; inView: boolean }) {
  const [hover, setHover] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: i * 0.07, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: 'relative',
        borderTop: '1px solid rgba(var(--border-rgb),0.09)',
        padding: 'clamp(1.7rem,3.2vw,2.6rem) 0',
        overflow: 'hidden',
      }}
    >
      {/* hover wash — a single restrained accent tint, left to right */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'linear-gradient(90deg, rgba(var(--accent-rgb),0.05), transparent 55%)',
        opacity: hover ? 1 : 0, transition: 'opacity 0.4s ease',
      }} />

      <div
        className="stack-row"
        style={{
          position: 'relative',
          display: 'grid', gridTemplateColumns: '1fr', gap: '0.9rem 3rem',
          alignItems: 'baseline',
          transform: hover ? 'translateX(10px)' : 'translateX(0)',
          transition: 'transform 0.45s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        {/* discipline */}
        <div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
            <span style={{
              fontFamily: "'DM Mono', monospace", fontSize: '0.72rem',
              color: hover ? 'var(--accent)' : 'rgba(var(--text-rgb),0.28)',
              letterSpacing: '0.04em', transition: 'color 0.3s', flexShrink: 0,
            }}>{String(i + 1).padStart(2, '0')}</span>
            <h3 style={{
              fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800,
              fontSize: 'clamp(1.6rem,3.5vw,2.5rem)', letterSpacing: '-0.04em',
              color: hover ? 'var(--accent)' : 'var(--text)', lineHeight: 1, margin: 0,
              transition: 'color 0.3s',
            }}>{row.label}</h3>
          </div>
          <p style={{
            fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: '0.82rem',
            color: 'rgba(var(--text-rgb),0.38)', lineHeight: 1.5, letterSpacing: '-0.01em',
            margin: '0.7rem 0 0 calc(0.72rem + 14px)', maxWidth: 320,
          }}>{row.note}</p>
        </div>

        {/* tools — core large + bright, supporting a dim mono spec line */}
        <div>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', columnGap: 'clamp(1rem,2.2vw,1.75rem)', rowGap: '0.4rem' }}>
            {row.core.map((t) => (
              <span key={t} style={{
                fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 600,
                fontSize: 'clamp(1.15rem,2vw,1.55rem)', letterSpacing: '-0.025em',
                color: 'rgba(var(--text-rgb),0.95)', lineHeight: 1.15,
              }}>{t}</span>
            ))}
          </div>
          {row.rest.length > 0 && (
            <div style={{ marginTop: '0.95rem', display: 'flex', flexWrap: 'wrap', alignItems: 'baseline' }}>
              {row.rest.map((t, ti) => (
                <span key={t} style={{
                  fontFamily: "'DM Mono', monospace", fontSize: '0.72rem',
                  color: 'rgba(var(--text-rgb),0.42)', letterSpacing: '0.02em', lineHeight: 1.5,
                }}>
                  {ti > 0 && <span style={{ color: 'rgba(var(--text-rgb),0.18)', margin: '0 0.6rem' }}>/</span>}
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default function Skills() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="stack" ref={ref} style={{
      padding: 'clamp(7rem, 14vw, 12rem) clamp(1.5rem,5vw,4rem)',
      background: 'rgba(var(--bg-rgb), 0.66)',
      position: 'relative', overflow: 'hidden',
      borderTop: '1px solid rgba(var(--border-rgb),0.06)',
    }}>
      <div style={{
        position: 'absolute', top: '3rem', right: '1.5rem',
        fontFamily: "'DM Mono', monospace", fontSize: '0.62rem',
        color: 'rgba(var(--border-rgb),0.05)', letterSpacing: '0.14em', userSelect: 'none',
      }}>03 / STACK</div>

      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 'clamp(2.5rem, 5vw, 3.5rem)', maxWidth: 760 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1.25rem' }}>
            <span style={{ width: 28, height: '1.5px', background: 'var(--accent)', display: 'inline-block' }} />
            <span style={{
              fontFamily: "'DM Mono', monospace", fontSize: '0.62rem',
              color: 'var(--accent)', letterSpacing: '0.14em', textTransform: 'uppercase',
            }}>Tech Stack</span>
          </div>
          <AnimatedHeading
            text="The working set."
            style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontWeight: 800, fontSize: 'clamp(2.4rem, 5.5vw, 4.5rem)',
              letterSpacing: '-0.04em', color: 'var(--text)', lineHeight: 1, margin: 0,
            }}
          />
          <p style={{
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)',
            color: 'rgba(var(--text-rgb),0.4)', marginTop: '1.25rem',
            maxWidth: 560, lineHeight: 1.7, letterSpacing: '-0.01em',
          }}>
            Sized by use, not by logo count. The bold names are what I reach for
            daily — the line beneath each is fluent and shipped to production.
          </p>
        </motion.div>

        {/* Ledger */}
        <div style={{ borderBottom: '1px solid rgba(var(--border-rgb),0.09)' }}>
          {STACK.map((row, i) => (
            <Row key={row.label} row={row} i={i} inView={inView} />
          ))}
        </div>
      </div>

      <style>{`
        @media (min-width: 820px) {
          .stack-row { grid-template-columns: 0.62fr 1.38fr !important; }
        }
      `}</style>
    </section>
  )
}
