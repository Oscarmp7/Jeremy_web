import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import './Loader.css'

export default function Loader({ onComplete }) {
  const loaderRef = useRef(null)
  const logoRef = useRef(null)
  const nameRef = useRef(null)
  const lineRef = useRef(null)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        onComplete?.()
        setVisible(false)
      },
    })

    tl.from(logoRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.4,
      ease: 'power3.out',
    })
    .from(nameRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.4,
      ease: 'power3.out',
    }, '-=0.15')
    .fromTo(lineRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 0.5, ease: 'power3.inOut' }
    )
    .to(loaderRef.current, {
      yPercent: -100,
      duration: 0.4,
      ease: 'power4.inOut',
      delay: 0.3,
    })

    return () => tl.kill()
  }, [onComplete])

  if (!visible) return null

  return (
    <div ref={loaderRef} className="loader">
      <div className="loader__content">
        <div ref={logoRef} className="loader__logo">M4</div>
        <div className="loader__name-wrap">
          <div ref={nameRef} className="loader__name">MANZANA CUATRO</div>
        </div>
        <div ref={lineRef} className="loader__line" />
      </div>
    </div>
  )
}
