import { Suspense, lazy, useEffect, type ReactNode, type CSSProperties } from 'react'
import { motion } from 'framer-motion'
import { Download, Mail, MapPin, Phone } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '../components/ui/Icons'
import {
  personal, summary, experience, skills, softSkills, education, languages,
} from '../data/resume'

const PDFDownloadLink = lazy(() =>
  import('@react-pdf/renderer').then((m) => ({ default: m.PDFDownloadLink }))
)
const ResumePDF = lazy(() => import('../components/resume/ResumePDF'))

const C = personal.contact

const CONTACT = [
  { icon: Mail, text: C.email, href: `mailto:${C.email}` },
  { icon: Phone, text: C.phone, href: C.phoneHref },
  { icon: GithubIcon, text: C.github, href: C.githubHref },
  { icon: LinkedinIcon, text: C.linkedin, href: C.linkedinHref },
  { icon: MapPin, text: C.location, href: null },
]

// ── Download button ────────────────────────────────────────────────────────
function DownloadButton() {
  return (
    <Suspense fallback={
      <span className="glass glass-warm glass-rim" style={{
        display: 'inline-flex', alignItems: 'center', gap: 8,
        padding: '0.8rem 1.6rem', ['--glass-radius' as string]: '999px',
        color: 'var(--text)', fontFamily: "'Bricolage Grotesque', sans-serif",
        fontWeight: 700, fontSize: '0.9rem',
      }}>
        <Download size={16} /> Preparing…
      </span>
    }>
      <PDFDownloadLink document={<ResumePDF />} fileName="Hrushikesh_Yadav_Resume.pdf" style={{ textDecoration: 'none' }}>
        {({ loading }) => (
          <span className="glass glass-warm glass-interactive glass-rim glass-sheen" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '0.8rem 1.6rem', ['--glass-radius' as string]: '999px',
            color: 'var(--text)', fontFamily: "'Bricolage Grotesque', sans-serif",
            fontWeight: 700, fontSize: '0.9rem', letterSpacing: '-0.01em',
          }}>
            <Download size={16} /> {loading ? 'Preparing…' : 'Download PDF'}
          </span>
        )}
      </PDFDownloadLink>
    </Suspense>
  )
}

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as const },
})

function Card({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <div className="glass glass-rim" style={{
      ['--glass-radius' as string]: '20px',
      ['--glass-blur' as string]: '16px',
      padding: 'clamp(1.5rem, 3vw, 2.5rem)',
      ...style,
    }}>{children}</div>
  )
}

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1.25rem' }}>
      <span style={{ width: 24, height: '1.5px', background: 'var(--accent)' }} />
      <span style={{
        fontFamily: "'DM Mono', monospace", fontSize: '0.62rem',
        color: 'var(--accent)', letterSpacing: '0.14em', textTransform: 'uppercase',
      }}>{children}</span>
    </div>
  )
}

function Pill({ children }: { children: ReactNode }) {
  return (
    <span className="glass glass-rim" style={{
      ['--glass-radius' as string]: '100px', ['--glass-blur' as string]: '6px',
      padding: '0.35rem 0.75rem',
      fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 500,
      fontSize: '0.8rem', color: 'rgba(var(--text-rgb),0.8)',
    }}>{children}</span>
  )
}

// ── Page ───────────────────────────────────────────────────────────────────
export default function ResumePage() {
  useEffect(() => {
    const lenis = (window as unknown as { lenis?: { scrollTo: (t: number, o?: object) => void } }).lenis
    if (lenis) lenis.scrollTo(0, { immediate: true })
    else window.scrollTo(0, 0)
  }, [])

  return (
    <div style={{
      maxWidth: 1000, margin: '0 auto',
      padding: 'clamp(6rem, 14vw, 9rem) clamp(1.25rem, 5vw, 2.5rem) 4rem',
    }}>
      {/* Header */}
      <motion.div {...fade()} style={{ marginBottom: 'clamp(1.5rem, 4vw, 2.5rem)' }}>
        <Eyebrow>Résumé · {personal.title}</Eyebrow>
        <div style={{
          display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end',
          justifyContent: 'space-between', gap: '1.5rem',
        }}>
          <h1 style={{
            fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800,
            fontSize: 'clamp(2.4rem, 8vw, 4.5rem)', letterSpacing: '-0.045em',
            lineHeight: 0.95, color: 'var(--text)', margin: 0,
          }}>{personal.name}</h1>
          <DownloadButton />
        </div>

        {/* Contact chips */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1.75rem' }}>
          {CONTACT.map(({ icon: Icon, text, href }) => {
            const inner = (
              <>
                <Icon size={13} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.72rem', color: 'rgba(var(--text-rgb),0.7)' }}>{text}</span>
              </>
            )
            const css: CSSProperties = {
              display: 'inline-flex', alignItems: 'center', gap: 7,
              ['--glass-radius' as string]: '100px', ['--glass-blur' as string]: '8px',
              padding: '0.4rem 0.8rem', textDecoration: 'none',
            }
            return href
              ? <a key={text} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="glass glass-interactive glass-rim" style={css}>{inner}</a>
              : <span key={text} className="glass glass-rim" style={css}>{inner}</span>
          })}
        </div>
      </motion.div>

      {/* Summary */}
      <motion.div {...fade(0.05)} style={{ marginBottom: 'clamp(1rem, 2.5vw, 1.5rem)' }}>
        <Card>
          <Eyebrow>Summary</Eyebrow>
          <p style={{
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontSize: 'clamp(1rem, 1.7vw, 1.2rem)', lineHeight: 1.7,
            color: 'rgba(var(--text-rgb),0.78)', margin: 0, letterSpacing: '-0.01em',
          }}>{summary}</p>
        </Card>
      </motion.div>

      {/* Experience */}
      <motion.div {...fade(0.1)} style={{ marginBottom: 'clamp(1rem, 2.5vw, 1.5rem)' }}>
        <Card>
          <Eyebrow>Experience</Eyebrow>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(1.5rem, 3vw, 2.25rem)' }}>
            {experience.map((exp, i) => (
              <div key={exp.role + exp.duration} style={{
                paddingTop: i === 0 ? 0 : 'clamp(1.5rem, 3vw, 2.25rem)',
                borderTop: i === 0 ? 'none' : '1px solid rgba(var(--border-rgb),0.1)',
              }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'baseline', gap: '0.35rem 1rem', marginBottom: '0.85rem' }}>
                  <div>
                    <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: 'clamp(1.1rem,2vw,1.3rem)', color: 'var(--text)', letterSpacing: '-0.02em' }}>{exp.role}</span>
                    <span style={{ color: 'rgba(var(--text-rgb),0.3)', margin: '0 0.5rem' }}>·</span>
                    <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 600, fontSize: '0.95rem', color: 'var(--accent)' }}>{exp.company}</span>
                  </div>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.68rem', color: 'rgba(var(--text-rgb),0.45)' }}>{exp.duration}</span>
                </div>
                <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
                  {exp.highlights.map((h, hi) => (
                    <li key={hi} style={{ display: 'flex', gap: 10 }}>
                      <span style={{ color: 'rgba(var(--accent-rgb),0.7)', flexShrink: 0, marginTop: 1, fontSize: '0.7rem' }}>▹</span>
                      <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 'clamp(0.85rem,1.3vw,0.95rem)', color: 'rgba(var(--text-rgb),0.6)', lineHeight: 1.6, letterSpacing: '-0.01em' }}>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Lower: skills + side */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'clamp(1rem, 2.5vw, 1.5rem)' }} className="resume-lower">
        <motion.div {...fade(0.12)}>
          <Card style={{ height: '100%' }}>
            <Eyebrow>Skills</Eyebrow>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
              {skills.map((g) => (
                <div key={g.label}>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.6rem', color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 500, marginBottom: '0.6rem' }}>{g.label}</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                    {g.items.map((it) => <Pill key={it}>{it}</Pill>)}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        <motion.div {...fade(0.16)} style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(1rem, 2.5vw, 1.5rem)' }}>
          <Card>
            <Eyebrow>Education</Eyebrow>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {education.map((e) => (
                <div key={e.degree}>
                  <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: '0.98rem', color: 'var(--text)' }}>{e.degree}</div>
                  <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: '0.85rem', color: 'rgba(var(--text-rgb),0.5)', lineHeight: 1.45 }}>{e.institution}</div>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.66rem', color: 'var(--accent)', marginTop: 3 }}>{e.year}</div>
                </div>
              ))}
            </div>
          </Card>
          <Card>
            <Eyebrow>Strengths</Eyebrow>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.25rem' }}>
              {softSkills.map((s) => <Pill key={s}>{s}</Pill>)}
            </div>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.6rem', color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.6rem' }}>Languages</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {languages.map((l) => <Pill key={l}>{l}</Pill>)}
            </div>
          </Card>
        </motion.div>
      </div>

      <p style={{ textAlign: 'center', marginTop: '2.5rem', fontFamily: "'DM Mono', monospace", fontSize: '0.6rem', color: 'rgba(var(--text-rgb),0.35)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
        Downloads as a clean, ATS-friendly PDF
      </p>

      <style>{`
        @media (min-width: 840px) {
          .resume-lower { grid-template-columns: 1.25fr 0.75fr !important; align-items: start; }
        }
      `}</style>
    </div>
  )
}
