import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useNavigate } from '@tanstack/react-router'
import { CURTAIN_COVER_MS } from '../ui/CurtainTransition'

/**
 * Compact closing CTA on the home page. The full contact experience now lives
 * at /contact (like /resume); this just invites the visitor over, playing the
 * same "rise" curtain the Contact tab uses before swapping routes.
 */
export default function ConnectCTA() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const navigate = useNavigate()

  const go = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) { navigate({ to: '/contact' }); return }
    window.dispatchEvent(new CustomEvent('curtain', { detail: { variant: 'rise', label: 'Contact' } }))
    const cover = CURTAIN_COVER_MS.rise ?? 430
    setTimeout(() => navigate({ to: '/contact' }), cover)
  }

  return (
    <section id="connect" ref={ref} style={{
      padding: 'clamp(6rem, 13vw, 11rem) clamp(1.5rem,5vw,4rem)',
      background: 'rgba(var(--bg-rgb), 0.72)',
      borderTop: '1px solid rgba(var(--border-rgb),0.06)',
      position: 'relative', overflow: 'hidden', textAlign: 'center',
    }}>
      {/* watermark */}
      <div aria-hidden style={{
        position: 'absolute', bottom: '-5rem', left: '50%', transform: 'translateX(-50%)',
        fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800,
        fontSize: 'clamp(8rem, 24vw, 22rem)', color: 'rgba(var(--border-rgb),0.02)',
        lineHeight: 1, letterSpacing: '-0.05em', userSelect: 'none', pointerEvents: 'none', whiteSpace: 'nowrap',
      }}>TALK</div>

      {/* glow */}
      <div aria-hidden style={{
        position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
        width: '50vw', height: '30vw',
        background: 'radial-gradient(ellipse, rgba(var(--accent-rgb),0.06) 0%, transparent 70%)', pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 760, margin: '0 auto', position: 'relative' }}>
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: '1.6rem' }}
        >
          <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--green)', boxShadow: '0 0 10px var(--green)' }} />
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.65rem', color: 'var(--green)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
            Available now
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800,
            fontSize: 'clamp(2.4rem, 7vw, 5rem)', letterSpacing: '-0.04em', lineHeight: 0.95,
            color: 'var(--text)', margin: '0 0 1.25rem',
          }}
        >
          Let's build<br />something good.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.2, duration: 0.6 }}
          style={{
            fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 'clamp(1rem,1.7vw,1.2rem)',
            color: 'rgba(var(--text-rgb),0.5)', lineHeight: 1.6, margin: '0 auto 2.5rem', maxWidth: 520,
          }}
        >
          Have a project, a role, or just an idea worth chasing? I'm one message away.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.32, duration: 0.6 }}
          onClick={go}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 9,
            padding: '1rem 2.4rem', border: 'none', cursor: 'pointer',
            background: 'var(--accent)', color: 'var(--bg)',
            fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: '1.05rem',
            letterSpacing: '-0.02em', borderRadius: 999,
            transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'translateY(-3px)'
            e.currentTarget.style.boxShadow = '0 20px 50px rgba(var(--accent-rgb),0.4)'
          }}
          onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '' }}
        >
          Get in touch <ArrowUpRight size={18} />
        </motion.button>
      </div>
    </section>
  )
}
