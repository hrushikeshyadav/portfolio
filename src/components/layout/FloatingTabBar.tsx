import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { motion } from 'framer-motion'
import { LayoutGrid, User, Briefcase, Layers, Mail, FileText } from 'lucide-react'
import { useNavigate, useRouterState } from '@tanstack/react-router'
import { CURTAIN_COVER_MS } from '../ui/CurtainTransition'

type Tab = { id: string; label: string; Icon: typeof LayoutGrid; route?: string }

// A softer, heavier spring so the lens visibly *glides* across the bar when you
// jump from tab 1 → 4 (the "liquid glass sliding" feel) instead of snapping.
const LENS_TRANSITION = { type: 'spring', stiffness: 230, damping: 26, mass: 1 } as const

// Richer liquid-glass pill for the selected tab — frosted, accent-tinted, with a
// specular top edge and an outer accent glow.
const LENS_STYLE: CSSProperties = {
  position: 'absolute',
  inset: 0,
  borderRadius: 999,
  background:
    'radial-gradient(120% 90% at 30% -10%, rgba(var(--glass-spec),0.5) 0%, transparent 50%), linear-gradient(160deg, rgba(var(--accent-rgb),0.30) 0%, rgba(var(--accent-rgb),0.14) 100%)',
  WebkitBackdropFilter: 'blur(10px) saturate(170%)',
  backdropFilter: 'blur(10px) saturate(170%)',
  border: '1px solid rgba(var(--accent-rgb),0.42)',
  boxShadow:
    'inset 0 1px 0.5px 0 rgba(var(--glass-spec),0.65), inset 0 0 0 1px rgba(var(--accent-rgb),0.08), 0 4px 16px -2px rgba(var(--accent-rgb),0.4), 0 0 20px -3px rgba(var(--accent-rgb),0.5)',
  zIndex: -1,
}

const TABS: Tab[] = [
  { id: 'about', label: 'About', Icon: User },
  { id: 'work', label: 'Work', Icon: LayoutGrid },
  { id: 'experience', label: 'Career', Icon: Briefcase },
  { id: 'stack', label: 'Stack', Icon: Layers },
  { id: 'contact', label: 'Contact', Icon: Mail, route: '/contact' },
]

// Scroll-spy map, in DOM order: section id we probe → tab it lights. "more"
// (Beyond the deep dives) sits right after the deep dives and is part of Work,
// so it also lights the Work tab. Contact is now its own route (not a section),
// so it isn't scroll-spied.
const SPY: { el: string; tab: string }[] = [
  { el: 'about', tab: 'about' },
  { el: 'work', tab: 'work' },
  { el: 'more', tab: 'work' },
  { el: 'experience', tab: 'experience' },
  { el: 'stack', tab: 'stack' },
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
  const pathname = routerState.location.pathname
  const isOnResume = pathname === '/resume'
  const isOnContact = pathname === '/contact'
  const offHome = isOnResume || isOnContact

  // On phones the backdrop blur is weak/absent, so the glass capsule nearly
  // disappears — use a more opaque fill there so the bar stays legible.
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 700px)')
    const update = () => setIsMobile(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  // While a tab-triggered scroll is animating, the scroll-spy must NOT run —
  // otherwise it walks the highlight through every section the page passes over
  // (the "1 → 2 → 3 → 4" glitch). `lockUntil` holds the spy off until the
  // programmatic scroll has settled.
  const lockUntil = useRef(0)

  useEffect(() => {
    if (offHome) return
    let raf = 0
    const onScroll = () => {
      if (performance.now() < lockUntil.current) return
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        if (performance.now() < lockUntil.current) return
        const probe = 110 // a little below the top edge
        let current = TABS[0].id
        for (const sp of SPY) {
          const el = document.getElementById(sp.el)
          if (el && el.getBoundingClientRect().top <= probe) current = sp.tab
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
  }, [offHome])

  const getLenis = () =>
    (window as unknown as { lenis?: { scrollTo: (t: HTMLElement | number, o?: object) => void } }).lenis

  const scrollToId = (id: string, immediate = false) => {
    const el = document.getElementById(id)
    if (!el) return
    // element-based — lenis measures at animation time, so it lands on the
    // section's true top (offset clears the floating top controls).
    const lenis = getLenis()
    if (lenis) lenis.scrollTo(el, immediate ? { offset: -84, immediate: true } : { offset: -84, duration: 1.0 })
    else el.scrollIntoView({ behavior: immediate ? 'auto' : 'smooth' })
  }

  // each tab plays a visually distinct curtain on navigation
  const VARIANTS: Record<string, string> = {
    about: 'door', work: 'shutter', experience: 'blinds', stack: 'split', contact: 'rise',
  }
  const prefersReduced = () =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const fireCurtain = (variant: string, label: string) =>
    window.dispatchEvent(new CustomEvent('curtain', { detail: { variant, label } }))

  const scrollToTop = (immediate = false) => {
    const lenis = getLenis()
    if (lenis) lenis.scrollTo(0, immediate ? { immediate: true } : { duration: 1.0 })
    else window.scrollTo({ top: 0, behavior: immediate ? 'auto' : 'smooth' })
  }

  // the first tab acts as "home" — it scrolls to the very top (the hero),
  // not down into the section's body.
  const isFirstTab = (id: string) => id === TABS[0].id

  const goSection = (id: string) => {
    // jump the highlight straight to the target and hold the scroll-spy off so it
    // never steps through the sections we pass over (desktop + mobile).
    setActive(id)
    lockUntil.current = performance.now() + 1500
    const label = TABS.find((t) => t.id === id)?.label ?? ''
    const reduce = prefersReduced()

    // with reduced motion, just smooth-scroll (no curtain). Otherwise drop the
    // curtain and jump to the section instantly while it's covered, so the
    // section "loads" hidden behind the sweep.
    if (reduce) {
      if (offHome) navigate({ to: '/' }).then(() => setTimeout(() => (isFirstTab(id) ? scrollToTop() : scrollToId(id)), 180))
      else isFirstTab(id) ? scrollToTop() : scrollToId(id)
      return
    }

    const variant = VARIANTS[id] ?? 'door'
    fireCurtain(variant, label)
    const cover = CURTAIN_COVER_MS[variant] ?? 430
    const jump = () => (isFirstTab(id) ? scrollToTop(true) : scrollToId(id, true))
    if (offHome) navigate({ to: '/' }).then(() => setTimeout(jump, cover))
    else setTimeout(jump, cover)
  }

  // Route tabs (Resume, Contact) play their curtain, then swap the route only
  // once it's fully opaque — so the new page renders hidden behind the sweep
  // (same jump-behind-the-curtain trick the section tabs use).
  const goRouteTab = (here: boolean, doNav: () => Promise<unknown>, variant: string, label: string) => {
    lockUntil.current = performance.now() + 1500
    const reduce = prefersReduced()
    if (reduce) {
      if (here) scrollToTop(true)
      else doNav().then(() => setTimeout(() => scrollToTop(true), 60))
      return
    }
    fireCurtain(variant, label)
    const cover = CURTAIN_COVER_MS[variant] ?? 430
    if (here) setTimeout(() => scrollToTop(true), cover)
    else setTimeout(() => doNav().then(() => scrollToTop(true)), cover)
  }

  const goResume = () => goRouteTab(isOnResume, () => navigate({ to: '/resume' }), 'iris', 'Resume')
  const goContact = () => goRouteTab(isOnContact, () => navigate({ to: '/contact' }), 'rise', 'Contact')

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
      data-cursor-skip
      style={{
        pointerEvents: 'auto',
        ['--glass-radius' as string]: '999px',
        ['--glass-blur' as string]: '24px',
        ['--glass-fill' as string]: isMobile ? '0.34' : '0.16',
        // Phones don't blur the backdrop reliably, so the page bleeds through a
        // translucent bar. Sit it on an opaque, theme-aware surface there (with
        // a subtle tint sheen) so the tabs stay legible.
        ...(isMobile
          ? {
              background:
                'linear-gradient(160deg, rgba(var(--glass-tint),0.20) 0%, transparent 60%), var(--surface)',
            }
          : null),
        display: 'flex',
        alignItems: 'center',
        gap: 'clamp(0.15rem, 0.6vw, 0.35rem)',
        padding: 'clamp(0.4rem, 0.8vw, 0.5rem)',
        maxWidth: '100%',
      }}
    >
      {TABS.map(({ id, label, Icon, route }) => {
        const isActive = route ? pathname === route : (!offHome && active === id)
        return (
          <button
            key={id}
            onClick={() => (route ? goContact() : goSection(id))}
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
              color: isActive ? 'var(--accent)' : `rgba(var(--text-rgb), ${isMobile ? 0.85 : 0.55})`,
              transition: 'color 0.3s ease',
            }}
          >
            {isActive && (
              <motion.span layoutId="tab-lens" transition={LENS_TRANSITION} style={LENS_STYLE} />
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
          color: isOnResume ? 'var(--accent)' : `rgba(var(--text-rgb), ${isMobile ? 0.85 : 0.55})`,
          transition: 'color 0.3s ease',
        }}
      >
        {/* Distinct layoutId — the Resume tab is separated from the section
            tabs by the divider, so its highlight must NOT slide across from
            them (that shared morph rendered the lens twice / glitched). */}
        {isOnResume && (
          <motion.span layoutId="tab-lens-resume" transition={LENS_TRANSITION} style={LENS_STYLE} />
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
