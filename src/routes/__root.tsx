import { Suspense, lazy } from 'react'
import { Outlet } from '@tanstack/react-router'
import TopControls from '../components/layout/TopControls'
import FloatingTabBar from '../components/layout/FloatingTabBar'
import Footer from '../components/layout/Footer'
import Cursor from '../components/ui/Cursor'
import SmoothScroll from '../components/ui/SmoothScroll'
import AuroraBackground from '../components/ui/AuroraBackground'
import { GlassFilterDefs } from '../components/ui/LiquidGlass'
import CurtainTransition from '../components/ui/CurtainTransition'
import ScrollProgress from '../components/ui/ScrollProgress'
import CommandPalette from '../components/ui/CommandPalette'
import Spotlight from '../components/ui/Spotlight'
import EasterEggs from '../components/ui/EasterEggs'

// Three.js is the heaviest dependency — defer the whole ambient scene so the
// page text paints first and the WebGL chunk streams in afterwards.
const AmbientScene = lazy(() => import('../components/3d/AmbientScene'))

export default function RootLayout() {
  return (
    <div style={{ position: 'relative', minHeight: '100dvh' }}>
      <GlassFilterDefs />
      <CurtainTransition />
      {/* Cheap animated aurora — runs in every tier (incl. phones). The WebGL
          ambient scene layers on top of it on capable, non-touch devices. */}
      <AuroraBackground />
      <Suspense fallback={null}>
        <AmbientScene />
      </Suspense>
      <SmoothScroll />
      <ScrollProgress />
      <Cursor />
      <Spotlight />
      <EasterEggs />
      <CommandPalette />
      <TopControls />
      <main style={{ position: 'relative', zIndex: 1 }}>
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <FloatingTabBar />
    </div>
  )
}
