import { useEffect, useState } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTranslation } from 'react-i18next'
import './index.css'

import Loader from './components/Loader/Loader'
import Cursor from './components/ui/Cursor'
import FilmGrain from './components/ui/FilmGrain'
import Nav from './components/Nav/Nav'
import Hero from './components/Hero/Hero'
import Marquee from './components/Marquee/Marquee'
import Work from './components/Work/Work'
import About from './components/About/About'
import Services from './components/Services/Services'
import Contact from './components/Contact/Contact'
import Footer from './components/Footer/Footer'

export default function App() {
  const [loaded, setLoaded] = useState(false)
  const { i18n } = useTranslation()

  useEffect(() => {
    if (!loaded) return

    const raf = requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => cancelAnimationFrame(raf)
  }, [loaded])

  useEffect(() => {
    if (!loaded) return

    const timeout = window.setTimeout(() => {
      ScrollTrigger.refresh()
    }, 190)

    return () => window.clearTimeout(timeout)
  }, [loaded, i18n.language])

  return (
    <>
      <div
        className="theme-flash"
        aria-hidden="true"
      />
      <div className="lang-flash" aria-hidden="true" />

      <Loader onComplete={() => setLoaded(true)} />

      <Cursor />
      <FilmGrain />

      <div className="app-shell">
        <Nav />
        <main>
          <Hero ready={loaded} />
          <Marquee />
          <Work />
          <About />
          <Services />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  )
}
