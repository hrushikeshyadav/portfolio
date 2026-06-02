import { Suspense, lazy } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Download, Mail, MapPin, Phone } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '../components/ui/Icons'
import { useNavigate } from '@tanstack/react-router'
import ResumeScene from '../components/3d/ResumeScene'
import {
  personal, summary, experience, skills, softSkills, education, languages,
} from '../data/resume'

const PDFDownloadLink = lazy(() =>
  import('@react-pdf/renderer').then((m) => ({ default: m.PDFDownloadLink }))
)
const ResumePDF = lazy(() => import('../components/resume/ResumePDF'))

const ACCENT = '#ff4500'
const C = personal.contact

const CONTACT = [
  { icon: Mail, text: C.email, href: `mailto:${C.email}` },
  { icon: Phone, text: C.phone, href: C.phoneHref },
  { icon: GithubIcon, text: C.github, href: C.githubHref },
  { icon: LinkedinIcon, text: C.linkedin, href: C.linkedinHref },
  { icon: MapPin, text: C.location, href: null },
]

// ── Download button ───────────────────────────────────────────────────────────

function DownloadButton({ dark = false }: { dark?: boolean }) {
  return (
    <Suspense fallback={
      <button disabled style={{
        display: 'flex', alignItems: 'center', gap: 7,
        padding: '0.65rem 1.5rem',
        background: 'rgba(255,69,0,0.08)', border: '1px solid rgba(255,69,0,0.2)',
        color: 'rgba(255,69,0,0.4)',
        fontFamily: "'DM Mono', monospace", fontSize: '0.72rem', letterSpacing: '0.05em',
      }}>
        <Download size={13} /> Loading…
      </button>
    }>
      <PDFDownloadLink document={<ResumePDF />} fileName="Hrushikesh_Yadav_Resume.pdf" style={{ textDecoration: 'none' }}>
        {({ loading }) => (
          <button style={{
            display: 'flex', alignItems: 'center', gap: 7,
            padding: '0.65rem 1.5rem',
            background: loading ? 'rgba(255,69,0,0.08)' : (dark ? 'rgba(255,69,0,0.1)' : '#ff4500'),
            border: dark ? '1px solid rgba(255,69,0,0.3)' : 'none',
            color: loading ? '#ff4500' : (dark ? '#ff4500' : '#000'),
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontWeight: 700, fontSize: '0.82rem', letterSpacing: '-0.01em',
            cursor: loading ? 'default' : 'pointer',
            transition: 'all 0.25s ease',
          }}
            onMouseEnter={e => { if (!loading) { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(255,69,0,0.35)' } }}
            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '' }}
          >
            <Download size={14} />
            {loading ? 'Preparing…' : 'Download PDF'}
          </button>
        )}
      </PDFDownloadLink>
    </Suspense>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function ResumePage() {
  const navigate = useNavigate()

  return (
    <div style={{ background: '#000', minHeight: '100dvh' }}>

      {/* ── Sticky top bar ── */}
      <div style={{
        position: 'sticky', top: 64, zIndex: 100,
        background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(24px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        <div style={{
          maxWidth: 960, margin: '0 auto', padding: '0.7rem 1.5rem',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <button onClick={() => navigate({ to: '/' })}
            style={{
              display: 'flex', alignItems: 'center', gap: 7,
              background: 'none', border: 'none', color: 'rgba(245,245,247,0.35)',
              fontFamily: "'DM Mono', monospace", fontSize: '0.7rem',
              letterSpacing: '0.06em', cursor: 'pointer', transition: 'color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = '#f5f5f7')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(245,245,247,0.35)')}
          >
            <ArrowLeft size={13} /> Back to Portfolio
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.62rem', color: 'rgba(245,245,247,0.15)', letterSpacing: '0.1em' }}>
              ATS-FRIENDLY
            </span>
            <DownloadButton dark />
          </div>
        </div>
      </div>

      {/* ── Three.js hero ── */}
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <ResumeScene height={360} />
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.55) 100%)',
          pointerEvents: 'none',
        }}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ textAlign: 'center' }}
          >
            <div style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontWeight: 800, fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              color: '#f5f5f7', letterSpacing: '-0.04em', lineHeight: 1,
              marginBottom: '0.5rem',
            }}>{personal.name}</div>
            <div style={{
              fontFamily: "'DM Mono', monospace", fontSize: '0.72rem',
              color: '#ff4500', letterSpacing: '0.14em', textTransform: 'uppercase',
              marginBottom: '1.25rem',
            }}>{personal.title}</div>
            <div style={{ pointerEvents: 'auto' }}>
              <DownloadButton />
            </div>
          </motion.div>
        </div>
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 80,
          background: 'linear-gradient(to bottom, transparent, #f8f8f8)',
          pointerEvents: 'none',
        }} />
      </div>

      {/* ── Resume paper ── */}
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 1.5rem 6rem' }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="resume-paper"
          style={{ background: '#fff', color: '#1a1a1a' }}
        >

          {/* Header band */}
          <div style={{ padding: 'clamp(1.75rem,3vw,2.75rem) clamp(1.75rem,4vw,3rem) clamp(1.25rem,2vw,2rem)', borderBottom: '2px solid #111' }}>
            <h1 style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontWeight: 800, fontSize: 'clamp(1.8rem,4vw,2.6rem)',
              letterSpacing: '-0.035em', color: '#0a0a0a', margin: '0 0 0.2rem',
            }}>{personal.name}</h1>
            <p style={{
              fontFamily: "'DM Mono', monospace", fontSize: '0.72rem',
              color: '#555', letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 1.25rem',
            }}>{personal.title}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem 2rem' }}>
              {CONTACT.map(({ icon: Icon, text, href }) => (
                <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Icon size={12} style={{ color: ACCENT, flexShrink: 0 }} />
                  {href
                    ? <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.72rem', color: '#1a56db', textDecoration: 'none' }}>{text}</a>
                    : <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.72rem', color: '#555' }}>{text}</span>
                  }
                </div>
              ))}
            </div>
          </div>

          {/* Body */}
          <div style={{ padding: 'clamp(1.5rem,3vw,2.25rem) clamp(1.75rem,4vw,3rem) clamp(2rem,4vw,3rem)', display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>

            <ResumeSection title="Summary">
              <p style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: '0.93rem', color: '#2a2a2a', lineHeight: 1.72, margin: 0 }}>
                {summary}
              </p>
            </ResumeSection>

            <ResumeSection title="Work Experience">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
                {experience.map(exp => (
                  <div key={exp.role + exp.duration}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', alignItems: 'baseline', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <div>
                        <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: '1rem', color: '#0a0a0a' }}>{exp.role}</span>
                        <span style={{ color: '#bbb', margin: '0 0.45rem' }}>·</span>
                        <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 600, fontSize: '0.95rem', color: ACCENT }}>{exp.company}</span>
                      </div>
                      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.68rem', color: '#777' }}>{exp.duration}</span>
                    </div>
                    <ul style={{ margin: 0, paddingLeft: '1rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                      {exp.highlights.map((b, i) => (
                        <li key={i} style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: '0.86rem', color: '#333', lineHeight: 1.6 }}>{b}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </ResumeSection>

            {/* Two-column lower block */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.75rem' }} className="resume-lower">
              <ResumeSection title="Skills">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
                  {skills.map(g => (
                    <div key={g.label}>
                      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.62rem', color: ACCENT, letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 700, marginBottom: '0.35rem' }}>{g.label}</div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                        {g.items.map(item => (
                          <span key={item} style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: '0.78rem', color: '#2a2a2a', fontWeight: 500, padding: '2px 9px', background: '#f5f5f7', border: '1px solid #e6e6e9' }}>{item}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </ResumeSection>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
                <ResumeSection title="Education">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                    {education.map(e => (
                      <div key={e.degree}>
                        <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: '0.9rem', color: '#0a0a0a' }}>{e.degree}</div>
                        <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: '0.8rem', color: '#666', lineHeight: 1.45 }}>{e.institution}</div>
                        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.66rem', color: ACCENT, marginTop: 2 }}>{e.year}</div>
                      </div>
                    ))}
                  </div>
                </ResumeSection>

                <ResumeSection title="Soft Skills">
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                    {softSkills.map(sk => (
                      <span key={sk} style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: '0.78rem', color: '#2a2a2a', fontWeight: 500, padding: '3px 10px', background: '#f5f5f7', border: '1px solid #e6e6e9', borderRadius: 100 }}>{sk}</span>
                    ))}
                  </div>
                </ResumeSection>

                <ResumeSection title="Languages">
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                    {languages.map(l => (
                      <span key={l} style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: '0.78rem', color: '#2a2a2a', fontWeight: 500, padding: '3px 10px', background: '#f5f5f7', border: '1px solid #e6e6e9' }}>{l}</span>
                    ))}
                  </div>
                </ResumeSection>
              </div>
            </div>

          </div>
        </motion.div>

        <p style={{ textAlign: 'center', marginTop: '1.5rem', fontFamily: "'DM Mono', monospace", fontSize: '0.6rem', color: 'rgba(245,245,247,0.18)', letterSpacing: '0.1em' }}>
          DOWNLOADS AS A PROFESSIONAL PDF · TEXT-BASED · ATS-FRIENDLY
        </p>
      </div>

      <style>{`
        @media (min-width: 820px) {
          .resume-lower { grid-template-columns: 1.2fr 0.8fr !important; gap: 2.5rem !important; }
        }
      `}</style>
    </div>
  )
}

function ResumeSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.9rem' }}>
        <h2 style={{
          fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800,
          fontSize: '0.65rem', letterSpacing: '0.14em', textTransform: 'uppercase',
          color: '#0a0a0a', margin: 0, whiteSpace: 'nowrap',
        }}>{title}</h2>
        <div style={{ flex: 1, height: '1px', background: '#d8d8d8' }} />
      </div>
      {children}
    </div>
  )
}
