import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { siteContent } from '../../data/siteContent'
import './Loader.css'

export default function Loader({ onComplete }) {
  const loaderRef = useRef(null)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => setVisible(false),
    })

    tl.to({}, { duration: 0.24 })
      .call(() => onComplete?.())
      .to(loaderRef.current, {
        opacity: 0,
        duration: 1.05,
        ease: 'power2.out',
      })

    return () => tl.kill()
  }, [onComplete])

  if (!visible) return null

  return (
    <div ref={loaderRef} className="loader" aria-hidden="true">
      <div className="loader__content">
        <div className="loader__title-card">
          <p className="loader__meta">{siteContent.hero.eyebrow}</p>
          <h1 className="loader__wordmark">{siteContent.brand.name}</h1>
          <span className="loader__view">{siteContent.hero.primaryCta.label}</span>
        </div>
      </div>
    </div>
  )
}
