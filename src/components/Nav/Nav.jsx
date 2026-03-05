import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useLiveTimecode } from '../../hooks/useLiveTimecode'
import ThemeToggle from '../ui/ThemeToggle'
import LangToggle from '../ui/LangToggle'

const NAV_ID = 'site-primary-nav'

export default function Nav() {
  const { t } = useTranslation()
  const timecode = useLiveTimecode()
  const headerRef = useRef(null)
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
    const updateNavHeight = () => {
      const height = headerRef.current?.offsetHeight
      if (!height) return
      document.documentElement.style.setProperty('--nav-height', `${Math.ceil(height)}px`)
    }

    updateNavHeight()
    window.addEventListener('resize', updateNavHeight)

    const observer = typeof ResizeObserver !== 'undefined'
      ? new ResizeObserver(updateNavHeight)
      : null

    if (observer && headerRef.current) observer.observe(headerRef.current)

    return () => {
      window.removeEventListener('resize', updateNavHeight)
      observer?.disconnect()
    }
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
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-400"
        style={{
          background: scrolled
            ? 'color-mix(in oklch, var(--bg), transparent 16%)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(15px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--line)' : '1px solid transparent',
          boxShadow: scrolled ? '0 10px 28px rgba(0, 0, 0, 0.16)' : 'none',
          transform: scrolled ? 'translateY(0)' : 'translateY(-2px)',
        }}
      >
        <div
          className="mx-auto w-full relative flex items-center justify-between gap-6"
          style={{
            paddingInline: 'clamp(20px, 3.2vw, 88px)',
            paddingBlock: 'clamp(10px, 1.6vh, 20px)',
          }}
        >
          <a
            href="#hero"
            className="leading-none tracking-[0.06em] transition-colors duration-200 text-[27px] sm:text-[34px] xl:text-[40px] shrink-0"
            style={{ fontFamily: 'var(--font-display)', color: navForeground }}
          >
            JEREMY <span style={{ color: 'var(--accent)' }}>ADONAI</span>
          </a>

          <nav
            id={NAV_ID}
            className="hidden xl:flex items-center justify-center gap-4 2xl:gap-5 absolute left-1/2 -translate-x-1/2"
            aria-label="Main navigation"
          >
            {navLinks.map(link => (
              <a
                key={link.key}
                href={link.href}
                className="nav-link transition-all duration-200 rounded-full px-4 2xl:px-5 py-2"
                style={{
                  '--nav-link-color': navForeground,
                  fontFamily: 'var(--font-hud)',
                  fontSize: '12px',
                  letterSpacing: '0.12em',
                  background: 'transparent',
                }}
              >
                {t(`nav.${link.key}`)}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3 sm:gap-4 xl:gap-5 shrink-0">
            <div
              className="hidden 2xl:flex items-center gap-2"
              style={{
                fontFamily: 'var(--font-hud)',
                fontSize: '11px',
                color: navMuted,
                opacity: scrolled ? 1 : 0.88,
                transition: 'opacity 280ms ease',
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{
                  backgroundColor: recOn ? '#F94949' : 'transparent',
                  boxShadow: recOn ? '0 0 5px rgba(249, 73, 73, 0.9)' : 'none',
                  transition: 'all 0.1s',
                }}
              />
              <span style={{ color: 'var(--muted)', letterSpacing: '0.09em' }}>REC {timecode}</span>
            </div>

            <div className="hidden xl:block">
              <LangToggle />
            </div>
            <div className="hidden xl:block">
              <ThemeToggle />
            </div>

            <button
              type="button"
              className="xl:hidden flex flex-col items-center justify-center gap-1.5 w-10 h-10 rounded-full border border-[var(--line)]"
              onClick={() => setMenuOpen(v => !v)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls={NAV_ID}
              style={{
                background: scrolled
                  ? 'color-mix(in oklch, var(--bg), transparent 24%)'
                  : 'color-mix(in oklch, var(--bg), transparent 38%)',
              }}
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
          className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-10 xl:hidden"
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
              className="nav-link transition-colors duration-200"
              style={{
                '--nav-link-color': 'var(--text)',
                fontFamily: 'var(--font-display)',
                fontSize: '42px',
                letterSpacing: '0.1em',
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
