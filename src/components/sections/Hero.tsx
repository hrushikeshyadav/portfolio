import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import ParticleField from '../3d/ParticleField'

const ROLES = ['Full Stack Engineer', 'GraphQL Architect', 'React Specialist', 'AI Builder']

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const [roleIdx, setRoleIdx] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [typing, setTyping] = useState(true)
  const [mounted, setMounted] = useState(false)

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const opacity = useTransform(scrollYProgress, [0, 0.55], [1, 0])

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    const current = ROLES[roleIdx]
    let i = 0
    let t: ReturnType<typeof setTimeout>
    if (typing) {
      const type = () => {
        if (i <= current.length) { setDisplayed(current.slice(0, i++)); t = setTimeout(type, 48) }
        else t = setTimeout(() => setTyping(false), 2400)
      }
      type()
    } else {
      const erase = () => {
        if (i >= 0) { setDisplayed(current.slice(0, i--)); t = setTimeout(erase, 22) }
        else { setRoleIdx(r => (r + 1) % ROLES.length); setTyping(true) }
      }
      i = current.length; erase()
    }
    return () => clearTimeout(t)
  }, [roleIdx, typing])

  const scrollDown = () => document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section ref={ref} style={{
      position: 'relative', minHeight: '100dvh',
      overflow: 'hidden', background: '#000',
      display: 'flex', flexDirection: 'column',
    }}>
      {/* Particle bg */}
      <ParticleField style={{ zIndex: 0 }} />

      {/* Radial gradient */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 70% 50% at 50% 100%, rgba(255,69,0,0.09) 0%, transparent 70%)',
      }} />

      {/* Bottom fade */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '28%', zIndex: 2,
        background: 'linear-gradient(to top, #000 0%, transparent 100%)',
        pointerEvents: 'none',
      }} />

      {/* Content */}
      <motion.div style={{ y, opacity, position: 'relative', zIndex: 3, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: 'clamp(6rem,11vw,8rem) 1.5rem 2rem', width: '100%' }}>

          {/* Available badge */}
          {mounted && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              style={{ marginBottom: '2.5rem' }}
            >
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '0.38rem 1rem',
                background: 'rgba(48,209,88,0.06)',
                border: '1px solid rgba(48,209,88,0.2)',
                fontFamily: "'DM Mono', monospace",
                fontSize: '0.66rem', color: '#30d158',
                letterSpacing: '0.12em', textTransform: 'uppercase',
              }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#30d158', boxShadow: '0 0 8px #30d158', flexShrink: 0 }} />
                Open to work
              </span>
            </motion.div>
          )}

          {/* Name — two lines, massive */}
          <div style={{ overflow: 'hidden', marginBottom: '0.1em' }}>
            {mounted && (
              <motion.h1
                initial={{ y: '105%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
                style={{
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  fontWeight: 800,
                  fontSize: 'clamp(3.8rem, 10.5vw, 11rem)',
                  lineHeight: 0.9, letterSpacing: '-0.04em',
                  color: '#f5f5f7', margin: 0, display: 'block',
                }}
              >Hrushikesh</motion.h1>
            )}
          </div>
          <div style={{ overflow: 'hidden', marginBottom: 'clamp(1.5rem, 3vw, 2.5rem)' }}>
            {mounted && (
              <motion.h1
                initial={{ y: '105%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
                style={{
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  fontWeight: 800,
                  fontSize: 'clamp(3.8rem, 10.5vw, 11rem)',
                  lineHeight: 0.9, letterSpacing: '-0.04em',
                  color: 'transparent',
                  WebkitTextStroke: '1.5px rgba(245,245,247,0.22)',
                  margin: 0, display: 'block',
                }}
              >Yadav</motion.h1>
            )}
          </div>

          {/* Role line + bio */}
          {mounted && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: 'clamp(2rem, 4vw, 3rem)' }}
            >
              {/* Typewriter role */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{
                  width: 24, height: 1.5, background: '#ff4500', display: 'inline-block', flexShrink: 0,
                }} />
                <span style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 'clamp(0.8rem, 1.4vw, 0.95rem)',
                  color: '#ff4500', letterSpacing: '0.04em',
                  minHeight: '1.4em', display: 'inline-block',
                }}>
                  {displayed}
                  <span style={{
                    display: 'inline-block', width: '2px', height: '1em',
                    background: '#ff4500', marginLeft: 2, verticalAlign: 'middle',
                    animation: 'blink 1s step-end infinite',
                  }} />
                </span>
              </div>
              <p style={{
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontSize: 'clamp(0.92rem, 1.4vw, 1.05rem)',
                color: 'rgba(245,245,247,0.38)',
                lineHeight: 1.75, maxWidth: 500, letterSpacing: '-0.01em', margin: 0,
              }}>
                Building production SaaS, AI agents and dev tooling at{' '}
                <span style={{ color: 'rgba(245,245,247,0.7)', fontWeight: 600 }}>Logicwind</span>.
                React · GraphQL · TypeScript · Three.js
              </p>
            </motion.div>
          )}

          {/* CTAs */}
          {mounted && (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}
            >
              <button onClick={scrollDown}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '0.85rem 2rem',
                  background: '#ff4500', color: '#000',
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  fontWeight: 700, fontSize: '0.9rem',
                  border: 'none', letterSpacing: '-0.01em',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-3px)'
                  e.currentTarget.style.boxShadow = '0 20px 50px rgba(255,69,0,0.4)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = ''
                  e.currentTarget.style.boxShadow = ''
                }}
              >
                View Work <ArrowDownRight size={16} />
              </button>
              <a href="mailto:yadavhrushikesh21@gmail.com"
                style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '0.85rem 2rem',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'rgba(245,245,247,0.55)',
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  fontWeight: 600, fontSize: '0.9rem',
                  textDecoration: 'none', letterSpacing: '-0.01em',
                  transition: 'all 0.25s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'
                  e.currentTarget.style.color = '#f5f5f7'
                  e.currentTarget.style.background = 'rgba(255,255,255,0.07)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
                  e.currentTarget.style.color = 'rgba(245,245,247,0.55)'
                  e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                }}
              >
                Get in touch <ArrowUpRight size={16} />
              </a>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Stats row at bottom */}
      {mounted && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          style={{
            position: 'relative', zIndex: 4,
            borderTop: '1px solid rgba(255,255,255,0.06)',
            background: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(20px)',
          }}
        >
          <div style={{
            maxWidth: 1280, margin: '0 auto',
            padding: '1.25rem 1.5rem',
            display: 'flex', gap: 0,
            overflowX: 'auto',
          }}>
            {[
              { n: '5+', label: 'Years shipping production code' },
              { n: '10+', label: 'SaaS & AI products built' },
              { n: '3.7k+', label: 'Releases on DigiQC' },
              { n: '3', label: 'Multi-tenant platforms' },
            ].map((s, i) => (
              <div key={s.n} style={{
                padding: '0.5rem 2.5rem 0.5rem 0',
                marginRight: '2.5rem',
                borderRight: i < 3 ? '1px solid rgba(255,255,255,0.07)' : 'none',
                flexShrink: 0,
              }}>
                <div style={{
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  fontWeight: 800, fontSize: 'clamp(1.4rem, 3vw, 1.8rem)',
                  color: '#ff4500', lineHeight: 1, letterSpacing: '-0.04em',
                  marginBottom: '0.25rem',
                }}>{s.n}</div>
                <div style={{
                  fontFamily: "'DM Mono', monospace", fontSize: '0.6rem',
                  color: 'rgba(245,245,247,0.28)', letterSpacing: '0.06em',
                  textTransform: 'uppercase', lineHeight: 1.4,
                }}>{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
      `}</style>
    </section>
  )
}
