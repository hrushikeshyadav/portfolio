import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../../lib/theme'

/**
 * Dark / light theme toggle. A liquid-glass pill with a sliding knob that
 * carries a sun or moon. Position controlled by [data-theme] in index.css.
 */
export default function ThemeToggle() {
  const [theme, toggle] = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      title={isDark ? 'Light mode' : 'Dark mode'}
      className="glass glass-rim theme-toggle-track"
      style={{
        ['--glass-blur' as string]: '8px',
        cursor: 'pointer',
      }}
    >
      {/* hint of the OTHER mode on the far side; knob carries the current mode */}
      {isDark ? (
        <Sun size={11} style={{ position: 'absolute', right: 7, color: 'rgba(var(--text-rgb), 0.4)' }} />
      ) : (
        <Moon size={11} style={{ position: 'absolute', left: 7, color: 'rgba(var(--text-rgb), 0.4)' }} />
      )}
      <span className="theme-toggle-knob">
        {isDark ? <Moon size={11} /> : <Sun size={11} />}
      </span>
    </button>
  )
}
