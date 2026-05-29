import { Outlet } from '@tanstack/react-router'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import Cursor from '../components/ui/Cursor'

export default function RootLayout() {
  return (
    <div style={{ background: '#0c0c0c', minHeight: '100dvh' }}>
      <Cursor />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
