import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import gsap from 'gsap'

export default function Marquee() {
  const { t } = useTranslation()
  const trackRef = useRef(null)
  const tweenRef = useRef(null)
  const items = t('marquee.items', { returnObjects: true })

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const start = () => {
      tweenRef.current?.kill()
      gsap.set(track, { x: 0 })

      const distance = track.scrollWidth / 2
      if (!distance) return

      tweenRef.current = gsap.to(track, {
        x: -distance,
        duration: 28,
        ease: 'none',
        repeat: -1,
      })
    }

    start()
    window.addEventListener('resize', start)

    return () => {
      window.removeEventListener('resize', start)
      tweenRef.current?.kill()
    }
  }, [items])

  const doubled = [...items, ...items]

  return (
    <div
      className="overflow-hidden border-y py-4"
      style={{ borderColor: 'var(--line)', background: 'var(--bg)' }}
      onMouseEnter={() => tweenRef.current?.pause()}
      onMouseLeave={() => tweenRef.current?.resume()}
    >
      <div ref={trackRef} className="flex whitespace-nowrap gap-0" style={{ width: 'max-content' }}>
        {doubled.map((item, index) => (
          <span
            key={index}
            className="inline-flex items-center"
            style={{
              fontFamily: 'var(--font-hud)',
              fontSize: '11px',
              letterSpacing: '0.22em',
              color: 'var(--muted)',
            }}
          >
            <span className="px-8">{item}</span>
            <span style={{ color: 'var(--accent)', marginRight: '0px' }}>/</span>
          </span>
        ))}
      </div>
    </div>
  )
}
