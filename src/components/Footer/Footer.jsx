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
    <footer className="py-12" style={{ borderTop: '1px solid var(--line)', background: 'var(--bg)' }}>
      <div
        className="mx-auto w-full"
        style={{ paddingInline: 'clamp(20px, 3.2vw, 88px)' }}
      >
        <div className="grid items-center gap-6 xl:grid-cols-[1fr_auto_1fr]">
          <div
            className="text-center xl:text-left"
            style={{ fontFamily: 'var(--font-hud)', fontSize: '10px', letterSpacing: '0.15em', color: 'var(--muted)' }}
          >
            <span style={{ color: 'var(--accent)' }}>{t('footer.coordinates')}</span>
            {' - '}
            {t('footer.location')}
          </div>

          <p
            className="text-center xl:justify-self-center"
            style={{ fontFamily: 'var(--font-hud)', fontSize: '10px', letterSpacing: '0.12em', color: 'var(--muted)' }}
          >
            (c) {year} JEREMY ADONAI • {t('footer.rights')}
          </p>

          <div className="flex items-center justify-center xl:justify-end gap-4">
            {SOCIALS.map(social => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="transition-colors duration-200 hover:text-[var(--accent)]"
                style={{
                  fontFamily: 'var(--font-hud)',
                  fontSize: '11px',
                  letterSpacing: '0.12em',
                  color: 'var(--muted)',
                  textDecoration: 'none',
                }}
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
