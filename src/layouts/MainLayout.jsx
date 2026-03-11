import { Outlet } from 'react-router'
import Nav from '../components/Nav/Nav'
import Footer from '../components/Footer/Footer'

export default function MainLayout() {
  return (
    <>
      <Nav />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
