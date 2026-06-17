import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { LayoutGrid, User, Briefcase, Layers, Mail, FileText } from 'lucide-react'
import { useNavigate, useRouterState } from '@tanstack/react-router'

type Tab = { id: string; label: string; Icon: typeof LayoutGrid }

const TABS: Tab[] = [
  { id: 'about', label: 'About', Icon: User },
  { id: 'work', label: 'Work', Icon: LayoutGrid },
  { id: 'experience', label: 'Career', Icon: Briefcase },
  { id: 'stack', label: 'Stack', Icon: Layers },
  { id: 'contact', label: 'Contact', Icon: Mail },
]

/**
 * iOS-style floating glass tab bar (Instagram / Apple Music vibe). Fixed at the
 * bottom centre as a liquid-glass capsule; the active tab is marked by a soft
 * sliding "lens" highlight. Doubles as scroll-spy: the tab tracks whichever
 * section is in view. Replaces the old header link menu on every screen size.
 */
export default function FloatingTabBar() {
  const [active, setActive] = useState(TABS[0].id)
  const navigate = useNavigate()
  const routerState = useRouterState()
  const isOnResume = routerState.location.pathname === '/resume'

  // scroll-spy: highlight whichever section's top is nearest the viewport top.
  // (rootMargin band approaches were leaving the first section unselected.)
  useEffect(() => {
    if (isOnResume) return
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const probe = 110 // a little below the top edge
        let current = TABS[0].id
        for (const t of TABS) {
          const el = document.getElementById(t.id)
          if (el && el.getBoundingClientRect().top <= probe) current = t.id
        }
        setActive(current)
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
    }
  }, [isOnResume])

  const getLenis = () =>
    (window as unknown as { lenis?: { scrollTo: (t: HTMLElement | number, o?: object) => void } }).lenis

  const scrollToId = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    // element-based — lenis measures at animation time, so it lands on the
    // section's true top (offset clears the floating top controls).
    const lenis = getLenis()
    if (lenis) lenis.scrollTo(el, { offset: -84, duration: 1.0 })
    else el.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToTop = (immediate = false) => {
    const lenis = getLenis()
    if (lenis) lenis.scrollTo(0, immediate ? { immediate: true } : { duration: 1.0 })
    else window.scrollTo({ top: 0, behavior: immediate ? 'auto' : 'smooth' })
  }

  // the first tab acts as "home" — it scrolls to the very top (the hero),
  // not down into the section's body.
  const isFirstTab = (id: string) => id === TABS[0].id

  const goSection = (id: string) => {
    setActive(id)
    const run = () => (isFirstTab(id) ? scrollToTop() : scrollToId(id))
    if (isOnResume) {
      navigate({ to: '/' }).then(() => setTimeout(run, 180))
    } else {
      run()
    }
  }

  const goResume = () => {
    if (isOnResume) {
      scrollToTop(true)
    } else {
      navigate({ to: '/resume' }).then(() => setTimeout(() => scrollToTop(true), 60))
    }
  }

  return (
    <div
      style={{
        position: 'fixed',
        left: 0,
        right: 0,
        bottom: 'calc(env(safe-area-inset-bottom, 0px) + clamp(0.9rem, 2.5vw, 1.6rem))',
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'center',
        padding: '0 0.5rem',
        pointerEvents: 'none',
      }}
    >
    <motion.nav
      initial={{ y: 90, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="glass glass-rim"
      style={{
        pointerEvents: 'auto',
        ['--glass-radius' as string]: '999px',
        ['--glass-blur' as string]: '24px',
        ['--glass-fill' as string]: '0.16',
        display: 'flex',
        alignItems: 'center',
        gap: 'clamp(0.15rem, 0.6vw, 0.35rem)',
        padding: 'clamp(0.4rem, 0.8vw, 0.5rem)',
        maxWidth: '100%',
      }}
    >
      {TABS.map(({ id, label, Icon }) => {
        const isActive = !isOnResume && active === id
        return (
          <button
            key={id}
            onClick={() => goSection(id)}
            aria-label={label}
            aria-current={isActive ? 'page' : undefined}
            style={{
              position: 'relative',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 3,
              padding: 'clamp(0.42rem, 1vw, 0.6rem) clamp(0.55rem, 2vw, 0.95rem)',
              borderRadius: 999,
              color: isActive ? 'var(--accent)' : 'rgba(var(--text-rgb), 0.55)',
              transition: 'color 0.3s ease',
            }}
          >
            {isActive && (
              <motion.span
                layoutId="tab-lens"
                transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: 999,
                  background: 'rgba(var(--accent-rgb), 0.14)',
                  border: '1px solid rgba(var(--accent-rgb), 0.28)',
                  boxShadow: 'inset 0 1px 0 0 rgba(var(--glass-spec), 0.5)',
                  zIndex: -1,
                }}
              />
            )}
            <Icon size={19} strokeWidth={isActive ? 2.4 : 2} />
            <span
              className="tab-label"
              style={{
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontWeight: isActive ? 700 : 500,
                fontSize: 'clamp(0.5rem, 1.7vw, 0.62rem)',
                letterSpacing: '-0.01em',
                lineHeight: 1,
              }}
            >
              {label}
            </span>
          </button>
        )
      })}

      {/* divider */}
      <span style={{ width: 1, height: 26, background: 'rgba(var(--border-rgb), 0.14)', margin: '0 0.15rem', flexShrink: 0 }} />

      {/* Resume — route, not a section */}
      <button
        onClick={goResume}
        aria-label="Resume"
        aria-current={isOnResume ? 'page' : undefined}
        style={{
          position: 'relative',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 3,
          padding: 'clamp(0.45rem, 1vw, 0.6rem) clamp(0.55rem, 1.4vw, 0.95rem)',
          borderRadius: 999,
          color: isOnResume ? 'var(--accent)' : 'rgba(var(--text-rgb), 0.55)',
          transition: 'color 0.3s ease',
        }}
      >
        {isOnResume && (
          <motion.span
            layoutId="tab-lens"
            transition={{ type: 'spring', stiffness: 420, damping: 34 }}
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: 999,
              background: 'rgba(var(--accent-rgb), 0.14)',
              border: '1px solid rgba(var(--accent-rgb), 0.28)',
              boxShadow: 'inset 0 1px 0 0 rgba(var(--glass-spec), 0.5)',
              zIndex: -1,
            }}
          />
        )}
        <FileText size={19} strokeWidth={isOnResume ? 2.4 : 2} />
        <span
          className="tab-label"
          style={{
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontWeight: isOnResume ? 700 : 500,
            fontSize: '0.62rem',
            letterSpacing: '-0.01em',
            lineHeight: 1,
          }}
        >
          Resume
        </span>
      </button>
    </motion.nav>
    </div>
  )
}
