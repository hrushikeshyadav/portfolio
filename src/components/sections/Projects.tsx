import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { allProjects } from '../../data/projects'

const COLORS: Record<string, string> = {
  digiqc: '#f59e0b', zinq: '#10b981', 'lw-agent-demos': '#8b5cf6',
  appsonair: '#3b82f6', 'lw-hub': '#06b6d4', 'tmdb-next': '#f59e0b',
  'vercel-ai-demo': '#ec4899', 'react-org-chart': '#84cc16',
  'chem-erp': '#f97316', 'claude-monitor': '#a855f7',
}

function ProjectCard({
  project, index, inView,
}: {
  project: (typeof allProjects)[0]
  index: number
  inView: boolean
}) {
  const accent = COLORS[project.id] ?? '#ff4500'

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.055, ease: [0.16, 1, 0.3, 1] }}
      style={{
        background: '#fff',
        border: '1px solid #e8e8e8',
        padding: '1.75rem',
        display: 'flex', flexDirection: 'column',
        position: 'relative', overflow: 'hidden',
        transition: 'border-color 0.25s, box-shadow 0.25s, transform 0.3s cubic-bezier(0.16,1,0.3,1)',
        cursor: 'default',
      }}
      whileHover={{ y: -4 }}
      onHoverStart={e => {
        const el = e.target as HTMLElement
        const card = el.closest('[data-proj-card]') as HTMLElement
        if (card) { card.style.borderColor = accent; card.style.boxShadow = `0 8px 32px ${accent}18` }
      }}
      onHoverEnd={e => {
        const el = e.target as HTMLElement
        const card = el.closest('[data-proj-card]') as HTMLElement
        if (card) { card.style.borderColor = '#e8e8e8'; card.style.boxShadow = 'none' }
      }}
      data-proj-card
    >
      {/* Accent top bar */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: accent, opacity: 0.7 }} />

      {/* Category + year */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.1rem' }}>
        <span style={{
          fontFamily: "'DM Mono', monospace", fontSize: '0.58rem',
          color: accent, letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600,
        }}>{project.category}</span>
        <span style={{
          fontFamily: "'DM Mono', monospace", fontSize: '0.58rem',
          color: '#aaa', letterSpacing: '0.06em',
        }}>{project.year}</span>
      </div>

      {/* Title */}
      <h3 style={{
        fontFamily: "'Bricolage Grotesque', sans-serif",
        fontWeight: 800,
        fontSize: 'clamp(1.15rem, 2vw, 1.45rem)',
        letterSpacing: '-0.03em', color: '#0a0a0a', marginBottom: '0.5rem', lineHeight: 1.1,
      }}>{project.name}</h3>

      {/* Tagline */}
      <p style={{
        fontFamily: "'Bricolage Grotesque', sans-serif",
        fontSize: '0.85rem', color: '#555', lineHeight: 1.65,
        marginBottom: 'auto', overflow: 'hidden',
        display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
      }}>{project.tagline}</p>

      {/* Tech + arrow */}
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '0.5rem', marginTop: '1.4rem', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
          {project.tech.slice(0, 3).map(t => (
            <span key={t} style={{
              fontFamily: "'DM Mono', monospace", fontSize: '0.57rem',
              color: '#666', background: '#f5f5f5', border: '1px solid #e8e8e8',
              padding: '0.15rem 0.5rem',
            }}>{t}</span>
          ))}
        </div>
        <ArrowUpRight size={15} style={{ color: '#ccc', flexShrink: 0, transition: 'color 0.2s' }} className="proj-arrow" />
      </div>

      <style>{`
        [data-proj-card]:hover .proj-arrow { color: ${accent} !important; }
      `}</style>
    </motion.div>
  )
}

function FeaturedCard({ project, index, inView }: { project: (typeof allProjects)[0]; index: number; inView: boolean }) {
  const accent = COLORS[project.id] ?? '#ff4500'
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      style={{
        background: '#fff',
        border: '1px solid #e8e8e8',
        padding: 'clamp(1.75rem,3vw,2.5rem)',
        display: 'flex', flexDirection: 'column',
        position: 'relative', overflow: 'hidden',
        minHeight: 280,
        transition: 'border-color 0.25s, box-shadow 0.25s, transform 0.3s cubic-bezier(0.16,1,0.3,1)',
        cursor: 'default',
      }}
      whileHover={{ y: -5 }}
      onHoverStart={e => {
        const el = e.target as HTMLElement
        const card = el.closest('[data-feat-card]') as HTMLElement
        if (card) { card.style.borderColor = accent; card.style.boxShadow = `0 12px 48px ${accent}20` }
      }}
      onHoverEnd={e => {
        const el = e.target as HTMLElement
        const card = el.closest('[data-feat-card]') as HTMLElement
        if (card) { card.style.borderColor = '#e8e8e8'; card.style.boxShadow = 'none' }
      }}
      data-feat-card
    >
      {/* Big accent bar */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: accent }} />

      {/* Bg number watermark */}
      <div style={{
        position: 'absolute', bottom: '-1rem', right: '1rem',
        fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800,
        fontSize: 'clamp(5rem,10vw,9rem)',
        color: `${accent}0d`, lineHeight: 1, letterSpacing: '-0.05em',
        userSelect: 'none', pointerEvents: 'none',
      }}>{project.number}</div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '1.5rem' }}>
        <span style={{
          fontFamily: "'DM Mono', monospace", fontSize: '0.6rem',
          color: accent, letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600,
        }}>{project.category}</span>
        <span style={{ width: 3, height: 3, borderRadius: '50%', background: '#ddd' }} />
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.6rem', color: '#bbb' }}>{project.year}</span>
      </div>

      <h3 style={{
        fontFamily: "'Bricolage Grotesque', sans-serif",
        fontWeight: 800,
        fontSize: 'clamp(1.6rem,3vw,2.4rem)',
        letterSpacing: '-0.04em', color: '#0a0a0a',
        marginBottom: '0.65rem', lineHeight: 1.05,
      }}>{project.name}</h3>

      <p style={{
        fontFamily: "'Bricolage Grotesque', sans-serif",
        fontSize: '0.92rem', color: '#444', lineHeight: 1.7,
        marginBottom: 'auto',
        overflow: 'hidden', display: '-webkit-box',
        WebkitLineClamp: 3, WebkitBoxOrient: 'vertical',
      }}>{project.description}</p>

      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: '1.75rem', gap: '0.5rem', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
          {project.tech.slice(0, 5).map(t => (
            <span key={t} style={{
              fontFamily: "'DM Mono', monospace", fontSize: '0.6rem',
              color: '#666', background: '#f5f5f5', border: '1px solid #e8e8e8', padding: '0.2rem 0.6rem',
            }}>{t}</span>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontFamily: "'DM Mono', monospace", fontSize: '0.62rem', color: '#ccc', transition: 'color 0.2s' }} className="feat-arrow">
          View <ArrowUpRight size={13} />
        </div>
      </div>

      <style>{`
        [data-feat-card]:hover .feat-arrow { color: ${accent} !important; }
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
    <section id="more" ref={ref} style={{
      background: '#f5f5f7',
      padding: 'clamp(6rem,12vw,10rem) clamp(1.5rem,5vw,4rem)',
      position: 'relative',
    }}>
      <div style={{ maxWidth: 1440, margin: '0 auto' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 'clamp(2.5rem,5vw,4rem)' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1.25rem' }}>
            <span style={{ width: 28, height: '1.5px', background: '#ff4500', display: 'inline-block' }} />
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.62rem', color: '#ff4500', letterSpacing: '0.14em', textTransform: 'uppercase' }}>More Work</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
            <h2 style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontWeight: 800, fontSize: 'clamp(2.4rem,5.5vw,4.5rem)',
              letterSpacing: '-0.04em', color: '#0a0a0a', lineHeight: 1, margin: 0,
            }}>Beyond the deep dives</h2>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.65rem', color: '#aaa', letterSpacing: '0.06em' }}>
              {allProjects.length} projects
            </span>
          </div>
          <div style={{ height: 1, background: '#e0e0e0', marginTop: '1.5rem' }} />
        </motion.div>

        {/* Featured row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 1, marginBottom: 1, background: '#e0e0e0' }} className="proj-feat">
          {featured.map((p, i) => <FeaturedCard key={p.id} project={p} index={i} inView={inView} />)}
        </div>

        {/* Secondary */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 1, marginBottom: 1, background: '#e0e0e0' }} className="proj-sec">
          {secondary.map((p, i) => <ProjectCard key={p.id} project={p} index={3 + i} inView={inView} />)}
        </div>

        {/* Rest */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 1, background: '#e0e0e0' }} className="proj-rest">
          {rest.map((p, i) => <ProjectCard key={p.id} project={p} index={7 + i} inView={inView} />)}
        </div>
      </div>

      <style>{`
        @media (min-width: 640px) {
          .proj-feat { grid-template-columns: repeat(2,1fr) !important; }
          .proj-sec  { grid-template-columns: repeat(2,1fr) !important; }
          .proj-rest { grid-template-columns: repeat(2,1fr) !important; }
        }
        @media (min-width: 1024px) {
          .proj-feat { grid-template-columns: 2fr 1fr 1fr !important; }
          .proj-sec  { grid-template-columns: repeat(4,1fr) !important; }
          .proj-rest { grid-template-columns: repeat(3,1fr) !important; }
        }
      `}</style>
    </section>
  )
}
