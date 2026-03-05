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
    const onScroll = () => setScrolled(window.scrollY > 40)
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

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled
            ? 'color-mix(in oklch, var(--bg), transparent 18%)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--line)' : '1px solid transparent',
        }}
      >
        <div
          className="max-w-[1480px] mx-auto px-6 md:px-10 py-5 md:py-6 grid items-center gap-4"
          style={{ gridTemplateColumns: '1fr auto 1fr' }}
        >
          <a
            href="#hero"
            className="text-[30px] leading-none tracking-[0.08em] hover:text-[var(--accent)] transition-colors duration-200 justify-self-start"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--text)' }}
          >
            JEREMY <span style={{ color: 'var(--accent)' }}>ADONAI</span>
          </a>

          <nav
            id={NAV_ID}
            className="hidden md:flex items-center justify-center gap-10 col-start-2"
            aria-label="Main navigation"
          >
            {navLinks.map(link => (
              <a
                key={link.key}
                href={link.href}
                className="relative group transition-colors duration-200 hover:text-[var(--accent)]"
                style={{
                  fontFamily: 'var(--font-hud)',
                  fontSize: '11px',
                  letterSpacing: '0.15em',
                  color: 'var(--muted)',
                }}
              >
                {t(`nav.${link.key}`)}
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-px bg-[var(--accent)] transition-all duration-300 w-0 group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4 justify-self-end col-start-3">
            <div
              className="hidden lg:flex items-center gap-2"
              style={{ fontFamily: 'var(--font-hud)', fontSize: '10px', color: 'var(--muted)' }}
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
              className="md:hidden flex flex-col gap-1.5 p-1"
              onClick={() => setMenuOpen(v => !v)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls={NAV_ID}
            >
              <span
                className="block w-5 h-px transition-all duration-300"
                style={{
                  background: 'var(--text)',
                  transform: menuOpen ? 'rotate(45deg) translate(2px, 2px)' : 'none',
                }}
              />
              <span
                className="block w-5 h-px transition-all duration-300"
                style={{ background: 'var(--text)', opacity: menuOpen ? 0 : 1 }}
              />
              <span
                className="block w-5 h-px transition-all duration-300"
                style={{
                  background: 'var(--text)',
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
                fontSize: '38px',
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
