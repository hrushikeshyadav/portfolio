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
  link?: { href: string; label: string }   // live product, if public
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'digiqc',
    index: '01',
    name: 'DigiQC',
    kicker: 'The Platform I Own',
    category: 'Multi-App SaaS Platform',
    period: '2021 — Present',
    accent: '#f59e0b',
    summary:
      'Primary engineer behind DigiQC’s entire frontend — a multi-tenant construction quality-control platform spanning a web console, a field-inspection app and an admin suite, backed by two GraphQL services.',
    highlights: [
      'Primary author — 4,200+ commits',
      'Web + Team + Admin apps',
      'Multi-tenant from line one',
      'Drag-and-drop inspection workflows',
      'Geo-tagged field evidence (Maps)',
      'Apollo GraphQL server + PDF reports',
    ],
    metrics: [
      { value: '4,200+', label: 'Commits authored' },
      { value: '5 apps', label: 'Web · Team · Admin · 2 servers' },
      { value: 'Multi-tenant', label: 'Architecture' },
    ],
    tech: ['React', 'TypeScript', 'Apollo GraphQL', 'Ant Design', 'DnD Kit', 'Google Maps', 'Node.js', 'AWS'],
    detail:
      'Owned the web console, the field-inspection Team app (Google Maps geo-tagging) and the Admin suite — and contributed to the Apollo GraphQL server and the PDF report service. Multi-tenant via JWT + x-tenant-id, normalized Apollo cache, zero-warning release gate.',
    link: { href: 'https://www.digiqc.com', label: 'digiqc.com' },
  },
  {
    id: 'undiffer',
    index: '02',
    name: 'Undiffer',
    kicker: 'Where Standups Run Themselves',
    category: 'Developer Productivity',
    period: '2021 — 2022',
    accent: '#10b981',
    summary:
      'A standup and developer-productivity platform that pulls real-time activity from GitHub, GitLab and Bitbucket into one feed — 640+ commits as a core engineer.',
    highlights: [
      'GitHub / GitLab / Bitbucket APIs',
      'Real-time dev activity feeds',
      'HubSpot + Amplitude analytics',
      'OneSignal push notifications',
      'CASL permission model',
      'Nivo charts & insights',
    ],
    metrics: [
      { value: '644', label: 'Commits authored' },
      { value: '3', label: 'VC platforms unified' },
      { value: 'Real-time', label: 'Activity tracking' },
    ],
    tech: ['React', 'Apollo GraphQL', 'Ant Design', 'Nivo', 'CASL', 'Firebase', 'Sentry'],
    detail:
      'Integrated three version-control providers into a single real-time activity feed, wired HubSpot and Amplitude for engagement analytics, OneSignal for notifications, and a CASL-based permission layer.',
    link: { href: 'https://www.undiffer.com', label: 'undiffer.com' },
  },
  {
    id: 'eugenix',
    index: '03',
    name: 'Eugenix',
    kicker: 'A Product Inside a Platform',
    category: 'Healthcare Admin · Submodule Architecture',
    period: '2024 — Present',
    accent: '#06b6d4',
    summary:
      'Built the clinic-management admin for Eugenix — one of India’s most renowned, celebrity-trusted hair-transplant brands — and embedded it into the Zinq platform as a Git submodule with its own repo, branches and CI.',
    highlights: [
      'Primary author — 80+ commits',
      'Embedded via Git submodule',
      'Reuses Zinq’s design system',
      'Patient management module',
      'i18n — English + Hindi',
      'GraphQL Codegen types',
    ],
    metrics: [
      { value: '80+', label: 'Commits authored' },
      { value: 'Submodule', label: 'Platform architecture' },
      { value: 'i18n', label: 'EN · HI' },
    ],
    tech: ['React', 'TypeScript', 'Apollo GraphQL', 'GraphQL Codegen', 'i18n', 'Git Submodules'],
    detail:
      'Designed the submodule integration — branching strategy, CI, and submodule-reference workflow — so the Eugenix admin lives in its own repo yet mounts into Zinq at src/modules/eugenix-module, consuming Zinq’s primitives. Authored the architecture documentation new developers onboard from.',
    link: { href: 'https://eugenixhairsciences.com', label: 'eugenixhairsciences.com' },
  },
  {
    id: 'ai-agents',
    index: '04',
    name: 'AI Developer Agents',
    kicker: 'Agents That Write Code',
    category: 'AI Engineering',
    period: '2023 — Present',
    accent: '#8b5cf6',
    summary:
      'Designed AI-powered developer agents and Model Context Protocol (MCP) integrations that automate code generation, task execution and research inside the engineering workflow.',
    highlights: [
      'Custom developer agents',
      'Model Context Protocol (MCP) servers',
      'Automated code generation',
      'Workflow & research automation',
      'Multi-model: Claude · GPT · Gemini',
    ],
    metrics: [
      { value: 'MCP', label: 'Server integrations' },
      { value: 'Multi-model', label: 'Claude · GPT · Gemini' },
      { value: 'Workflow', label: 'Automation' },
    ],
    tech: ['Vercel AI SDK', 'Anthropic Claude', 'OpenAI', 'Google Gemini', 'MCP', 'Node.js', 'TypeScript'],
    detail:
      'Built developer agents and MCP server integrations to streamline code analysis, generation and research — improving day-to-day engineering throughput across the team.',
  },
]
