import { useEffect, useRef, useState, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useNavigate, useRouterState } from '@tanstack/react-router'
import {
  Search, User, LayoutGrid, Briefcase, Layers, Mail, FileText,
  ArrowUp, SunMoon, Copy, CornerDownLeft,
} from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './Icons'
import { getTheme, setTheme } from '../../lib/theme'
import { CURTAIN_COVER_MS } from './CurtainTransition'

type IconCmp = React.ComponentType<{ size?: number | string; style?: React.CSSProperties }>

/**
 * ⌘K / Ctrl-K command palette — a searchable launcher to jump to any section,
 * flip the theme, open the resume, or hit social links. Keyboard-first
 * (↑/↓ to move, ↵ to run, Esc to close) and dependency-free beyond what the
 * site already ships. Section/resume navigation plays the same curtain
 * transition the floating tab bar uses, jumping to the target while covered.
 */

type Cmd = {
  id: string
  label: string
  hint?: string
  keywords: string
  Icon: IconCmp
  run: () => void
}

const getLenis = () =>
  (window as unknown as { lenis?: { scrollTo: (t: HTMLElement | number, o?: object) => void } }).lenis

export default function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [sel, setSel] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()
  const isOnResume = useRouterState().location.pathname === '/resume'

  // — raw scroll (instant when jumping behind a curtain, smooth otherwise) —
  const jumpToId = (id: string, immediate: boolean) => {
    const el = document.getElementById(id)
    if (!el) return
    const lenis = getLenis()
    if (lenis) lenis.scrollTo(el, immediate ? { offset: -84, immediate: true } : { offset: -84, duration: 1.0 })
    else el.scrollIntoView({ behavior: immediate ? 'auto' : 'smooth' })
  }
  const jumpTop = (immediate: boolean) => {
    const lenis = getLenis()
    if (lenis) lenis.scrollTo(0, immediate ? { immediate: true } : { duration: 1.0 })
    else window.scrollTo({ top: 0, behavior: immediate ? 'auto' : 'smooth' })
  }

  const prefersReduced = () =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const fireCurtain = (variant: string, label: string) =>
    window.dispatchEvent(new CustomEvent('curtain', { detail: { variant, label } }))

  // Run a navigation behind the curtain sweep (same trick as FloatingTabBar):
  // drop the curtain, then jump to the target instantly once it's opaque so the
  // scroll/route swap is never seen. Reduced motion → plain smooth scroll.
  const navWithCurtain = (variant: string, label: string, jump: (immediate: boolean) => void) => {
    if (prefersReduced()) {
      if (isOnResume) navigate({ to: '/' }).then(() => setTimeout(() => jump(false), 180))
      else jump(false)
      return
    }
    fireCurtain(variant, label)
    const cover = CURTAIN_COVER_MS[variant] ?? 430
    const run = () => jump(true)
    if (isOnResume) navigate({ to: '/' }).then(() => setTimeout(run, cover))
    else setTimeout(run, cover)
  }

  const goResume = () => {
    if (isOnResume) return
    if (prefersReduced()) { navigate({ to: '/resume' }).then(() => jumpTop(true)); return }
    fireCurtain('iris', 'Resume')
    const cover = CURTAIN_COVER_MS.iris ?? 430
    setTimeout(() => navigate({ to: '/resume' }).then(() => jumpTop(true)), cover)
  }

  const commands: Cmd[] = [
    { id: 'top', label: 'Back to top', keywords: 'home hero start', Icon: ArrowUp, run: () => navWithCurtain('door', 'Top', jumpTop) },
    { id: 'about', label: 'Go to About', keywords: 'intro bio who', Icon: User, run: () => navWithCurtain('door', 'About', (im) => jumpToId('about', im)) },
    { id: 'work', label: 'Go to Work', keywords: 'projects case studies deep dives', Icon: LayoutGrid, run: () => navWithCurtain('shutter', 'Work', (im) => jumpToId('work', im)) },
    { id: 'experience', label: 'Go to Career', keywords: 'experience timeline jobs', Icon: Briefcase, run: () => navWithCurtain('blinds', 'Career', (im) => jumpToId('experience', im)) },
    { id: 'stack', label: 'Go to Stack', keywords: 'skills tech tools', Icon: Layers, run: () => navWithCurtain('split', 'Stack', (im) => jumpToId('stack', im)) },
    { id: 'contact', label: 'Go to Contact', keywords: 'reach hire email message', Icon: Mail, run: () => navWithCurtain('rise', 'Contact', (im) => jumpToId('contact', im)) },
    { id: 'resume', label: 'Open Resume', keywords: 'cv pdf download', Icon: FileText, run: goResume },
    { id: 'theme', label: 'Toggle theme', hint: 'light / dark', keywords: 'dark light mode color', Icon: SunMoon, run: () => setTheme(getTheme() === 'dark' ? 'light' : 'dark') },
    { id: 'email', label: 'Copy email', hint: 'yadavhrushikesh21@gmail.com', keywords: 'mail contact address', Icon: Copy, run: () => navigator.clipboard?.writeText('yadavhrushikesh21@gmail.com') },
    { id: 'github', label: 'Open GitHub', keywords: 'code repos source', Icon: GithubIcon, run: () => window.open('https://github.com/hrushikeshyadav', '_blank', 'noopener') },
    { id: 'linkedin', label: 'Open LinkedIn', keywords: 'social network profile', Icon: LinkedinIcon, run: () => window.open('https://www.linkedin.com/in/hrushikesh-yadav-0a16b3123', '_blank', 'noopener') },
  ]

  const q = query.trim().toLowerCase()
  const results = q
    ? commands.filter(c => (c.label + ' ' + c.keywords).toLowerCase().includes(q))
    : commands

  // toggle via ⌘K / Ctrl-K, or a `cmdk:open` event from the nav hint button
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen(o => {
          if (!o) { setQuery(''); setSel(0) }
          return !o
        })
      }
    }
    const onOpenEvent = () => { setQuery(''); setSel(0); setOpen(true) }
    window.addEventListener('keydown', onKey)
    window.addEventListener('cmdk:open', onOpenEvent)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('cmdk:open', onOpenEvent)
    }
  }, [])

  // focus the field once the overlay is mounted
  useEffect(() => {
    if (!open) return
    const t = setTimeout(() => inputRef.current?.focus(), 30)
    return () => clearTimeout(t)
  }, [open])

  const exec = (c?: Cmd) => {
    if (!c) return
    setOpen(false)
    // let the overlay unmount before scrolling so lenis isn't fighting layout
    setTimeout(() => c.run(), 20)
  }

  const onListKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') { setOpen(false); return }
    if (e.key === 'ArrowDown') { e.preventDefault(); setSel(s => Math.min(s + 1, results.length - 1)) }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setSel(s => Math.max(s - 1, 0)) }
    else if (e.key === 'Enter') { e.preventDefault(); exec(results[sel]) }
  }

  const renderRow = (c: Cmd, i: number): ReactNode => {
    const active = i === sel
    return (
      <button
        key={c.id}
        onMouseEnter={() => setSel(i)}
        onClick={() => exec(c)}
        style={{
          display: 'flex', alignItems: 'center', gap: 12, width: '100%',
          padding: '0.7rem 0.85rem', borderRadius: 12, border: 'none', cursor: 'pointer',
          textAlign: 'left',
          background: active ? 'rgba(var(--accent-rgb),0.14)' : 'transparent',
          color: active ? 'var(--text)' : 'rgba(var(--text-rgb),0.7)',
          transition: 'background 0.15s ease, color 0.15s ease',
        }}
      >
        <c.Icon size={16} style={{ color: active ? 'var(--accent)' : 'rgba(var(--text-rgb),0.4)', flexShrink: 0 }} />
        <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: '0.92rem', fontWeight: 500 }}>{c.label}</span>
        {c.hint && (
          <span style={{ marginLeft: 'auto', fontFamily: "'DM Mono', monospace", fontSize: '0.62rem', color: 'rgba(var(--text-rgb),0.32)', letterSpacing: '0.02em' }}>
            {c.hint}
          </span>
        )}
        {active && !c.hint && <CornerDownLeft size={13} style={{ marginLeft: 'auto', color: 'rgba(var(--text-rgb),0.35)' }} />}
      </button>
    )
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          data-cursor-skip
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onMouseDown={() => setOpen(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 10000,
            display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
            padding: '14vh 1rem 1rem',
            background: 'rgba(var(--bg-rgb),0.55)',
            backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: -14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            onMouseDown={e => e.stopPropagation()}
            onKeyDown={onListKey}
            className="glass glass-rim"
            style={{
              ['--glass-radius' as string]: '18px',
              ['--glass-blur' as string]: '26px',
              ['--glass-fill' as string]: '0.5',
              width: 'min(560px, 100%)', overflow: 'hidden',
              boxShadow: '0 24px 70px -20px rgba(0,0,0,0.6)',
            }}
          >
            {/* search field */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '0.95rem 1.1rem', borderBottom: '1px solid rgba(var(--border-rgb),0.1)' }}>
              <Search size={17} style={{ color: 'rgba(var(--text-rgb),0.4)', flexShrink: 0 }} />
              <input
                ref={inputRef}
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Jump to a section, toggle theme, open links…"
                style={{
                  flex: 1, background: 'transparent', border: 'none', outline: 'none',
                  color: 'var(--text)', fontFamily: "'Bricolage Grotesque', sans-serif",
                  fontSize: '1rem', letterSpacing: '-0.01em',
                }}
              />
              <kbd style={{
                fontFamily: "'DM Mono', monospace", fontSize: '0.6rem', color: 'rgba(var(--text-rgb),0.4)',
                border: '1px solid rgba(var(--border-rgb),0.16)', borderRadius: 6, padding: '2px 6px', flexShrink: 0,
              }}>ESC</kbd>
            </div>

            {/* results */}
            <div style={{ maxHeight: '46vh', overflowY: 'auto', padding: '0.4rem' }}>
              {results.length === 0 ? (
                <div style={{ padding: '1.6rem', textAlign: 'center', fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: '0.88rem', color: 'rgba(var(--text-rgb),0.4)' }}>
                  No matches
                </div>
              ) : (
                results.map((c, i) => renderRow(c, i))
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
