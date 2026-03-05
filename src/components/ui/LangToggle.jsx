import { useTranslation } from 'react-i18next'

export default function LangToggle() {
  const { i18n } = useTranslation()
  const isEN = i18n.language === 'en'

  const toggle = () => i18n.changeLanguage(isEN ? 'es' : 'en')

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${isEN ? 'Spanish' : 'English'}`}
      className="hover:text-[var(--accent)] transition-colors duration-200"
      style={{ fontFamily: 'var(--font-hud)', fontSize: '11px', letterSpacing: '0.1em', color: 'var(--muted)' }}
    >
      {isEN ? 'ES' : 'EN'}
    </button>
  )
}
