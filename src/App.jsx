import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
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
  const shellRef = useRef(null)

  useEffect(() => {
    if (!loaded || !shellRef.current) return

    const ctx = gsap.context(() => {
      const targets = shellRef.current.querySelectorAll('[data-intro]')
      gsap.set(targets, { autoAlpha: 0, y: 24, filter: 'blur(8px)' })

      gsap.to(targets, {
        autoAlpha: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.9,
        stagger: 0.08,
        ease: 'power3.out',
        clearProps: 'all',
      })
    }, shellRef)

    return () => ctx.revert()
  }, [loaded])

  return (
    <>
      <div
        className="theme-flash"
        style={{ transition: 'opacity 200ms ease' }}
        aria-hidden="true"
      />

      <Loader onComplete={() => setLoaded(true)} />

      <Cursor />
      <FilmGrain />

      {loaded && (
        <div ref={shellRef}>
          <div data-intro>
            <Nav />
          </div>
          <main>
            <div data-intro>
              <Hero />
            </div>
            <div data-intro>
              <Marquee />
            </div>
            <div data-intro>
              <Work />
            </div>
            <div data-intro>
              <About />
            </div>
            <div data-intro>
              <Services />
            </div>
            <div data-intro>
              <Contact />
            </div>
          </main>
          <div data-intro>
            <Footer />
          </div>
        </div>
      )}
    </>
  )
}
