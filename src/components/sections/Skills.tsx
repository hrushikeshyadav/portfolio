import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import SkillsRing from '../3d/SkillsRing'

const CATEGORIES = [
  {
    label: 'Frontend', color: '#ff4500',
    items: ['React 19', 'TypeScript', 'Next.js 15', 'Vite', 'Tailwind v4', 'Framer Motion', 'Ant Design', 'shadcn/ui'],
  },
  {
    label: 'API & Data', color: '#00b4d8',
    items: ['GraphQL', 'Apollo Client', 'Apollo Server', 'TanStack Query', 'REST APIs', 'GraphQL Codegen', 'Zod', 'Drizzle'],
  },
  {
    label: 'AI & Agents', color: '#a855f7',
    items: ['Vercel AI SDK', 'Anthropic Claude', 'OpenAI API', 'Gemini', 'Tool Calling', 'RAG Pipelines', 'Streaming UI'],
  },
  {
    label: 'Infrastructure', color: '#22c55e',
    items: ['Turborepo', 'Docker', 'Cloudflare Workers', 'Firebase', 'Node.js', 'GitHub Actions', 'Sentry', 'better-auth'],
  },
]

export default function Skills() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="stack" ref={ref} style={{
      padding: 'clamp(7rem, 14vw, 12rem) 1.5rem',
      background: '#050505',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', top: '3rem', right: '1.5rem',
        fontFamily: "'DM Mono', monospace", fontSize: '0.62rem',
        color: 'rgba(255,255,255,0.05)', letterSpacing: '0.14em', userSelect: 'none',
      }}>03 / STACK</div>

      {/* Subtle bg gradient */}
      <div style={{
        position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)',
        width: '60vw', height: '60vw', maxWidth: 800, maxHeight: 800,
        background: 'radial-gradient(ellipse, rgba(168,85,247,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 'clamp(3rem, 6vw, 5rem)' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1.5rem' }}>
            <span style={{ width: 28, height: '1.5px', background: '#ff4500', display: 'inline-block' }} />
            <span style={{
              fontFamily: "'DM Mono', monospace", fontSize: '0.65rem',
              color: '#ff4500', letterSpacing: '0.14em', textTransform: 'uppercase',
            }}>Tech Stack</span>
          </div>
          <h2 style={{
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontWeight: 800, fontSize: 'clamp(2.4rem, 5.5vw, 4.5rem)',
            letterSpacing: '-0.04em', color: '#f5f5f7', lineHeight: 1, margin: 0,
          }}>What I work with</h2>
          <p style={{
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontSize: 'clamp(0.9rem, 1.4vw, 1rem)',
            color: 'rgba(245,245,247,0.3)', marginTop: '1rem',
            maxWidth: 460, lineHeight: 1.75, letterSpacing: '-0.01em',
          }}>
            Five years of deliberate choices — tools I trust in production.
          </p>
        </motion.div>

        {/* Two-column: sphere + category lists */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr',
          gap: 'clamp(2.5rem, 5vw, 4rem)', alignItems: 'start',
        }} className="skills-layout">

          {/* 3D Sphere */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              height: 'clamp(300px, 42vw, 480px)',
              position: 'relative',
              border: '1px solid rgba(255,255,255,0.05)',
              background: 'rgba(255,255,255,0.012)',
              overflow: 'hidden',
            }}
          >
            <SkillsRing />
            <div style={{
              position: 'absolute', top: '1rem', left: '1rem',
              fontFamily: "'DM Mono', monospace", fontSize: '0.58rem',
              color: 'rgba(255,69,0,0.45)', letterSpacing: '0.1em', textTransform: 'uppercase',
            }}>skills.sphere</div>
            <div style={{
              position: 'absolute', bottom: '1rem', right: '1rem',
              fontFamily: "'DM Mono', monospace", fontSize: '0.58rem',
              color: 'rgba(255,255,255,0.1)', letterSpacing: '0.06em',
            }}>drag to explore</div>
          </motion.div>

          {/* Category grids */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: 'rgba(255,255,255,0.05)' }}>
            {CATEGORIES.map((cat, ci) => (
              <motion.div
                key={cat.label}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.08 * ci, duration: 0.6 }}
                style={{
                  background: '#050505',
                  padding: 'clamp(1.2rem, 2.5vw, 1.75rem)',
                }}
              >
                {/* Label */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: '1.1rem' }}>
                  <span style={{
                    width: 7, height: 7, borderRadius: '50%',
                    background: cat.color, flexShrink: 0,
                    boxShadow: `0 0 8px ${cat.color}55`,
                  }} />
                  <span style={{
                    fontFamily: "'DM Mono', monospace", fontSize: '0.62rem',
                    color: cat.color, letterSpacing: '0.1em', textTransform: 'uppercase',
                    fontWeight: 700,
                  }}>{cat.label}</span>
                </div>

                {/* Items */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.28rem' }}>
                  {cat.items.map((item, ii) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, x: -8 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.08 * ci + 0.04 * ii, duration: 0.4 }}
                      style={{
                        fontFamily: "'Bricolage Grotesque', sans-serif",
                        fontSize: '0.82rem',
                        color: 'rgba(245,245,247,0.48)',
                        fontWeight: 500,
                        letterSpacing: '-0.01em',
                        padding: '0.22rem 0',
                        borderBottom: '1px solid rgba(255,255,255,0.04)',
                        display: 'flex', alignItems: 'center', gap: 7,
                        transition: 'color 0.2s',
                        cursor: 'default',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.color = cat.color)}
                      onMouseLeave={e => (e.currentTarget.style.color = 'rgba(245,245,247,0.48)')}
                    >
                      <span style={{
                        width: 3, height: 3, borderRadius: '50%',
                        background: cat.color, opacity: 0.45, flexShrink: 0,
                      }} />
                      {item}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 900px) {
          .skills-layout { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </section>
  )
}
