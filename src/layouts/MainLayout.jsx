import { Outlet, useLocation } from 'react-router'
import Nav from '../components/Nav/Nav'
import Footer from '../components/Footer/Footer'
import PageTransition from '../components/PageTransition/PageTransition'
import RouteMeta from '../seo/RouteMeta.jsx'

export default function MainLayout({ theme, toggleTheme }) {
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <>
      <RouteMeta theme={theme} />
      <a href="#main-content" className="skip-link">
        Saltar al contenido
      </a>
      <Nav theme={theme} toggleTheme={toggleTheme} />
      <PageTransition>
        <main id="main-content" tabIndex={-1}>
          <Outlet />
        </main>
        {!isHome && <Footer />}
      </PageTransition>
    </>
  )
}
