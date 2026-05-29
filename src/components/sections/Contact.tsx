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
      padding: 'clamp(6rem, 12vw, 10rem) 1.5rem',
      background: '#0c0c0c',
      borderTop: '1px solid rgba(255,255,255,0.06)',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Large bg word */}
      <div style={{
        position: 'absolute', bottom: '-4rem', right: '-1rem',
        fontFamily: "'Bricolage Grotesque', sans-serif",
        fontWeight: 800,
        fontSize: 'clamp(8rem, 22vw, 20rem)',
        color: 'rgba(255,255,255,0.025)',
        lineHeight: 1, letterSpacing: '-0.05em',
        userSelect: 'none', pointerEvents: 'none',
        whiteSpace: 'nowrap',
      }}>TALK</div>

      <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative' }}>
        <div style={{
          position: 'absolute', top: '3rem', right: 0,
          fontFamily: "'DM Mono', monospace", fontSize: '0.65rem',
          color: 'rgba(255,255,255,0.08)', letterSpacing: '0.1em', userSelect: 'none',
        }}>04 / CONTACT</div>

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '2rem' }}
        >
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#00e96a', boxShadow: '0 0 8px #00e96a', display: 'inline-block' }} />
          <span style={{
            fontFamily: "'DM Mono', monospace", fontSize: '0.7rem',
            color: '#00e96a', letterSpacing: '0.12em', textTransform: 'uppercase',
          }}>Available now</span>
        </motion.div>

        {/* Big headline */}
        <div style={{ overflow: 'hidden', marginBottom: '0.25rem' }}>
          <motion.h2
            initial={{ y: '100%' }}
            animate={inView ? { y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontWeight: 800,
              fontSize: 'clamp(3rem, 9vw, 8rem)',
              letterSpacing: '-0.04em', lineHeight: 0.92,
              color: '#f5f0eb',
            }}
          >Got a project?</motion.h2>
        </div>
        <div style={{ overflow: 'hidden', marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
          <motion.h2
            initial={{ y: '100%' }}
            animate={inView ? { y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontWeight: 200,
              fontSize: 'clamp(3rem, 9vw, 8rem)',
              letterSpacing: '-0.04em', lineHeight: 0.92,
              color: 'transparent',
              WebkitTextStroke: '1px rgba(245,240,235,0.2)',
            }}
          >Let's build it.</motion.h2>
        </div>

        {/* Actions row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
          style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1rem' }}
        >
          <a
            href="mailto:yadavhrushikesh21@gmail.com"
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '1rem 2.25rem',
              background: '#ff4500', color: '#0c0c0c',
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontWeight: 700, fontSize: '1rem',
              textDecoration: 'none', letterSpacing: '-0.02em',
              transition: 'all 0.25s cubic-bezier(0.22,1,0.36,1)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-3px)'
              e.currentTarget.style.boxShadow = '0 16px 40px rgba(255,69,0,0.35)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            Start a conversation <ArrowUpRight size={18} />
          </a>

          <button
            onClick={copy}
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '1rem 2rem',
              background: 'transparent', color: copied ? '#00e96a' : 'rgba(245,240,235,0.45)',
              fontFamily: "'DM Mono', monospace", fontSize: '0.82rem',
              border: `1px solid ${copied ? 'rgba(0,233,106,0.3)' : 'rgba(255,255,255,0.1)'}`,
              letterSpacing: '0.04em', transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => {
              if (!copied) {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'
                e.currentTarget.style.color = '#f5f0eb'
              }
            }}
            onMouseLeave={e => {
              if (!copied) {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
                e.currentTarget.style.color = 'rgba(245,240,235,0.45)'
              }
            }}
          >
            {copied ? '✓ Copied!' : 'yadavhrushikesh21@gmail.com'}
          </button>

          <a
            href="tel:+919054573621"
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '1rem 1.5rem',
              background: 'transparent', color: 'rgba(245,240,235,0.45)',
              fontFamily: "'DM Mono', monospace", fontSize: '0.82rem',
              border: '1px solid rgba(255,255,255,0.1)',
              letterSpacing: '0.04em', transition: 'all 0.2s ease',
              textDecoration: 'none',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'
              e.currentTarget.style.color = '#f5f0eb'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
              e.currentTarget.style.color = 'rgba(245,240,235,0.45)'
            }}
          >
            <Phone size={14} /> +91 9054573621
          </a>

          <div style={{ display: 'flex', gap: '0.6rem' }}>
            {socials.map(({ label, href, Icon }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                aria-label={label}
                style={{
                  width: 48, height: 48,
                  border: '1px solid rgba(255,255,255,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'rgba(245,240,235,0.35)',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,69,0,0.4)'
                  e.currentTarget.style.color = '#ff4500'
                  e.currentTarget.style.background = 'rgba(255,69,0,0.06)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
                  e.currentTarget.style.color = 'rgba(245,240,235,0.35)'
                  e.currentTarget.style.background = 'transparent'
                }}
              >
                <Icon size={17} />
              </a>
            ))}
          </div>
        </motion.div>

        {/* Location */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          style={{
            marginTop: '3rem',
            fontFamily: "'DM Mono', monospace", fontSize: '0.68rem',
            color: 'rgba(245,240,235,0.18)', letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}
        >
          Based in India · Remote friendly · Response within 24h
        </motion.p>
      </div>
    </section>
  )
}
