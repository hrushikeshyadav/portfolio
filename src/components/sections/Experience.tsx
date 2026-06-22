import { useRef } from 'react'
import { motion, useInView, useScroll, type Variants } from 'framer-motion'
import { experience, education } from '../../data/resume'
import AnimatedHeading from '../ui/AnimatedHeading'

/**
 * Career as a scroll-drawn timeline. An accent line fills downward as you
 * scroll the section; each role's node lights up as it's reached and its
 * content staggers in. Education follows as a pair of quietly revealed entries.
 */
const EASE = [0.16, 1, 0.3, 1] as const

const rowV: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
}
const itemV: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
}

function TimelineItem({ exp }: { exp: (typeof experience)[number] }) {
  const ref = useRef(null)
  const active = useInView(ref, { once: true, margin: '-35% 0px -35% 0px' })

  return (
    <motion.div
      ref={ref}
      variants={rowV}
      initial="hidden"
      animate={active ? 'show' : 'hidden'}
      className="exp-row"
      style={{
        display: 'grid', gridTemplateColumns: '1fr', gap: '0.5rem 2.5rem',
        paddingLeft: '2rem', position: 'relative',
      }}
    >
      {/* node dot — lights up when the row is reached */}
      <span style={{
        position: 'absolute', left: -5, top: 7, width: 12, height: 12,
        borderRadius: '50%', boxSizing: 'border-box',
        background: active ? 'var(--accent)' : 'rgba(var(--bg-rgb),0.66)',
        border: `2px solid ${active ? 'var(--accent)' : 'rgba(var(--border-rgb),0.3)'}`,
        boxShadow: active ? '0 0 14px var(--accent)' : 'none',
        transition: 'background 0.5s ease, border-color 0.5s ease, box-shadow 0.5s ease',
      }} />

      {/* meta */}
      <div className="exp-meta">
        <motion.div variants={itemV} style={{
          fontFamily: "'DM Mono', monospace", fontSize: '0.68rem',
          color: 'var(--accent)', letterSpacing: '0.06em', marginBottom: '0.4rem',
        }}>{exp.duration}</motion.div>
        <motion.div variants={itemV} style={{
          fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800,
          fontSize: 'clamp(1.15rem,2vw,1.5rem)', color: 'var(--text)', letterSpacing: '-0.03em',
          lineHeight: 1.1,
        }}>{exp.role}</motion.div>
        <motion.div variants={itemV} style={{
          fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 600,
          fontSize: '0.95rem', color: 'rgba(var(--text-rgb),0.55)', marginTop: 3,
        }}>{exp.company}</motion.div>
      </div>

      {/* highlights */}
      <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
        {exp.highlights.map((h, hi) => (
          <motion.li key={hi} variants={itemV} style={{ display: 'flex', gap: 11 }}>
            <span style={{ color: 'rgba(var(--accent-rgb),0.6)', flexShrink: 0, marginTop: 1, fontSize: '0.7rem' }}>—</span>
            <span style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontSize: 'clamp(0.85rem,1.3vw,0.95rem)',
              color: 'rgba(var(--text-rgb),0.55)', lineHeight: 1.6, letterSpacing: '-0.01em',
            }}>{h}</span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  )
}

export default function Experience() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const timelineRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: timelineRef, offset: ['start 38%', 'end 72%'] })

  const eduRef = useRef(null)
  const eduInView = useInView(eduRef, { once: true, margin: '-60px' })

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
      }}>03 / CAREER</div>

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
          <AnimatedHeading
            text="Experience & Education"
            style={{
              fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800,
              fontSize: 'clamp(2.4rem,5.5vw,4.5rem)', letterSpacing: '-0.04em',
              color: 'var(--text)', lineHeight: 1, margin: 0,
            }}
          />
        </motion.div>

        {/* Timeline */}
        <div ref={timelineRef} style={{ position: 'relative' }}>
          {/* faint base rule */}
          <div style={{
            position: 'absolute', left: 0, top: 8, bottom: 8, width: 2,
            background: 'rgba(var(--border-rgb),0.1)', borderRadius: 2,
          }} />
          {/* accent progress line — fills downward with scroll */}
          <motion.div style={{
            position: 'absolute', left: 0, top: 8, bottom: 8, width: 2, borderRadius: 2,
            background: 'linear-gradient(var(--accent), rgba(var(--accent-rgb),0.3))',
            transformOrigin: 'top', scaleY: scrollYProgress,
            boxShadow: '0 0 12px rgba(var(--accent-rgb),0.5)',
          }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(2.5rem,5vw,4rem)' }}>
            {experience.map((exp) => (
              <TimelineItem key={exp.role + exp.duration} exp={exp} />
            ))}
          </div>
        </div>

        {/* Education */}
        <motion.div
          ref={eduRef}
          variants={rowV}
          initial="hidden"
          animate={eduInView ? 'show' : 'hidden'}
          style={{ marginTop: 'clamp(3.5rem,7vw,6rem)' }}
        >
          <motion.div variants={itemV} style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.62rem', color: 'var(--accent)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
            Education
          </motion.div>
          <div className="edu-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'clamp(0.9rem,1.8vw,1.3rem)' }}>
            {education.map((e) => (
              <motion.div
                key={e.degree}
                variants={itemV}
                whileHover={{ y: -5 }}
                transition={{ type: 'spring', stiffness: 320, damping: 24 }}
                className="glass glass-rim edu-card"
                style={{
                  ['--glass-radius' as string]: '18px',
                  ['--glass-blur' as string]: '12px',
                  padding: 'clamp(1.4rem,3vw,1.9rem)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '1rem', marginBottom: '0.4rem' }}>
                  <h3 style={{
                    fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700,
                    fontSize: 'clamp(1.1rem,2vw,1.4rem)', color: 'var(--text)', letterSpacing: '-0.02em', margin: 0,
                  }}>{e.degree}</h3>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.7rem', color: 'var(--accent)', flexShrink: 0 }}>{e.year}</span>
                </div>
                <p style={{
                  fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: '0.9rem',
                  color: 'rgba(var(--text-rgb),0.45)', margin: 0, lineHeight: 1.5,
                }}>{e.institution}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <style>{`
        .edu-card { transition: border-color 0.4s ease, box-shadow 0.4s ease; }
        @media (hover: hover) {
          .edu-card:hover { border-color: rgba(var(--accent-rgb),0.35); box-shadow: 0 16px 44px -16px rgba(var(--accent-rgb),0.35); }
        }
        @media (min-width: 760px) {
          .exp-row { grid-template-columns: 0.85fr 1.15fr !important; align-items: start; }
          .edu-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </section>
  )
}
