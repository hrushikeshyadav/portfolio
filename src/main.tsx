import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from '@tanstack/react-router'
import { router } from './router'
import { applyStaticPerfMode, startPerfProbe } from './lib/perf'
import './index.css'

// Decide the rendering tier before paint (static hints), then refine with a
// live FPS probe once the scene has settled. See src/lib/perf.ts.
applyStaticPerfMode()
startPerfProbe()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
