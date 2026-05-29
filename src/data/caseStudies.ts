export interface CaseStudy {
  id: string
  index: string
  name: string
  kicker: string                 // short narrative title
  category: string
  period: string
  accent: string
  summary: string                // ONE punchy sentence — the hook
  highlights: string[]           // short scannable phrases (3–6 words)
  metrics: { value: string; label: string }[]
  tech: string[]
  detail?: string                // optional deeper line (kept light)
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'digiqc',
    index: '01',
    name: 'DigiQC',
    kicker: 'The 4.5-Year System',
    category: 'Multi-Tenant SaaS',
    period: '2021 — Present',
    accent: '#f59e0b',
    summary:
      'Took construction quality control off paper and WhatsApp into a multi-tenant SaaS that has shipped continuously for four and a half years without a rewrite.',
    highlights: [
      'Multi-tenant from line one',
      'Drag-and-drop workflow engine',
      'Geo-tagged on-site evidence',
      'Role-based access control',
      '14 strictly-bounded modules',
    ],
    metrics: [
      { value: '5,702', label: 'Commits shipped' },
      { value: '4.5 yrs', label: 'No rewrite' },
      { value: '14', label: 'Feature modules' },
    ],
    tech: ['React', 'Apollo GraphQL', 'TypeScript', 'Ant Design', 'DnD Kit', 'Google Maps', 'Firebase'],
    detail:
      'Owned the frontend architecture end-to-end — normalized Apollo cache, JWT + x-tenant-id isolation, the DnD stage builder, and a zero-warning release gate.',
  },
  {
    id: 'zinq',
    index: '02',
    name: 'Zinq',
    kicker: 'A Platform, Not a Product',
    category: 'AI Agent Platform',
    period: '2024 — 2025',
    accent: '#10b981',
    summary:
      'Built an AI form-and-agent builder so reusable that an entire second product — a healthcare clinic suite — now plugs into it as a git submodule.',
    highlights: [
      'Debounced autosave engine',
      'Per-action permission layer',
      '8-language i18n pipeline',
      'White-label submodule platform',
      'Powers the Eugenix clinic suite',
    ],
    metrics: [
      { value: '2,873', label: 'Commits' },
      { value: '8', label: 'Languages' },
      { value: 'Platform', label: 'Reused by products' },
    ],
    tech: ['React', 'Next.js', 'Vite', 'Apollo GraphQL', 'Tailwind v4', 'shadcn/ui', 'React Flow'],
    detail:
      'Built the autosave engine, the useModulePermission authz primitive, the i18n architecture, and the submodule platform model that lets whole products mount under src/modules.',
  },
  {
    id: 'agent-demos',
    index: '03',
    name: 'LW Agent Demos',
    kicker: 'Applied AI, Six Ways',
    category: 'AI Showcase',
    period: '2025',
    accent: '#8b5cf6',
    summary:
      'One codebase, six production AI agents — including an on-device KYC liveness check that never sends a video frame to a server.',
    highlights: [
      'On-device KYC liveness (CV)',
      'Streaming code · math · Mermaid',
      'RAG knowledge base',
      'Conversational ERPNext',
      'Six verticals, one shell',
    ],
    metrics: [
      { value: '6', label: 'Vertical agents' },
      { value: 'On-device', label: 'KYC vision' },
      { value: '4-modal', label: 'Streamed output' },
    ],
    tech: ['Next.js', 'Vercel AI SDK', 'MediaPipe', 'Streamdown', 'Recharts', 'Express'],
    detail:
      'Architected the shared agent shell and streaming UI, and built the MediaPipe KYC pipeline plus the multi-modal Streamdown rendering layer.',
  },
]
