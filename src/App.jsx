import { useState } from 'react'
import './index.css'

import Loader from './components/Loader/Loader'
import Cursor from './components/ui/Cursor'
import FilmGrain from './components/ui/FilmGrain'
import Nav from './components/Nav/Nav'
import Hero from './components/Hero/Hero'

export default function App() {
  const [loaded, setLoaded] = useState(false)

  return (
    <>
      <div className="theme-flash" style={{ transition: 'opacity 200ms ease' }} />
      <Loader onComplete={() => setLoaded(true)} />
      <Cursor />
      <FilmGrain />
      {loaded && (
        <>
          <Nav />
          <main>
            <Hero />
          </main>
        </>
      )}
    </>
  )
}
