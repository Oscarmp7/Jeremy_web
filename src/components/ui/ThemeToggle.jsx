import { useTheme } from '../../hooks/useTheme'

export default function ThemeToggle() {
  const { theme, toggle } = useTheme()
  const nextTheme = theme === 'dark' ? 'light' : 'dark'

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${nextTheme} mode`}
      className="theme-toggle h-[38px] min-w-[90px] rounded-full border border-[var(--line)] px-4 text-[10px] tracking-[0.13em] transition-colors duration-200"
      style={{ fontFamily: 'var(--font-hud)', background: 'color-mix(in oklch, var(--bg), transparent 45%)' }}
    >
      {theme === 'dark' ? 'LIGHT' : 'DARK'}
    </button>
  )
}
