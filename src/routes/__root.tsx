import { Suspense, lazy } from 'react'
import { Outlet } from '@tanstack/react-router'
import TopControls from '../components/layout/TopControls'
import FloatingTabBar from '../components/layout/FloatingTabBar'
import Footer from '../components/layout/Footer'
import Cursor from '../components/ui/Cursor'
import SmoothScroll from '../components/ui/SmoothScroll'
import { GlassFilterDefs } from '../components/ui/LiquidGlass'
import CurtainTransition from '../components/ui/CurtainTransition'

// Three.js is the heaviest dependency — defer the whole ambient scene so the
// page text paints first and the WebGL chunk streams in afterwards.
const AmbientScene = lazy(() => import('../components/3d/AmbientScene'))

export default function RootLayout() {
  return (
    <div style={{ position: 'relative', minHeight: '100dvh' }}>
      <GlassFilterDefs />
      <CurtainTransition />
      <Suspense fallback={null}>
        <AmbientScene />
      </Suspense>
      <SmoothScroll />
      <Cursor />
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
