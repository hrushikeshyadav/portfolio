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
      padding: 'clamp(7rem, 14vw, 12rem) 1.5rem',
      background: 'linear-gradient(to bottom, #000, rgba(0,0,0,0.65) 40%, transparent)',
      borderTop: '1px solid rgba(255,255,255,0.05)',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Bg watermark */}
      <div style={{
        position: 'absolute', bottom: '-5rem', right: '-2rem',
        fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800,
        fontSize: 'clamp(8rem, 24vw, 22rem)',
        color: 'rgba(255,255,255,0.018)',
        lineHeight: 1, letterSpacing: '-0.05em',
        userSelect: 'none', pointerEvents: 'none', whiteSpace: 'nowrap',
      }}>TALK</div>

      {/* Orange glow */}
      <div style={{
        position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
        width: '50vw', height: '30vw',
        background: 'radial-gradient(ellipse, rgba(255,69,0,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative' }}>
        <div style={{
          position: 'absolute', top: 0, right: 0,
          fontFamily: "'DM Mono', monospace", fontSize: '0.62rem',
          color: 'rgba(255,255,255,0.05)', letterSpacing: '0.14em', userSelect: 'none',
        }}>04 / CONTACT</div>

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '2rem' }}
        >
          <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#30d158', boxShadow: '0 0 10px #30d158', display: 'inline-block' }} />
          <span style={{
            fontFamily: "'DM Mono', monospace", fontSize: '0.65rem',
            color: '#30d158', letterSpacing: '0.14em', textTransform: 'uppercase',
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
              letterSpacing: '-0.04em', lineHeight: 0.9, color: '#f5f5f7', margin: 0,
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
              WebkitTextStroke: '1px rgba(245,245,247,0.18)',
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
              background: '#ff4500', color: '#000',
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontWeight: 700, fontSize: '1rem',
              textDecoration: 'none', letterSpacing: '-0.02em',
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
            Start a conversation <ArrowUpRight size={17} />
          </a>

          <button onClick={copy}
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '0.95rem 1.75rem',
              background: 'rgba(255,255,255,0.04)',
              border: `1px solid ${copied ? 'rgba(48,209,88,0.35)' : 'rgba(255,255,255,0.1)'}`,
              color: copied ? '#30d158' : 'rgba(245,245,247,0.45)',
              fontFamily: "'DM Mono', monospace", fontSize: '0.78rem',
              letterSpacing: '0.03em', transition: 'all 0.2s ease',
              cursor: 'pointer',
            }}
            onMouseEnter={e => { if (!copied) { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.22)'; e.currentTarget.style.color = '#f5f5f7' } }}
            onMouseLeave={e => { if (!copied) { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'rgba(245,245,247,0.45)' } }}
          >
            {copied ? '✓ Copied!' : 'yadavhrushikesh21@gmail.com'}
          </button>

          <a href="tel:+919054573621"
            style={{
              display: 'flex', alignItems: 'center', gap: 7,
              padding: '0.95rem 1.5rem',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'rgba(245,245,247,0.45)',
              fontFamily: "'DM Mono', monospace", fontSize: '0.78rem',
              letterSpacing: '0.03em', transition: 'all 0.2s ease', textDecoration: 'none',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.22)'; e.currentTarget.style.color = '#f5f5f7' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'rgba(245,245,247,0.45)' }}
          >
            <Phone size={13} /> +91 9054573621
          </a>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {socials.map(({ label, href, Icon }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                style={{
                  width: 48, height: 48,
                  border: '1px solid rgba(255,255,255,0.09)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'rgba(245,245,247,0.3)',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                  background: 'rgba(255,255,255,0.03)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,69,0,0.4)'
                  e.currentTarget.style.color = '#ff4500'
                  e.currentTarget.style.background = 'rgba(255,69,0,0.06)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)'
                  e.currentTarget.style.color = 'rgba(245,245,247,0.3)'
                  e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
                }}
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
            color: 'rgba(245,245,247,0.16)', letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}
        >
          Based in India · Remote friendly · Response within 24h
        </motion.p>
      </div>
    </section>
  )
}
