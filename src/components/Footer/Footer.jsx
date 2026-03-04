import { useTranslation } from 'react-i18next'

const SOCIALS = [
  { label: 'IG', href: '#' },
  { label: 'YT', href: '#' },
  { label: 'VM', href: '#' },
  { label: 'WA', href: '#' },
]

export default function Footer() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  return (
    <footer
      className="px-6 py-12"
      style={{ borderTop: '1px solid var(--line)', background: 'var(--bg)' }}
    >
      <div
        className="max-w-[1400px] mx-auto flex flex-wrap items-center justify-between gap-6"
      >
        {/* Left: Coordinates */}
        <div style={{ fontFamily: 'var(--font-hud)', fontSize: '10px', letterSpacing: '0.15em', color: 'var(--muted)' }}>
          <span style={{ color: 'var(--accent)' }}>{t('footer.coordinates')}</span>
          {' — '}
          {t('footer.location')}
        </div>

        {/* Center: Copyright */}
        <p style={{ fontFamily: 'var(--font-hud)', fontSize: '10px', letterSpacing: '0.12em', color: 'var(--muted)' }}>
          © {year} JEREMY ADONAI · {t('footer.rights')}
        </p>

        {/* Right: Socials */}
        <div className="flex items-center gap-4">
          {SOCIALS.map(s => (
            <a
              key={s.label}
              href={s.href}
              aria-label={s.label}
              style={{
                fontFamily: 'var(--font-hud)',
                fontSize: '11px',
                letterSpacing: '0.12em',
                color: 'var(--muted)',
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => (e.target.style.color = 'var(--accent)')}
              onMouseLeave={e => (e.target.style.color = 'var(--muted)')}
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
