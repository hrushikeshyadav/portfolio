import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Link,
} from '@react-pdf/renderer'

const FONT = 'Helvetica'
const FONT_BOLD = 'Helvetica-Bold'

const s = StyleSheet.create({
  page: {
    fontFamily: FONT,
    fontSize: 9.5,
    padding: '36pt 44pt 36pt 44pt',
    backgroundColor: '#ffffff',
    color: '#1a1a1a',
  },
  // Header
  header: { marginBottom: 14, borderBottom: '1.5pt solid #1a1a1a', paddingBottom: 10 },
  name: { fontFamily: FONT_BOLD, fontSize: 22, color: '#0f0f0f', letterSpacing: 0.5, marginBottom: 2 },
  title: { fontSize: 10, color: '#444', letterSpacing: 0.3, marginBottom: 6 },
  contactRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 14 },
  contactItem: { fontSize: 8.5, color: '#555' },
  contactLink: { fontSize: 8.5, color: '#1a56db', textDecoration: 'none' },

  // Section
  section: { marginBottom: 12 },
  sectionTitle: {
    fontFamily: FONT_BOLD, fontSize: 8.5, color: '#0f0f0f',
    letterSpacing: 1.2, textTransform: 'uppercase',
    borderBottom: '0.75pt solid #d0d0d0', paddingBottom: 3,
    marginBottom: 7,
  },

  // Summary
  summary: { fontSize: 9.5, color: '#333', lineHeight: 1.55 },

  // Experience
  expBlock: { marginBottom: 9 },
  expHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 1.5 },
  expTitle: { fontFamily: FONT_BOLD, fontSize: 10, color: '#0f0f0f' },
  expMeta: { fontSize: 8.5, color: '#666' },
  expPeriod: { fontSize: 8.5, color: '#666' },
  expCompany: { fontSize: 9, color: '#333', marginBottom: 4 },
  bullet: { flexDirection: 'row', marginBottom: 2.5, paddingLeft: 2 },
  bulletDot: { fontFamily: FONT_BOLD, fontSize: 9, color: '#666', width: 10, marginTop: 0.5 },
  bulletText: { flex: 1, fontSize: 9, color: '#333', lineHeight: 1.5 },

  // Projects — 2-col grid
  projectsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  projectCard: { width: '48.5%', border: '0.75pt solid #e0e0e0', padding: '5pt 6pt', marginBottom: 4 },
  projectName: { fontFamily: FONT_BOLD, fontSize: 9.5, color: '#0f0f0f', marginBottom: 1 },
  projectTagline: { fontSize: 8, color: '#777', marginBottom: 3 },
  projectDesc: { fontSize: 8, color: '#444', lineHeight: 1.45, marginBottom: 3 },
  projectTech: { fontSize: 7.5, color: '#555', fontFamily: 'Helvetica-Oblique' },

  // Skills
  skillsGrid: { flexDirection: 'column', gap: 3 },
  skillRow: { flexDirection: 'row', alignItems: 'flex-start' },
  skillLabel: { fontFamily: FONT_BOLD, fontSize: 8.5, color: '#0f0f0f', width: 72, paddingTop: 1 },
  skillList: { flex: 1, fontSize: 8.5, color: '#333', lineHeight: 1.45 },

  footer: {
    position: 'absolute', bottom: 20, left: 44, right: 44,
    flexDirection: 'row', justifyContent: 'space-between',
    borderTop: '0.5pt solid #e0e0e0', paddingTop: 4,
  },
  footerText: { fontSize: 7.5, color: '#aaa' },
})

const EXPERIENCE = [
  {
    title: 'Senior Frontend Engineer',
    company: 'Logicwind — Product Studio (SaaS & AI)',
    period: '2020 – Present',
    location: 'India · Remote',
    bullets: [
      'Architected DigiQC, a multi-tenant quality control SaaS for construction with 3,700+ releases; owned React/Apollo frontend, drag-and-drop stage manager, Google Maps integration, and RBAC system.',
      'Built Zinq AI agent platform as a Turborepo monorepo — Vite admin SPA, Next.js 15 public runtime on Cloudflare Workers, React Flow visual workflow editor, and shared shadcn/ui design system.',
      'Developed Logicwind AI Demo Portal featuring 6 vertical agents (BI, bilingual meeting assistant, KYC pipeline, RAG knowledge base) built with Next.js App Router and Vercel AI SDK.',
      'Delivered AppsOnAir, an enterprise app distribution platform with JWT auth, versioned release management, team permissions, and multi-platform build artifact tracking.',
      'Built LW Hub internal knowledge platform with multi-workspace support, rich-text collaboration editor, and team-scoped GraphQL permissions.',
      'Integrated Anthropic Claude, OpenAI GPT-4, and Google Gemini across products using Vercel AI SDK — streaming UI, tool calling, and RAG pipelines.',
      'Established TypeScript strict-mode standards, GraphQL Codegen pipelines, and zero-warning ESLint policies across all products.',
    ],
  },
]

const PROJECTS = [
  {
    name: 'DigiQC',
    tagline: 'Quality Control SaaS · 2023–2025',
    desc: 'Multi-tenant QC platform for construction. Inspection workflows, DnD stage management, geolocation tagging, real-time reports. 3,700+ releases.',
    tech: 'React · TypeScript · Apollo GraphQL · Ant Design · DnD Kit · Google Maps · Sentry',
  },
  {
    name: 'Zinq',
    tagline: 'AI Agent Platform · 2024–2025',
    desc: 'Full-stack Turborepo monorepo. Admin SPA, Next.js 15 public runtime, React Flow workflow builder, better-auth, AI SDK streaming.',
    tech: 'React · Next.js · Vite · Turborepo · Tailwind v4 · shadcn/ui · React Flow · Cloudflare',
  },
  {
    name: 'LW Agent Demos',
    tagline: 'AI Demo Portal · 2025',
    desc: '6 vertical AI agents: Tally BI, bilingual meeting assistant, employee training, KYC liveness, RAG knowledge base, ERPNext interface.',
    tech: 'Next.js · TypeScript · Vercel AI SDK · shadcn/ui · Recharts · Tailwind v4',
  },
  {
    name: 'AppsOnAir',
    tagline: 'App Distribution Platform · 2023',
    desc: 'Enterprise internal app distribution. JWT auth, app versioning, team management, download tracking, multi-platform builds.',
    tech: 'React · Apollo GraphQL · Ant Design · JWT · Sentry',
  },
  {
    name: 'LW Hub',
    tagline: 'Knowledge Base Platform · 2023–2024',
    desc: 'Internal knowledge management hub. Multi-workspace, rich-text editor, document organization, team-scoped permissions.',
    tech: 'React · Apollo GraphQL · Ant Design · Firebase · Sentry',
  },
  {
    name: 'React Org Chart',
    tagline: 'Open Source Library · 2024',
    desc: 'Interactive D3-based org chart component. Zooming, panning, collapsible nodes, custom card renderers. Based on UNICEF tooling.',
    tech: 'React · D3.js · TypeScript · Webpack',
  },
]

const SKILLS = [
  {
    label: 'Frontend',
    list: 'React 19, TypeScript, Next.js 15, Vite, Tailwind CSS v4, Framer Motion, Ant Design, shadcn/ui, React Flow, D3.js',
  },
  {
    label: 'API & Data',
    list: 'GraphQL, Apollo Client, Apollo Server, TanStack Query, REST APIs, GraphQL Codegen, Zod, Drizzle ORM',
  },
  {
    label: 'AI & Agents',
    list: 'Vercel AI SDK, Anthropic Claude API, OpenAI GPT-4, Google Gemini, Tool Calling, RAG Pipelines, Streaming UI',
  },
  {
    label: 'Infrastructure',
    list: 'Turborepo, Node.js, Docker, Cloudflare Workers, Firebase, GitHub Actions, Sentry, better-auth',
  },
]

export default function ResumePDF() {
  return (
    <Document
      title="Hrushikesh Yadav — Resume"
      author="Hrushikesh Yadav"
      subject="Senior Frontend Engineer"
      keywords="React, TypeScript, GraphQL, Next.js, AI, Frontend Engineer"
    >
      <Page size="A4" style={s.page}>

        {/* ── HEADER ─────────────────────────────────────────── */}
        <View style={s.header}>
          <Text style={s.name}>Hrushikesh Yadav</Text>
          <Text style={s.title}>Senior Frontend Engineer · Full Stack · AI Builder</Text>
          <View style={s.contactRow}>
            <Link src="mailto:yadavhrushikesh21@gmail.com" style={s.contactLink}>
              yadavhrushikesh21@gmail.com
            </Link>
            <Link src="tel:+919054573621" style={s.contactLink}>
              +91 9054573621
            </Link>
            <Text style={s.contactItem}>India · Remote</Text>
            <Link src="https://github.com/hrushikeshyadav" style={s.contactLink}>
              github.com/hrushikeshyadav
            </Link>
            <Link src="https://www.linkedin.com/in/hrushikesh-yadav-0a16b3123" style={s.contactLink}>
              linkedin.com/in/hrushikesh-yadav
            </Link>
          </View>
        </View>

        {/* ── SUMMARY ──────────────────────────────────────────── */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>Professional Summary</Text>
          <Text style={s.summary}>
            Senior Frontend Engineer with 5+ years of experience shipping production-grade SaaS, enterprise, and AI platforms. Expert in React, TypeScript, and GraphQL-first architectures. At Logicwind, I own the frontend architecture, GraphQL API layer, and AI integration stack across 10+ live products — from multi-tenant inspection SaaS (3,700+ releases) to AI agent platforms. Proven track record of building complex systems from zero to launch and leading technical quality across concurrent projects.
          </Text>
        </View>

        {/* ── EXPERIENCE ───────────────────────────────────────── */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>Work Experience</Text>
          {EXPERIENCE.map((exp) => (
            <View key={exp.title} style={s.expBlock}>
              <View style={s.expHeader}>
                <Text style={s.expTitle}>{exp.title}</Text>
                <Text style={s.expPeriod}>{exp.period} · {exp.location}</Text>
              </View>
              <Text style={s.expCompany}>{exp.company}</Text>
              {exp.bullets.map((b, i) => (
                <View key={i} style={s.bullet}>
                  <Text style={s.bulletDot}>▸</Text>
                  <Text style={s.bulletText}>{b}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>

        {/* ── PROJECTS ─────────────────────────────────────────── */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>Key Projects</Text>
          <View style={s.projectsGrid}>
            {PROJECTS.map((p) => (
              <View key={p.name} style={s.projectCard}>
                <Text style={s.projectName}>{p.name}</Text>
                <Text style={s.projectTagline}>{p.tagline}</Text>
                <Text style={s.projectDesc}>{p.desc}</Text>
                <Text style={s.projectTech}>{p.tech}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* ── SKILLS ───────────────────────────────────────────── */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>Technical Skills</Text>
          <View style={s.skillsGrid}>
            {SKILLS.map((sk) => (
              <View key={sk.label} style={s.skillRow}>
                <Text style={s.skillLabel}>{sk.label}</Text>
                <Text style={s.skillList}>{sk.list}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* ── FOOTER ───────────────────────────────────────────── */}
        <View style={s.footer} fixed>
          <Text style={s.footerText}>Hrushikesh Yadav · yadavhrushikesh21@gmail.com</Text>
          <Text style={s.footerText} render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          } />
        </View>
      </Page>
    </Document>
  )
}
