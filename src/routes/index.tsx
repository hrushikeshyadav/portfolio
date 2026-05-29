import Hero from '../components/sections/Hero'
import About from '../components/sections/About'
import CaseStudies from '../components/sections/CaseStudies'
import Projects from '../components/sections/Projects'
import Skills from '../components/sections/Skills'
import Contact from '../components/sections/Contact'
import SceneCanvas from '../components/3d/SceneCanvas'

export default function HomePage() {
  return (
    <>
      <SceneCanvas />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Hero />
        <About />
        <CaseStudies />
        <Projects />
        <Skills />
        <Contact />
      </div>
    </>
  )
}
