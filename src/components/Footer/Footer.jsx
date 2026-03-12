import { Link } from 'react-router'
import { siteContent } from '../../data/siteContent'
import './Footer.css'

export default function Footer() {
  const year = new Date().getFullYear()
  const { brand, nav } = siteContent

  return (
    <footer className="footer">
      <div className="footer__grid">
        {/* Column 1 — Brand */}
        <div>
          <p className="footer__brand-name">MANZANA CUATRO</p>
          <p className="footer__text">{brand.email}</p>
          <p className="footer__text">{brand.location}</p>
        </div>

        {/* Column 2 — Navigation */}
        <div>
          <p className="footer__label">Navegaci&oacute;n</p>
          {nav.map((item) => (
            <Link key={item.href} to={item.href} className="footer__link">
              {item.label}
            </Link>
          ))}
        </div>

        {/* Column 3 — Social + Copyright */}
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
          <p className="footer__copyright">
            &copy; Manzana Cuatro {year}
          </p>
        </div>
      </div>
    </footer>
  )
}
