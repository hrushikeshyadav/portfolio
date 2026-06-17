import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight, Phone } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '../ui/Icons'

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [copied, setCopied] = useState(false)

  const copy = () => {
    navigator.clipboard.writeText('yadavhrushikesh21@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const socials = [
    { label: 'GitHub', href: 'https://github.com/hrushikeshyadav', Icon: GithubIcon },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/hrushikesh-yadav-0a16b3123', Icon: LinkedinIcon },
  ]

  return (
    <section id="contact" ref={ref} style={{
      padding: 'clamp(7rem, 14vw, 12rem) clamp(1.5rem,5vw,4rem)',
      background: 'rgba(var(--bg-rgb), 0.72)',
      borderTop: '1px solid rgba(var(--border-rgb),0.06)',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Bg watermark */}
      <div style={{
        position: 'absolute', bottom: '-5rem', right: '-2rem',
        fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800,
        fontSize: 'clamp(8rem, 24vw, 22rem)',
        color: 'rgba(var(--border-rgb),0.018)',
        lineHeight: 1, letterSpacing: '-0.05em',
        userSelect: 'none', pointerEvents: 'none', whiteSpace: 'nowrap',
      }}>TALK</div>

      {/* Orange glow */}
      <div style={{
        position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
        width: '50vw', height: '30vw',
        background: 'radial-gradient(ellipse, rgba(var(--accent-rgb),0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative' }}>
        <div style={{
          position: 'absolute', top: 0, right: 0,
          fontFamily: "'DM Mono', monospace", fontSize: '0.62rem',
          color: 'rgba(var(--border-rgb),0.05)', letterSpacing: '0.14em', userSelect: 'none',
        }}>04 / CONTACT</div>

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '2rem' }}
        >
          <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--green)', boxShadow: '0 0 10px var(--green)', display: 'inline-block' }} />
          <span style={{
            fontFamily: "'DM Mono', monospace", fontSize: '0.65rem',
            color: 'var(--green)', letterSpacing: '0.14em', textTransform: 'uppercase',
          }}>Available now</span>
        </motion.div>

        {/* Headline */}
        <div style={{ overflow: 'hidden', marginBottom: '0.2rem' }}>
          <motion.h2
            initial={{ y: '105%' }}
            animate={inView ? { y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800,
              fontSize: 'clamp(3.2rem, 9.5vw, 9rem)',
              letterSpacing: '-0.04em', lineHeight: 0.9, color: 'var(--text)', margin: 0,
            }}
          >Got a project?</motion.h2>
        </div>
        <div style={{ overflow: 'hidden', marginBottom: 'clamp(2.5rem, 5vw, 4.5rem)' }}>
          <motion.h2
            initial={{ y: '105%' }}
            animate={inView ? { y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.07, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 200,
              fontSize: 'clamp(3.2rem, 9.5vw, 9rem)',
              letterSpacing: '-0.04em', lineHeight: 0.9,
              color: 'transparent',
              WebkitTextStroke: '1px rgba(var(--text-rgb),0.18)',
              margin: 0,
            }}
          >Let's build it.</motion.h2>
        </div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.32, duration: 0.6 }}
          style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.75rem' }}
        >
          <a href="mailto:yadavhrushikesh21@gmail.com"
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '0.95rem 2.25rem',
              background: 'var(--accent)', color: 'var(--bg)',
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontWeight: 700, fontSize: '1rem',
              textDecoration: 'none', letterSpacing: '-0.02em',
              transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-3px)'
              e.currentTarget.style.boxShadow = '0 20px 50px rgba(var(--accent-rgb),0.4)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = ''
              e.currentTarget.style.boxShadow = ''
            }}
          >
            Start a conversation <ArrowUpRight size={17} />
          </a>

          <button onClick={copy}
            className="glass glass-interactive glass-rim"
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '0.95rem 1.75rem',
              ['--glass-radius' as string]: '12px',
              ['--glass-blur' as string]: '12px',
              border: copied ? '1px solid rgba(var(--green-rgb),0.45)' : undefined,
              color: copied ? 'var(--green)' : 'rgba(var(--text-rgb),0.7)',
              fontFamily: "'DM Mono', monospace", fontSize: '0.78rem',
              letterSpacing: '0.03em',
            }}
          >
            {copied ? '✓ Copied!' : 'yadavhrushikesh21@gmail.com'}
          </button>

          <a href="tel:+919054573621"
            className="glass glass-interactive glass-rim"
            style={{
              display: 'flex', alignItems: 'center', gap: 7,
              padding: '0.95rem 1.5rem',
              ['--glass-radius' as string]: '12px',
              ['--glass-blur' as string]: '12px',
              color: 'rgba(var(--text-rgb),0.7)',
              fontFamily: "'DM Mono', monospace", fontSize: '0.78rem',
              letterSpacing: '0.03em', textDecoration: 'none',
            }}
          >
            <Phone size={13} /> +91 9054573621
          </a>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {socials.map(({ label, href, Icon }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                className="glass glass-interactive glass-rim"
                style={{
                  width: 48, height: 48,
                  ['--glass-radius' as string]: '12px',
                  ['--glass-blur' as string]: '12px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'rgba(var(--text-rgb),0.5)',
                  textDecoration: 'none',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)' }}
                onMouseLeave={e => { e.currentTarget.style.color = 'rgba(var(--text-rgb),0.5)' }}
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.55 }}
          style={{
            marginTop: '3.5rem',
            fontFamily: "'DM Mono', monospace", fontSize: '0.65rem',
            color: 'rgba(var(--text-rgb),0.16)', letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}
        >
          Based in India · Remote friendly · Response within 24h
        </motion.p>
      </div>
    </section>
  )
}
