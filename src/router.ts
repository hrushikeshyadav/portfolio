import { createRootRoute, createRoute, createRouter } from '@tanstack/react-router'
import RootLayout from './routes/__root'
import HomePage from './routes/index'
import ResumePage from './routes/resume'

const rootRoute = createRootRoute({
  component: RootLayout,
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

export const routeTree = rootRoute.addChildren([indexRoute, resumeRoute])

export const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
