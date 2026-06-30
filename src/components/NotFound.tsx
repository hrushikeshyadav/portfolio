import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { Link } from '@tanstack/react-router'

/**
 * On-brand catch-all 404. Rendered by the router's notFoundComponent for any
 * unmatched path. Big ghost glyph, a short line, and a glass link home.
 */
export default function NotFound() {
  return (
    <section style={{
      minHeight: '100dvh',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      textAlign: 'center', padding: 'clamp(2rem,8vw,6rem)', position: 'relative', overflow: 'hidden',
    }}>
      {/* giant ghost 404 */}
      <span aria-hidden style={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
        fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800,
        fontSize: 'clamp(11rem, 38vw, 30rem)', lineHeight: 1, zIndex: 0,
        color: 'transparent', WebkitTextStroke: '1.5px rgba(var(--text-rgb),0.05)',
        userSelect: 'none', pointerEvents: 'none', letterSpacing: '-0.05em', whiteSpace: 'nowrap',
      }}>404</span>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1.4rem' }}>
          <span style={{ width: 24, height: '1.5px', background: 'var(--accent)' }} />
          <span style={{
            fontFamily: "'DM Mono', monospace", fontSize: '0.62rem',
            color: 'var(--accent)', letterSpacing: '0.14em', textTransform: 'uppercase',
          }}>Lost in the void</span>
        </div>

        <h1 style={{
          fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800,
          fontSize: 'clamp(2rem, 6vw, 3.5rem)', letterSpacing: '-0.04em',
          color: 'var(--text)', lineHeight: 1, margin: 0,
        }}>This page wandered off.</h1>

        <p style={{
          fontFamily: "'Bricolage Grotesque', sans-serif",
          fontSize: 'clamp(0.95rem, 1.6vw, 1.1rem)', color: 'rgba(var(--text-rgb),0.5)',
          margin: '1rem 0 2rem', maxWidth: 440, lineHeight: 1.6,
        }}>
          The link's broken or the page never existed. Let's get you back to solid ground.
        </p>

        <Link
          to="/"
          className="glass glass-warm glass-interactive glass-rim glass-sheen"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '0.85rem 1.7rem', ['--glass-radius' as string]: '999px',
            ['--glass-blur' as string]: '12px',
            color: 'var(--text)', textDecoration: 'none',
            fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700,
            fontSize: '0.92rem', letterSpacing: '-0.01em',
          }}
        >
          <ArrowLeft size={16} /> Back home
        </Link>
      </motion.div>
    </section>
  )
}
