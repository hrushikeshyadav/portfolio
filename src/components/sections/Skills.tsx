import { useRef, useState, useEffect } from 'react'
import {
  motion, AnimatePresence, useInView, useScroll, useMotionValueEvent, type Variants,
} from 'framer-motion'
import { Layers, Sparkles, Share2, Server, Database, Plug, Wrench, type LucideIcon } from 'lucide-react'
import AnimatedHeading from '../ui/AnimatedHeading'

/**
 * Stack as a scroll-driven explorer. The section is tall; its content pins to
 * the viewport and the active discipline advances as you scroll through it —
 * no clicking required. The detail panel cross-fades, the index marker slides.
 * Folds to a compact pinned view (progress dots + detail) on phones.
 * Monochrome + accent + motion; type weight encodes proficiency.
 */
type Group = {
  label: string
  note: string
  Icon: LucideIcon
  core: string[]
  rest: string[]
}

const STACK: Group[] = [
  {
    label: 'Frontend', Icon: Layers,
    note: 'Component architecture, state & performance.',
    core: ['React', 'Next.js', 'TypeScript'],
    rest: ['JavaScript (ES6+)', 'Tailwind CSS', 'Framer Motion', 'Ant Design'],
  },
  {
    label: 'AI & Agents', Icon: Sparkles,
    note: 'Conversational agents, streaming & tool use.',
    core: ['Vercel AI SDK', 'Mastra', 'MCP'],
    rest: ['Anthropic Claude', 'OpenAI', 'Conversational agents'],
  },
  {
    label: 'APIs', Icon: Share2,
    note: 'Typed graphs, normalized caching, codegen.',
    core: ['GraphQL', 'Apollo Client'],
    rest: ['REST', 'GraphQL Codegen', 'WebSockets / streaming'],
  },
  {
    label: 'Backend', Icon: Server,
    note: 'Node services, resolvers & durable workflows.',
    core: ['Node.js', 'Hono'],
    rest: ['Express.js', 'Temporal', 'Drizzle ORM', 'Puppeteer'],
  },
  {
    label: 'Databases', Icon: Database,
    note: 'Relational + document modelling, multi-tenant.',
    core: ['PostgreSQL', 'MongoDB'],
    rest: ['MySQL', 'Firestore'],
  },
  {
    label: 'Integrations', Icon: Plug,
    note: 'Auth, payments, analytics & messaging.',
    core: ['Headless WordPress', 'Paddle', 'PostHog'],
    rest: ['WhatsApp Cloud API', 'Firebase', 'MSG91', 'OneSignal', 'HubSpot', 'Amplitude'],
  },
  {
    label: 'Platforms & Tools', Icon: Wrench,
    note: 'Ship, version & host across CI and the edge.',
    core: ['Git', 'Turborepo', 'Docker'],
    rest: ['pnpm', 'Cloudflare Pages', 'Vercel', 'Firebase Hosting'],
  },
]
const N = STACK.length

function useIsMobile(query = '(max-width: 820px)') {
  const [m, setM] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia(query)
    const u = () => setM(mq.matches)
    u(); mq.addEventListener('change', u)
    return () => mq.removeEventListener('change', u)
  }, [query])
  return m
}

const EASE = [0.16, 1, 0.3, 1] as const
const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n))

const panelV: Variants = {
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE, staggerChildren: 0.05, delayChildren: 0.05 } },
  exit: { opacity: 0, y: -16, transition: { duration: 0.28, ease: EASE } },
}
const itemV: Variants = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } },
  exit: { opacity: 0 },
}

function Detail({ g, i, compact }: { g: Group; i: number; compact?: boolean }) {
  const { Icon } = g
  return (
    <motion.div key={i} variants={panelV} initial="initial" animate="animate" exit="exit"
      style={{ position: 'relative' }}>
      {/* giant ghost numeral */}
      {!compact && (
        <span style={{
          position: 'absolute', top: '-3rem', right: 0, zIndex: 0,
          fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800,
          fontSize: 'clamp(8rem, 16vw, 13rem)', lineHeight: 1,
          color: 'transparent', WebkitTextStroke: '1.5px rgba(var(--text-rgb),0.06)',
          userSelect: 'none', pointerEvents: 'none',
        }}>{String(i).padStart(2, '0')}</span>
      )}

      <div style={{ position: 'relative', zIndex: 1 }}>
        <motion.div variants={itemV} style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: '1.1rem' }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: compact ? 42 : 46, height: compact ? 42 : 46, borderRadius: 13, flexShrink: 0,
            background: 'rgba(var(--accent-rgb),0.12)', border: '1px solid rgba(var(--accent-rgb),0.24)',
            color: 'var(--accent)',
          }}><Icon size={compact ? 20 : 22} strokeWidth={2} /></span>
          <h3 style={{
            fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800,
            fontSize: compact ? 'clamp(1.7rem,7vw,2.2rem)' : 'clamp(1.8rem, 3.5vw, 2.8rem)',
            letterSpacing: '-0.04em', color: 'var(--text)', lineHeight: 1, margin: 0,
          }}>{g.label}</h3>
        </motion.div>

        <motion.p variants={itemV} style={{
          fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 'clamp(0.92rem,1.4vw,1.05rem)',
          color: 'rgba(var(--text-rgb),0.45)', lineHeight: 1.6, letterSpacing: '-0.01em',
          margin: '0 0 1.6rem', maxWidth: 440,
        }}>{g.note}</motion.p>

        <motion.div variants={itemV} style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.6rem', color: 'var(--accent)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '0.85rem' }}>
          Daily drivers
        </motion.div>
        <div style={{ display: 'flex', flexWrap: 'wrap', columnGap: 'clamp(1.1rem,2.4vw,2rem)', rowGap: '0.5rem', marginBottom: '1.6rem' }}>
          {g.core.map((t) => (
            <motion.span key={t} variants={itemV} style={{
              fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700,
              fontSize: 'clamp(1.05rem, 2vw, 1.45rem)', letterSpacing: '-0.025em',
              color: 'var(--text)', lineHeight: 1.15,
            }}>{t}</motion.span>
          ))}
        </div>

        <motion.div variants={itemV} style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
          {g.rest.map((t) => <span key={t} className="tech-tag">{t}</span>)}
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null)
  const headRef = useRef(null)
  const inView = useInView(headRef, { once: true, margin: '-80px' })
  const isMobile = useIsMobile()
  const [active, setActive] = useState(0)

  // Drive the active discipline from scroll progress through the tall section.
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] })
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setActive(clamp(Math.floor(v * N), 0, N - 1))
  })

  const jumpTo = (i: number) => {
    const el = sectionRef.current
    if (!el) return
    const start = el.getBoundingClientRect().top + window.scrollY
    const dist = el.offsetHeight - window.innerHeight
    const y = start + ((i + 0.5) / N) * dist
    const lenis = (window as unknown as { lenis?: { scrollTo: (t: number) => void } }).lenis
    if (lenis) lenis.scrollTo(y)
    else window.scrollTo({ top: y, behavior: 'smooth' })
  }

  return (
    <section ref={sectionRef} id="stack" style={{
      position: 'relative',
      // The pinned inner is 100vh, so scrollable distance = height - 100vh.
      // Give each discipline ~90vh of that so one scroll gesture ≈ one step
      // (was too short before — a single scroll jumped 2-3 disciplines).
      height: `${N * 90 + 100}vh`,
      background: 'rgba(var(--bg-rgb), 0.66)',
      borderTop: '1px solid rgba(var(--border-rgb),0.06)',
    }}>
      {/* pinned viewport */}
      <div style={{
        position: 'sticky', top: 0, height: '100vh', overflow: 'hidden',
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: 'clamp(5rem,9vw,7rem) clamp(1.5rem,5vw,4rem) clamp(2rem,5vw,4rem)',
      }}>
        <div style={{
          position: 'absolute', top: '2.5rem', right: '1.5rem',
          fontFamily: "'DM Mono', monospace", fontSize: '0.62rem',
          color: 'rgba(var(--border-rgb),0.05)', letterSpacing: '0.14em', userSelect: 'none',
        }}>04 / STACK</div>

        <div style={{ maxWidth: 1180, width: '100%', margin: '0 auto', position: 'relative' }}>
          {/* Header */}
          <motion.div
            ref={headRef}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            style={{ marginBottom: 'clamp(1.8rem, 4vw, 3rem)', maxWidth: 760 }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1rem' }}>
              <span style={{ width: 28, height: '1.5px', background: 'var(--accent)', display: 'inline-block' }} />
              <span style={{
                fontFamily: "'DM Mono', monospace", fontSize: '0.62rem',
                color: 'var(--accent)', letterSpacing: '0.14em', textTransform: 'uppercase',
              }}>Tech Stack</span>
            </div>
            <AnimatedHeading
              text="The working set."
              style={{
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontWeight: 800, fontSize: 'clamp(2.2rem, 5vw, 4rem)',
                letterSpacing: '-0.04em', color: 'var(--text)', lineHeight: 1, margin: 0,
              }}
            />
            <p style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontSize: 'clamp(0.9rem, 1.4vw, 1.02rem)',
              color: 'rgba(var(--text-rgb),0.4)', marginTop: '1rem',
              maxWidth: 540, lineHeight: 1.65, letterSpacing: '-0.01em',
            }}>
              Keep scrolling to move through it. The accent names are what I reach
              for daily — the rest is fluent and shipped to production.
            </p>
          </motion.div>

          {isMobile ? (
            /* Mobile: progress dots + detail */
            <div>
              <div style={{ display: 'flex', gap: 7, marginBottom: '2rem' }}>
                {STACK.map((g, i) => (
                  <span key={g.label} aria-hidden style={{
                    height: 4, borderRadius: 4, flex: active === i ? '0 0 28px' : '0 0 14px',
                    background: active === i ? 'var(--accent)' : 'rgba(var(--text-rgb),0.16)',
                    transition: 'flex-basis 0.4s ease, background 0.4s ease',
                  }} />
                ))}
              </div>
              <div style={{ minHeight: '46vh' }}>
                <AnimatePresence mode="wait">
                  <Detail key={active} g={STACK[active]} i={active} compact />
                </AnimatePresence>
              </div>
            </div>
          ) : (
            /* Desktop: index list + detail */
            <div style={{ display: 'grid', gridTemplateColumns: '0.82fr 1.18fr', gap: 'clamp(2rem,5vw,4.5rem)', alignItems: 'flex-start' }}>
              <div role="tablist" aria-label="Disciplines">
                {STACK.map((g, i) => {
                  const on = active === i
                  return (
                    <button
                      key={g.label}
                      role="tab"
                      aria-selected={on}
                      onClick={() => jumpTo(i)}
                      style={{
                        position: 'relative', width: '100%', textAlign: 'left',
                        background: 'none', border: 'none', cursor: 'pointer',
                        display: 'flex', alignItems: 'baseline', gap: 14,
                        padding: 'clamp(0.55rem,1.2vw,0.85rem) 0 clamp(0.55rem,1.2vw,0.85rem) 18px',
                        borderTop: i === 0 ? 'none' : '1px solid rgba(var(--border-rgb),0.08)',
                      }}
                    >
                      {on && (
                        <motion.span layoutId="stack-marker" transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                          style={{ position: 'absolute', left: 0, top: '20%', bottom: '20%', width: 3, borderRadius: 3, background: 'var(--accent)' }} />
                      )}
                      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.68rem', letterSpacing: '0.06em', color: on ? 'var(--accent)' : 'rgba(var(--text-rgb),0.28)', transition: 'color 0.3s' }}>
                        {String(i).padStart(2, '0')}
                      </span>
                      <span style={{
                        fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800,
                        fontSize: 'clamp(1.2rem, 2.2vw, 1.85rem)', letterSpacing: '-0.035em', lineHeight: 1.1,
                        color: on ? 'var(--text)' : 'rgba(var(--text-rgb),0.4)', transition: 'color 0.35s',
                      }}>{g.label}</span>
                    </button>
                  )
                })}
              </div>

              <div style={{ position: 'relative', minHeight: 340 }}>
                <AnimatePresence mode="wait">
                  <Detail key={active} g={STACK[active]} i={active} />
                </AnimatePresence>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
