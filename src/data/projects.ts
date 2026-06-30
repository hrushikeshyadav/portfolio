export interface Project {
  id: string
  number: string
  name: string
  tagline: string
  description: string
  tech: string[]
  category: string
  year: string
  featured: boolean
  color: string
  link?: string
}

// "More Work" — real projects beyond the deep-dive case studies
// (DigiQC, Zinq, Undiffer, Eugenix, AI Agents).
export const projects: Project[] = [
  {
    id: 'digiqc-team',
    number: '01',
    name: 'DigiQC Team App',
    tagline: 'Field Inspection App',
    description:
      'The on-site companion to DigiQC — field engineers run inspections, capture geo-tagged photographic evidence via Google Maps, and sync results in real time. 700+ commits authored.',
    tech: ['React', 'Apollo GraphQL', 'Ant Design', 'Google Maps', 'Firebase', 'Sentry'],
    category: 'Field SaaS',
    year: '2021–Present',
    featured: true,
    color: '#f59e0b',
    link: 'https://www.digiqc.com',
  },
  {
    id: 'digiqc-admin',
    number: '02',
    name: 'DigiQC Admin',
    tagline: 'Platform Admin Console',
    description:
      'Administrative control plane for the DigiQC platform — tenant, user and configuration management with role-based access. 430+ commits authored.',
    tech: ['React', 'Apollo GraphQL', 'Ant Design', 'Day.js', 'Sentry'],
    category: 'Admin Console',
    year: '2021–Present',
    featured: true,
    color: '#f59e0b',
  },
  {
    id: 'lw-hub',
    number: '03',
    name: 'LW Hub',
    tagline: 'Internal Knowledge Platform',
    description:
      'Logicwind’s internal hub — data-dense dashboards built with AG Grid, a markdown knowledge base, and team-scoped GraphQL permissions.',
    tech: ['React', 'Apollo GraphQL', 'AG Grid', 'Ant Design', 'Sentry'],
    category: 'Internal Tool',
    year: '2023–2024',
    featured: false,
    color: '#06b6d4',
  },
  {
    id: 'appsonair',
    number: '04',
    name: 'AppsOnAir',
    tagline: 'Mobile App Lifecycle Platform',
    description:
      'Worked closely on AppsOnAir — a mobile app lifecycle platform: over-the-air APK/IPA distribution, password-protected public install pages with QR-code installs, OTP auth, workspaces & teams, API keys, and a Workbox PWA for offline use.',
    tech: ['React', 'Apollo GraphQL', 'Ant Design', 'JWT + OTP', 'Workbox PWA', 'QR Codes', 'Sentry'],
    category: 'SaaS Product',
    year: '2022–2023',
    featured: true,
    color: '#3b82f6',
    link: 'https://www.appsonair.com',
  },
  {
    id: 'zinq-website',
    number: '05',
    name: 'Zinq Website',
    tagline: 'AI Agent Platform — Public Site',
    description:
      'Primary engineer on Zinq’s public marketing site — a Next.js 14 App Router app with CMS-driven agent pages (headless WordPress over GraphQL), ISR / on-demand revalidation, WhatsApp deep-link routing for “Try Asking” prompts, and Paddle + PostHog. Deployed on Cloudflare Pages.',
    tech: ['Next.js 14', 'TypeScript', 'Apollo GraphQL', 'Tailwind', 'Framer Motion', 'Paddle', 'PostHog', 'Cloudflare Pages'],
    category: 'Marketing Site',
    year: '2024–Present',
    featured: true,
    color: '#6366f1',
    link: 'https://zinq.ai',
  },
  {
    id: 'rera',
    number: '06',
    name: 'RERA Scrapers',
    tagline: 'Government Data Pipelines',
    description:
      'Three Node.js pipelines (Delhi, Gurgaon, UP) that crawl state Real-Estate Regulatory Authority portals district-by-district with Puppeteer and export structured Excel — a market-intelligence feed for DigiQC.',
    tech: ['Node.js', 'Puppeteer', 'Cheerio', 'excel4node', 'Winston'],
    category: 'Automation · R&D',
    year: '2023',
    featured: false,
    color: '#a855f7',
  },
  {
    id: 'appeal-collector',
    number: '07',
    name: 'Appeal Collector',
    tagline: 'Income-Tax Appeal Tracker',
    description:
      'A scheduled Node.js job that scrapes Income Tax Appellate Tribunal (ITAT) records — appeal type, bench, initiator and RSA numbers — on an interval and posts digests to Google Chat, with Sentry observability.',
    tech: ['Node.js', 'Puppeteer', 'Google Chat', 'Sentry', 'Cron'],
    category: 'Automation',
    year: '2023',
    featured: false,
    color: '#a855f7',
  },
  {
    id: 'urltags',
    number: '08',
    name: 'URLTags',
    tagline: 'Link Shortener + Analytics',
    description:
      'A link-shortening application featuring click analytics, QR-code generation, and shareable short links. Built during the early Logicwind days.',
    tech: ['React', 'Node.js', 'GraphQL'],
    category: 'Web App',
    year: '2021',
    featured: false,
    color: '#f97316',
  },
  {
    id: 'tmdb',
    number: '09',
    name: 'TMDB Explorer',
    tagline: 'Next.js + GraphQL Movie App',
    description:
      'A movie-discovery app on a custom GraphQL layer over TMDB — server-side auth with NextAuth, rich filtering, and a clean Ant Design interface.',
    tech: ['Next.js', 'TypeScript', 'GraphQL', 'Apollo', 'NextAuth', 'Ant Design'],
    category: 'Personal',
    year: '2024',
    featured: false,
    color: '#38bdf8',
  },
  {
    id: 'boilerplates',
    number: '10',
    name: 'GraphQL Boilerplates',
    tagline: 'Reusable React / TS Starters',
    description:
      'Maintained Logicwind’s React and TypeScript GraphQL starters — Apollo, Ant Design, DnD Kit, Sentry and CI baked in — so new products start from a hardened foundation.',
    tech: ['React', 'TypeScript', 'Apollo GraphQL', 'Ant Design', 'DnD Kit'],
    category: 'Tooling',
    year: '2022–2024',
    featured: false,
    color: '#f59e0b',
  },
]

export const featuredProjects = projects.filter((p) => p.featured)
export const allProjects = projects
