import { Outlet } from '@tanstack/react-router'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import Cursor from '../components/ui/Cursor'
import SmoothScroll from '../components/ui/SmoothScroll'
import { GlassFilterDefs } from '../components/ui/LiquidGlass'

export default function RootLayout() {
  return (
    <div style={{ background: '#0a0a0b', minHeight: '100dvh' }}>
      <GlassFilterDefs />
      <SmoothScroll />
      <Cursor />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
