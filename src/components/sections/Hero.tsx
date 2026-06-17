import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import Magnetic from '../ui/Magnetic'
import HeroScene from '../3d/HeroScene'

const ROLES = ['Full Stack Engineer', 'GraphQL Architect', 'React Specialist', 'AI Builder']

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const [roleIdx, setRoleIdx] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [typing, setTyping] = useState(true)
  const [mounted, setMounted] = useState(false)

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    const current = ROLES[roleIdx]
    let i = 0
    let t: ReturnType<typeof setTimeout>
    if (typing) {
      const type = () => {
        if (i <= current.length) { setDisplayed(current.slice(0, i++)); t = setTimeout(type, 52) }
        else t = setTimeout(() => setTyping(false), 2600)
      }
      type()
    } else {
      const erase = () => {
        if (i >= 0) { setDisplayed(current.slice(0, i--)); t = setTimeout(erase, 24) }
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
      background: '#0a0a0b',
      display: 'flex', flexDirection: 'column',
      overflow: 'hidden',
    }}>
      {/* Very subtle radial glow */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 80% 60% at 50% 115%, rgba(255,69,0,0.06) 0%, transparent 60%)',
      }} />

      {/* Thin grid lines */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.025,
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
        backgroundSize: '80px 80px',
      }} />

      {/* 3D centerpiece — upper-right, behind the name */}
      <div className="hero-3d" style={{
        position: 'absolute', top: '-6%', right: '-8%',
        width: 'min(70vw, 760px)', height: 'min(85vh, 760px)',
        zIndex: 1, pointerEvents: 'none',
      }}>
        <HeroScene />
        {/* readability vignette toward the text side */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 60% 60% at 70% 40%, transparent 30%, rgba(10,10,11,0.55) 75%)',
        }} />
      </div>

      <motion.div style={{ y, opacity, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', zIndex: 2 }}>
        <div style={{ padding: 'clamp(7rem,12vw,9rem) clamp(1.5rem,5vw,4rem) 3rem', width: '100%', maxWidth: 1440, margin: '0 auto' }}>

          {/* Available badge */}
          {mounted && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} style={{ marginBottom: '3rem' }}>
              <span className="glass glass-rim" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '0.4rem 1rem',
                ['--glass-radius' as string]: '999px',
                ['--glass-blur' as string]: '8px',
                border: '1px solid rgba(48,209,88,0.28)',
                fontFamily: "'DM Mono', monospace",
                fontSize: '0.62rem', color: '#30d158', letterSpacing: '0.14em', textTransform: 'uppercase',
              }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#30d158', boxShadow: '0 0 8px #30d158' }} />
                Available for work
              </span>
            </motion.div>
          )}

          {/* MASSIVE NAME */}
          <div style={{ overflow: 'hidden', lineHeight: 0.85, marginBottom: '0.08em' }}>
            {mounted && (
              <motion.div
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                style={{
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  fontWeight: 800,
                  fontSize: 'clamp(4.5rem, 15.5vw, 15rem)',
                  letterSpacing: '-0.045em',
                  color: '#f5f5f7',
                  lineHeight: 0.85,
                  whiteSpace: 'nowrap',
                }}
              >Hrushikesh</motion.div>
            )}
          </div>

          <div style={{ overflow: 'hidden', lineHeight: 0.85, marginBottom: 'clamp(2rem,4vw,3.5rem)' }}>
            {mounted && (
              <motion.div
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.22 }}
                style={{
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  fontWeight: 800,
                  fontSize: 'clamp(4.5rem, 15.5vw, 15rem)',
                  letterSpacing: '-0.045em',
                  lineHeight: 0.85,
                  WebkitTextStroke: 'clamp(1px, 0.1vw, 2px) rgba(245,245,247,0.3)',
                  color: 'transparent',
                  whiteSpace: 'nowrap',
                }}
              >Yadav.</motion.div>
            )}
          </div>

          {/* Role + Bio */}
          {mounted && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 'clamp(1rem,3vw,3rem)', marginBottom: 'clamp(2rem,4vw,3rem)' }}
            >
              {/* Divider + role */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ width: 'clamp(24px,4vw,48px)', height: 1, background: '#ff4500' }} />
                <span style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 'clamp(0.72rem,1.2vw,0.9rem)',
                  color: '#ff4500', letterSpacing: '0.04em',
                  minWidth: 240, display: 'inline-block',
                }}>
                  {displayed}
                  <span style={{ display: 'inline-block', width: 2, height: '0.9em', background: '#ff4500', marginLeft: 2, verticalAlign: 'middle', animation: 'blink 1s step-end infinite' }} />
                </span>
              </div>

              <p style={{
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontSize: 'clamp(0.9rem,1.3vw,1.05rem)',
                color: 'rgba(245,245,247,0.4)',
                lineHeight: 1.7, maxWidth: 420, letterSpacing: '-0.01em', margin: 0,
              }}>
                Building production SaaS & AI platforms at{' '}
                <span style={{ color: 'rgba(245,245,247,0.75)', fontWeight: 600 }}>Logicwind</span>
                {' '}— React · GraphQL · TypeScript
              </p>
            </motion.div>
          )}

          {/* CTAs */}
          {mounted && (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65 }}
              style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}
            >
              <Magnetic strength={0.5}>
                <button onClick={scrollDown} style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '0.9rem 2.25rem',
                  background: '#ff4500', color: '#000',
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  fontWeight: 700, fontSize: '0.9rem', border: 'none',
                  letterSpacing: '-0.01em', cursor: 'pointer',
                  boxShadow: '0 12px 40px rgba(255,69,0,0.25)',
                }}
                >
                  View Work <ArrowDownRight size={16} />
                </button>
              </Magnetic>
              <Magnetic strength={0.4}>
                <a href="mailto:yadavhrushikesh21@gmail.com"
                  className="glass glass-interactive glass-rim glass-sheen"
                  style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '0.9rem 2.25rem',
                  ['--glass-radius' as string]: '999px',
                  ['--glass-blur' as string]: '12px',
                  color: 'rgba(245,245,247,0.82)',
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  fontWeight: 600, fontSize: '0.9rem',
                  textDecoration: 'none', letterSpacing: '-0.01em',
                }}
                >
                  Get in touch <ArrowUpRight size={16} />
                </a>
              </Magnetic>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Stats strip */}
      {mounted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          style={{
            borderTop: '1px solid rgba(255,255,255,0.07)',
            background: 'rgba(10,10,11,0.85)',
            backdropFilter: 'blur(20px)',
            position: 'relative', zIndex: 2,
          }}
        >
          <div style={{
            maxWidth: 1440, margin: '0 auto',
            padding: '1.5rem clamp(1.5rem,5vw,4rem)',
            display: 'flex', gap: 0, overflowX: 'auto',
          }}>
            {[
              { n: '4.5+', label: 'Years experience' },
              { n: '5.7k+', label: 'Commits on DigiQC' },
              { n: '10+', label: 'Products shipped' },
              { n: '4', label: 'Languages spoken' },
            ].map((s, i) => (
              <div key={s.n} style={{
                paddingRight: 'clamp(1.5rem,4vw,3.5rem)',
                marginRight: 'clamp(1.5rem,4vw,3.5rem)',
                borderRight: i < 3 ? '1px solid rgba(255,255,255,0.07)' : 'none',
                flexShrink: 0,
              }}>
                <div style={{
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  fontWeight: 800, fontSize: 'clamp(1.6rem,3vw,2rem)',
                  color: '#ff4500', lineHeight: 1, letterSpacing: '-0.04em', marginBottom: '0.25rem',
                }}>{s.n}</div>
                <div style={{
                  fontFamily: "'DM Mono', monospace", fontSize: '0.58rem',
                  color: 'rgba(245,245,247,0.25)', letterSpacing: '0.08em', textTransform: 'uppercase',
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
