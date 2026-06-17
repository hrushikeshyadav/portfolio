import { Outlet } from '@tanstack/react-router'
import TopControls from '../components/layout/TopControls'
import FloatingTabBar from '../components/layout/FloatingTabBar'
import Footer from '../components/layout/Footer'
import Cursor from '../components/ui/Cursor'
import SmoothScroll from '../components/ui/SmoothScroll'
import { GlassFilterDefs } from '../components/ui/LiquidGlass'
import AmbientScene from '../components/3d/AmbientScene'

export default function RootLayout() {
  return (
    <div style={{ position: 'relative', minHeight: '100dvh' }}>
      <GlassFilterDefs />
      <AmbientScene />
      <SmoothScroll />
      <Cursor />
      <TopControls />
      <main style={{ position: 'relative', zIndex: 1 }}>
        <Outlet />
      </main>
      <Footer />
      <FloatingTabBar />
    </div>
  )
}
