import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import type { Project } from '../../data/projects'

interface Props {
  project: Project
  index: number
  inView: boolean
}

export default function ProjectCard({ project, index, inView }: Props) {
  const [hovered, setHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    card.style.setProperty('--mx', `${x}px`)
    card.style.setProperty('--my', `${y}px`)
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
      className="glass glass-rim glass-interactive glass-sheen"
      style={{
        ['--glass-radius' as string]: '16px',
        ['--glass-blur' as string]: '14px',
        ['--glass-fill' as string]: '0.05',
        border: `1px solid ${hovered ? 'rgba(var(--accent-rgb),0.35)' : 'rgba(var(--border-rgb),0.10)'}`,
        padding: '1.75rem',
        position: 'relative',
      }}
    >
      {/* Mouse-follow radial highlight */}
      <div style={{
        position: 'absolute',
        inset: 0,
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.3s ease',
        background: 'radial-gradient(200px circle at var(--mx, 50%) var(--my, 50%), rgba(var(--accent-rgb),0.07), transparent)',
        pointerEvents: 'none',
      }} />

      {/* Top accent line */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: hovered ? '0%' : '100%',
        height: '1px',
        background: 'var(--accent)',
        transition: 'right 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
      }} />

      {/* Project number */}
      <div style={{
        fontFamily: "'Fraunces', serif",
        fontWeight: 900,
        fontSize: '4rem',
        color: hovered ? 'rgba(var(--accent-rgb),0.08)' : 'rgba(var(--border-rgb),0.04)',
        lineHeight: 1,
        position: 'absolute',
        top: '1rem',
        right: '1.25rem',
        letterSpacing: '-0.04em',
        userSelect: 'none',
        transition: 'color 0.3s ease',
        pointerEvents: 'none',
      }}>
        {project.number}
      </div>

      {/* Category badge */}
      <div style={{
        display: 'inline-block',
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '0.65rem',
        color: 'rgba(var(--accent-rgb),0.7)',
        background: 'rgba(var(--accent-rgb),0.08)',
        border: '1px solid rgba(var(--accent-rgb),0.15)',
        padding: '0.2rem 0.6rem',
        marginBottom: '1.25rem',
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
      }}>
        {project.category}
      </div>

      {/* Name */}
      <h3 style={{
        fontFamily: "'Syne', sans-serif",
        fontWeight: 800,
        fontSize: 'clamp(1.1rem, 2vw, 1.35rem)',
        color: 'var(--text)',
        marginBottom: '0.4rem',
        letterSpacing: '-0.01em',
        lineHeight: 1.2,
      }}>
        {project.name}
      </h3>

      {/* Tagline */}
      <p style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: '0.85rem',
        color: 'rgba(var(--text-rgb),0.45)',
        marginBottom: '1rem',
        lineHeight: 1.5,
        fontWeight: 400,
      }}>
        {project.tagline}
      </p>

      {/* Description - reveals on hover */}
      <div style={{
        overflow: 'hidden',
        maxHeight: hovered ? '120px' : '0px',
        opacity: hovered ? 1 : 0,
        transition: 'max-height 0.4s ease, opacity 0.3s ease',
        marginBottom: hovered ? '1rem' : '0',
      }}>
        <p style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: '0.8rem',
          color: 'rgba(var(--text-rgb),0.5)',
          lineHeight: 1.7,
        }}>
          {project.description}
        </p>
      </div>

      {/* Tech tags */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.4rem',
        marginBottom: '1.5rem',
      }}>
        {project.tech.map((t) => (
          <span key={t} className="tech-tag">{t}</span>
        ))}
      </div>

      {/* Footer */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTop: '1px solid rgba(var(--border-rgb),0.05)',
        paddingTop: '1rem',
        marginTop: 'auto',
      }}>
        <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.7rem',
          color: 'rgba(var(--text-rgb),0.25)',
          letterSpacing: '0.05em',
        }}>
          {project.year}
        </span>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          fontFamily: "'Syne', sans-serif",
          fontWeight: 600,
          fontSize: '0.75rem',
          color: hovered ? 'var(--accent)' : 'rgba(var(--text-rgb),0.3)',
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          transition: 'color 0.2s ease',
        }}>
          Explore
          <ArrowUpRight size={13} style={{
            transform: hovered ? 'translate(2px, -2px)' : 'translate(0,0)',
            transition: 'transform 0.2s ease',
          }} />
        </div>
      </div>
    </motion.div>
  )
}
