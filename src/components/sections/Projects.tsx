import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { allProjects } from '../../data/projects'

function BentoCard({
  project,
  index,
  inView,
  size = 'normal',
}: {
  project: (typeof allProjects)[0]
  index: number
  inView: boolean
  size?: 'large' | 'tall' | 'normal' | 'wide'
}) {
  const hoverRef = useRef<HTMLDivElement>(null)

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = hoverRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - r.left}px`)
    el.style.setProperty('--my', `${e.clientY - r.top}px`)
  }

  return (
    <motion.div
      ref={hoverRef}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMove}
      style={{
        background: '#111111',
        border: '1px solid rgba(255,255,255,0.07)',
        padding: size === 'large' ? 'clamp(1.5rem,3vw,2.5rem)' : '1.5rem',
        position: 'relative', overflow: 'hidden',
        display: 'flex', flexDirection: 'column',
        minHeight: size === 'large' ? 320 : size === 'tall' ? 300 : 220,
        transition: 'border-color 0.3s ease, transform 0.3s cubic-bezier(0.22,1,0.36,1)',
        cursor: 'default',
      }}
      whileHover={{ y: -4, borderColor: 'rgba(255,69,0,0.3)' }}
    >
      {/* Spotlight */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(200px circle at var(--mx,50%) var(--my,50%), rgba(255,69,0,0.06), transparent 70%)',
        opacity: 0, transition: 'opacity 0.3s',
      }} className="spotlight" />

      {/* Number */}
      <span style={{
        position: 'absolute', top: '1rem', right: '1.25rem',
        fontFamily: "'DM Mono', monospace", fontSize: '0.65rem',
        color: 'rgba(255,255,255,0.1)', letterSpacing: '0.08em',
        userSelect: 'none',
      }}>{project.number}</span>

      {/* Category */}
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        marginBottom: '1.25rem',
      }}>
        <span style={{
          fontFamily: "'DM Mono', monospace", fontSize: '0.62rem',
          color: '#ff4500', letterSpacing: '0.1em', textTransform: 'uppercase',
        }}>{project.category}</span>
        <span style={{ color: 'rgba(255,255,255,0.12)', fontSize: '0.6rem' }}>·</span>
        <span style={{
          fontFamily: "'DM Mono', monospace", fontSize: '0.62rem',
          color: 'rgba(255,255,255,0.2)', letterSpacing: '0.06em',
        }}>{project.year}</span>
      </div>

      {/* Title */}
      <h3 style={{
        fontFamily: "'Bricolage Grotesque', sans-serif",
        fontWeight: 800,
        fontSize: size === 'large' ? 'clamp(1.6rem, 3.5vw, 2.6rem)' : 'clamp(1.1rem, 2vw, 1.5rem)',
        letterSpacing: '-0.03em', lineHeight: 1.05,
        color: '#f5f0eb', marginBottom: '0.65rem',
      }}>{project.name}</h3>

      {/* Tagline */}
      <p style={{
        fontFamily: "'Bricolage Grotesque', sans-serif",
        fontSize: '0.875rem', color: 'rgba(245,240,235,0.35)',
        lineHeight: 1.6, marginBottom: 'auto',
        display: size === 'normal' ? '-webkit-box' : 'block',
        WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
        overflow: size === 'normal' ? 'hidden' : 'visible',
      }}>
        {size === 'large' ? project.description : project.tagline}
      </p>

      {/* Tech + arrow */}
      <div style={{
        display: 'flex', alignItems: 'flex-end',
        justifyContent: 'space-between', gap: '0.75rem',
        marginTop: '1.5rem', flexWrap: 'wrap',
      }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
          {project.tech.slice(0, size === 'large' ? 5 : 3).map(t => (
            <span key={t} style={{
              fontFamily: "'DM Mono', monospace", fontSize: '0.62rem',
              color: 'rgba(245,240,235,0.3)',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.07)',
              padding: '0.15rem 0.55rem',
            }}>{t}</span>
          ))}
        </div>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 4,
          fontFamily: "'DM Mono', monospace", fontSize: '0.62rem',
          color: 'rgba(245,240,235,0.2)', textTransform: 'uppercase',
          letterSpacing: '0.08em', transition: 'color 0.2s',
          flexShrink: 0,
        }} className="card-arrow">
          View <ArrowUpRight size={12} />
        </div>
      </div>

      <style>{`
        .spotlight { opacity: 0 !important; }
        *:hover > .spotlight { opacity: 1 !important; }
        .card-arrow { color: rgba(245,240,235,0.2) !important; }
        *:hover > .card-arrow, *:hover .card-arrow { color: #ff4500 !important; }
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
      padding: 'clamp(6rem, 12vw, 10rem) 1.5rem',
      background: '#0c0c0c',
      position: 'relative',
    }}>
      {/* Section index */}
      <div style={{
        position: 'absolute', top: '3rem', right: '1.5rem',
        fontFamily: "'DM Mono', monospace", fontSize: '0.65rem',
        color: 'rgba(255,255,255,0.08)', letterSpacing: '0.1em', userSelect: 'none',
      }}>01 / WORK</div>

      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}
        >
          <div style={{
            display: 'flex', alignItems: 'baseline',
            justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem',
          }}>
            <h2 style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontWeight: 800, fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              letterSpacing: '-0.04em', color: '#f5f0eb', lineHeight: 1,
            }}>Selected Work</h2>
            <span style={{
              fontFamily: "'DM Mono', monospace", fontSize: '0.7rem',
              color: 'rgba(255,255,255,0.2)', letterSpacing: '0.06em',
            }}>{allProjects.length} projects</span>
          </div>
          <div style={{
            width: '100%', height: 1,
            background: 'rgba(255,255,255,0.07)',
            marginTop: '1.5rem',
          }} />
        </motion.div>

        {/* Row 1: large + two stacked */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: 1,
          marginBottom: 1,
        }} className="bento-row-1">
          <BentoCard project={featured[0]} index={0} inView={inView} size="large" />
          <BentoCard project={featured[1]} index={1} inView={inView} size="normal" />
          <BentoCard project={featured[2]} index={2} inView={inView} size="normal" />
        </div>

        {/* Row 2: four equal */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: 1,
          marginBottom: 1,
        }} className="bento-row-2">
          {secondary.map((p, i) => (
            <BentoCard key={p.id} project={p} index={3 + i} inView={inView} size="normal" />
          ))}
        </div>

        {/* Row 3: remaining */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: 1,
        }} className="bento-row-3">
          {rest.map((p, i) => (
            <BentoCard key={p.id} project={p} index={7 + i} inView={inView} size="normal" />
          ))}
        </div>
      </div>

      <style>{`
        @media (min-width: 640px) {
          .bento-row-1 { grid-template-columns: 1fr 1fr !important; }
          .bento-row-1 > *:first-child { grid-column: 1 / 2; }
          .bento-row-2 { grid-template-columns: repeat(2, 1fr) !important; }
          .bento-row-3 { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (min-width: 1024px) {
          .bento-row-1 { grid-template-columns: 2fr 1fr 1fr !important; }
          .bento-row-1 > *:first-child { grid-column: 1 / 2; }
          .bento-row-2 { grid-template-columns: repeat(4, 1fr) !important; }
          .bento-row-3 { grid-template-columns: repeat(3, 1fr) !important; }
        }
      `}</style>
    </section>
  )
}
