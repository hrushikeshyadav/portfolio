import { Suspense, lazy } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Download, Mail, MapPin, Phone } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '../components/ui/Icons'
import { useNavigate } from '@tanstack/react-router'
import ResumeScene from '../components/3d/ResumeScene'

const PDFDownloadLink = lazy(() =>
  import('@react-pdf/renderer').then((m) => ({ default: m.PDFDownloadLink }))
)
const ResumePDF = lazy(() => import('../components/resume/ResumePDF'))

const ACCENT = '#ff4500'

const CONTACT = [
  { icon: Mail, text: 'yadavhrushikesh21@gmail.com', href: 'mailto:yadavhrushikesh21@gmail.com' },
  { icon: Phone, text: '+91 9054573621', href: 'tel:+919054573621' },
  { icon: GithubIcon, text: 'github.com/hrushikeshyadav', href: 'https://github.com/hrushikeshyadav' },
  { icon: LinkedinIcon, text: 'linkedin.com/in/hrushikesh-yadav-0a16b3123', href: 'https://www.linkedin.com/in/hrushikesh-yadav-0a16b3123' },
  { icon: MapPin, text: 'India · Remote', href: null },
]

const EXPERIENCE = [
  {
    title: 'Senior Frontend Engineer',
    company: 'Logicwind',
    subtitle: 'Product Studio — SaaS & AI platforms from zero to launch',
    period: '2020 – Present',
    location: 'India · Remote',
    bullets: [
      'Architected DigiQC, a multi-tenant quality control SaaS for construction with 3,700+ releases; owned React/Apollo frontend, drag-and-drop stage management, Google Maps integration, and role-based access control.',
      'Built Zinq AI agent platform as a Turborepo monorepo — Vite admin SPA, Next.js 15 public runtime on Cloudflare Workers, React Flow visual workflow editor, and shared shadcn/ui design system.',
      'Developed LW Agent Demo Portal featuring 6 vertical AI agents (BI, bilingual meeting assistant, KYC pipeline, RAG knowledge base) with Next.js App Router and Vercel AI SDK.',
      'Delivered AppsOnAir, an enterprise internal app distribution platform with JWT auth, versioned release management, team permissions, and multi-platform build artifact tracking.',
      'Built LW Hub internal knowledge management platform with multi-workspace support, rich-text collaboration editor, and team-scoped GraphQL permissions.',
      'Integrated Anthropic Claude, OpenAI GPT-4, and Google Gemini across products using Vercel AI SDK — streaming UI, tool calling, and RAG pipelines.',
      'Established TypeScript strict-mode standards, GraphQL Codegen pipelines, and zero-warning ESLint policies across all products.',
    ],
  },
]

const PROJECTS = [
  { name: 'DigiQC', tagline: 'Quality Control SaaS Platform', period: '2023–2025', desc: 'Multi-tenant QC platform for construction. Inspection workflows, drag-and-drop stage management, geolocation tagging. 3,700+ releases.', tech: ['React', 'TypeScript', 'Apollo GraphQL', 'Ant Design', 'DnD Kit', 'Google Maps', 'Sentry'], color: '#f59e0b' },
  { name: 'Zinq', tagline: 'AI Agent Platform — Monorepo', period: '2024–2025', desc: 'Turborepo monorepo: Vite admin SPA, Next.js 15 public runtime, React Flow workflow builder, shared design system, streaming AI.', tech: ['React', 'Next.js', 'Vite', 'Turborepo', 'Tailwind v4', 'shadcn/ui', 'React Flow', 'Cloudflare'], color: '#10b981' },
  { name: 'LW Agent Demos', tagline: 'AI Demo Portal — 6 Agents', period: '2025', desc: '6 production AI agents: BI agent, meeting assistant, employee training, KYC pipeline, RAG knowledge base, ERPNext interface.', tech: ['Next.js', 'TypeScript', 'Vercel AI SDK', 'shadcn/ui', 'Recharts'], color: '#8b5cf6' },
  { name: 'AppsOnAir', tagline: 'App Distribution Platform', period: '2023', desc: 'Enterprise app distribution with JWT auth, versioned releases, team management, multi-platform build artifacts.', tech: ['React', 'Apollo GraphQL', 'Ant Design', 'JWT', 'Sentry'], color: '#f59e0b' },
  { name: 'LW Hub', tagline: 'Knowledge Base Platform', period: '2023–2024', desc: 'Internal knowledge management hub with multi-workspace, rich-text editor, and team-scoped permissions.', tech: ['React', 'Apollo GraphQL', 'Ant Design', 'Firebase'], color: '#06b6d4' },
  { name: 'Chem ERP', tagline: 'Chemical Industry ERP', period: '2024', desc: 'Domain ERP for chemical manufacturing: inventory, batch tracking, compliance reporting.', tech: ['React', 'TypeScript', 'GraphQL', 'Ant Design'], color: '#f97316' },
  { name: 'React Org Chart', tagline: 'Open Source D3 Library', period: '2024', desc: 'Interactive D3 org chart component with zoom, pan, collapsible nodes, custom renderers.', tech: ['React', 'D3.js', 'TypeScript', 'Webpack'], color: '#a3e635' },
  { name: 'Claude Code Monitor', tagline: 'Developer CLI Tool', period: '2025', desc: 'CLI utility to track Claude Code API usage, costs, and session statistics.', tech: ['Node.js', 'TypeScript', 'CLI'], color: '#e879f9' },
]

const SKILLS = [
  { label: 'Frontend', color: '#ff4500', items: ['React 19', 'TypeScript', 'Next.js 15', 'Vite', 'Tailwind v4', 'Framer Motion', 'Ant Design', 'shadcn/ui', 'React Flow', 'D3.js'] },
  { label: 'API & Data', color: '#00b4d8', items: ['GraphQL', 'Apollo Client', 'Apollo Server', 'TanStack Query', 'REST APIs', 'GraphQL Codegen', 'Zod', 'Drizzle ORM'] },
  { label: 'AI & Agents', color: '#a855f7', items: ['Vercel AI SDK', 'Anthropic Claude', 'OpenAI GPT-4', 'Google Gemini', 'Tool Calling', 'RAG Pipelines', 'Streaming UI'] },
  { label: 'Infrastructure', color: '#22c55e', items: ['Turborepo', 'Node.js', 'Docker', 'Cloudflare Workers', 'Firebase', 'GitHub Actions', 'Sentry', 'better-auth'] },
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
              ATS-OPTIMIZED
            </span>
            <DownloadButton dark />
          </div>
        </div>
      </div>

      {/* ── Three.js hero ── */}
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <ResumeScene height={380} />
        {/* Overlay text */}
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
            }}>Hrushikesh Yadav</div>
            <div style={{
              fontFamily: "'DM Mono', monospace", fontSize: '0.72rem',
              color: '#ff4500', letterSpacing: '0.14em', textTransform: 'uppercase',
              marginBottom: '1.25rem',
            }}>Senior Frontend Engineer · Full Stack · AI Builder</div>
            <div style={{ pointerEvents: 'auto' }}>
              <DownloadButton />
            </div>
          </motion.div>
        </div>
        {/* Bottom fade into paper */}
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

          {/* Header */}
          <div style={{ padding: 'clamp(1.75rem,3vw,2.75rem) clamp(1.75rem,4vw,3rem) clamp(1.25rem,2vw,2rem)', borderBottom: '2px solid #111' }}>
            <h1 style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontWeight: 800, fontSize: 'clamp(1.8rem,4vw,2.6rem)',
              letterSpacing: '-0.035em', color: '#0a0a0a', margin: '0 0 0.2rem',
            }}>Hrushikesh Yadav</h1>
            <p style={{
              fontFamily: "'DM Mono', monospace", fontSize: '0.72rem',
              color: '#555', letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 1.25rem',
            }}>Senior Frontend Engineer · Full Stack · AI Builder</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem 2rem' }}>
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

            <ResumeSection title="Professional Summary">
              <p style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: '0.93rem', color: '#2a2a2a', lineHeight: 1.72, margin: 0 }}>
                Senior Frontend Engineer with <strong>5+ years</strong> of experience shipping production-grade SaaS, enterprise, and AI platforms. Expert in React, TypeScript, and GraphQL-first architectures. At Logicwind, I own the frontend architecture, GraphQL API layer, and AI integration stack across <strong>10+ live products</strong> — from multi-tenant inspection SaaS (3,700+ releases) to full AI agent platforms. Proven track record of building complex systems from zero to launch.
              </p>
            </ResumeSection>

            <ResumeSection title="Work Experience">
              {EXPERIENCE.map(exp => (
                <div key={exp.title}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '0.18rem' }}>
                    <div>
                      <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: '1rem', color: '#0a0a0a' }}>{exp.title}</span>
                      <span style={{ color: '#bbb', margin: '0 0.45rem' }}>·</span>
                      <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 600, fontSize: '0.95rem', color: ACCENT }}>{exp.company}</span>
                    </div>
                    <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.68rem', color: '#777' }}>{exp.period} · {exp.location}</span>
                  </div>
                  <p style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.68rem', color: '#888', margin: '0 0 0.85rem', letterSpacing: '0.02em' }}>{exp.subtitle}</p>
                  <ul style={{ margin: 0, paddingLeft: '1rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    {exp.bullets.map((b, i) => (
                      <li key={i} style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: '0.88rem', color: '#2a2a2a', lineHeight: 1.65 }}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </ResumeSection>

            <ResumeSection title="Key Projects">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '0.65rem' }}>
                {PROJECTS.map(p => (
                  <div key={p.name}
                    style={{ border: '1px solid #e8e8e8', padding: '0.85rem 1rem', transition: 'border-color 0.2s, box-shadow 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = p.color; e.currentTarget.style.boxShadow = `0 2px 12px ${p.color}18` }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = '#e8e8e8'; e.currentTarget.style.boxShadow = '' }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.2rem' }}>
                      <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: '0.92rem', color: '#0a0a0a' }}>{p.name}</span>
                      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.6rem', color: '#aaa' }}>{p.period}</span>
                    </div>
                    <p style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.62rem', color: p.color, margin: '0 0 0.4rem', letterSpacing: '0.04em' }}>{p.tagline}</p>
                    <p style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: '0.8rem', color: '#444', lineHeight: 1.55, margin: '0 0 0.55rem' }}>{p.desc}</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                      {p.tech.map(t => (
                        <span key={t} style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.58rem', padding: '1px 6px', background: '#f4f4f4', color: '#555', border: '1px solid #e0e0e0' }}>{t}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </ResumeSection>

            <ResumeSection title="Technical Skills">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {SKILLS.map(sk => (
                  <div key={sk.label} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, width: 108, flexShrink: 0, paddingTop: 2 }}>
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: sk.color, flexShrink: 0, boxShadow: `0 0 5px ${sk.color}88` }} />
                      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.62rem', color: sk.color, letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 700 }}>{sk.label}</span>
                    </div>
                    <div style={{ flex: 1, display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                      {sk.items.map(item => (
                        <span key={item} style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: '0.8rem', color: '#2a2a2a', fontWeight: 500, padding: '2px 9px', background: '#f8f8f8', border: '1px solid #e8e8e8' }}>{item}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </ResumeSection>

          </div>
        </motion.div>

        <p style={{ textAlign: 'center', marginTop: '1.5rem', fontFamily: "'DM Mono', monospace", fontSize: '0.6rem', color: 'rgba(245,245,247,0.12)', letterSpacing: '0.1em' }}>
          ATS-OPTIMIZED · SINGLE-COLUMN PDF · TEXT-BASED · THREE.JS RENDERED
        </p>
      </div>
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
