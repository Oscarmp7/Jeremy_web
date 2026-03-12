import { Outlet } from 'react-router'
import Nav from '../components/Nav/Nav'
import Footer from '../components/Footer/Footer'
import PageTransition from '../components/PageTransition/PageTransition'

export default function MainLayout({ theme, toggleTheme }) {
  return (
    <>
      <Nav theme={theme} toggleTheme={toggleTheme} />
      <PageTransition>
        <main>
          <Outlet />
        </main>
        <Footer />
      </PageTransition>
    </>
  )
}
