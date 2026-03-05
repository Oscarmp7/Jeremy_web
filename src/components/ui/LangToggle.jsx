import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function LangToggle() {
  const { i18n } = useTranslation()
  const [switching, setSwitching] = useState(false)
  const isEN = i18n.language === 'en'

  useEffect(() => {
    return () => {
      document.documentElement.classList.remove('lang-switching')
    }
  }, [])

  const toggle = async () => {
    if (switching) return
    setSwitching(true)
    document.documentElement.classList.add('lang-switching')

    try {
      await new Promise(resolve => {
        requestAnimationFrame(() => requestAnimationFrame(resolve))
      })
      await i18n.changeLanguage(isEN ? 'es' : 'en')
    } finally {
      window.setTimeout(() => {
        document.documentElement.classList.remove('lang-switching')
        setSwitching(false)
      }, 180)
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${isEN ? 'Spanish' : 'English'}`}
      aria-busy={switching}
      disabled={switching}
      className="relative w-[84px] h-[40px] rounded-full border transition-colors duration-300 disabled:opacity-90"
      style={{ borderColor: 'var(--line)', background: 'color-mix(in oklch, var(--bg), transparent 45%)' }}
    >
      <span
        className="absolute top-[4px] h-[32px] rounded-full transition-transform duration-300"
        style={{
          left: '4px',
          width: 'calc(50% - 8px)',
          transform: isEN ? 'translateX(0)' : 'translateX(calc(100% + 8px))',
          background: 'var(--accent)',
          boxShadow: '0 0 14px color-mix(in oklch, var(--accent), transparent 70%)',
        }}
      />

      <span
        className="relative z-10 h-full w-full grid grid-cols-2 place-items-center"
        style={{ fontFamily: 'var(--font-hud)', fontSize: '10px', letterSpacing: '0.1em' }}
      >
        <span style={{ color: isEN ? '#05121A' : 'var(--muted)' }}>EN</span>
        <span style={{ color: !isEN ? '#05121A' : 'var(--muted)' }}>ES</span>
      </span>
    </button>
  )
}
