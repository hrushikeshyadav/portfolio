import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { allProjects } from '../../data/projects'

function ProjectCard({
  project,
  index,
  inView,
  featured = false,
}: {
  project: (typeof allProjects)[0]
  index: number
  inView: boolean
  featured?: boolean
}) {
  const hoverRef = useRef<HTMLDivElement>(null)

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = hoverRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - r.left}px`)
    el.style.setProperty('--my', `${e.clientY - r.top}px`)
  }

  return (
    <motion.div
      ref={hoverRef}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={onMove}
      style={{
        position: 'relative', overflow: 'hidden',
        background: featured ? 'rgba(255,69,0,0.04)' : '#0d0d0d',
        border: `1px solid ${featured ? 'rgba(255,69,0,0.14)' : 'rgba(255,255,255,0.06)'}`,
        padding: featured ? 'clamp(1.8rem,3.5vw,2.8rem)' : '1.6rem',
        display: 'flex', flexDirection: 'column',
        minHeight: featured ? 300 : 210,
        transition: 'border-color 0.35s ease, transform 0.35s cubic-bezier(0.16,1,0.3,1)',
        cursor: 'default',
      }}
      whileHover={{ y: -5 }}
      onHoverStart={e => {
        const el = (e.target as HTMLElement).closest('[data-card]') as HTMLElement
        if (el) el.style.borderColor = `rgba(${featured ? '255,69,0,0.35' : '255,255,255,0.14'})`
      }}
      onHoverEnd={e => {
        const el = (e.target as HTMLElement).closest('[data-card]') as HTMLElement
        if (el) el.style.borderColor = featured ? 'rgba(255,69,0,0.14)' : 'rgba(255,255,255,0.06)'
      }}
      data-card
    >
      {/* Spotlight glow */}
      <div className="spotlight-glow" style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(220px circle at var(--mx,50%) var(--my,50%), rgba(255,69,0,0.07), transparent 75%)',
        opacity: 0, transition: 'opacity 0.3s',
      }} />

      {/* Year + category */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '1.4rem' }}>
        <span style={{
          fontFamily: "'DM Mono', monospace", fontSize: '0.6rem',
          color: '#ff4500', letterSpacing: '0.12em', textTransform: 'uppercase',
        }}>{project.category}</span>
        <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', display: 'inline-block' }} />
        <span style={{
          fontFamily: "'DM Mono', monospace", fontSize: '0.6rem',
          color: 'rgba(255,255,255,0.22)', letterSpacing: '0.06em',
        }}>{project.year}</span>
        <span style={{
          fontFamily: "'DM Mono', monospace", fontSize: '0.58rem',
          color: 'rgba(255,255,255,0.1)', letterSpacing: '0.06em',
          marginLeft: 'auto',
        }}>{project.number}</span>
      </div>

      {/* Title */}
      <h3 style={{
        fontFamily: "'Bricolage Grotesque', sans-serif",
        fontWeight: 800,
        fontSize: featured ? 'clamp(1.7rem, 3.5vw, 2.7rem)' : 'clamp(1.15rem, 2vw, 1.55rem)',
        letterSpacing: '-0.035em', lineHeight: 1.05,
        color: '#f5f5f7', marginBottom: '0.6rem',
      }}>{project.name}</h3>

      {/* Description */}
      <p style={{
        fontFamily: "'Bricolage Grotesque', sans-serif",
        fontSize: featured ? '0.95rem' : '0.84rem',
        color: 'rgba(245,245,247,0.36)',
        lineHeight: 1.68, marginBottom: 'auto',
        overflow: 'hidden',
        display: '-webkit-box',
        WebkitLineClamp: featured ? 3 : 2,
        WebkitBoxOrient: 'vertical',
      }}>
        {featured ? project.description : project.tagline}
      </p>

      {/* Footer: tech tags + arrow */}
      <div style={{
        display: 'flex', alignItems: 'flex-end',
        justifyContent: 'space-between',
        gap: '0.5rem', marginTop: '1.5rem', flexWrap: 'wrap',
      }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
          {project.tech.slice(0, featured ? 5 : 3).map(t => (
            <span key={t} style={{
              fontFamily: "'DM Mono', monospace", fontSize: '0.58rem',
              color: 'rgba(245,245,247,0.28)',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.07)',
              padding: '0.15rem 0.5rem',
            }}>{t}</span>
          ))}
        </div>
        <div className="card-cta" style={{
          display: 'flex', alignItems: 'center', gap: 3,
          fontFamily: "'DM Mono', monospace", fontSize: '0.6rem',
          color: 'rgba(245,245,247,0.18)', textTransform: 'uppercase',
          letterSpacing: '0.08em', flexShrink: 0,
          transition: 'color 0.2s',
        }}>
          View <ArrowUpRight size={11} />
        </div>
      </div>

      <style>{`
        *:hover > .spotlight-glow { opacity: 1 !important; }
        *:hover .card-cta { color: #ff4500 !important; }
      `}</style>
    </motion.div>
  )
}

export default function Projects() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const featured = allProjects.slice(0, 3)
  const secondary = allProjects.slice(3, 7)
  const rest = allProjects.slice(7)

  return (
    <section id="work" ref={ref} style={{
      padding: 'clamp(7rem, 14vw, 12rem) 1.5rem',
      background: '#000',
      position: 'relative',
    }}>
      <div style={{
        position: 'absolute', top: '3rem', right: '1.5rem',
        fontFamily: "'DM Mono', monospace", fontSize: '0.62rem',
        color: 'rgba(255,255,255,0.05)', letterSpacing: '0.14em', userSelect: 'none',
      }}>01 / WORK</div>

      <div style={{ maxWidth: 1280, margin: '0 auto' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1.5rem' }}>
            <span style={{ width: 28, height: '1.5px', background: '#ff4500', display: 'inline-block' }} />
            <span style={{
              fontFamily: "'DM Mono', monospace", fontSize: '0.65rem',
              color: '#ff4500', letterSpacing: '0.14em', textTransform: 'uppercase',
            }}>Selected Work</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
            <h2 style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontWeight: 800, fontSize: 'clamp(2.4rem, 5.5vw, 4.5rem)',
              letterSpacing: '-0.04em', color: '#f5f5f7', lineHeight: 1, margin: 0,
            }}>What I've Built</h2>
            <span style={{
              fontFamily: "'DM Mono', monospace", fontSize: '0.68rem',
              color: 'rgba(255,255,255,0.18)', letterSpacing: '0.06em',
            }}>{allProjects.length} projects</span>
          </div>
          <div style={{ width: '100%', height: '1px', background: 'rgba(255,255,255,0.06)', marginTop: '1.5rem' }} />
        </motion.div>

        {/* Row 1: large + 2 stacked */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 1, marginBottom: 1 }} className="proj-row-1">
          <ProjectCard project={featured[0]} index={0} inView={inView} featured />
          <ProjectCard project={featured[1]} index={1} inView={inView} featured />
          <ProjectCard project={featured[2]} index={2} inView={inView} featured />
        </div>

        {/* Row 2 */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 1, marginBottom: 1 }} className="proj-row-2">
          {secondary.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={3 + i} inView={inView} />
          ))}
        </div>

        {/* Row 3 */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 1 }} className="proj-row-3">
          {rest.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={7 + i} inView={inView} />
          ))}
        </div>
      </div>

      <style>{`
        @media (min-width: 640px) {
          .proj-row-1 { grid-template-columns: repeat(2,1fr) !important; }
          .proj-row-2 { grid-template-columns: repeat(2,1fr) !important; }
          .proj-row-3 { grid-template-columns: repeat(2,1fr) !important; }
        }
        @media (min-width: 1024px) {
          .proj-row-1 { grid-template-columns: 2fr 1fr 1fr !important; }
          .proj-row-2 { grid-template-columns: repeat(4,1fr) !important; }
          .proj-row-3 { grid-template-columns: repeat(3,1fr) !important; }
        }
      `}</style>
    </section>
  )
}
