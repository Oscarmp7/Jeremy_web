import { useEffect, useRef, useState, useCallback } from 'react'
import { Link, useLocation } from 'react-router'
import gsap from 'gsap'
import { siteContent } from '../../data/siteContent'
import './Nav.css'

const noop = () => {}

export default function Nav({ theme = 'dark', toggleTheme = noop }) {
  const headerRef = useRef(null)
  const mobileRef = useRef(null)
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  // Scroll detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  // GSAP stagger animation for mobile links
  useEffect(() => {
    if (menuOpen && mobileRef.current) {
      const links = mobileRef.current.querySelectorAll('.nav__mobile-link')
      gsap.from(links, {
        opacity: 0,
        y: 30,
        stagger: 0.05,
        duration: 0.4,
        ease: 'power3.out',
      })
    }
  }, [menuOpen])

  const closeMenu = useCallback(() => setMenuOpen(false), [])

  return (
    <>
      <header
        ref={headerRef}
        className={`nav${scrolled ? ' nav--scrolled' : ''}`}
      >
        <div className="nav__inner">
          {/* Left: Brand */}
          <Link to="/" className="nav__brand">
            {siteContent.brand.name}
          </Link>

          {/* Center: Page links */}
          <nav className="nav__links" aria-label="Navegación principal">
            {siteContent.nav.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`nav__link${
                  location.pathname === link.href ? ' nav__link--active' : ''
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right: Actions */}
          <div className="nav__actions">
            <button
              type="button"
              className="nav__theme-toggle"
              onClick={toggleTheme}
            >
              {theme === 'dark' ? 'Light' : 'Dark'}
            </button>

            <a
              href={siteContent.brand.whatsappHref}
              className="nav__cta"
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp
            </a>

            <button
              type="button"
              className={`nav__menu${menuOpen ? ' nav__menu--open' : ''}`}
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={menuOpen}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile fullscreen overlay */}
      {menuOpen && (
        <div
          className="nav__mobile"
          ref={mobileRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menú móvil"
        >
          <div className="nav__mobile-inner">
            {siteContent.nav.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="nav__mobile-link"
                onClick={closeMenu}
              >
                {link.label}
              </Link>
            ))}

            <button
              type="button"
              className="nav__mobile-theme"
              onClick={toggleTheme}
            >
              {theme === 'dark' ? 'Light mode' : 'Dark mode'}
            </button>

            <a
              href={siteContent.brand.whatsappHref}
              className="nav__mobile-cta"
              target="_blank"
              rel="noreferrer"
              onClick={closeMenu}
            >
              WhatsApp
            </a>
          </div>
        </div>
      )}
    </>
  )
}
