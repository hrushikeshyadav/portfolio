import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const CATEGORIES = [
  {
    label: 'Frontend',
    color: '#ff4500',
    blurb: 'Interfaces that feel instant.',
    items: ['React 19', 'TypeScript', 'Next.js 15', 'Vite', 'Tailwind v4', 'Framer Motion', 'Three.js', 'shadcn/ui'],
  },
  {
    label: 'API & Data',
    color: '#00b4d8',
    blurb: 'The contract between client and server.',
    items: ['GraphQL', 'Apollo Client', 'Apollo Server', 'TanStack Query', 'REST', 'GraphQL Codegen', 'Zod', 'Drizzle'],
  },
  {
    label: 'AI & Agents',
    color: '#a855f7',
    blurb: 'Shipping LLMs into real products.',
    items: ['Vercel AI SDK', 'Anthropic Claude', 'OpenAI', 'Gemini', 'Tool Calling', 'RAG', 'Streaming UI', 'MediaPipe'],
  },
  {
    label: 'Infrastructure',
    color: '#22c55e',
    blurb: 'What keeps it all running.',
    items: ['Turborepo', 'Docker', 'Cloudflare Workers', 'Firebase', 'Node.js', 'GitHub Actions', 'Sentry', 'better-auth'],
  },
]

function Card({ cat, i, inView }: { cat: (typeof CATEGORIES)[0]; i: number; inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'relative', overflow: 'hidden',
        background: 'rgba(255,255,255,0.018)',
        border: '1px solid rgba(255,255,255,0.07)',
        padding: 'clamp(1.5rem, 3vw, 2.25rem)',
        transition: 'border-color 0.3s ease, transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s ease',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = `${cat.color}55`
        e.currentTarget.style.transform = 'translateY(-4px)'
        e.currentTarget.style.boxShadow = `0 18px 50px ${cat.color}14`
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
        e.currentTarget.style.transform = ''
        e.currentTarget.style.boxShadow = ''
      }}
    >
      {/* Top accent line */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 2,
        background: `linear-gradient(90deg, ${cat.color}, transparent)`,
      }} />

      {/* Corner glow */}
      <div style={{
        position: 'absolute', top: -40, right: -40, width: 160, height: 160,
        background: `radial-gradient(circle, ${cat.color}1a, transparent 70%)`,
        pointerEvents: 'none',
      }} />

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{
            width: 9, height: 9, borderRadius: '50%', background: cat.color,
            boxShadow: `0 0 12px ${cat.color}`, flexShrink: 0,
          }} />
          <h3 style={{
            fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800,
            fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', letterSpacing: '-0.03em',
            color: '#f5f5f7', margin: 0,
          }}>{cat.label}</h3>
        </div>
        <span style={{
          fontFamily: "'DM Mono', monospace", fontSize: '0.62rem',
          color: 'rgba(245,245,247,0.25)', letterSpacing: '0.06em',
        }}>{String(cat.items.length).padStart(2, '0')}</span>
      </div>

      {/* Blurb */}
      <p style={{
        fontFamily: "'Bricolage Grotesque', sans-serif",
        fontSize: '0.85rem', color: 'rgba(245,245,247,0.4)',
        margin: '0 0 1.5rem', letterSpacing: '-0.01em',
      }}>{cat.blurb}</p>

      {/* Skill pills */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
        {cat.items.map((item, ii) => (
          <motion.span
            key={item}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: i * 0.1 + 0.15 + ii * 0.04, duration: 0.35 }}
            style={{
              fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 500,
              fontSize: '0.82rem', color: 'rgba(245,245,247,0.62)',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              padding: '0.4rem 0.8rem', borderRadius: 100,
              cursor: 'default', transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = '#fff'
              e.currentTarget.style.borderColor = `${cat.color}aa`
              e.currentTarget.style.background = `${cat.color}1f`
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = 'rgba(245,245,247,0.62)'
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
              e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
            }}
          >{item}</motion.span>
        ))}
      </div>
    </motion.div>
  )
}

export default function Skills() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="stack" ref={ref} style={{
      padding: 'clamp(7rem, 14vw, 12rem) clamp(1.5rem,5vw,4rem)',
      background: '#050505',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', top: '3rem', right: '1.5rem',
        fontFamily: "'DM Mono', monospace", fontSize: '0.62rem',
        color: 'rgba(255,255,255,0.05)', letterSpacing: '0.14em', userSelect: 'none',
      }}>03 / STACK</div>

      <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 'clamp(3rem, 6vw, 4.5rem)', maxWidth: 720 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1.25rem' }}>
            <span style={{ width: 28, height: '1.5px', background: '#ff4500', display: 'inline-block' }} />
            <span style={{
              fontFamily: "'DM Mono', monospace", fontSize: '0.62rem',
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
            fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)',
            color: 'rgba(245,245,247,0.4)', marginTop: '1.25rem',
            maxWidth: 520, lineHeight: 1.7, letterSpacing: '-0.01em',
          }}>
            Five years of deliberate choices — not a checklist, but the tools I
            reach for and trust in production.
          </p>
        </motion.div>

        {/* Card grid */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr',
          gap: 'clamp(0.85rem, 1.5vw, 1.25rem)',
        }} className="stack-grid">
          {CATEGORIES.map((cat, i) => (
            <Card key={cat.label} cat={cat} i={i} inView={inView} />
          ))}
        </div>
      </div>

      <style>{`
        @media (min-width: 760px) {
          .stack-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </section>
  )
}
