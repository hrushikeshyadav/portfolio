import Hero from '../components/sections/Hero'
import About from '../components/sections/About'
import CaseStudies from '../components/sections/CaseStudies'
import Experience from '../components/sections/Experience'
import Projects from '../components/sections/Projects'
import Skills from '../components/sections/Skills'
import ConnectCTA from '../components/sections/ConnectCTA'

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <CaseStudies />
      <Projects />
      <Experience />
      <Skills />
      <ConnectCTA />
    </>
  )
}
