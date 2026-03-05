import { useTheme } from '../../hooks/useTheme'

export default function ThemeToggle() {
  const { theme, toggle } = useTheme()
  const nextTheme = theme === 'dark' ? 'light' : 'dark'

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${nextTheme} mode`}
      className="text-xs tracking-[0.14em] transition-colors duration-200 border border-[var(--line)] px-2.5 py-1 rounded hover:text-[var(--accent)]"
      style={{ fontFamily: 'var(--font-hud)', color: 'var(--muted)' }}
    >
      {theme === 'dark' ? 'LIGHT' : 'DARK'}
    </button>
  )
}
