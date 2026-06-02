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

const s = StyleSheet.create({
  page: { fontFamily: FONT, fontSize: 9, color: INK, backgroundColor: '#ffffff' },

  // Header band
  header: { backgroundColor: NAVY, padding: '24pt 30pt 20pt' },
  name: { fontFamily: BOLD, fontSize: 26, color: '#ffffff', letterSpacing: 4 },
  role: { fontSize: 10.5, color: '#c7d2dc', letterSpacing: 3, marginTop: 5 },

  // Body two-column
  body: { flexDirection: 'row' },
  main: { width: '62%', padding: '18pt 16pt 24pt 30pt' },
  side: { width: '38%', padding: '18pt 26pt 24pt 18pt', borderLeft: `1pt solid ${RULE}` },

  // Section heading
  h: { fontFamily: BOLD, fontSize: 11, color: NAVY_DK, letterSpacing: 1.5 },
  hRule: { height: 2, backgroundColor: NAVY, width: 26, marginTop: 4, marginBottom: 9 },
  sectionGap: { marginTop: 16 },

  summary: { fontSize: 9, color: INK, lineHeight: 1.55 },

  // Experience
  expItem: { marginBottom: 11 },
  expDuration: { fontSize: 8, color: SUB, marginBottom: 1.5 },
  expRole: { fontFamily: BOLD, fontSize: 9.5, color: NAVY_DK },
  expCompany: { fontFamily: BOLD, fontSize: 9.5, color: NAVY },
  bulletRow: { flexDirection: 'row', marginTop: 3, paddingRight: 4 },
  bulletDot: { width: 8, fontSize: 9, color: NAVY, marginTop: 0.5 },
  bulletText: { flex: 1, fontSize: 8.5, color: INK, lineHeight: 1.45 },

  // Sidebar
  contactRow: { flexDirection: 'row', marginBottom: 4, alignItems: 'flex-start' },
  contactKey: { fontFamily: BOLD, fontSize: 8, color: NAVY, width: 46 },
  contactVal: { flex: 1, fontSize: 8, color: INK },
  contactLink: { flex: 1, fontSize: 8, color: '#1a5276', textDecoration: 'none' },

  skillGroup: { marginBottom: 7 },
  skillLabel: { fontFamily: BOLD, fontSize: 8.5, color: NAVY_DK, marginBottom: 2 },
  skillItems: { fontSize: 8, color: INK, lineHeight: 1.4 },

  liRow: { flexDirection: 'row', marginBottom: 2.5 },
  liDot: { width: 7, fontSize: 8, color: NAVY },
  liText: { flex: 1, fontSize: 8.5, color: INK, lineHeight: 1.35 },

  eduItem: { marginBottom: 7 },
  eduDegree: { fontFamily: BOLD, fontSize: 8.5, color: NAVY_DK },
  eduInst: { fontSize: 8, color: SUB, lineHeight: 1.35, marginTop: 1 },
  eduYear: { fontSize: 8, color: NAVY, marginTop: 1 },
})

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
                  <Text style={s.expDuration}>{exp.duration}</Text>
                  <Text>
                    <Text style={s.expRole}>{exp.role}</Text>
                    <Text style={s.expDuration}>{'  |  '}</Text>
                    <Text style={s.expCompany}>{exp.company}</Text>
                  </Text>
                  {exp.highlights.map((h, i) => (
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
              {softSkills.map((sk) => (
                <View key={sk} style={s.liRow}>
                  <Text style={s.liDot}>•</Text>
                  <Text style={s.liText}>{sk}</Text>
                </View>
              ))}
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
              {languages.map((l) => (
                <View key={l} style={s.liRow}>
                  <Text style={s.liDot}>•</Text>
                  <Text style={s.liText}>{l}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </Page>
    </Document>
  )
}
