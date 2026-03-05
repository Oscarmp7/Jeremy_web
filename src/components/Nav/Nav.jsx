import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useLiveTimecode } from '../../hooks/useLiveTimecode'
import ThemeToggle from '../ui/ThemeToggle'
import LangToggle from '../ui/LangToggle'

const NAV_ID = 'site-primary-nav'

export default function Nav() {
  const { t } = useTranslation()
  const timecode = useLiveTimecode()
  const [scrolled, setScrolled] = useState(false)
  const [recOn, setRecOn] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const id = setInterval(() => setRecOn(v => !v), 800)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const navLinks = [
    { key: 'work', href: '#work' },
    { key: 'about', href: '#about' },
    { key: 'contact', href: '#contact' },
  ]

  const navForeground = scrolled
    ? 'var(--text)'
    : 'color-mix(in oklch, var(--text), white 65%)'

  const navMuted = scrolled
    ? 'var(--muted)'
    : 'color-mix(in oklch, var(--text), white 50%)'

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled
            ? 'color-mix(in oklch, var(--bg), transparent 16%)'
            : 'color-mix(in oklch, var(--bg), transparent 55%)',
          backdropFilter: 'blur(16px)',
          borderBottom: scrolled ? '1px solid var(--line)' : '1px solid color-mix(in oklch, var(--line), transparent 62%)',
        }}
      >
        <div
          className="max-w-[1780px] mx-auto px-8 md:px-12 xl:px-16 py-5 md:py-6 grid items-center gap-4"
          style={{ gridTemplateColumns: 'minmax(300px, 1fr) auto minmax(300px, 1fr)' }}
        >
          <a
            href="#hero"
            className="leading-none tracking-[0.06em] transition-colors duration-200 justify-self-start text-[34px] xl:text-[40px]"
            style={{ fontFamily: 'var(--font-display)', color: navForeground }}
          >
            JEREMY <span style={{ color: 'var(--accent)' }}>ADONAI</span>
          </a>

          <nav
            id={NAV_ID}
            className="hidden md:flex items-center justify-center gap-3 col-start-2"
            aria-label="Main navigation"
          >
            {navLinks.map(link => (
              <a
                key={link.key}
                href={link.href}
                className="transition-all duration-200 rounded-full px-4 py-2 border hover:border-[var(--accent)] hover:text-[var(--accent)]"
                style={{
                  fontFamily: 'var(--font-hud)',
                  fontSize: '12px',
                  letterSpacing: '0.13em',
                  color: navMuted,
                  borderColor: 'color-mix(in oklch, var(--line), transparent 30%)',
                  background: 'color-mix(in oklch, var(--bg), transparent 65%)',
                }}
              >
                {t(`nav.${link.key}`)}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4 justify-self-end col-start-3">
            <div
              className="hidden xl:flex items-center gap-2"
              style={{ fontFamily: 'var(--font-hud)', fontSize: '11px', color: navMuted }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{
                  backgroundColor: recOn ? 'var(--accent)' : 'transparent',
                  boxShadow: recOn ? '0 0 4px var(--accent)' : 'none',
                  transition: 'all 0.1s',
                }}
              />
              <span style={{ color: 'var(--hud)', letterSpacing: '0.09em' }}>REC {timecode}</span>
            </div>

            <LangToggle />
            <ThemeToggle />

            <button
              type="button"
              className="md:hidden flex flex-col gap-1.5 p-1"
              onClick={() => setMenuOpen(v => !v)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls={NAV_ID}
            >
              <span
                className="block w-5 h-px transition-all duration-300"
                style={{
                  background: navForeground,
                  transform: menuOpen ? 'rotate(45deg) translate(2px, 2px)' : 'none',
                }}
              />
              <span
                className="block w-5 h-px transition-all duration-300"
                style={{ background: navForeground, opacity: menuOpen ? 0 : 1 }}
              />
              <span
                className="block w-5 h-px transition-all duration-300"
                style={{
                  background: navForeground,
                  transform: menuOpen ? 'rotate(-45deg) translate(2px, -2px)' : 'none',
                }}
              />
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div
          className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-10 md:hidden"
          style={{ background: 'var(--bg)' }}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          {navLinks.map(link => (
            <a
              key={link.key}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="transition-colors duration-200 hover:text-[var(--accent)]"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '42px',
                letterSpacing: '0.1em',
                color: 'var(--text)',
                textDecoration: 'none',
              }}
            >
              {t(`nav.${link.key}`)}
            </a>
          ))}
        </div>
      )}
    </>
  )
}
