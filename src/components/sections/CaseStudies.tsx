import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { caseStudies, type CaseStudy } from '../../data/caseStudies'

function Chapter({ cs }: { cs: CaseStudy }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-12%' })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const numY = useTransform(scrollYProgress, [0, 1], ['22%', '-22%'])

  return (
    <div
      ref={ref}
      style={{
        position: 'relative',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        padding: 'clamp(3.5rem,8vw,6.5rem) 0',
      }}
    >
      {/* Giant parallax index */}
      <motion.div
        style={{
          y: numY,
          position: 'absolute', top: '5%', right: '-1.5rem', zIndex: 0,
          fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800,
          fontSize: 'clamp(9rem,26vw,24rem)', lineHeight: 1,
          color: `${cs.accent}10`, letterSpacing: '-0.05em',
          userSelect: 'none', pointerEvents: 'none',
        }}
      >{cs.index}</motion.div>

      <div style={{
        position: 'relative', zIndex: 1,
        display: 'grid', gridTemplateColumns: '1fr', gap: 'clamp(2rem,5vw,4rem)',
      }} className="cs-grid">

        {/* LEFT — identity + metrics (sticky) */}
        <div className="cs-left">
          <div style={{ position: 'sticky', top: 110 }}>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: '1.1rem' }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: cs.accent, boxShadow: `0 0 12px ${cs.accent}` }} />
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.62rem', color: cs.accent, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                  {cs.category}
                </span>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.62rem', color: 'rgba(245,245,247,0.28)', letterSpacing: '0.06em' }}>
                  · {cs.period}
                </span>
              </div>

              <h3 style={{
                fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800,
                fontSize: 'clamp(2.8rem,7vw,5rem)', letterSpacing: '-0.045em',
                color: '#f5f5f7', lineHeight: 0.92, margin: '0 0 0.5rem',
              }}>{cs.name}</h3>

              <p style={{
                fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 300,
                fontSize: 'clamp(1.05rem,1.8vw,1.5rem)', letterSpacing: '-0.02em',
                color: cs.accent, margin: '0 0 2.25rem',
              }}>{cs.kicker}</p>

              {/* Big metrics */}
              <div style={{ display: 'flex', gap: 'clamp(1.5rem,3vw,2.75rem)', flexWrap: 'wrap' }}>
                {cs.metrics.map((m, i) => (
                  <motion.div
                    key={m.label}
                    initial={{ opacity: 0, y: 14 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.15 + i * 0.08, duration: 0.5 }}
                    style={{ borderLeft: `2px solid ${cs.accent}`, paddingLeft: '0.95rem' }}
                  >
                    <div style={{
                      fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800,
                      fontSize: 'clamp(1.6rem,3.2vw,2.4rem)', color: '#f5f5f7',
                      lineHeight: 1, letterSpacing: '-0.04em', marginBottom: '0.35rem',
                    }}>{m.value}</div>
                    <div style={{
                      fontFamily: "'DM Mono', monospace", fontSize: '0.56rem',
                      color: 'rgba(245,245,247,0.32)', letterSpacing: '0.06em', textTransform: 'uppercase',
                    }}>{m.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* RIGHT — punchy summary + scannable highlights */}
        <div className="cs-right" style={{ maxWidth: 600, display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Summary — one big sentence */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 500,
              fontSize: 'clamp(1.15rem,2vw,1.6rem)', lineHeight: 1.45,
              letterSpacing: '-0.02em', color: 'rgba(245,245,247,0.92)', margin: 0,
            }}
          >{cs.summary}</motion.p>

          {/* Highlight chips */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {cs.highlights.map((h, i) => (
              <motion.span
                key={h}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.25 + i * 0.06, duration: 0.4 }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 7,
                  fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 500,
                  fontSize: '0.85rem', color: 'rgba(245,245,247,0.7)',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.09)',
                  padding: '0.45rem 0.85rem', borderRadius: 100,
                }}
              >
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: cs.accent, flexShrink: 0 }} />
                {h}
              </motion.span>
            ))}
          </div>

          {/* Light detail line */}
          {cs.detail && (
            <p style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontSize: '0.9rem', lineHeight: 1.7, color: 'rgba(245,245,247,0.4)',
              letterSpacing: '-0.01em', margin: 0,
              borderLeft: '2px solid rgba(255,255,255,0.1)', paddingLeft: '1rem',
            }}>{cs.detail}</p>
          )}

          {/* Tech */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
            {cs.tech.map((t) => (
              <span key={t} style={{
                fontFamily: "'DM Mono', monospace", fontSize: '0.58rem',
                color: 'rgba(245,245,247,0.4)', letterSpacing: '0.04em',
                padding: '0.18rem 0.55rem', border: '1px solid rgba(255,255,255,0.07)',
              }}>{t}</span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 900px) {
          .cs-grid { grid-template-columns: 0.9fr 1.1fr !important; }
        }
      `}</style>
    </div>
  )
}

export default function CaseStudies() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="work" ref={ref} style={{
      background: '#0c0c0d',
      padding: 'clamp(6rem,12vw,10rem) clamp(1.5rem,5vw,4rem) clamp(3rem,6vw,5rem)',
      position: 'relative',
      borderTop: '1px solid rgba(255,255,255,0.06)',
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 'clamp(1rem,3vw,2rem)' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1.25rem' }}>
            <span style={{ width: 28, height: '1.5px', background: '#ff4500', display: 'inline-block' }} />
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.62rem', color: '#ff4500', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
              Selected Work
            </span>
          </div>
          <h2 style={{
            fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800,
            fontSize: 'clamp(2.4rem,5.5vw,4.5rem)', letterSpacing: '-0.04em',
            color: '#f5f5f7', lineHeight: 1, margin: 0, maxWidth: 800,
          }}>Three systems. Five years. Zero rewrites.</h2>
        </motion.div>

        {caseStudies.map((cs) => <Chapter key={cs.id} cs={cs} />)}
      </div>
    </section>
  )
}
