import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Link,
} from '@react-pdf/renderer'
import {
  personal,
  summary,
  experience,
  skills,
  softSkills,
  education,
  languages,
} from '../../data/resume'

const FONT = 'Helvetica'
const BOLD = 'Helvetica-Bold'

// Professional "blue" palette
const NAVY = '#33475b'
const NAVY_DK = '#2b3a49'
const INK = '#2d2d2d'
const SUB = '#5a6b7a'
const RULE = '#d7dee4'

// Balanced for a single A4 page that fills it comfortably (ATS-friendly).
const s = StyleSheet.create({
  page: { fontFamily: FONT, fontSize: 9, color: INK, backgroundColor: '#ffffff' },

  // Header band
  header: { backgroundColor: NAVY, padding: '18pt 30pt 14pt' },
  name: { fontFamily: BOLD, fontSize: 23, color: '#ffffff', letterSpacing: 3 },
  role: { fontSize: 9.5, color: '#c7d2dc', letterSpacing: 2.5, marginTop: 4 },

  // Body two-column
  body: { flexDirection: 'row' },
  main: { width: '62%', padding: '14pt 16pt 16pt 30pt' },
  side: { width: '38%', padding: '14pt 26pt 16pt 18pt', borderLeft: `1pt solid ${RULE}` },

  // Section heading
  h: { fontFamily: BOLD, fontSize: 11, color: NAVY_DK, letterSpacing: 1.5 },
  hRule: { height: 2, backgroundColor: NAVY, width: 26, marginTop: 4, marginBottom: 7 },
  sectionGap: { marginTop: 11 },

  summary: { fontSize: 8.8, color: INK, lineHeight: 1.45 },

  // Experience
  expItem: { marginBottom: 8 },
  expHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 1 },
  expTitle: { flexShrink: 1, paddingRight: 8 },
  expDuration: { fontSize: 8, color: SUB, flexShrink: 0 },
  expRole: { fontFamily: BOLD, fontSize: 9.5, color: NAVY_DK },
  expSep: { fontSize: 9, color: SUB },
  expCompany: { fontFamily: BOLD, fontSize: 9.5, color: NAVY },
  bulletRow: { flexDirection: 'row', marginTop: 2.5, paddingRight: 4 },
  bulletDot: { width: 8, fontSize: 9, color: NAVY, marginTop: 0.5 },
  bulletText: { flex: 1, fontSize: 8.4, color: INK, lineHeight: 1.4 },

  // Sidebar
  contactRow: { flexDirection: 'row', marginBottom: 3, alignItems: 'flex-start' },
  contactKey: { fontFamily: BOLD, fontSize: 8.5, color: NAVY, width: 46 },
  contactVal: { flex: 1, fontSize: 8.5, color: INK },
  contactLink: { flex: 1, fontSize: 8.5, color: '#1a5276', textDecoration: 'none' },

  skillGroup: { marginBottom: 5 },
  skillLabel: { fontFamily: BOLD, fontSize: 8.5, color: NAVY_DK, marginBottom: 2 },
  skillItems: { fontSize: 8.3, color: INK, lineHeight: 1.35 },

  // Inline comma list (soft skills, languages) — compact, ATS-readable
  inlineList: { fontSize: 8.3, color: INK, lineHeight: 1.45 },

  eduItem: { marginBottom: 5.5 },
  eduDegree: { fontFamily: BOLD, fontSize: 8.5, color: NAVY_DK },
  eduInst: { fontSize: 8.3, color: SUB, lineHeight: 1.35, marginTop: 1 },
  eduYear: { fontSize: 8.3, color: NAVY, marginTop: 1 },
})

// Show every bullet — there's room for the full story on one page now.
const MAX_BULLETS = 12

function SideHeading({ children }: { children: string }) {
  return (
    <View>
      <Text style={s.h}>{children}</Text>
      <View style={s.hRule} />
    </View>
  )
}

export default function ResumePDF() {
  const { contact } = personal
  return (
    <Document
      title="Hrushikesh Yadav — Resume"
      author="Hrushikesh Yadav"
      subject="Senior JavaScript Developer"
      keywords="JavaScript, React, Next.js, TypeScript, GraphQL, Frontend Developer"
    >
      <Page size="A4" style={s.page}>

        {/* HEADER BAND */}
        <View style={s.header}>
          <Text style={s.name}>{personal.name.toUpperCase()}</Text>
          <Text style={s.role}>{personal.title.toUpperCase()}</Text>
        </View>

        <View style={s.body}>

          {/* MAIN COLUMN */}
          <View style={s.main}>
            <SideHeading>SUMMARY</SideHeading>
            <Text style={s.summary}>{summary}</Text>

            <View style={s.sectionGap}>
              <SideHeading>WORK EXPERIENCE</SideHeading>
              {experience.map((exp) => (
                <View key={exp.role + exp.duration} style={s.expItem} wrap={false}>
                  <View style={s.expHead}>
                    <Text style={s.expTitle}>
                      <Text style={s.expRole}>{exp.role}</Text>
                      <Text style={s.expSep}>{'  |  '}</Text>
                      <Text style={s.expCompany}>{exp.company}</Text>
                    </Text>
                    <Text style={s.expDuration}>{exp.duration}</Text>
                  </View>
                  {exp.highlights.slice(0, MAX_BULLETS).map((h, i) => (
                    <View key={i} style={s.bulletRow}>
                      <Text style={s.bulletDot}>•</Text>
                      <Text style={s.bulletText}>{h}</Text>
                    </View>
                  ))}
                </View>
              ))}
            </View>
          </View>

          {/* SIDEBAR */}
          <View style={s.side}>
            <SideHeading>CONTACT</SideHeading>
            <View style={s.contactRow}>
              <Text style={s.contactKey}>Phone</Text>
              <Link src={contact.phoneHref} style={s.contactLink}>{contact.phone}</Link>
            </View>
            <View style={s.contactRow}>
              <Text style={s.contactKey}>Email</Text>
              <Link src={`mailto:${contact.email}`} style={s.contactLink}>{contact.email}</Link>
            </View>
            <View style={s.contactRow}>
              <Text style={s.contactKey}>GitHub</Text>
              <Link src={contact.githubHref} style={s.contactLink}>{contact.github}</Link>
            </View>
            <View style={s.contactRow}>
              <Text style={s.contactKey}>LinkedIn</Text>
              <Link src={contact.linkedinHref} style={s.contactLink}>{contact.linkedin}</Link>
            </View>
            <View style={s.contactRow}>
              <Text style={s.contactKey}>Location</Text>
              <Text style={s.contactVal}>{contact.location}</Text>
            </View>

            <View style={s.sectionGap}>
              <SideHeading>SKILLS</SideHeading>
              {skills.map((g) => (
                <View key={g.label} style={s.skillGroup}>
                  <Text style={s.skillLabel}>{g.label}</Text>
                  <Text style={s.skillItems}>{g.items.join(', ')}</Text>
                </View>
              ))}
            </View>

            <View style={s.sectionGap}>
              <SideHeading>SOFT SKILLS</SideHeading>
              <Text style={s.inlineList}>{softSkills.join(' · ')}</Text>
            </View>

            <View style={s.sectionGap}>
              <SideHeading>EDUCATION</SideHeading>
              {education.map((e) => (
                <View key={e.degree} style={s.eduItem}>
                  <Text style={s.eduDegree}>{e.degree}</Text>
                  <Text style={s.eduInst}>{e.institution}</Text>
                  <Text style={s.eduYear}>{e.year}</Text>
                </View>
              ))}
            </View>

            <View style={s.sectionGap}>
              <SideHeading>LANGUAGES</SideHeading>
              <Text style={s.inlineList}>{languages.join(' · ')}</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  )
}
