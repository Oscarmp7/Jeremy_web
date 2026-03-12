import { Link, useLocation } from 'react-router'
import { siteContent } from '../../data/siteContent'
import './Footer.css'

export default function Footer() {
  const location = useLocation()
  const isHome = location.pathname === '/'
  const year = new Date().getFullYear()
  const { brand, nav } = siteContent

  if (isHome) {
    return (
      <footer className="footer footer--minimal">
        <div className="footer__minimal-inner">
          <p className="footer__brand-name">MANZANA CUATRO</p>
          <div className="footer__minimal-links">
            <a href={`mailto:${brand.email}`} className="footer__link">
              {brand.email}
            </a>
            <a
              href={brand.instagramHref}
              className="footer__link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
            <a
              href={brand.whatsappHref}
              className="footer__link"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </a>
          </div>
          <p className="footer__copyright">&copy; Manzana Cuatro {year}</p>
        </div>
      </footer>
    )
  }

  return (
    <footer className="footer">
      <div className="footer__grid">
        <div>
          <p className="footer__brand-name">MANZANA CUATRO</p>
          <p className="footer__text">{brand.email}</p>
          <p className="footer__text">{brand.location}</p>
        </div>

        <div>
          <p className="footer__label">Navegaci&oacute;n</p>
          {nav.map((item) => (
            <Link key={item.href} to={item.href} className="footer__link">
              {item.label}
            </Link>
          ))}
        </div>

        <div>
          <p className="footer__label">Social</p>
          <a
            href={brand.instagramHref}
            className="footer__link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
          <a
            href={brand.whatsappHref}
            className="footer__link"
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp
          </a>
          <p className="footer__copyright">&copy; Manzana Cuatro {year}</p>
        </div>
      </div>
    </footer>
  )
}
