import { ArrowUp } from 'lucide-react'

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid rgba(var(--border-rgb),0.06)',
      padding: '1.5rem',
      background: 'rgba(var(--bg-rgb), 0.66)',
      position: 'relative', zIndex: 1,
    }}>
      <div style={{
        maxWidth: 1280, margin: '0 auto',
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 24, height: 24, background: 'var(--accent)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontWeight: 800, fontSize: '0.6rem', color: 'var(--bg)',
          }}>HY</div>
          <span style={{
            fontFamily: "'DM Mono', monospace", fontSize: '0.7rem',
            color: 'rgba(var(--text-rgb),0.2)', letterSpacing: '0.04em',
          }}>
            © {new Date().getFullYear()} Hrushikesh Yadav
          </span>
        </div>

        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="glass glass-interactive glass-rim"
          style={{
            ['--glass-radius' as string]: '10px',
            ['--glass-blur' as string]: '8px',
            color: 'rgba(var(--text-rgb),0.35)',
            padding: '0.45rem', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
          }}
          onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)' }}
          onMouseLeave={e => { e.currentTarget.style.color = 'rgba(var(--text-rgb),0.35)' }}
          aria-label="Back to top"
        >
          <ArrowUp size={13} />
        </button>
      </div>
    </footer>
  )
}
