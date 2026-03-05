import { useEffect, useState } from 'react'
import './Loader.css'

const BLADE_COUNT = 9

export default function Loader({ onComplete }) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
      onComplete?.()
    }, 1650)

    return () => clearTimeout(timer)
  }, [onComplete])

  if (!visible) return null

  return (
    <div className="loader" aria-hidden="true">
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
