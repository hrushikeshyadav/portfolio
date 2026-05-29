import { Outlet } from '@tanstack/react-router'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import Cursor from '../components/ui/Cursor'
import SmoothScroll from '../components/ui/SmoothScroll'

export default function RootLayout() {
  return (
    <div style={{ background: '#000000', minHeight: '100dvh' }}>
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
