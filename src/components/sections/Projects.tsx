import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { allProjects, type Project } from '../../data/projects'
import AnimatedHeading from '../ui/AnimatedHeading'

function Card({ project }: { project: Project }) {
  return (
    <div
      className="glass glass-rim proj-card"
      style={{
        ['--glass-radius' as string]: '18px',
        ['--glass-blur' as string]: '14px',
        position: 'relative',
        flexShrink: 0,
        width: 'clamp(230px, 76vw, 340px)',
        padding: 'clamp(1.3rem,3.5vw,1.6rem) clamp(1.2rem,3.5vw,1.5rem) 1.4rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.8rem',
        userSelect: 'none',
        overflow: 'hidden',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{
          fontFamily: "'DM Mono', monospace", fontSize: '0.7rem',
          color: 'rgba(var(--text-rgb),0.4)', letterSpacing: '0.08em',
        }}>{project.number}</span>
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          fontFamily: "'DM Mono', monospace", fontSize: '0.54rem',
          color: project.link ? 'var(--accent)' : 'rgba(var(--text-rgb),0.3)',
          letterSpacing: '0.12em', textTransform: 'uppercase',
        }}>
          <span style={{
            width: 6, height: 6, borderRadius: '50%',
            background: project.link ? 'var(--accent)' : 'rgba(var(--text-rgb),0.25)',
            boxShadow: project.link ? '0 0 8px var(--accent)' : 'none',
          }} />
          {project.link ? 'Live' : project.year.split('–')[0]}
        </span>
      </div>

      <div>
        <h3 style={{
          fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800,
          fontSize: '1.55rem', letterSpacing: '-0.035em', color: 'var(--text)',
          lineHeight: 1.05, margin: '0 0 0.25rem',
        }}>{project.name}</h3>
        <span style={{
          fontFamily: "'DM Mono', monospace", fontSize: '0.6rem',
          color: 'rgba(var(--text-rgb),0.4)', letterSpacing: '0.06em', textTransform: 'uppercase',
        }}>{project.category} · {project.year}</span>
      </div>

      <p style={{
        fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: '0.84rem',
        color: 'rgba(var(--text-rgb),0.5)', lineHeight: 1.55, letterSpacing: '-0.01em',
        margin: 0, flex: 1,
        display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden',
      }}>{project.tagline} — {project.description}</p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginTop: '0.2rem' }}>
        {project.tech.slice(0, 4).map((t) => (
          <span key={t} style={{
            fontFamily: "'DM Mono', monospace", fontSize: '0.56rem',
            color: 'rgba(var(--text-rgb),0.5)', letterSpacing: '0.03em',
            padding: '0.2rem 0.5rem', borderRadius: 6,
            border: '1px solid rgba(var(--border-rgb),0.12)', background: 'rgba(var(--text-rgb),0.03)',
          }}>{t}</span>
        ))}
      </div>
    </div>
  )
}

function Marquee({ items, reverse, duration }: { items: Project[]; reverse?: boolean; duration: number }) {
  const doubled = [...items, ...items]
  return (
    <div style={{
      overflow: 'hidden',
      WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 7%, #000 93%, transparent)',
      maskImage: 'linear-gradient(90deg, transparent, #000 7%, #000 93%, transparent)',
    }}>
      <div
        className="marquee-track"
        style={{
          gap: 'clamp(0.9rem, 2vw, 1.2rem)',
          animationDirection: reverse ? 'reverse' : 'normal',
          animationDuration: `${duration}s`,
        }}
      >
        {doubled.map((p, i) => <Card key={p.id + i} project={p} />)}
      </div>
    </div>
  )
}

export default function Projects() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const half = Math.ceil(allProjects.length / 2)
  const rowA = allProjects.slice(0, half)
  const rowB = allProjects.slice(half)

  return (
    <section id="more" ref={ref} style={{
      background: 'rgba(var(--bg-rgb), 0.72)',
      padding: 'clamp(6rem,12vw,10rem) 0',
      position: 'relative',
      borderTop: '1px solid rgba(var(--border-rgb),0.06)',
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 clamp(1.5rem,5vw,4rem)' }}>
        <div style={{
          position: 'absolute', top: '3rem', right: 'clamp(1.5rem,5vw,4rem)',
          fontFamily: "'DM Mono', monospace", fontSize: '0.62rem',
          color: 'rgba(var(--border-rgb),0.06)', letterSpacing: '0.14em', userSelect: 'none',
        }}>04 / INDEX</div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 'clamp(2.5rem,5vw,4rem)' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1.25rem' }}>
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
                fontSize: 'clamp(2.4rem,5.5vw,4.5rem)', letterSpacing: '-0.04em',
                color: 'var(--text)', lineHeight: 1, margin: 0,
              }}
            />
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.65rem', color: 'rgba(var(--text-rgb),0.3)', letterSpacing: '0.06em' }}>
              {allProjects.length} projects
            </span>
          </div>
        </motion.div>
      </div>

      {/* Two opposing auto-scrolling rows — full-bleed, non-clickable */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.15 }}
        style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(0.9rem,2vw,1.2rem)' }}
      >
        <Marquee items={rowA} duration={48} />
        <Marquee items={rowB} duration={54} reverse />
      </motion.div>

      <style>{`
        .proj-card { transition: transform 0.4s cubic-bezier(0.16,1,0.3,1), border-color 0.4s ease; }
        @media (hover: hover) { .proj-card:hover { transform: translateY(-6px); } }
        .marquee-track:hover { animation-play-state: paused; }
      `}</style>
    </section>
  )
}
