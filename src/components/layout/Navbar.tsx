import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import ThemeToggle from '../ui/ThemeToggle'

/**
 * Slim top bar — just identity + theme toggle. Section navigation lives in the
 * floating bottom tab bar (see FloatingTabBar).
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <motion.header
      initial={{ y: -72 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={scrolled ? 'glass glass-refract glass-rim' : ''}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        height: 64,
        ...(scrolled
          ? {
              ['--glass-radius' as string]: '0px',
              ['--glass-fill' as string]: '0.05',
            }
          : { background: 'transparent', borderBottom: '1px solid transparent' }),
        transition: 'background 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease',
      }}
    >
      <div style={{
        maxWidth: 1280, margin: '0 auto', height: '100%',
        padding: '0 clamp(1rem, 4vw, 1.5rem)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}
        >
          <div style={{
            width: 34, height: 34,
            background: 'var(--accent)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontWeight: 800, fontSize: '0.85rem',
            color: 'var(--bg)', letterSpacing: '-0.03em',
            flexShrink: 0, borderRadius: 8,
          }}>HY</div>
          <span style={{
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontWeight: 500, fontSize: '0.9rem',
            color: 'rgba(var(--text-rgb),0.6)',
            letterSpacing: '-0.01em',
          }}>hrushikesh</span>
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
          <a href="mailto:yadavhrushikesh21@gmail.com"
            className="glass glass-warm glass-interactive glass-rim hide-xs"
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '0.45rem 1.1rem',
              ['--glass-radius' as string]: '999px',
              ['--glass-blur' as string]: '10px',
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontWeight: 600, fontSize: '0.8rem',
              color: 'var(--text)', textDecoration: 'none',
              letterSpacing: '-0.01em',
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--green)', display: 'inline-block', boxShadow: '0 0 6px var(--green)' }} />
            Available
          </a>
          <ThemeToggle />
        </div>
      </div>
    </motion.header>
  )
}
