import { useRef, useLayoutEffect } from 'react'
import { useLocation } from 'react-router'
import gsap from 'gsap'
import './PageTransition.css'

export default function PageTransition({ children }) {
  const curtainRef = useRef(null)
  const location = useLocation()
  const isFirstRender = useRef(true)

  useLayoutEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    const tl = gsap.timeline()

    tl.set(curtainRef.current, { yPercent: 100, display: 'block' })
      .to(curtainRef.current, {
        yPercent: 0,
        duration: 0.25,
        ease: 'power4.inOut',
      })
      .call(() => window.scrollTo(0, 0))
      .to(curtainRef.current, {
        yPercent: -100,
        duration: 0.25,
        ease: 'power4.inOut',
      })
      .set(curtainRef.current, { display: 'none' })
  }, [location.pathname])

  return (
    <>
      <div>{children}</div>
      <div ref={curtainRef} className="page-curtain" aria-hidden="true" />
    </>
  )
}
