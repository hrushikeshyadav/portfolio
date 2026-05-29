import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import TechGraph from '../3d/TechGraph'

const FACTS = [
  { n: '5+', label: 'Years\nproduction code' },
  { n: '10+', label: 'SaaS & AI\nproducts built' },
  { n: '3', label: 'Multi-tenant\nplatforms' },
]

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" ref={ref} style={{
      padding: 'clamp(7rem, 14vw, 12rem) 1.5rem',
      background: '#000',
      position: 'relative',
    }}>
      <div style={{
        position: 'absolute', top: '3rem', right: '1.5rem',
        fontFamily: "'DM Mono', monospace", fontSize: '0.62rem',
        color: 'rgba(255,255,255,0.05)', letterSpacing: '0.14em', userSelect: 'none',
      }}>02 / ABOUT</div>

      <div style={{ maxWidth: 1280, margin: '0 auto' }}>

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '2rem' }}
        >
          <span style={{ width: 28, height: '1.5px', background: '#ff4500', display: 'inline-block' }} />
          <span style={{
            fontFamily: "'DM Mono', monospace", fontSize: '0.65rem',
            color: '#ff4500', letterSpacing: '0.14em', textTransform: 'uppercase',
          }}>About</span>
        </motion.div>

        {/* Main grid */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr',
          gap: 'clamp(3rem, 6vw, 5rem)',
          marginBottom: 'clamp(3rem, 6vw, 5rem)',
        }} className="about-grid">

          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontWeight: 800,
              fontSize: 'clamp(2.2rem, 5vw, 4.2rem)',
              lineHeight: 1.04, letterSpacing: '-0.04em',
              color: '#f5f5f7', margin: '0 0 1.75rem',
            }}>
              I build the parts users<br />
              never notice —<br />
              <span style={{ color: 'rgba(245,245,247,0.16)', fontWeight: 300 }}>
                because they just work.
              </span>
            </h2>
            <p style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontSize: 'clamp(0.95rem, 1.5vw, 1.06rem)',
              color: 'rgba(245,245,247,0.42)',
              lineHeight: 1.82, maxWidth: 520, letterSpacing: '-0.01em', margin: 0,
            }}>
              Senior engineer at{' '}
              <span style={{ color: '#f5f5f7', fontWeight: 600 }}>Logicwind</span>
              {' '}— a product studio that ships SaaS from zero to launch.
              I own the frontend architecture, GraphQL API layer, and the AI
              integration stack across multiple live products.
            </p>
          </motion.div>

          {/* Stats */}
          <div style={{ display: 'flex', gap: 'clamp(2rem, 5vw, 4rem)', flexWrap: 'wrap', alignItems: 'flex-start' }}>
            {FACTS.map((f, i) => (
              <motion.div key={f.n}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.1, duration: 0.6 }}
                style={{ borderLeft: '2px solid rgba(255,69,0,0.3)', paddingLeft: '1.25rem' }}
              >
                <div style={{
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  fontWeight: 800, fontSize: 'clamp(2.4rem, 5vw, 3.5rem)',
                  color: '#ff4500', lineHeight: 1, letterSpacing: '-0.04em',
                  marginBottom: '0.35rem',
                }}>{f.n}</div>
                <div style={{
                  fontFamily: "'DM Mono', monospace", fontSize: '0.6rem',
                  color: 'rgba(245,245,247,0.26)', lineHeight: 1.5,
                  whiteSpace: 'pre-line', letterSpacing: '0.07em', textTransform: 'uppercase',
                }}>{f.label}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Tech Graph */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'relative',
            height: 'clamp(340px, 52vw, 500px)',
            border: '1px solid rgba(255,255,255,0.05)',
            background: 'rgba(255,255,255,0.012)',
            overflow: 'hidden',
          }}
        >
          <div style={{
            position: 'absolute', top: '1rem', left: '1.25rem', zIndex: 2,
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <span style={{
              fontFamily: "'DM Mono', monospace", fontSize: '0.6rem',
              color: '#ff4500', letterSpacing: '0.1em', textTransform: 'uppercase',
            }}>tech.graph</span>
            <span style={{
              fontFamily: "'DM Mono', monospace", fontSize: '0.58rem',
              color: 'rgba(255,255,255,0.15)', letterSpacing: '0.06em',
            }}>· D3.js force-directed</span>
          </div>
          <div style={{
            position: 'absolute', bottom: '1rem', right: '1.25rem', zIndex: 2,
            fontFamily: "'DM Mono', monospace", fontSize: '0.56rem',
            color: 'rgba(255,255,255,0.12)', letterSpacing: '0.06em',
          }}>drag · hover · scroll to zoom</div>
          <div style={{
            position: 'absolute', bottom: '1rem', left: '1.25rem', zIndex: 2,
            display: 'flex', gap: '0.7rem', flexWrap: 'wrap',
          }}>
            {[
              { c: '#ff4500', l: 'Core' }, { c: '#00b4d8', l: 'Frontend' },
              { c: '#a855f7', l: 'Data' }, { c: '#00e96a', l: 'AI' }, { c: '#f59e0b', l: 'Infra' },
            ].map(({ c, l }) => (
              <span key={l} style={{ display: 'flex', alignItems: 'center', gap: 5,
                fontFamily: "'DM Mono', monospace", fontSize: '0.56rem',
                color: 'rgba(245,245,247,0.28)', letterSpacing: '0.06em',
              }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: c, display: 'inline-block' }} />
                {l}
              </span>
            ))}
          </div>
          {inView && <TechGraph />}
        </motion.div>
      </div>

      <style>{`
        @media (min-width: 900px) {
          .about-grid { grid-template-columns: 1.1fr 0.9fr !important; align-items: end; }
        }
      `}</style>
    </section>
  )
}
