import { useEffect, useState, type CSSProperties } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Phone, Send, Check, Copy } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '../components/ui/Icons'

/**
 * Contact as its own route (like /resume). The home page only carries a small
 * "let's connect" CTA that links here. Left: a real, no-backend contact form
 * (Web3Forms when VITE_WEB3FORMS_KEY is set, graceful mailto fallback if not).
 * Right: direct channels — email, phone, socials.
 */

const EMAIL = 'yadavhrushikesh21@gmail.com'
const PHONE = '+91 9054573621'
const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY as string | undefined

const socials = [
  { label: 'GitHub', href: 'https://github.com/hrushikeshyadav', Icon: GithubIcon },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/hrushikesh-yadav-0a16b3123', Icon: LinkedinIcon },
]

type Status = 'idle' | 'sending' | 'ok' | 'error'

const fieldStyle: CSSProperties = {
  width: '100%', boxSizing: 'border-box',
  background: 'rgba(var(--text-rgb),0.03)',
  border: '1px solid rgba(var(--border-rgb),0.14)', borderRadius: 12,
  padding: '0.8rem 0.95rem', color: 'var(--text)',
  fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: '0.95rem',
  outline: 'none', transition: 'border-color 0.2s ease',
}
const labelStyle: CSSProperties = {
  display: 'block', marginBottom: '0.4rem',
  fontFamily: "'DM Mono', monospace", fontSize: '0.62rem',
  color: 'rgba(var(--text-rgb),0.5)', letterSpacing: '0.1em', textTransform: 'uppercase',
}

function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    if (data.get('botcheck')) return // honeypot tripped
    const name = String(data.get('name') || '')
    const email = String(data.get('email') || '')
    const message = String(data.get('message') || '')

    // No key configured → fall back to opening the user's mail client prefilled.
    if (!WEB3FORMS_KEY) {
      const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`)
      window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(`Portfolio message from ${name}`)}&body=${body}`
      return
    }

    setStatus('sending'); setError('')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Portfolio message from ${name}`,
          from_name: 'Portfolio Contact',
          name, email, message,
        }),
      })
      const json = await res.json()
      if (json.success) { setStatus('ok'); form.reset() }
      else { setStatus('error'); setError(json.message || 'Something went wrong.') }
    } catch {
      setStatus('error'); setError('Network error — please email me directly.')
    }
  }

  if (status === 'ok') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '1rem' }}>
        <span style={{
          width: 52, height: 52, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'rgba(var(--green-rgb),0.15)', border: '1px solid rgba(var(--green-rgb),0.4)', color: 'var(--green)',
        }}><Check size={24} /></span>
        <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: '1.3rem', color: 'var(--text)', margin: 0 }}>
          Message sent — thank you!
        </h3>
        <p style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: '0.95rem', color: 'rgba(var(--text-rgb),0.55)', margin: 0, lineHeight: 1.6 }}>
          I'll get back to you within 24 hours. In the meantime, feel free to connect on the channels on the right.
        </p>
        <button onClick={() => setStatus('idle')} style={{
          marginTop: '0.5rem', background: 'none', border: 'none', cursor: 'pointer',
          fontFamily: "'DM Mono', monospace", fontSize: '0.72rem', color: 'var(--accent)', letterSpacing: '0.04em',
        }}>Send another →</button>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
      {/* honeypot */}
      <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" style={{ display: 'none' }} aria-hidden />

      <div>
        <label style={labelStyle} htmlFor="cf-name">Your name</label>
        <input id="cf-name" name="name" required placeholder="Jane Doe" style={fieldStyle}
          onFocus={e => (e.currentTarget.style.borderColor = 'rgba(var(--accent-rgb),0.6)')}
          onBlur={e => (e.currentTarget.style.borderColor = 'rgba(var(--border-rgb),0.14)')} />
      </div>
      <div>
        <label style={labelStyle} htmlFor="cf-email">Email</label>
        <input id="cf-email" name="email" type="email" required placeholder="jane@company.com" style={fieldStyle}
          onFocus={e => (e.currentTarget.style.borderColor = 'rgba(var(--accent-rgb),0.6)')}
          onBlur={e => (e.currentTarget.style.borderColor = 'rgba(var(--border-rgb),0.14)')} />
      </div>
      <div>
        <label style={labelStyle} htmlFor="cf-message">Message</label>
        <textarea id="cf-message" name="message" required rows={5} placeholder="Tell me about your project, role, or idea…"
          style={{ ...fieldStyle, resize: 'vertical', minHeight: 120 }}
          onFocus={e => (e.currentTarget.style.borderColor = 'rgba(var(--accent-rgb),0.6)')}
          onBlur={e => (e.currentTarget.style.borderColor = 'rgba(var(--border-rgb),0.14)')} />
      </div>

      {status === 'error' && (
        <p style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.72rem', color: 'var(--accent-2)', margin: 0 }}>{error}</p>
      )}

      <button type="submit" disabled={status === 'sending'}
        style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 9,
          padding: '0.9rem 1.6rem', borderRadius: 12, border: 'none',
          background: 'var(--accent)', color: 'var(--bg)', cursor: status === 'sending' ? 'wait' : 'pointer',
          fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: '0.95rem', letterSpacing: '-0.01em',
          opacity: status === 'sending' ? 0.7 : 1, transition: 'opacity 0.2s ease, transform 0.2s ease',
        }}
        onMouseEnter={e => { if (status !== 'sending') e.currentTarget.style.transform = 'translateY(-2px)' }}
        onMouseLeave={e => { e.currentTarget.style.transform = '' }}
      >
        <Send size={16} /> {status === 'sending' ? 'Sending…' : 'Send message'}
      </button>

      {!WEB3FORMS_KEY && (
        <p style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.62rem', color: 'rgba(var(--text-rgb),0.3)', margin: 0, letterSpacing: '0.03em' }}>
          Opens your mail app. Set VITE_WEB3FORMS_KEY for in-page sending.
        </p>
      )}
    </form>
  )
}

function DirectContact() {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard?.writeText(EMAIL)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
      <button onClick={copy} className="glass glass-interactive glass-rim" style={{
        display: 'flex', alignItems: 'center', gap: 10, textAlign: 'left',
        ['--glass-radius' as string]: '14px', ['--glass-blur' as string]: '10px', padding: '0.95rem 1.1rem',
        color: copied ? 'var(--green)' : 'rgba(var(--text-rgb),0.8)', cursor: 'pointer',
        border: copied ? '1px solid rgba(var(--green-rgb),0.45)' : undefined,
      }}>
        {copied ? <Check size={16} /> : <Copy size={16} style={{ color: 'var(--accent)' }} />}
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.8rem' }}>{copied ? 'Copied!' : EMAIL}</span>
      </button>

      <a href={`tel:${PHONE.replace(/\s/g, '')}`} className="glass glass-interactive glass-rim" style={{
        display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none',
        ['--glass-radius' as string]: '14px', ['--glass-blur' as string]: '10px', padding: '0.95rem 1.1rem',
        color: 'rgba(var(--text-rgb),0.8)',
      }}>
        <Phone size={15} style={{ color: 'var(--accent)' }} />
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.8rem' }}>{PHONE}</span>
      </a>

      <div style={{ display: 'flex', gap: '0.6rem', marginTop: '0.2rem' }}>
        {socials.map(({ label, href, Icon }) => (
          <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
            className="glass glass-interactive glass-rim" style={{
              flex: 1, height: 52, ['--glass-radius' as string]: '14px', ['--glass-blur' as string]: '10px',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              color: 'rgba(var(--text-rgb),0.6)', textDecoration: 'none',
              fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 600, fontSize: '0.85rem',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(var(--text-rgb),0.6)')}
          >
            <Icon size={16} /> {label}
          </a>
        ))}
      </div>

      <p style={{
        marginTop: '0.6rem', fontFamily: "'DM Mono', monospace", fontSize: '0.62rem',
        color: 'rgba(var(--text-rgb),0.3)', letterSpacing: '0.1em', textTransform: 'uppercase', lineHeight: 1.7,
      }}>
        Based in India · Remote friendly<br />Response within 24h
      </p>
    </div>
  )
}

export default function ContactPage() {
  useEffect(() => {
    const lenis = (window as unknown as { lenis?: { scrollTo: (t: number, o?: object) => void } }).lenis
    if (lenis) lenis.scrollTo(0, { immediate: true })
    else window.scrollTo(0, 0)
  }, [])

  return (
    <section style={{
      minHeight: '100dvh', position: 'relative', overflow: 'hidden',
      padding: 'clamp(6rem, 14vw, 9rem) clamp(1.25rem, 5vw, 3rem) 6rem',
    }}>
      {/* glow + watermark */}
      <div style={{
        position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
        width: '60vw', height: '34vw',
        background: 'radial-gradient(ellipse, rgba(var(--accent-rgb),0.07) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative' }}>
        {/* eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1.5rem' }}
        >
          <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--green)', boxShadow: '0 0 10px var(--green)' }} />
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.65rem', color: 'var(--green)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
            Available now · Contact
          </span>
        </motion.div>

        {/* headline */}
        <div style={{ overflow: 'hidden' }}>
          <motion.h1
            initial={{ y: '105%' }} animate={{ y: 0 }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: 'clamp(2.6rem, 8vw, 6rem)', letterSpacing: '-0.04em', lineHeight: 0.92, color: 'var(--text)', margin: 0 }}
          >Got a project?</motion.h1>
        </div>
        <div style={{ overflow: 'hidden', marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
          <motion.h1
            initial={{ y: '105%' }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.07, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 200, fontSize: 'clamp(2.6rem, 8vw, 6rem)', letterSpacing: '-0.04em', lineHeight: 0.92, color: 'transparent', WebkitTextStroke: '1px rgba(var(--text-rgb),0.18)', margin: 0 }}
          >Let's build it.</motion.h1>
        </div>

        {/* form + direct */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.6 }}
          style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'clamp(1.5rem,4vw,3rem)' }}
          className="contact-grid"
        >
          <div className="glass glass-rim" style={{ ['--glass-radius' as string]: '20px', ['--glass-blur' as string]: '16px', padding: 'clamp(1.5rem,3vw,2.25rem)' }}>
            <ContactForm />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
            <p style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: '1.05rem', color: 'rgba(var(--text-rgb),0.6)', lineHeight: 1.6, margin: 0 }}>
              Prefer to reach out directly? Grab my email, call, or connect on socials — whatever's easiest.
            </p>
            <DirectContact />
            <a href={`mailto:${EMAIL}`} style={{
              display: 'inline-flex', alignItems: 'center', gap: 7, marginTop: '0.2rem',
              fontFamily: "'DM Mono', monospace", fontSize: '0.72rem', color: 'var(--accent)',
              textDecoration: 'none', letterSpacing: '0.04em', textTransform: 'uppercase',
            }}>
              Or just say hi <ArrowUpRight size={14} />
            </a>
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (min-width: 820px) {
          .contact-grid { grid-template-columns: 1.15fr 0.85fr !important; align-items: start; }
        }
      `}</style>
    </section>
  )
}
