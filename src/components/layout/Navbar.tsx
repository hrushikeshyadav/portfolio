import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, FileText } from 'lucide-react'
import { useNavigate, useRouterState } from '@tanstack/react-router'

const links = [
  { href: '#work', label: 'Work' },
  { href: '#about', label: 'About' },
  { href: '#stack', label: 'Stack' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const routerState = useRouterState()
  const isOnResume = routerState.location.pathname === '/resume'

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const scrollTo = (href: string) => {
    const el = document.querySelector(href) as HTMLElement | null
    if (!el) return
    const lenis = (window as unknown as { lenis?: { scrollTo: (t: HTMLElement, o?: object) => void } }).lenis
    if (lenis) lenis.scrollTo(el, { offset: -64, duration: 1.2 })
    else el.scrollIntoView({ behavior: 'smooth' })
  }

  const go = (href: string) => {
    setOpen(false)
    if (isOnResume) {
      navigate({ to: '/' }).then(() => setTimeout(() => scrollTo(href), 120))
    } else {
      scrollTo(href)
    }
  }

  const goResume = () => {
    setOpen(false)
    navigate({ to: '/resume' })
  }

  return (
    <>
      <motion.header
        initial={{ y: -72 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
          height: 64,
          background: scrolled ? 'rgba(12,12,12,0.9)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
          transition: 'background 0.4s ease, border-color 0.4s ease',
        }}
      >
        <div style={{
          maxWidth: 1280, margin: '0 auto', height: '100%',
          padding: '0 1.5rem',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          {/* Logo */}
          <button
            onClick={() => isOnResume ? navigate({ to: '/' }) : window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}
          >
            <div style={{
              width: 34, height: 34,
              background: '#ff4500',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontWeight: 800, fontSize: '0.85rem',
              color: '#0c0c0c', letterSpacing: '-0.03em',
              flexShrink: 0,
            }}>HY</div>
            <span style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontWeight: 500, fontSize: '0.9rem',
              color: 'rgba(245,240,235,0.6)',
              letterSpacing: '-0.01em',
            }}>hrushikesh</span>
          </button>

          {/* Desktop nav */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}
            className="hidden md:flex"
          >
            {links.map(l => (
              <button key={l.href} onClick={() => go(l.href)}
                style={{
                  background: 'none', border: 'none',
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  fontWeight: 500, fontSize: '0.875rem',
                  color: 'rgba(245,240,235,0.45)',
                  letterSpacing: '-0.01em',
                  transition: 'color 0.2s',
                  padding: '0.25rem 0',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = '#f5f0eb')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(245,240,235,0.45)')}
              >{l.label}</button>
            ))}

            {/* Resume tab */}
            <button onClick={goResume}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                background: 'none', border: 'none',
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontWeight: isOnResume ? 700 : 500, fontSize: '0.875rem',
                color: isOnResume ? '#f5f0eb' : 'rgba(245,240,235,0.45)',
                letterSpacing: '-0.01em',
                transition: 'color 0.2s',
                padding: '0.25rem 0',
                cursor: 'pointer',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = '#f5f0eb')}
              onMouseLeave={e => (e.currentTarget.style.color = isOnResume ? '#f5f0eb' : 'rgba(245,240,235,0.45)')}
            >
              <FileText size={13} />
              Resume
            </button>

            <a href="mailto:yadavhrushikesh21@gmail.com"
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '0.45rem 1.1rem',
                background: 'rgba(255,69,0,0.1)',
                border: '1px solid rgba(255,69,0,0.3)',
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontWeight: 600, fontSize: '0.8rem',
                color: '#ff4500', textDecoration: 'none',
                letterSpacing: '-0.01em',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(255,69,0,0.18)'
                e.currentTarget.style.borderColor = 'rgba(255,69,0,0.6)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(255,69,0,0.1)'
                e.currentTarget.style.borderColor = 'rgba(255,69,0,0.3)'
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#00e96a', display: 'inline-block', boxShadow: '0 0 6px #00e96a' }} />
              Available
            </a>
          </nav>

          {/* Mobile toggle */}
          <button className="flex md:hidden"
            onClick={() => setOpen(v => !v)}
            style={{
              background: 'none', border: '1px solid rgba(255,255,255,0.1)',
              color: '#f5f0eb', padding: '0.35rem', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
            }}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
            style={{
              position: 'fixed', top: 64, left: 0, right: 0, zIndex: 999,
              background: 'rgba(12,12,12,0.98)',
              backdropFilter: 'blur(20px)',
              borderBottom: '1px solid rgba(255,255,255,0.07)',
              padding: '1.25rem 1.5rem 1.75rem',
            }}
          >
            {links.map((l, i) => (
              <motion.button key={l.href}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => go(l.href)}
                style={{
                  display: 'block', width: '100%', textAlign: 'left',
                  background: 'none', border: 'none',
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  fontWeight: 600, fontSize: '1.3rem',
                  color: '#f5f0eb',
                  padding: '0.6rem 0',
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                  letterSpacing: '-0.02em',
                }}
              >{l.label}</motion.button>
            ))}

            {/* Resume — mobile */}
            <motion.button
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: links.length * 0.05 }}
              onClick={goResume}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                width: '100%', textAlign: 'left',
                background: 'none', border: 'none',
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontWeight: 600, fontSize: '1.3rem',
                color: isOnResume ? '#ff4500' : '#f5f0eb',
                padding: '0.6rem 0',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                letterSpacing: '-0.02em',
                cursor: 'pointer',
              }}
            >
              <FileText size={18} />
              Resume
            </motion.button>

            <a href="mailto:yadavhrushikesh21@gmail.com"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                marginTop: '1.25rem', padding: '0.6rem 1.5rem',
                background: '#ff4500', color: '#0c0c0c', textDecoration: 'none',
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontWeight: 700, fontSize: '0.875rem',
              }}
            >Let's talk</a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
