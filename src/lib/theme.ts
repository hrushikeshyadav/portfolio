import { useEffect, useState } from 'react'

export type Theme = 'dark' | 'light'

const KEY = 'theme'

export function getTheme(): Theme {
  if (typeof document === 'undefined') return 'dark'
  const t = document.documentElement.dataset.theme
  return t === 'light' ? 'light' : 'dark'
}

export function setTheme(t: Theme) {
  document.documentElement.dataset.theme = t
  try {
    localStorage.setItem(KEY, t)
  } catch {
    /* ignore */
  }
  // let non-React consumers (the 3D scene) react to the change
  window.dispatchEvent(new CustomEvent('themechange', { detail: t }))
}

/**
 * Reactive theme hook. Reads the data-theme set on <html> by the no-flash
 * bootstrap in index.html, and stays in sync across components / tabs.
 */
export function useTheme(): [Theme, () => void] {
  const [theme, setThemeState] = useState<Theme>(getTheme)

  useEffect(() => {
    const onChange = () => setThemeState(getTheme())
    window.addEventListener('themechange', onChange)
    window.addEventListener('storage', onChange)
    return () => {
      window.removeEventListener('themechange', onChange)
      window.removeEventListener('storage', onChange)
    }
  }, [])

  const toggle = () => {
    const next: Theme = getTheme() === 'dark' ? 'light' : 'dark'
    setTheme(next)
    setThemeState(next)
  }

  return [theme, toggle]
}
