import { useEffect, useState } from 'react'
import './Loader.css'

const BLADE_COUNT = 9

export default function Loader({ onComplete }) {
  const [visible, setVisible] = useState(true)
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    const startExit = setTimeout(() => {
      setExiting(true)
    }, 1420)

    const done = setTimeout(() => {
      setVisible(false)
      onComplete?.()
    }, 1820)

    return () => {
      clearTimeout(startExit)
      clearTimeout(done)
    }
  }, [onComplete])

  if (!visible) return null

  return (
    <div className={`loader ${exiting ? 'loader--exit' : ''}`} aria-hidden="true">
      <div className="loader__iris" role="presentation">
        {Array.from({ length: BLADE_COUNT }).map((_, i) => (
          <div
            key={i}
            className="loader__blade"
            style={{
              '--r': `${i * (360 / BLADE_COUNT)}deg`,
              animationDelay: `${i * 0.03}s`,
            }}
          />
        ))}
        <div className="loader__aperture-hole" />
        <div className="loader__monogram">JA</div>
      </div>
    </div>
  )
}
