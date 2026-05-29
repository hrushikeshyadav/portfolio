import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import SkillsRing from '../3d/SkillsRing'

const CATEGORIES = [
  { label: 'Frontend', color: '#ff4500', items: ['React 19', 'TypeScript', 'Next.js 15', 'Vite', 'Tailwind v4', 'Framer Motion', 'Ant Design', 'shadcn/ui'] },
  { label: 'API & Data', color: '#00b4d8', items: ['GraphQL', 'Apollo Client', 'Apollo Server', 'TanStack Query', 'REST APIs', 'GraphQL Codegen', 'Zod', 'Drizzle'] },
  { label: 'AI & Agents', color: '#a855f7', items: ['Vercel AI SDK', 'Anthropic Claude', 'OpenAI API', 'Gemini', 'Tool Calling', 'RAG Pipelines', 'Streaming UI'] },
  { label: 'Infra', color: '#22c55e', items: ['Turborepo', 'Docker', 'Cloudflare Workers', 'Firebase', 'Node.js', 'GitHub Actions', 'Sentry', 'better-auth'] },
]

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] },
  }),
}

export default function Skills() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="stack" ref={ref} style={{
      padding: 'clamp(6rem, 12vw, 10rem) 1.5rem',
      background: '#0a0a0a',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', top: '3rem', right: '1.5rem',
        fontFamily: "'DM Mono', monospace", fontSize: '0.65rem',
        color: 'rgba(255,255,255,0.06)', letterSpacing: '0.1em', userSelect: 'none',
      }}>03 / STACK</div>

      <div style={{ maxWidth: 1280, margin: '0 auto' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: 'clamp(3rem, 6vw, 5rem)' }}
        >
          <h2 style={{
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontWeight: 800, fontSize: 'clamp(2.2rem, 5vw, 4rem)',
            letterSpacing: '-0.04em', color: '#f5f0eb', lineHeight: 1, margin: 0,
          }}>
            What I work with
          </h2>
          <p style={{
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontSize: 'clamp(0.9rem, 1.5vw, 1rem)',
            color: 'rgba(245,240,235,0.3)', marginTop: '1rem',
            maxWidth: 480, lineHeight: 1.7, letterSpacing: '-0.01em',
          }}>
            Five years of deliberate choices — tools I trust in production.
          </p>
        </motion.div>

        {/* Two-column: 3D sphere + skill lists */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr',
          gap: 'clamp(3rem, 6vw, 5rem)', alignItems: 'start',
        }} className="skills-layout">

          {/* 3D Skills Sphere */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            style={{
              height: 'clamp(320px, 45vw, 500px)',
              position: 'relative',
              border: '1px solid rgba(255,255,255,0.05)',
              background: 'rgba(255,255,255,0.015)',
            }}
          >
            <SkillsRing style={{ borderRadius: 0 }} />
            {/* Corner labels */}
            <div style={{
              position: 'absolute', top: '1rem', left: '1rem',
              fontFamily: "'DM Mono', monospace", fontSize: '0.6rem',
              color: 'rgba(255,69,0,0.5)', letterSpacing: '0.1em', textTransform: 'uppercase',
            }}>skills.sphere</div>
            <div style={{
              position: 'absolute', bottom: '1rem', right: '1rem',
              fontFamily: "'DM Mono', monospace", fontSize: '0.6rem',
              color: 'rgba(255,255,255,0.12)', letterSpacing: '0.06em',
            }}>drag to explore</div>
          </motion.div>

          {/* Skill category lists */}
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr',
            gap: '1px', background: 'rgba(255,255,255,0.04)',
          }}>
            {CATEGORIES.map((cat, ci) => (
              <motion.div
                key={cat.label}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: ci * 0.1, duration: 0.6 }}
                style={{
                  background: '#0a0a0a', padding: '1.5rem',
                  borderBottom: ci < 2 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                }}
              >
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  marginBottom: '1rem',
                }}>
                  <span style={{
                    width: 8, height: 8,
                    background: cat.color,
                    borderRadius: '50%',
                    boxShadow: `0 0 6px ${cat.color}`,
                    display: 'inline-block',
                  }} />
                  <span style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: '0.65rem', color: cat.color,
                    letterSpacing: '0.1em', textTransform: 'uppercase',
                  }}>{cat.label}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  {cat.items.map((item, ii) => (
                    <motion.div
                      key={item}
                      custom={ci * 8 + ii}
                      variants={itemVariants}
                      initial="hidden"
                      animate={inView ? 'visible' : 'hidden'}
                      style={{
                        fontFamily: "'Bricolage Grotesque', sans-serif",
                        fontSize: '0.82rem', color: 'rgba(245,240,235,0.5)',
                        fontWeight: 500, letterSpacing: '-0.01em',
                        display: 'flex', alignItems: 'center', gap: 8,
                        padding: '0.2rem 0',
                        borderBottom: '1px solid rgba(255,255,255,0.03)',
                        transition: 'color 0.2s',
                        cursor: 'default',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.color = cat.color)}
                      onMouseLeave={e => (e.currentTarget.style.color = 'rgba(245,240,235,0.5)')}
                    >
                      <span style={{
                        width: 3, height: 3, borderRadius: '50%',
                        background: cat.color, opacity: 0.5, flexShrink: 0,
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
