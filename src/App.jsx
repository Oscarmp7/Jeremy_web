import { useState } from 'react'
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

  return (
    <>
      {/* Theme flash overlay */}
      <div
        className="theme-flash"
        style={{ transition: 'opacity 200ms ease' }}
        aria-hidden="true"
      />

      {/* Loader */}
      <Loader onComplete={() => setLoaded(true)} />

      {/* Global overlays (always present) */}
      <Cursor />
      <FilmGrain />

      {/* Main site (after loader) */}
      {loaded && (
        <>
          <Nav />
          <main>
            <Hero />
            <Marquee />
            <Work />
            <About />
            <Services />
            <Contact />
          </main>
          <Footer />
        </>
      )}
    </>
  )
}
