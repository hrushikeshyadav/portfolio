import { motion } from 'framer-motion'
import { useNavigate, useRouterState } from '@tanstack/react-router'
import ThemeToggle from '../ui/ThemeToggle'

/**
 * Floating chrome that replaces the old header bar: a small identity mark at
 * top-left, and the Available pill + theme toggle at top-right. Both are
 * fixed, glass, and stay out of the way of the content.
 */
export default function TopControls() {
  const navigate = useNavigate()
  const isOnResume = useRouterState().location.pathname === '/resume'

  return (
    <>
      {/* identity mark — top left */}
      <motion.button
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        onClick={() => (isOnResume ? navigate({ to: '/' }) : window.scrollTo({ top: 0, behavior: 'smooth' }))}
        aria-label="Home"
        className="glass glass-interactive glass-rim"
        style={{
          position: 'fixed', top: 'clamp(0.85rem, 2.5vw, 1.4rem)', left: 'clamp(0.85rem, 3vw, 1.6rem)',
          zIndex: 1000,
          ['--glass-radius' as string]: '12px',
          ['--glass-blur' as string]: '12px',
          width: 40, height: 40, padding: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800,
          fontSize: '0.85rem', letterSpacing: '-0.03em', color: 'var(--accent)',
        }}
      >
        HY
      </motion.button>

      {/* available + theme toggle — top right */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'fixed', top: 'clamp(0.85rem, 2.5vw, 1.4rem)', right: 'clamp(0.85rem, 3vw, 1.6rem)',
          zIndex: 1000,
          display: 'flex', alignItems: 'center', gap: '0.6rem',
        }}
      >
        <a href="mailto:yadavhrushikesh21@gmail.com"
          className="glass glass-warm glass-interactive glass-rim hide-xs"
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '0.45rem 1rem', height: 40, boxSizing: 'border-box',
            ['--glass-radius' as string]: '999px',
            ['--glass-blur' as string]: '12px',
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontWeight: 600, fontSize: '0.8rem',
            color: 'var(--text)', textDecoration: 'none', letterSpacing: '-0.01em',
          }}
        >
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--green)', display: 'inline-block', boxShadow: '0 0 6px var(--green)' }} />
          Available
        </a>
        <ThemeToggle />
      </motion.div>
    </>
  )
}
