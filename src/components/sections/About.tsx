import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import TechGraph from '../3d/TechGraph'

const FACTS = [
  { n: '5+', label: 'Years shipping\nproduction code' },
  { n: '10+', label: 'SaaS & AI\nproducts built' },
  { n: '3', label: 'Multi-tenant\nplatforms designed' },
]

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" ref={ref} style={{
      padding: 'clamp(6rem, 12vw, 10rem) 1.5rem',
      background: '#0c0c0c',
      position: 'relative',
    }}>
      <div style={{
        position: 'absolute', top: '3rem', right: '1.5rem',
        fontFamily: "'DM Mono', monospace", fontSize: '0.65rem',
        color: 'rgba(255,255,255,0.06)', letterSpacing: '0.1em', userSelect: 'none',
      }}>02 / ABOUT</div>

      <div style={{ maxWidth: 1280, margin: '0 auto' }}>

        {/* Top row: headline + stats */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr',
          gap: 'clamp(2.5rem, 5vw, 4rem)',
          marginBottom: 'clamp(3rem, 6vw, 5rem)',
        }} className="about-top">

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontWeight: 800,
              fontSize: 'clamp(2.2rem, 5vw, 4rem)',
              lineHeight: 1.05, letterSpacing: '-0.03em',
              color: '#f5f0eb', margin: '0 0 1.5rem',
            }}>
              I build the parts users<br />
              never notice —<br />
              <span style={{ color: 'rgba(245,240,235,0.18)', fontWeight: 300 }}>
                because they just work.
              </span>
            </h2>
            <p style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontSize: 'clamp(0.95rem, 1.5vw, 1.05rem)',
              color: 'rgba(245,240,235,0.4)',
              lineHeight: 1.8, maxWidth: 520, letterSpacing: '-0.01em',
            }}>
              Senior engineer at <span style={{ color: '#f5f0eb', fontWeight: 600 }}>Logicwind</span> — a product studio that builds SaaS from zero to launch. I own the frontend architecture, GraphQL API layer, and the AI integration stack across multiple live products.
            </p>
          </motion.div>

          {/* Stats */}
          <div style={{ display: 'flex', gap: 'clamp(2rem, 4vw, 3.5rem)', flexWrap: 'wrap', alignItems: 'flex-start' }}>
            {FACTS.map((f, i) => (
              <motion.div key={f.n}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.1, duration: 0.6 }}
              >
                <div style={{
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  fontWeight: 800, fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                  color: '#ff4500', lineHeight: 1, letterSpacing: '-0.04em',
                  marginBottom: '0.3rem',
                }}>{f.n}</div>
                <div style={{
                  fontFamily: "'DM Mono', monospace", fontSize: '0.65rem',
                  color: 'rgba(245,240,235,0.28)', lineHeight: 1.5,
                  whiteSpace: 'pre-line', letterSpacing: '0.06em', textTransform: 'uppercase',
                }}>{f.label}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* D3 Tech Graph */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'relative',
            height: 'clamp(360px, 55vw, 520px)',
            border: '1px solid rgba(255,255,255,0.06)',
            background: 'rgba(255,255,255,0.015)',
            overflow: 'hidden',
          }}
        >
          {/* Corner labels */}
          <div style={{
            position: 'absolute', top: '1rem', left: '1.25rem', zIndex: 2,
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <span style={{
              fontFamily: "'DM Mono', monospace", fontSize: '0.62rem',
              color: '#ff4500', letterSpacing: '0.1em', textTransform: 'uppercase',
            }}>tech.graph</span>
            <span style={{
              fontFamily: "'DM Mono', monospace", fontSize: '0.6rem',
              color: 'rgba(255,255,255,0.18)', letterSpacing: '0.06em',
            }}>· D3.js force-directed</span>
          </div>
          <div style={{
            position: 'absolute', bottom: '1rem', right: '1.25rem', zIndex: 2,
            fontFamily: "'DM Mono', monospace", fontSize: '0.58rem',
            color: 'rgba(255,255,255,0.15)', letterSpacing: '0.06em',
          }}>
            hover nodes · drag to explore · scroll to zoom
          </div>

          {/* Legend */}
          <div style={{
            position: 'absolute', bottom: '1rem', left: '1.25rem', zIndex: 2,
            display: 'flex', gap: '0.75rem', flexWrap: 'wrap',
          }}>
            {[
              { c: '#ff4500', l: 'Core' },
              { c: '#00b4d8', l: 'Frontend' },
              { c: '#a855f7', l: 'Data' },
              { c: '#00e96a', l: 'AI' },
              { c: '#f59e0b', l: 'Infra' },
            ].map(({ c, l }) => (
              <span key={l} style={{
                display: 'flex', alignItems: 'center', gap: 5,
                fontFamily: "'DM Mono', monospace", fontSize: '0.58rem',
                color: 'rgba(245,240,235,0.3)', letterSpacing: '0.06em',
              }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: c, display: 'inline-block' }} />
                {l}
              </span>
            ))}
          </div>

          {inView && <TechGraph />}
        </motion.div>
      </div>

      <style>{`
        @media (min-width: 900px) {
          .about-top { grid-template-columns: 1fr 1fr !important; align-items: end; }
        }
      `}</style>
    </section>
  )
}
