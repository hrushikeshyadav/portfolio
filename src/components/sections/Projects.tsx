import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { allProjects } from '../../data/projects'

const COLORS: Record<string, string> = {
  'digiqc-team': '#f59e0b', 'digiqc-admin': '#f59e0b', 'lw-hub': '#06b6d4',
  appsonair: '#3b82f6', zinq: '#10b981', rera: '#a855f7',
  'appeal-collector': '#a855f7', urltags: '#f97316', tmdb: '#38bdf8',
  boilerplates: '#f59e0b',
}

function Row({ project, i, inView }: { project: (typeof allProjects)[0]; i: number; inView: boolean }) {
  const [hover, setHover] = useState(false)
  const accent = COLORS[project.id] ?? '#5a8cff'

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: i * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: 'relative',
        borderBottom: '1px solid rgba(var(--border-rgb),0.08)',
        cursor: 'default',
        overflow: 'hidden',
      }}
    >
      {/* hover wash */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: `linear-gradient(90deg, ${accent}0f, transparent 60%)`,
        opacity: hover ? 1 : 0, transition: 'opacity 0.35s ease',
      }} />

      <div style={{
        position: 'relative',
        display: 'grid',
        gridTemplateColumns: 'auto 1fr auto',
        alignItems: 'center',
        gap: 'clamp(1rem,3vw,2.5rem)',
        padding: 'clamp(1.3rem,2.8vw,2rem) 0.5rem',
        transform: hover ? 'translateX(12px)' : 'translateX(0)',
        transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1)',
      }}>
        {/* index */}
        <span style={{
          fontFamily: "'DM Mono', monospace", fontSize: '0.72rem',
          color: hover ? accent : 'rgba(var(--text-rgb),0.3)',
          letterSpacing: '0.04em', transition: 'color 0.3s', minWidth: 28,
        }}>{project.number}</span>

        {/* name + category */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 'clamp(0.75rem,2vw,1.5rem)', flexWrap: 'wrap' }}>
          <h3 style={{
            fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800,
            fontSize: 'clamp(1.5rem,4vw,2.8rem)', letterSpacing: '-0.04em',
            color: hover ? 'var(--text)' : 'rgba(var(--text-rgb),0.85)',
            lineHeight: 1, margin: 0, transition: 'color 0.3s',
          }}>{project.name}</h3>
          <span style={{
            fontFamily: "'DM Mono', monospace", fontSize: '0.62rem',
            color: 'rgba(var(--text-rgb),0.35)', letterSpacing: '0.08em', textTransform: 'uppercase',
          }}>{project.category}</span>
        </div>

        {/* year + arrow */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {project.link && (
            <span style={{
              fontFamily: "'DM Mono', monospace", fontSize: '0.56rem',
              color: hover ? accent : 'rgba(var(--text-rgb),0.25)',
              letterSpacing: '0.1em', textTransform: 'uppercase', transition: 'color 0.3s',
            }} className="live-badge">Live</span>
          )}
          <span style={{
            fontFamily: "'DM Mono', monospace", fontSize: '0.68rem',
            color: 'rgba(var(--text-rgb),0.35)', letterSpacing: '0.04em',
          }}>{project.year}</span>
          <ArrowUpRight
            size={20}
            style={{
              color: hover ? accent : 'rgba(var(--text-rgb),0.25)',
              transform: hover ? 'translate(2px,-2px)' : 'none',
              transition: 'all 0.3s', flexShrink: 0,
            }}
          />
        </div>
      </div>

      {/* clickable overlay for live products */}
      {project.link && (
        <a href={project.link} target="_blank" rel="noopener noreferrer"
          aria-label={`Visit ${project.name}`}
          style={{ position: 'absolute', inset: 0, zIndex: 2 }}
        />
      )}
    </motion.div>
  )
}

export default function Projects() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="more" ref={ref} style={{
      background: 'rgba(var(--bg-rgb), 0.72)',
      padding: 'clamp(6rem,12vw,10rem) clamp(1.5rem,5vw,4rem)',
      position: 'relative',
      borderTop: '1px solid rgba(var(--border-rgb),0.06)',
    }}>
      <div style={{
        position: 'absolute', top: '3rem', right: 'clamp(1.5rem,5vw,4rem)',
        fontFamily: "'DM Mono', monospace", fontSize: '0.62rem',
        color: 'rgba(var(--border-rgb),0.06)', letterSpacing: '0.14em', userSelect: 'none',
      }}>04 / INDEX</div>

      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
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
            <h2 style={{
              fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800,
              fontSize: 'clamp(2.4rem,5.5vw,4.5rem)', letterSpacing: '-0.04em',
              color: 'var(--text)', lineHeight: 1, margin: 0,
            }}>Beyond the deep dives</h2>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.65rem', color: 'rgba(var(--text-rgb),0.3)', letterSpacing: '0.06em' }}>
              {allProjects.length} projects
            </span>
          </div>
        </motion.div>

        {/* Editorial index list */}
        <div style={{ borderTop: '1px solid rgba(var(--border-rgb),0.08)' }}>
          {allProjects.map((p, i) => <Row key={p.id} project={p} i={i} inView={inView} />)}
        </div>
      </div>
    </section>
  )
}
