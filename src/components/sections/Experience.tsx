import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { experience, education } from '../../data/resume'

export default function Experience() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="experience" ref={ref} style={{
      background: 'rgba(var(--bg-rgb), 0.66)',
      padding: 'clamp(7rem,14vw,12rem) clamp(1.5rem,5vw,4rem)',
      position: 'relative',
      borderTop: '1px solid rgba(var(--border-rgb),0.06)',
    }}>
      <div style={{
        position: 'absolute', top: '3rem', right: 'clamp(1.5rem,5vw,4rem)',
        fontFamily: "'DM Mono', monospace", fontSize: '0.62rem',
        color: 'rgba(var(--border-rgb),0.06)', letterSpacing: '0.14em', userSelect: 'none',
      }}>05 / CAREER</div>

      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 'clamp(3rem,6vw,5rem)' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1.25rem' }}>
            <span style={{ width: 28, height: '1.5px', background: 'var(--accent)', display: 'inline-block' }} />
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.62rem', color: 'var(--accent)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
              Career
            </span>
          </div>
          <h2 style={{
            fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800,
            fontSize: 'clamp(2.4rem,5.5vw,4.5rem)', letterSpacing: '-0.04em',
            color: 'var(--text)', lineHeight: 1, margin: 0,
          }}>Experience &amp; Education</h2>
        </motion.div>

        {/* Timeline */}
        <div style={{ position: 'relative' }}>
          {/* vertical rule */}
          <div style={{
            position: 'absolute', left: 0, top: 6, bottom: 6, width: 1,
            background: 'rgba(var(--border-rgb),0.1)',
          }} className="exp-rule" />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(2.5rem,5vw,4rem)' }}>
            {experience.map((exp, i) => (
              <motion.div
                key={exp.role + exp.duration}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  display: 'grid', gridTemplateColumns: '1fr', gap: '0.5rem 2.5rem',
                  paddingLeft: '1.75rem', position: 'relative',
                }}
                className="exp-row"
              >
                {/* node dot */}
                <span style={{
                  position: 'absolute', left: -4.5, top: 6, width: 10, height: 10,
                  borderRadius: '50%', background: i === 0 ? 'var(--accent)' : 'rgba(var(--bg-rgb), 0.66)',
                  border: `2px solid ${i === 0 ? 'var(--accent)' : 'rgba(var(--border-rgb),0.25)'}`,
                  boxShadow: i === 0 ? '0 0 12px var(--accent)' : 'none',
                }} />

                {/* left: meta */}
                <div className="exp-meta">
                  <div style={{
                    fontFamily: "'DM Mono', monospace", fontSize: '0.68rem',
                    color: 'rgba(var(--text-rgb),0.45)', letterSpacing: '0.04em', marginBottom: '0.3rem',
                  }}>{exp.duration}</div>
                  <div style={{
                    fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700,
                    fontSize: 'clamp(1.05rem,1.8vw,1.25rem)', color: 'var(--text)', letterSpacing: '-0.02em',
                    lineHeight: 1.2,
                  }}>{exp.role}</div>
                  <div style={{
                    fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 600,
                    fontSize: '0.92rem', color: 'var(--accent)', marginTop: 2,
                  }}>{exp.company}</div>
                </div>

                {/* right: highlights */}
                <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
                  {exp.highlights.map((h, hi) => (
                    <li key={hi} style={{ display: 'flex', gap: 10 }}>
                      <span style={{ color: 'rgba(var(--accent-rgb),0.6)', flexShrink: 0, marginTop: 1, fontSize: '0.7rem' }}>—</span>
                      <span style={{
                        fontFamily: "'Bricolage Grotesque', sans-serif",
                        fontSize: 'clamp(0.85rem,1.3vw,0.95rem)',
                        color: 'rgba(var(--text-rgb),0.5)', lineHeight: 1.6, letterSpacing: '-0.01em',
                      }}>{h}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Education */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.7 }}
          style={{ marginTop: 'clamp(3.5rem,7vw,6rem)' }}
        >
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.62rem', color: 'var(--accent)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
            Education
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1px', background: 'rgba(var(--border-rgb),0.07)' }} className="edu-grid">
            {education.map((e) => (
              <div key={e.degree} style={{ background: 'rgba(var(--bg-rgb), 0.66)', padding: 'clamp(1.5rem,3vw,2rem)' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '1rem', marginBottom: '0.4rem' }}>
                  <h3 style={{
                    fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700,
                    fontSize: 'clamp(1.1rem,2vw,1.4rem)', color: 'var(--text)', letterSpacing: '-0.02em', margin: 0,
                  }}>{e.degree}</h3>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.7rem', color: 'var(--accent)' }}>{e.year}</span>
                </div>
                <p style={{
                  fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: '0.9rem',
                  color: 'rgba(var(--text-rgb),0.45)', margin: 0, lineHeight: 1.5,
                }}>{e.institution}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (min-width: 760px) {
          .exp-row { grid-template-columns: 0.85fr 1.15fr !important; align-items: start; }
          .edu-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </section>
  )
}
