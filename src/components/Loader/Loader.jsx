import { useEffect, useState } from 'react'
import './Loader.css'

const BLADE_COUNT = 9
const LOADER_DURATION_MS = 1760

export default function Loader({ onComplete }) {
  const [visible, setVisible] = useState(true)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    const start = requestAnimationFrame(() => setPlaying(true))

    const done = setTimeout(() => {
      setVisible(false)
      document.body.style.overflow = ''
      onComplete?.()
    }, LOADER_DURATION_MS)

    return () => {
      cancelAnimationFrame(start)
      clearTimeout(done)
      document.body.style.overflow = ''
    }
  }, [onComplete])

  if (!visible) return null

  return (
    <div className={`loader ${playing ? 'loader--play' : ''}`} aria-hidden="true">
      <div className="loader__aperture" role="presentation">
        <div className="loader__iris">
          {Array.from({ length: BLADE_COUNT }).map((_, i) => (
            <div
              key={i}
              className="loader__blade"
              style={{ '--r': `${i * (360 / BLADE_COUNT)}deg` }}
            />
          ))}
          <div className="loader__aperture-hole" />
        </div>
      </div>
    </div>
  )
}
