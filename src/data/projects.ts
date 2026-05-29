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
}

export const projects: Project[] = [
  {
    id: 'digiqc',
    number: '01',
    name: 'DigiQC',
    tagline: 'Quality Control SaaS Platform',
    description:
      'Multi-tenant quality control management system for construction and real estate. Features inspection workflows, drag-and-drop stage management, geolocation tagging, real-time reports, and role-based access control across 3.7k+ releases.',
    tech: ['React', 'TypeScript', 'Apollo GraphQL', 'Ant Design', 'Google Maps', 'DnD Kit', 'Sentry'],
    category: 'SaaS Product',
    year: '2023–2025',
    featured: true,
    color: '#f59e0b',
  },
  {
    id: 'zinq',
    number: '02',
    name: 'Zinq',
    tagline: 'AI Agent Platform — Monorepo',
    description:
      'Full-stack AI agent platform built as a Turborepo monorepo. Admin dashboard (Vite SPA), public agent runtime (Next.js 15 + Cloudflare Workers), React Flow workflow builder, shared design system, better-auth, and AI SDK streaming.',
    tech: ['React', 'Next.js', 'Vite', 'Turborepo', 'Tailwind v4', 'shadcn/ui', 'React Flow', 'AI SDK', 'Cloudflare'],
    category: 'AI Platform',
    year: '2024–2025',
    featured: true,
    color: '#10b981',
  },
  {
    id: 'lw-agent-demos',
    number: '03',
    name: 'Logicwind Agent Demos',
    tagline: 'AI Demo Portal — 6 Vertical Agents',
    description:
      'Dark-minimal gallery of six AI agent demos: Tally BI agent, bilingual meeting assistant, employee training AI, KYC liveness pipeline, knowledge base RAG, and ERPNext conversational interface. Built with Next.js App Router and Recharts.',
    tech: ['Next.js', 'TypeScript', 'shadcn/ui', 'Tailwind v4', 'Recharts', 'Vercel AI SDK'],
    category: 'AI Demo',
    year: '2025',
    featured: true,
    color: '#8b5cf6',
  },
  {
    id: 'appsonair',
    number: '04',
    name: 'AppsOnAir',
    tagline: 'App Distribution & Management Platform',
    description:
      'Enterprise app distribution platform for internal app deployments. JWT-based auth, app versioning, team management, download tracking, and multi-platform build artifact management.',
    tech: ['React', 'Apollo GraphQL', 'Ant Design', 'JWT', 'Sentry'],
    category: 'SaaS Product',
    year: '2023',
    featured: false,
    color: '#f59e0b',
  },
  {
    id: 'lw-hub',
    number: '05',
    name: 'LW Hub',
    tagline: 'Knowledge Base & Hub Platform',
    description:
      'Internal knowledge management and collaboration hub for Logicwind. Multi-workspace support, rich-text editor, document organization, and team-scoped permissions with GraphQL API.',
    tech: ['React', 'Apollo GraphQL', 'Ant Design', 'Sentry', 'Firebase'],
    category: 'Internal Tool',
    year: '2023–2024',
    featured: false,
    color: '#06b6d4',
  },
  {
    id: 'tmdb-next',
    number: '06',
    name: 'TMDB Explorer',
    tagline: 'Movie Database — Next.js + GraphQL',
    description:
      'Full-featured movie discovery app using TMDB data via a custom GraphQL layer. Server-side auth with next-auth, rich filtering, and a clean Ant Design interface.',
    tech: ['Next.js', 'TypeScript', 'GraphQL', 'Apollo', 'Ant Design', 'next-auth'],
    category: 'Web App',
    year: '2024',
    featured: false,
    color: '#f59e0b',
  },
  {
    id: 'vercel-ai-demo',
    number: '07',
    name: 'Vercel AI SDK Demo',
    tagline: 'Multi-Model AI Playground',
    description:
      'Interactive playground demonstrating Vercel AI SDK with Anthropic Claude, OpenAI, and Google Gemini. Streaming responses, tool calling, and side-by-side model comparison.',
    tech: ['Next.js', 'Vercel AI SDK', 'Anthropic', 'OpenAI', 'Google Gemini', 'TypeScript'],
    category: 'AI Demo',
    year: '2025',
    featured: false,
    color: '#f59e0b',
  },
  {
    id: 'react-org-chart',
    number: '08',
    name: 'React Org Chart',
    tagline: 'D3-Powered Organisation Chart Component',
    description:
      'Open-source React component library for rendering interactive D3-based org charts. Supports zooming, panning, collapsible nodes, and custom card renderers. Based on UNICEF\'s internal tooling.',
    tech: ['React', 'D3.js', 'TypeScript', 'Webpack'],
    category: 'Open Source',
    year: '2024',
    featured: false,
    color: '#f59e0b',
  },
  {
    id: 'chem-erp',
    number: '09',
    name: 'Chem ERP',
    tagline: 'Chemical Industry ERP System',
    description:
      'Domain-specific ERP for chemical manufacturing companies. Inventory management, batch tracking, compliance reporting, and supplier/customer relationship features.',
    tech: ['React', 'TypeScript', 'GraphQL', 'Ant Design'],
    category: 'ERP',
    year: '2024',
    featured: false,
    color: '#f59e0b',
  },
  {
    id: 'claude-monitor',
    number: '10',
    name: 'Claude Code Usage Monitor',
    tagline: 'Developer Utility for Claude Code',
    description:
      'Lightweight utility to track and monitor Claude Code API usage, costs, and session statistics. Helps developers stay within budget and understand usage patterns across projects.',
    tech: ['Node.js', 'TypeScript', 'CLI'],
    category: 'Dev Tool',
    year: '2025',
    featured: false,
    color: '#f59e0b',
  },
]

export const featuredProjects = projects.filter((p) => p.featured)
export const allProjects = projects
