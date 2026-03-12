import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import { siteContent } from '../../data/siteContent'
import './Nav.css'

const NAV_ID = 'site-primary-nav'

export default function Nav() {
  const headerRef = useRef(null)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
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

  return (
    <>
      <header ref={headerRef} className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
        <div className="nav__inner">
          <Link to="/" className="nav__brand">
            <span className="nav__brand-name">{siteContent.brand.name}</span>
            <span className="nav__brand-sub">Studio / RD</span>
          </Link>

          <nav id={NAV_ID} className="nav__links" aria-label="Navegación principal">
            {siteContent.nav.map(link => (
              <Link key={link.href} to={link.href} className="nav__link">
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="nav__cta-wrap">
            <div className="nav__meta">Disponible para campañas</div>
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
              className={`nav__menu ${menuOpen ? 'nav__menu--open' : ''}`}
              onClick={() => setMenuOpen(value => !value)}
              aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={menuOpen}
              aria-controls={NAV_ID}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className="nav__mobile" role="dialog" aria-modal="true" aria-label="Menú móvil">
          <div className="nav__mobile-inner">
            {siteContent.nav.map(link => (
              <Link
                key={link.href}
                to={link.href}
                className="nav__mobile-link"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={siteContent.brand.whatsappHref}
              className="nav__mobile-cta"
              target="_blank"
              rel="noreferrer"
              onClick={() => setMenuOpen(false)}
            >
              Escríbenos por WhatsApp
            </a>
            <p className="nav__mobile-note">{siteContent.brand.email}</p>
          </div>
        </div>
      )}
    </>
  )
}
