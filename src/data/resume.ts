// Single source of truth for the résumé — consumed by both the on-page
// résumé (routes/resume.tsx) and the downloadable PDF (components/resume/ResumePDF.tsx).
// Spelling normalized for ATS ("JavaScript", not "Javascript").

export const personal = {
  name: 'Hrushikesh Yadav',
  title: 'Senior JavaScript Developer',
  contact: {
    phone: '+91 9054573621',
    phoneHref: 'tel:+919054573621',
    email: 'yadavhrushikesh21@gmail.com',
    github: 'github.com/hrushikeshyadav',
    githubHref: 'https://github.com/hrushikeshyadav',
    linkedin: 'linkedin.com/in/hrushikesh-yadav-0a16b3123',
    linkedinHref: 'https://www.linkedin.com/in/hrushikesh-yadav-0a16b3123',
    location: 'Surat, India',
  },
}

export const summary =
  'Senior JavaScript Developer with 4.5+ years of experience building scalable web applications using React.js, Next.js, and TypeScript. Skilled in developing high-performance frontend systems, GraphQL APIs, and platform integrations. Experienced in implementing AI-assisted development workflows, custom developer agents, and Model Context Protocol (MCP) integrations to improve development productivity and streamline engineering processes.'

export interface Experience {
  role: string
  company: string
  duration: string
  highlights: string[]
}

export const experience: Experience[] = [
  {
    role: 'Senior JavaScript Developer',
    company: 'Logicwind',
    duration: 'Aug 2022 — Present',
    highlights: [
      'Led frontend development for DigiQC, a multi-tenant construction quality-control SaaS, using React.js and Apollo GraphQL — sustained across 5,700+ commits and 14 feature modules.',
      'Designed and developed AI-powered developer agents to automate development workflows, improving code generation, task execution, and overall development efficiency.',
      'Integrated Model Context Protocol (MCP) servers and automation tools to streamline engineering workflows, code analysis, and research processes.',
      'Implemented GraphQL-based data fetching and optimized API integrations for improved application performance and maintainability.',
      'Contributed to backend tasks, including data scraping and CRUD operations across multiple modules.',
      'Collaborated with cross-functional teams to deliver new features and maintain application stability.',
    ],
  },
  {
    role: 'JavaScript Developer',
    company: 'Logicwind',
    duration: 'Aug 2021 — Aug 2022',
    highlights: [
      'Contributed to the development of Undiffer, a standup and developer-productivity platform.',
      'Integrated multiple version-control services — GitHub, GitLab, and Bitbucket APIs — to display real-time development activity.',
      'Implemented HubSpot and Amplitude integrations for user-engagement tracking and product analytics.',
      'Integrated OneSignal to enable real-time notifications and communication features within the platform.',
    ],
  },
  {
    role: 'Trainee JavaScript Developer',
    company: 'Logicwind',
    duration: 'Feb 2021 — Aug 2021',
    highlights: [
      'Developed URLTags, a link-shortening application featuring analytics tracking, QR-code generation, and shareable short links.',
    ],
  },
  {
    role: 'Trainee JavaScript Developer',
    company: 'DecodeUp Pvt. Ltd.',
    duration: 'Jan 2021 — Feb 2021',
    highlights: [
      'Assisted in developing internal web applications using React.js and PHP, supporting UI component implementation and feature development.',
    ],
  },
]

export interface SkillGroup {
  label: string
  items: string[]
}

export const skills: SkillGroup[] = [
  { label: 'Frontend', items: ['React.js', 'Next.js (App Router)', 'TypeScript', 'JavaScript (ES6+)', 'Ant Design', 'HTML5', 'CSS3'] },
  { label: 'Backend', items: ['Node.js', 'Express.js'] },
  { label: 'APIs', items: ['GraphQL (Apollo Client)', 'REST APIs'] },
  { label: 'Integrations', items: ['Firebase', 'MSG91', 'OneSignal', 'HubSpot', 'Amplitude', 'GitHub / GitLab / Bitbucket APIs'] },
  { label: 'Databases', items: ['PostgreSQL', 'MongoDB', 'MySQL', 'Firestore'] },
  { label: 'Tools & Platforms', items: ['Git', 'Vercel', 'Firebase Hosting'] },
]

export const softSkills = [
  'Problem Solving',
  'Ownership & Accountability',
  'Team Collaboration & Mentorship',
  'Product Thinking',
  'Clear Communication',
  'Adaptability',
]

export interface Education {
  degree: string
  institution: string
  year: string
}

export const education: Education[] = [
  { degree: 'Master of Science (M.Sc.)', institution: 'Shree Ramkrishna Institute of Computer Education', year: '2021' },
  { degree: 'Bachelor of Science (B.Sc.)', institution: 'Shree Ramkrishna Institute of Computer Education', year: '2019' },
]

export const languages = ['English', 'Hindi', 'Gujarati', 'Marathi']
