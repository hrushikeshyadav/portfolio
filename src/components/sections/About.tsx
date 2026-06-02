import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const PHILOSOPHY = [
  {
    no: '01',
    title: 'Architecture is a feature.',
    body: 'DigiQC has shipped 5,700+ commits over four and a half years without a rewrite — because the module boundaries were drawn right on day one.',
  },
  {
    no: '02',
    title: 'The best UI is invisible.',
    body: 'I build the systems users never think about — debounced autosave, permission layers, tenant isolation — so the product simply does what they expect.',
  },
  {
    no: '03',
    title: 'Build platforms, not pages.',
    body: 'Zinq became reusable enough that a second product mounts into it as a submodule. Good engineering compounds; I optimise for the second product, not just the first.',
  },
]

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" ref={ref} style={{
      padding: 'clamp(7rem, 14vw, 12rem) clamp(1.5rem,5vw,4rem)',
      background: '#0a0a0b',
      position: 'relative',
      borderTop: '1px solid rgba(255,255,255,0.06)',
    }}>
      <div style={{
        position: 'absolute', top: '3rem', right: 'clamp(1.5rem,5vw,4rem)',
        fontFamily: "'DM Mono', monospace", fontSize: '0.62rem',
        color: 'rgba(255,255,255,0.06)', letterSpacing: '0.14em', userSelect: 'none',
      }}>02 / ABOUT</div>

      <div style={{ maxWidth: 1280, margin: '0 auto' }}>

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '2.5rem' }}
        >
          <span style={{ width: 28, height: '1.5px', background: '#ff4500', display: 'inline-block' }} />
          <span style={{
            fontFamily: "'DM Mono', monospace", fontSize: '0.62rem',
            color: '#ff4500', letterSpacing: '0.14em', textTransform: 'uppercase',
          }}>About · Philosophy</span>
        </motion.div>

        {/* Big editorial statement */}
        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800,
            fontSize: 'clamp(2.2rem, 5.5vw, 4.8rem)',
            lineHeight: 1.02, letterSpacing: '-0.045em',
            color: '#f5f5f7', margin: '0 0 1.75rem', maxWidth: 1100,
          }}>
          I build the parts users never notice —{' '}
          <span style={{ color: 'rgba(245,245,247,0.22)', fontWeight: 300 }}>
            because they just work.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontSize: 'clamp(1rem, 1.6vw, 1.2rem)',
            color: 'rgba(245,245,247,0.45)',
            lineHeight: 1.75, maxWidth: 620, letterSpacing: '-0.01em',
            margin: '0 0 clamp(4rem,8vw,7rem)',
          }}>
          Senior engineer at{' '}
          <span style={{ color: '#f5f5f7', fontWeight: 600 }}>Logicwind</span>
          {' '}— a product studio that ships SaaS from zero to launch. I own the
          frontend architecture, the GraphQL API layer, and the AI integration
          stack across multiple live products.
        </motion.p>

        {/* Philosophy — editorial numbered rows */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          {PHILOSOPHY.map((p, i) => (
            <motion.div
              key={p.no}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 + i * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              style={{
                display: 'grid', gridTemplateColumns: '1fr',
                gap: '0.75rem 3rem',
                padding: 'clamp(2rem,4vw,3rem) 0',
                borderBottom: '1px solid rgba(255,255,255,0.1)',
              }}
              className="phil-row"
            >
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '1.25rem' }}>
                <span style={{
                  fontFamily: "'DM Mono', monospace", fontSize: '0.7rem',
                  color: '#ff4500', letterSpacing: '0.06em', flexShrink: 0,
                }}>{p.no}</span>
                <h3 style={{
                  fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700,
                  fontSize: 'clamp(1.5rem,3.5vw,2.6rem)', letterSpacing: '-0.035em',
                  color: '#f5f5f7', lineHeight: 1.05, margin: 0,
                }}>{p.title}</h3>
              </div>
              <p style={{
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontSize: 'clamp(0.95rem,1.4vw,1.1rem)',
                color: 'rgba(245,245,247,0.45)', lineHeight: 1.7,
                letterSpacing: '-0.01em', margin: 0, maxWidth: 520,
              }}>{p.body}</p>
            </motion.div>
          ))}
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
