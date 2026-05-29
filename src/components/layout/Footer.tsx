import { ArrowUp } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '../ui/Icons'
import { Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid rgba(255,255,255,0.06)',
      padding: '1.5rem',
      background: '#0c0c0c',
    }}>
      <div style={{
        maxWidth: 1280, margin: '0 auto',
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 24, height: 24, background: '#ff4500',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontWeight: 800, fontSize: '0.6rem', color: '#0c0c0c',
          }}>HY</div>
          <span style={{
            fontFamily: "'DM Mono', monospace", fontSize: '0.7rem',
            color: 'rgba(245,240,235,0.2)', letterSpacing: '0.04em',
          }}>
            © {new Date().getFullYear()} Hrushikesh Yadav
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {[
            { href: 'https://github.com/hrushikeshyadav', Icon: GithubIcon, label: 'GitHub' },
            { href: 'https://www.linkedin.com/in/hrushikesh-yadav-0a16b3123', Icon: LinkedinIcon, label: 'LinkedIn' },
            { href: 'mailto:yadavhrushikesh21@gmail.com', Icon: Mail, label: 'Email' },
          ].map(({ href, Icon, label }) => (
            <a key={label} href={href}
              target={label !== 'Email' ? '_blank' : undefined}
              rel="noopener noreferrer" aria-label={label}
              style={{
                color: 'rgba(245,240,235,0.2)',
                display: 'flex', textDecoration: 'none',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = '#ff4500')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(245,240,235,0.2)')}
            >
              <Icon size={15} />
            </a>
          ))}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              color: 'rgba(245,240,235,0.25)',
              padding: '0.35rem', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s', marginLeft: 4,
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(255,69,0,0.4)'
              e.currentTarget.style.color = '#ff4500'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
              e.currentTarget.style.color = 'rgba(245,240,235,0.25)'
            }}
            aria-label="Back to top"
          >
            <ArrowUp size={13} />
          </button>
        </div>
      </div>
    </footer>
  )
}
