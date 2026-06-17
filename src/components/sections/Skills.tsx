import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

/**
 * The stack as a working manifest, not a card grid.
 * `core` = the tools reached for daily (set large + bright).
 * `rest` = also fluent, shipped in production (a dim monospace spec line).
 * Type weight encodes proficiency — that's the whole idea of the section.
 */
const STACK = [
  { label: 'Frontend',     core: ['React', 'Next.js', 'TypeScript'], rest: ['JavaScript (ES6+)', 'Ant Design', 'HTML5', 'CSS3'] },
  { label: 'APIs',         core: ['GraphQL', 'Apollo Client'],       rest: ['REST'] },
  { label: 'Backend',      core: ['Node.js'],                        rest: ['Express.js'] },
  { label: 'Databases',    core: ['PostgreSQL', 'MongoDB'],          rest: ['MySQL', 'Firestore'] },
  { label: 'Integrations', core: ['Firebase'],                       rest: ['MSG91', 'OneSignal', 'HubSpot', 'Amplitude', 'Git / GitLab / Bitbucket APIs'] },
  { label: 'Platforms',    core: ['Git', 'Vercel'],                  rest: ['Firebase Hosting'] },
]

function Row({ row, i, inView }: { row: (typeof STACK)[0]; i: number; inView: boolean }) {
  const [hover, setHover] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: i * 0.08, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: 'relative',
        borderTop: '1px solid rgba(255,255,255,0.09)',
        padding: 'clamp(1.6rem,3.2vw,2.5rem) 0',
        overflow: 'hidden',
      }}
    >
      {/* hover wash — the same left-to-right tint the Work index uses */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'linear-gradient(90deg, rgba(255,69,0,0.05), transparent 55%)',
        opacity: hover ? 1 : 0, transition: 'opacity 0.4s ease',
      }} />

      <div
        className="stack-row"
        style={{
          position: 'relative',
          display: 'grid', gridTemplateColumns: '1fr', gap: '0.9rem 3rem',
          alignItems: 'baseline',
          transform: hover ? 'translateX(8px)' : 'translateX(0)',
          transition: 'transform 0.45s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        {/* discipline */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
          <span style={{
            fontFamily: "'DM Mono', monospace", fontSize: '0.7rem',
            color: hover ? '#ff4500' : 'rgba(245,245,247,0.28)',
            letterSpacing: '0.04em', transition: 'color 0.3s', flexShrink: 0,
          }}>{String(i + 1).padStart(2, '0')}</span>
          <h3 style={{
            fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800,
            fontSize: 'clamp(1.5rem,3.5vw,2.4rem)', letterSpacing: '-0.04em',
            color: hover ? '#ff4500' : '#f5f5f7', lineHeight: 1, margin: 0,
            transition: 'color 0.3s',
          }}>{row.label}</h3>
        </div>

        {/* tools — core large + bright, supporting a dim mono spec line */}
        <div>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', columnGap: 'clamp(1rem,2.2vw,1.75rem)', rowGap: '0.4rem' }}>
            {row.core.map((t) => (
              <span key={t} style={{
                fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 600,
                fontSize: 'clamp(1.1rem,2vw,1.5rem)', letterSpacing: '-0.025em',
                color: 'rgba(245,245,247,0.95)', lineHeight: 1.15,
              }}>{t}</span>
            ))}
          </div>
          {row.rest.length > 0 && (
            <div style={{ marginTop: '0.85rem', display: 'flex', flexWrap: 'wrap', alignItems: 'baseline' }}>
              {row.rest.map((t, ti) => (
                <span key={t} style={{
                  fontFamily: "'DM Mono', monospace", fontSize: '0.72rem',
                  color: 'rgba(245,245,247,0.42)', letterSpacing: '0.02em', lineHeight: 1.5,
                }}>
                  {ti > 0 && <span style={{ color: 'rgba(255,69,0,0.4)', margin: '0 0.6rem' }}>·</span>}
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
      background: '#0c0c0d',
      position: 'relative', overflow: 'hidden',
      borderTop: '1px solid rgba(255,255,255,0.06)',
    }}>
      <div style={{
        position: 'absolute', top: '3rem', right: '1.5rem',
        fontFamily: "'DM Mono', monospace", fontSize: '0.62rem',
        color: 'rgba(255,255,255,0.05)', letterSpacing: '0.14em', userSelect: 'none',
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
            <span style={{ width: 28, height: '1.5px', background: '#ff4500', display: 'inline-block' }} />
            <span style={{
              fontFamily: "'DM Mono', monospace", fontSize: '0.62rem',
              color: '#ff4500', letterSpacing: '0.14em', textTransform: 'uppercase',
            }}>Tech Stack</span>
          </div>
          <h2 style={{
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontWeight: 800, fontSize: 'clamp(2.4rem, 5.5vw, 4.5rem)',
            letterSpacing: '-0.04em', color: '#f5f5f7', lineHeight: 1, margin: 0,
          }}>The working set.</h2>
          <p style={{
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)',
            color: 'rgba(245,245,247,0.4)', marginTop: '1.25rem',
            maxWidth: 560, lineHeight: 1.7, letterSpacing: '-0.01em',
          }}>
            Sized by use, not by logo count. The bold names are what I reach for
            daily — the line beneath each is fluent and shipped to production.
          </p>
        </motion.div>

        {/* Ledger */}
        <div style={{ borderBottom: '1px solid rgba(255,255,255,0.09)' }}>
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
