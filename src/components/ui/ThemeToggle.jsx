import { useTheme } from '../../hooks/useTheme'

export default function ThemeToggle() {
  const { theme, toggle } = useTheme()

  return (
    <button
      onClick={toggle}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      className="font-hud text-xs tracking-widest text-[var(--muted)] hover:text-[var(--accent)] transition-colors duration-200 border border-[var(--line)] px-2 py-1 rounded"
      style={{ fontFamily: 'var(--font-hud)' }}
    >
      {theme === 'dark' ? '◑ LIGHT' : '◐ DARK'}
    </button>
  )
}
