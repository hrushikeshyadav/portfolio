import { Suspense, lazy } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Download, Mail, MapPin, Phone } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '../components/ui/Icons'
import { useNavigate } from '@tanstack/react-router'

const PDFDownloadLink = lazy(() =>
  import('@react-pdf/renderer').then((m) => ({ default: m.PDFDownloadLink }))
)
const ResumePDF = lazy(() => import('../components/resume/ResumePDF'))

const ACCENT = '#ff4500'
const MUTED = 'rgba(245,240,235,0.35)'
const MUTED2 = 'rgba(245,240,235,0.18)'

// ── Data ────────────────────────────────────────────────────────────────────

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
  {
    name: 'DigiQC',
    tagline: 'Quality Control SaaS Platform',
    period: '2023 – 2025',
    desc: 'Multi-tenant QC platform for construction and real estate. Inspection workflows, drag-and-drop stage management, geolocation tagging, real-time reports. 3,700+ releases shipped.',
    tech: ['React', 'TypeScript', 'Apollo GraphQL', 'Ant Design', 'DnD Kit', 'Google Maps', 'Sentry'],
    color: '#f59e0b',
  },
  {
    name: 'Zinq',
    tagline: 'AI Agent Platform — Monorepo',
    period: '2024 – 2025',
    desc: 'Full-stack AI agent platform built as Turborepo monorepo. Admin dashboard, Next.js 15 public runtime, React Flow workflow builder, shared design system, better-auth, streaming AI.',
    tech: ['React', 'Next.js', 'Vite', 'Turborepo', 'Tailwind v4', 'shadcn/ui', 'React Flow', 'Cloudflare'],
    color: '#10b981',
  },
  {
    name: 'LW Agent Demos',
    tagline: 'AI Demo Portal — 6 Vertical Agents',
    period: '2025',
    desc: '6 production AI agents: Tally BI agent, bilingual meeting assistant, employee training AI, KYC liveness pipeline, RAG knowledge base, ERPNext conversational interface.',
    tech: ['Next.js', 'TypeScript', 'Vercel AI SDK', 'shadcn/ui', 'Recharts', 'Tailwind v4'],
    color: '#8b5cf6',
  },
  {
    name: 'AppsOnAir',
    tagline: 'App Distribution & Management',
    period: '2023',
    desc: 'Enterprise app distribution platform for internal deployments. JWT auth, app versioning, team management, download tracking, multi-platform build artifact management.',
    tech: ['React', 'Apollo GraphQL', 'Ant Design', 'JWT', 'Sentry'],
    color: '#f59e0b',
  },
  {
    name: 'LW Hub',
    tagline: 'Knowledge Base Platform',
    period: '2023 – 2024',
    desc: 'Internal knowledge management and collaboration hub. Multi-workspace support, rich-text editor, document organization, team-scoped GraphQL permissions.',
    tech: ['React', 'Apollo GraphQL', 'Ant Design', 'Firebase', 'Sentry'],
    color: '#06b6d4',
  },
  {
    name: 'Chem ERP',
    tagline: 'Chemical Industry ERP System',
    period: '2024',
    desc: 'Domain-specific ERP for chemical manufacturing. Inventory management, batch tracking, compliance reporting, supplier/customer relationship features.',
    tech: ['React', 'TypeScript', 'GraphQL', 'Ant Design'],
    color: '#f97316',
  },
  {
    name: 'React Org Chart',
    tagline: 'Open Source D3 Library',
    period: '2024',
    desc: 'Interactive D3-based org chart React component. Zooming, panning, collapsible nodes, custom card renderers. Based on UNICEF internal tooling.',
    tech: ['React', 'D3.js', 'TypeScript', 'Webpack'],
    color: '#a3e635',
  },
  {
    name: 'Claude Code Monitor',
    tagline: 'Developer CLI Utility',
    period: '2025',
    desc: 'Lightweight CLI utility to track and monitor Claude Code API usage, costs, and session statistics across projects.',
    tech: ['Node.js', 'TypeScript', 'CLI'],
    color: '#e879f9',
  },
]

const SKILLS = [
  {
    label: 'Frontend',
    color: '#ff4500',
    items: ['React 19', 'TypeScript', 'Next.js 15', 'Vite', 'Tailwind v4', 'Framer Motion', 'Ant Design', 'shadcn/ui', 'React Flow', 'D3.js'],
  },
  {
    label: 'API & Data',
    color: '#00b4d8',
    items: ['GraphQL', 'Apollo Client', 'Apollo Server', 'TanStack Query', 'REST APIs', 'GraphQL Codegen', 'Zod', 'Drizzle ORM'],
  },
  {
    label: 'AI & Agents',
    color: '#a855f7',
    items: ['Vercel AI SDK', 'Anthropic Claude', 'OpenAI GPT-4', 'Google Gemini', 'Tool Calling', 'RAG Pipelines', 'Streaming UI'],
  },
  {
    label: 'Infrastructure',
    color: '#22c55e',
    items: ['Turborepo', 'Node.js', 'Docker', 'Cloudflare Workers', 'Firebase', 'GitHub Actions', 'Sentry', 'better-auth'],
  },
]

// ── Download Button ──────────────────────────────────────────────────────────

function DownloadButton() {
  return (
    <Suspense
      fallback={
        <button
          disabled
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '0.7rem 1.6rem',
            background: 'rgba(255,69,0,0.12)',
            border: '1px solid rgba(255,69,0,0.25)',
            color: 'rgba(255,69,0,0.4)',
            fontFamily: "'DM Mono', monospace",
            fontSize: '0.75rem', letterSpacing: '0.06em',
          }}
        >
          <Download size={14} /> Loading PDF…
        </button>
      }
    >
      <PDFDownloadLink
        document={<ResumePDF />}
        fileName="Hrushikesh_Yadav_Resume.pdf"
        style={{ textDecoration: 'none' }}
      >
        {({ loading }) => (
          <button
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '0.7rem 1.6rem',
              background: loading ? 'rgba(255,69,0,0.08)' : '#ff4500',
              border: 'none',
              color: loading ? '#ff4500' : '#0c0c0c',
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontWeight: 700, fontSize: '0.85rem',
              letterSpacing: '-0.01em',
              cursor: loading ? 'default' : 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => {
              if (!loading) {
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(255,69,0,0.35)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }
            }}
            onMouseLeave={e => {
              e.currentTarget.style.boxShadow = 'none'
              e.currentTarget.style.transform = 'none'
            }}
          >
            <Download size={15} />
            {loading ? 'Preparing PDF…' : 'Download PDF'}
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
    <div style={{ background: '#0c0c0c', minHeight: '100dvh' }}>

      {/* Top bar */}
      <div style={{
        position: 'sticky', top: 64, zIndex: 100,
        background: 'rgba(12,12,12,0.92)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        <div style={{
          maxWidth: 900, margin: '0 auto',
          padding: '0.75rem 1.5rem',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <button
            onClick={() => navigate({ to: '/' })}
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              background: 'none', border: 'none', color: MUTED,
              fontFamily: "'DM Mono', monospace", fontSize: '0.72rem',
              letterSpacing: '0.06em', cursor: 'pointer',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = '#f5f0eb')}
            onMouseLeave={e => (e.currentTarget.style.color = MUTED)}
          >
            <ArrowLeft size={14} /> Back to Portfolio
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{
              fontFamily: "'DM Mono', monospace", fontSize: '0.68rem',
              color: MUTED2, letterSpacing: '0.08em',
            }}>ATS-FRIENDLY</span>
            <DownloadButton />
          </div>
        </div>
      </div>

      {/* Resume paper */}
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '3rem 1.5rem 6rem' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{
            background: '#fff',
            boxShadow: '0 40px 120px rgba(0,0,0,0.6)',
            color: '#1a1a1a',
          }}
        >
          {/* ── HEADER ─────────────────────────────────────────── */}
          <div style={{
            padding: '2.5rem 3rem 2rem',
            borderBottom: '2px solid #1a1a1a',
          }}>
            <h1 style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontWeight: 800, fontSize: '2.4rem',
              letterSpacing: '-0.03em', color: '#0f0f0f',
              margin: '0 0 0.2rem',
            }}>Hrushikesh Yadav</h1>
            <p style={{
              fontFamily: "'DM Mono', monospace", fontSize: '0.8rem',
              color: '#555', letterSpacing: '0.08em', textTransform: 'uppercase',
              margin: '0 0 1.2rem',
            }}>Senior Frontend Engineer · Full Stack · AI Builder</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem' }}>
              {CONTACT.map(({ icon: Icon, text, href }) => (
                <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Icon size={13} style={{ color: ACCENT, flexShrink: 0 }} />
                  {href ? (
                    <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                      style={{
                        fontFamily: "'DM Mono', monospace", fontSize: '0.75rem',
                        color: '#1a56db', textDecoration: 'none',
                      }}
                    >{text}</a>
                  ) : (
                    <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.75rem', color: '#555' }}>{text}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div style={{ padding: '2rem 3rem 3rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>

            {/* ── SUMMARY ──────────────────────────────────────── */}
            <Section title="Professional Summary">
              <p style={{
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontSize: '0.95rem', color: '#2a2a2a', lineHeight: 1.7, margin: 0,
              }}>
                Senior Frontend Engineer with <strong>5+ years</strong> of experience shipping production-grade SaaS, enterprise, and AI platforms. Expert in React, TypeScript, and GraphQL-first architectures. At Logicwind, I own the frontend architecture, GraphQL API layer, and AI integration stack across <strong>10+ live products</strong> — from multi-tenant inspection SaaS (3,700+ releases) to full AI agent platforms. Proven track record of building complex systems from zero to launch and leading technical quality across concurrent projects.
              </p>
            </Section>

            {/* ── EXPERIENCE ───────────────────────────────────── */}
            <Section title="Work Experience">
              {EXPERIENCE.map((exp) => (
                <div key={exp.title} style={{ marginBottom: '0.5rem' }}>
                  <div style={{
                    display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap',
                    alignItems: 'flex-start', marginBottom: '0.2rem', gap: '0.5rem',
                  }}>
                    <div>
                      <span style={{
                        fontFamily: "'Bricolage Grotesque', sans-serif",
                        fontWeight: 700, fontSize: '1.05rem', color: '#0f0f0f',
                      }}>{exp.title}</span>
                      <span style={{ color: '#777', margin: '0 0.5rem' }}>·</span>
                      <span style={{
                        fontFamily: "'Bricolage Grotesque', sans-serif",
                        fontWeight: 600, fontSize: '1rem', color: ACCENT,
                      }}>{exp.company}</span>
                    </div>
                    <span style={{
                      fontFamily: "'DM Mono', monospace", fontSize: '0.72rem',
                      color: '#777', whiteSpace: 'nowrap',
                    }}>{exp.period} · {exp.location}</span>
                  </div>
                  <p style={{
                    fontFamily: "'DM Mono', monospace", fontSize: '0.72rem',
                    color: '#888', margin: '0 0 0.9rem', letterSpacing: '0.02em',
                  }}>{exp.subtitle}</p>
                  <ul style={{ margin: 0, paddingLeft: '1.1rem', display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                    {exp.bullets.map((b, i) => (
                      <li key={i} style={{
                        fontFamily: "'Bricolage Grotesque', sans-serif",
                        fontSize: '0.9rem', color: '#2a2a2a', lineHeight: 1.65,
                      }}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </Section>

            {/* ── PROJECTS ─────────────────────────────────────── */}
            <Section title="Key Projects">
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
                gap: '0.75rem',
              }}>
                {PROJECTS.map((p) => (
                  <div key={p.name} style={{
                    border: '1px solid #e5e5e5',
                    padding: '1rem 1.1rem',
                    transition: 'border-color 0.2s',
                  }}
                    onMouseEnter={e => (e.currentTarget.style.borderColor = p.color)}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = '#e5e5e5')}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.25rem' }}>
                      <span style={{
                        fontFamily: "'Bricolage Grotesque', sans-serif",
                        fontWeight: 700, fontSize: '0.95rem', color: '#0f0f0f',
                      }}>{p.name}</span>
                      <span style={{
                        fontFamily: "'DM Mono', monospace", fontSize: '0.65rem',
                        color: '#999',
                      }}>{p.period}</span>
                    </div>
                    <p style={{
                      fontFamily: "'DM Mono', monospace", fontSize: '0.68rem',
                      color: p.color, margin: '0 0 0.4rem',
                      letterSpacing: '0.04em',
                    }}>{p.tagline}</p>
                    <p style={{
                      fontFamily: "'Bricolage Grotesque', sans-serif",
                      fontSize: '0.82rem', color: '#444', lineHeight: 1.55, margin: '0 0 0.6rem',
                    }}>{p.desc}</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                      {p.tech.map((t) => (
                        <span key={t} style={{
                          fontFamily: "'DM Mono', monospace", fontSize: '0.62rem',
                          padding: '1px 7px', background: '#f5f5f5', color: '#555',
                          border: '1px solid #e0e0e0',
                        }}>{t}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            {/* ── SKILLS ───────────────────────────────────────── */}
            <Section title="Technical Skills">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
                {SKILLS.map((sk) => (
                  <div key={sk.label} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, width: 110, flexShrink: 0 }}>
                      <span style={{
                        width: 7, height: 7, borderRadius: '50%',
                        background: sk.color, flexShrink: 0,
                        boxShadow: `0 0 5px ${sk.color}`,
                      }} />
                      <span style={{
                        fontFamily: "'DM Mono', monospace", fontSize: '0.7rem',
                        color: sk.color, letterSpacing: '0.06em', textTransform: 'uppercase',
                        fontWeight: 700,
                      }}>{sk.label}</span>
                    </div>
                    <div style={{ flex: 1, display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                      {sk.items.map((item) => (
                        <span key={item} style={{
                          fontFamily: "'Bricolage Grotesque', sans-serif",
                          fontSize: '0.82rem', color: '#333', fontWeight: 500,
                          padding: '2px 10px',
                          background: '#f8f8f8', border: '1px solid #e8e8e8',
                        }}>{item}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Section>

          </div>
        </motion.div>

        {/* Bottom download nudge */}
        <div style={{
          marginTop: '2rem', textAlign: 'center',
          fontFamily: "'DM Mono', monospace", fontSize: '0.68rem',
          color: MUTED2, letterSpacing: '0.08em',
        }}>
          ATS-OPTIMIZED · SINGLE-COLUMN PDF · TEXT-BASED
        </div>
      </div>

    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div style={{
        display: 'flex', alignItems: 'center', gap: '0.75rem',
        marginBottom: '1rem',
      }}>
        <h2 style={{
          fontFamily: "'Bricolage Grotesque', sans-serif",
          fontWeight: 800, fontSize: '0.7rem',
          letterSpacing: '0.12em', textTransform: 'uppercase',
          color: '#0f0f0f', margin: 0, whiteSpace: 'nowrap',
        }}>{title}</h2>
        <div style={{ flex: 1, height: 1, background: '#d0d0d0' }} />
      </div>
      {children}
    </div>
  )
}
