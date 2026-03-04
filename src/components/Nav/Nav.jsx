import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useLiveTimecode } from '../../hooks/useLiveTimecode'
import ThemeToggle from '../ui/ThemeToggle'
import LangToggle from '../ui/LangToggle'

export default function Nav() {
  const { t } = useTranslation()
  const timecode = useLiveTimecode()
  const [scrolled, setScrolled] = useState(false)
  const [recOn, setRecOn] = useState(true)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // REC blink
  useEffect(() => {
    const id = setInterval(() => setRecOn(v => !v), 800)
    return () => clearInterval(id)
  }, [])

  const navLinks = [
    { key: 'work', href: '#work' },
    { key: 'about', href: '#about' },
    { key: 'contact', href: '#contact' },
  ]

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? 'color-mix(in oklch, var(--bg), transparent 15%)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--line)' : '1px solid transparent',
      }}
    >
      <div className="max-w-[1400px] mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#hero"
          className="text-2xl tracking-wider hover:text-[var(--accent)] transition-colors duration-200"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--text)' }}
        >
          JEREMY <span style={{ color: 'var(--accent)' }}>ADONAI</span>
        </a>

        {/* Center: Nav links */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
          {navLinks.map(link => (
            <a
              key={link.key}
              href={link.href}
              className="relative group transition-colors duration-200 hover:text-[var(--accent)]"
              style={{ fontFamily: 'var(--font-hud)', fontSize: '11px', letterSpacing: '0.12em', color: 'var(--muted)' }}
            >
              {t(`nav.${link.key}`)}
              <span
                className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-px bg-[var(--accent)] transition-all duration-300 w-0 group-hover:w-full"
              />
            </a>
          ))}
        </nav>

        {/* Right: REC + timecode + toggles */}
        <div className="flex items-center gap-4">
          {/* HUD: REC + timecode */}
          <div
            className="hidden lg:flex items-center gap-2"
            style={{ fontFamily: 'var(--font-hud)', fontSize: '10px', color: 'var(--muted)' }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{
                backgroundColor: recOn ? '#FF4D00' : 'transparent',
                boxShadow: recOn ? '0 0 4px #FF4D00' : 'none',
                transition: 'all 0.1s',
              }}
            />
            <span style={{ color: 'var(--hud)', letterSpacing: '0.08em' }}>
              REC {timecode}
            </span>
          </div>

          <LangToggle />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
