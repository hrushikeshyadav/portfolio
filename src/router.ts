import { lazy } from 'react'
import { createRootRoute, createRoute, createRouter } from '@tanstack/react-router'
import RootLayout from './routes/__root'
import HomePage from './routes/index'
import NotFound from './components/NotFound'

// Resume pulls in @react-pdf — keep it out of the homepage bundle entirely.
const ResumePage = lazy(() => import('./routes/resume'))
const ContactPage = lazy(() => import('./routes/contact'))

const rootRoute = createRootRoute({
  component: RootLayout,
  notFoundComponent: NotFound,
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
})

const resumeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/resume',
  component: ResumePage,
})

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/contact',
  component: ContactPage,
})

export const routeTree = rootRoute.addChildren([indexRoute, resumeRoute, contactRoute])

export const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
