import { useEffect, useState } from 'react'
import './Loader.css'

const LOADER_DURATION_MS = 1320

export default function Loader({ onComplete }) {
  const [visible, setVisible] = useState(true)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const prevBodyOverflow = document.body.style.overflow
    const prevBodyOverscroll = document.body.style.overscrollBehavior
    document.body.style.overflow = 'hidden'
    document.body.style.overscrollBehavior = 'none'

    const start = requestAnimationFrame(() => setPlaying(true))

    const done = setTimeout(() => {
      setVisible(false)
      document.body.style.overflow = prevBodyOverflow
      document.body.style.overscrollBehavior = prevBodyOverscroll
      onComplete?.()
    }, LOADER_DURATION_MS)

    return () => {
      cancelAnimationFrame(start)
      clearTimeout(done)
      document.body.style.overflow = prevBodyOverflow
      document.body.style.overscrollBehavior = prevBodyOverscroll
    }
  }, [onComplete])

  if (!visible) return null

  return (
    <div className={`loader ${playing ? 'loader--play' : ''}`} aria-hidden="true">
      <div className="loader__core" role="presentation">
        <div className="loader__line" />
        <div className="loader__field" />
      </div>
    </div>
  )
}
