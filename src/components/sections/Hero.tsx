import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDownRight } from 'lucide-react'
import ParticleField from '../3d/ParticleField'
import FloatingGeometry from '../3d/FloatingGeometry'

const ROLES = ['Full Stack Engineer', 'GraphQL Architect', 'React Specialist', 'AI Builder']

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const [roleIdx, setRoleIdx] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [typing, setTyping] = useState(true)
  const [mounted, setMounted] = useState(false)

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const fadeOut = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  useEffect(() => { setMounted(true) }, [])

  // Typewriter effect
  useEffect(() => {
    const current = ROLES[roleIdx]
    let i = 0
    let timeout: ReturnType<typeof setTimeout>

    if (typing) {
      const type = () => {
        if (i <= current.length) {
          setDisplayed(current.slice(0, i))
          i++
          timeout = setTimeout(type, 55)
        } else {
          timeout = setTimeout(() => setTyping(false), 2200)
        }
      }
      type()
    } else {
      const erase = () => {
        if (i >= 0) {
          setDisplayed(current.slice(0, i))
          i--
          timeout = setTimeout(erase, 28)
        } else {
          setRoleIdx(r => (r + 1) % ROLES.length)
          setTyping(true)
        }
      }
      i = current.length
      erase()
    }
    return () => clearTimeout(timeout)
  }, [roleIdx, typing])

  const scrollDown = () =>
    document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' })

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
  }
  const item = {
    hidden: { y: 60, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] } },
  }

  return (
    <section ref={ref} style={{
      position: 'relative', minHeight: '100dvh',
      overflow: 'hidden', background: '#0c0c0c',
      display: 'flex', flexDirection: 'column',
    }}>
      {/* Full-screen particle field */}
      <ParticleField style={{ zIndex: 0 }} />

      {/* Gradient overlays */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 80% 60% at 50% 110%, rgba(255,69,0,0.07) 0%, transparent 70%)',
      }} />
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '30%', zIndex: 2,
        background: 'linear-gradient(to top, #0c0c0c 0%, transparent 100%)',
        pointerEvents: 'none',
      }} />

      {/* Main content */}
      <motion.div style={{ y, opacity: fadeOut, position: 'relative', zIndex: 3, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: 'clamp(5rem,10vw,7rem) 1.5rem 3rem', width: '100%' }}>

          <div style={{
            display: 'grid', gridTemplateColumns: '1fr',
            gap: '3rem', alignItems: 'center',
          }} className="hero-layout">

            {/* Left: Text */}
            <motion.div variants={container} initial="hidden" animate={mounted ? 'show' : 'hidden'}>

              {/* Availability badge */}
              <motion.div variants={item} style={{ marginBottom: '2rem' }}>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '0.35rem 0.9rem',
                  background: 'rgba(0,233,106,0.08)',
                  border: '1px solid rgba(0,233,106,0.2)',
                  fontFamily: "'DM Mono', monospace",
                  fontSize: '0.68rem', color: '#00e96a',
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                }}>
                  <span style={{
                    width: 6, height: 6, borderRadius: '50%',
                    background: '#00e96a', boxShadow: '0 0 6px #00e96a',
                  }} />
                  Open to work
                </span>
              </motion.div>

              {/* Name */}
              <div style={{ marginBottom: 'clamp(1rem,2.5vw,1.75rem)', overflow: 'hidden' }}>
                <motion.h1
                  variants={item}
                  style={{
                    fontFamily: "'Bricolage Grotesque', sans-serif",
                    fontWeight: 800,
                    fontSize: 'clamp(3.2rem, 9.5vw, 9.5rem)',
                    lineHeight: 0.88, letterSpacing: '-0.04em',
                    color: '#f5f0eb', margin: 0,
                  }}
                >
                  Hrushikesh<br />
                  <span style={{ color: 'transparent', WebkitTextStroke: '1.5px rgba(245,240,235,0.18)' }}>
                    Yadav
                  </span>
                </motion.h1>
              </div>

              {/* Typewriter role */}
              <motion.div variants={item} style={{ marginBottom: '2rem', minHeight: '1.8rem' }}>
                <span style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 'clamp(0.85rem, 1.6vw, 1rem)',
                  color: '#ff4500', letterSpacing: '0.02em',
                }}>
                  {displayed}
                  <span style={{
                    display: 'inline-block', width: 2, height: '1em',
                    background: '#ff4500', marginLeft: 3, verticalAlign: 'middle',
                    animation: 'blink 1s step-end infinite',
                  }} />
                </span>
              </motion.div>

              {/* Bio */}
              <motion.p variants={item} style={{
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontSize: 'clamp(0.9rem, 1.5vw, 1.05rem)',
                color: 'rgba(245,240,235,0.4)',
                lineHeight: 1.75, marginBottom: '2.5rem',
                maxWidth: 480, letterSpacing: '-0.01em',
              }}>
                Building scalable SaaS platforms, AI-powered agents and developer tooling at{' '}
                <span style={{ color: 'rgba(245,240,235,0.7)', fontWeight: 600 }}>Logicwind</span>{' '}
                — React · GraphQL · TypeScript · Three.js
              </motion.p>

              {/* CTAs */}
              <motion.div variants={item} style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <button onClick={scrollDown}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    padding: '0.85rem 2rem',
                    background: '#ff4500', color: '#0c0c0c',
                    fontFamily: "'Bricolage Grotesque', sans-serif",
                    fontWeight: 700, fontSize: '0.9rem',
                    border: 'none', letterSpacing: '-0.01em',
                    transition: 'all 0.25s cubic-bezier(0.22,1,0.36,1)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-3px)'
                    e.currentTarget.style.boxShadow = '0 16px 40px rgba(255,69,0,0.35)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'none'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  View Work <ArrowDownRight size={16} />
                </button>

                <a href="mailto:yadavhrushikesh21@gmail.com"
                  style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    padding: '0.85rem 2rem',
                    background: 'transparent', color: 'rgba(245,240,235,0.55)',
                    fontFamily: "'Bricolage Grotesque', sans-serif",
                    fontWeight: 600, fontSize: '0.9rem',
                    border: '1px solid rgba(255,255,255,0.1)',
                    textDecoration: 'none', letterSpacing: '-0.01em',
                    transition: 'all 0.25s ease',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'
                    e.currentTarget.style.color = '#f5f0eb'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
                    e.currentTarget.style.color = 'rgba(245,240,235,0.55)'
                  }}
                >
                  Get in touch
                </a>
              </motion.div>
            </motion.div>

            {/* Right: 3D Geometry */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={mounted ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: 'relative',
                height: 'clamp(280px, 40vw, 520px)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
              className="hero-3d"
            >
              <FloatingGeometry />

              {/* Floating stat cards */}
              {[
                { label: 'Years exp.', value: '5+', pos: { top: '8%', left: '-5%' } },
                { label: 'Products', value: '10+', pos: { bottom: '12%', right: '0%' } },
              ].map(card => (
                <motion.div key={card.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={mounted ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 1.2, duration: 0.7 }}
                  style={{
                    position: 'absolute', ...card.pos,
                    background: 'rgba(15,15,15,0.85)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    padding: '0.75rem 1.1rem',
                    zIndex: 4,
                  }}
                >
                  <div style={{
                    fontFamily: "'Bricolage Grotesque', sans-serif",
                    fontWeight: 800, fontSize: '1.6rem',
                    color: '#ff4500', lineHeight: 1, letterSpacing: '-0.04em',
                  }}>{card.value}</div>
                  <div style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: '0.6rem', color: 'rgba(245,240,235,0.3)',
                    letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: 2,
                  }}>{card.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Bottom ticker */}
      <div style={{
        position: 'relative', zIndex: 5,
        borderTop: '1px solid rgba(255,255,255,0.06)',
        overflow: 'hidden',
        background: 'rgba(12,12,12,0.8)', backdropFilter: 'blur(10px)',
      }}>
        <div className="marquee-track" style={{ padding: '0.8rem 0' }}>
          {Array(3).fill([
            'React 19', '×', 'TypeScript', '×', 'Three.js', '×', 'GraphQL', '×',
            'Next.js 15', '×', 'Vite', '×', 'AI SDK', '×', 'Turborepo', '×',
            'Cloudflare Workers', '×', 'shadcn/ui', '×', 'React Flow', '×',
          ]).flat().map((t, i) => (
            <span key={i} style={{
              fontFamily: t === '×' ? 'serif' : "'DM Mono', monospace",
              fontSize: '0.68rem',
              color: t === '×' ? '#2a2a2a' : 'rgba(245,240,235,0.18)',
              letterSpacing: t === '×' ? 0 : '0.1em',
              textTransform: 'uppercase',
              padding: t === '×' ? '0 1rem' : '0 1.75rem',
              whiteSpace: 'nowrap',
            }}>{t}</span>
          ))}
        </div>
      </div>

      <style>{`
        @media (min-width: 900px) {
          .hero-layout { grid-template-columns: 1fr 1fr !important; }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </section>
  )
}
