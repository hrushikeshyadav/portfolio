import { useRef, useState, useEffect } from 'react'
import {
  motion, useInView, useScroll, useTransform, useReducedMotion,
} from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { allProjects, type Project } from '../../data/projects'
import AnimatedHeading from '../ui/AnimatedHeading'

/**
 * "Beyond the deep dives" as a horizontal gallery that pans sideways as you
 * scroll vertically. The section pins to the viewport; scroll progress drives
 * the track's translateX. Panels are editorial (giant ghost index, name,
 * tagline, tech) separated by thin rules — no boxes. Falls back to a simple
 * vertical list under reduced-motion.
 */

// ── one editorial panel ──────────────────────────────────────────────────
function Panel({ p, i }: { p: Project; i: number }) {
  const live = !!p.link
  return (
    <div style={{
      position: 'relative', flexShrink: 0,
      width: 'clamp(270px, 80vw, 400px)',
      height: '100%',
      display: 'flex', flexDirection: 'column', justifyContent: 'center',
      padding: '0 clamp(1.6rem, 3.5vw, 3rem)',
      borderLeft: i === 0 ? 'none' : '1px solid rgba(var(--border-rgb),0.09)',
    }}>
      {/* giant ghost index */}
      <span style={{
        position: 'absolute', top: 'clamp(1rem,4vh,3rem)', right: 'clamp(1rem,3vw,2rem)', zIndex: 0,
        fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800,
        fontSize: 'clamp(6rem, 14vw, 11rem)', lineHeight: 1,
        color: 'transparent', WebkitTextStroke: '1.5px rgba(var(--text-rgb),0.06)',
        userSelect: 'none', pointerEvents: 'none',
      }}>{String(i).padStart(2, '0')}</span>

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* meta */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1.1rem' }}>
          <span style={{
            width: 7, height: 7, borderRadius: '50%', flexShrink: 0,
            background: live ? 'var(--accent)' : 'rgba(var(--text-rgb),0.25)',
            boxShadow: live ? '0 0 9px var(--accent)' : 'none',
          }} />
          <span style={{
            fontFamily: "'DM Mono', monospace", fontSize: '0.6rem',
            color: live ? 'var(--accent)' : 'rgba(var(--text-rgb),0.4)',
            letterSpacing: '0.12em', textTransform: 'uppercase',
          }}>{p.category} · {p.year}</span>
        </div>

        {/* name */}
        <h3 style={{
          fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800,
          fontSize: 'clamp(2rem, 4.2vw, 3rem)', letterSpacing: '-0.04em',
          color: 'var(--text)', lineHeight: 0.98, margin: '0 0 0.9rem',
        }}>{p.name}</h3>

        {/* description */}
        <p style={{
          fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 'clamp(0.85rem,1.4vw,0.95rem)',
          color: 'rgba(var(--text-rgb),0.5)', lineHeight: 1.6, letterSpacing: '-0.01em',
          margin: '0 0 1.5rem', maxWidth: 360,
          display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical', overflow: 'hidden',
        }}>
          <span style={{ color: 'rgba(var(--text-rgb),0.75)', fontWeight: 600 }}>{p.tagline}</span>
          {' — '}{p.description}
        </p>

        {/* tech */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: live ? '1.4rem' : 0 }}>
          {p.tech.slice(0, 5).map((t) => <span key={t} className="tech-tag">{t}</span>)}
        </div>

        {/* link */}
        {live && (
          <a href={p.link} target="_blank" rel="noopener noreferrer"
            className="proj-link"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 7,
              fontFamily: "'DM Mono', monospace", fontSize: '0.68rem', letterSpacing: '0.06em',
              color: 'var(--accent)', textDecoration: 'none', textTransform: 'uppercase',
            }}>
            Visit live <ArrowUpRight size={14} />
          </a>
        )}
      </div>
    </div>
  )
}

// ── reduced-motion fallback: plain vertical editorial list ─────────────────
function FallbackList() {
  return (
    <div style={{ maxWidth: 760, margin: '0 auto', padding: '0 clamp(1.5rem,5vw,4rem)', borderTop: '1px solid rgba(var(--border-rgb),0.09)' }}>
      {allProjects.map((p, i) => (
        <div key={p.id} style={{ padding: '1.6rem 0', borderBottom: '1px solid rgba(var(--border-rgb),0.09)' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.7rem', color: 'rgba(var(--text-rgb),0.3)' }}>{String(i).padStart(2, '0')}</span>
            <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: 'clamp(1.4rem,3vw,2rem)', letterSpacing: '-0.035em', color: 'var(--text)', margin: 0 }}>{p.name}</h3>
          </div>
          <p style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: '0.9rem', color: 'rgba(var(--text-rgb),0.5)', lineHeight: 1.6, margin: '0.5rem 0 0 calc(0.7rem + 14px)', maxWidth: 560 }}>
            {p.tagline} — {p.description}
          </p>
        </div>
      ))}
    </div>
  )
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const headRef = useRef(null)
  const inView = useInView(headRef, { once: true, margin: '-80px' })
  const reduce = useReducedMotion()

  const [metrics, setMetrics] = useState({ shift: 0, height: 0 })

  useEffect(() => {
    if (reduce) return
    const calc = () => {
      const track = trackRef.current
      if (!track) return
      const shift = Math.max(0, track.scrollWidth - window.innerWidth)
      // Vertical scroll distance = shift × PACE, so the pan moves at 1/PACE of
      // scroll speed — slower, so one gesture doesn't fly past several panels.
      const PACE = 1.8
      setMetrics({ shift, height: shift * PACE + window.innerHeight })
    }
    calc()
    const t = window.setTimeout(calc, 350) // re-measure after fonts/layout settle
    window.addEventListener('resize', calc)
    return () => { window.clearTimeout(t); window.removeEventListener('resize', calc) }
  }, [reduce])

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, [0, 1], [0, -metrics.shift])

  // ── Header (shared) ──────────────────────────────────────────────────────
  const header = (
    <motion.div
      ref={headRef}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      style={{ maxWidth: 1280, margin: '0 auto', padding: '0 clamp(1.5rem,5vw,4rem)' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1rem' }}>
        <span style={{ width: 28, height: '1.5px', background: 'var(--accent)', display: 'inline-block' }} />
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.62rem', color: 'var(--accent)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
          More Work
        </span>
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
        <AnimatedHeading
          text="Beyond the deep dives"
          style={{
            fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800,
            fontSize: 'clamp(2.2rem,5vw,4rem)', letterSpacing: '-0.04em',
            color: 'var(--text)', lineHeight: 1, margin: 0,
          }}
        />
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.65rem', color: 'rgba(var(--text-rgb),0.3)', letterSpacing: '0.06em' }}>
          {allProjects.length} projects {reduce ? '' : '· scroll →'}
        </span>
      </div>
    </motion.div>
  )

  // ── Reduced-motion: static vertical list ───────────────────────────────────
  if (reduce) {
    return (
      <section id="more" style={{
        padding: 'clamp(6rem,12vw,10rem) 0', background: 'rgba(var(--bg-rgb), 0.72)',
        position: 'relative', borderTop: '1px solid rgba(var(--border-rgb),0.06)',
      }}>
        <div style={{
          position: 'absolute', top: '3rem', right: 'clamp(1.5rem,5vw,4rem)',
          fontFamily: "'DM Mono', monospace", fontSize: '0.62rem',
          color: 'rgba(var(--border-rgb),0.06)', letterSpacing: '0.14em', userSelect: 'none',
        }}>02 / INDEX</div>
        <div style={{ marginBottom: 'clamp(2.5rem,5vw,4rem)' }}>{header}</div>
        <FallbackList />
      </section>
    )
  }

  // ── Horizontal scroll-pan gallery ──────────────────────────────────────────
  return (
    <section ref={sectionRef} id="more" style={{
      position: 'relative',
      height: metrics.height ? `${metrics.height}px` : '100vh',
      background: 'rgba(var(--bg-rgb), 0.72)',
      borderTop: '1px solid rgba(var(--border-rgb),0.06)',
    }}>
      <div style={{
        position: 'sticky', top: 0, height: '100vh', overflow: 'hidden',
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
      }}>
        {/* header */}
        <div style={{ position: 'absolute', top: 'clamp(3rem,7vh,5rem)', left: 0, right: 0, zIndex: 2 }}>{header}</div>
        <div style={{
          position: 'absolute', top: 'clamp(3rem,7vh,5rem)', right: 'clamp(1.5rem,5vw,4rem)', zIndex: 3,
          fontFamily: "'DM Mono', monospace", fontSize: '0.62rem',
          color: 'rgba(var(--border-rgb),0.06)', letterSpacing: '0.14em', userSelect: 'none',
        }}>02 / INDEX</div>

        {/* horizontal track */}
        <div style={{ flex: 'none', display: 'flex', alignItems: 'center', height: '62vh', marginTop: 'clamp(3rem,8vh,5rem)' }}>
          <motion.div
            ref={trackRef}
            style={{
              x, display: 'flex', height: '100%', alignItems: 'stretch',
              paddingLeft: 'max(calc((100vw - 1280px) / 2), clamp(1.5rem,5vw,4rem))',
              paddingRight: 'clamp(2rem,10vw,8rem)',
            }}
          >
            {allProjects.map((p, i) => <Panel key={p.id} p={p} i={i} />)}
          </motion.div>
        </div>

        {/* scroll progress bar */}
        <motion.div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 2,
          background: 'var(--accent)', transformOrigin: '0% 50%', scaleX: scrollYProgress,
        }} />
      </div>

      <style>{`
        .proj-link { transition: gap 0.3s ease, opacity 0.3s ease; opacity: 0.85; }
        @media (hover: hover) { .proj-link:hover { gap: 11px; opacity: 1; } }
      `}</style>
    </section>
  )
}
