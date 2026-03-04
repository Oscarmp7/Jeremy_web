import { useState } from 'react'
import './index.css'

import Loader from './components/Loader/Loader'
import Cursor from './components/ui/Cursor'
import FilmGrain from './components/ui/FilmGrain'
import Nav from './components/Nav/Nav'

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
            <div style={{ height: '200vh', paddingTop: '80px', color: 'var(--text)', padding: '100px 2rem' }}>
              Nav test — scroll to see frosted effect
            </div>
          </main>
        </>
      )}
    </>
  )
}
