import { Outlet, useLocation } from 'react-router'
import Nav from '../components/Nav/Nav'
import Footer from '../components/Footer/Footer'
import PageTransition from '../components/PageTransition/PageTransition'

export default function MainLayout({ theme, toggleTheme }) {
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <>
      <Nav theme={theme} toggleTheme={toggleTheme} />
      <PageTransition>
        <main>
          <Outlet />
        </main>
        {!isHome && <Footer />}
      </PageTransition>
    </>
  )
}
