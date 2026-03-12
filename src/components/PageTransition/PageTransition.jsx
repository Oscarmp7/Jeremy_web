import { useRef, useLayoutEffect } from 'react'
import { useLocation } from 'react-router'
import gsap from 'gsap'
import './PageTransition.css'

export default function PageTransition({ children }) {
  const stageRef = useRef(null)
  const wipeRef = useRef(null)
  const sheenRef = useRef(null)
  const location = useLocation()
  const isFirstRender = useRef(true)

  useLayoutEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    const overlayRefs = [wipeRef.current, sheenRef.current].filter(Boolean)
    const tl = gsap.timeline()

    tl.set(overlayRefs, { xPercent: 0, display: 'block' })
      .set(stageRef.current, { x: 34, opacity: 0.72 })
      .call(() => window.scrollTo(0, 0))
      .to(stageRef.current, {
        x: 0,
        opacity: 1,
        duration: 0.58,
        ease: 'power3.out',
      }, 0.08)
      .to(wipeRef.current, {
        xPercent: -100,
        duration: 0.38,
        ease: 'power4.inOut',
      }, 0)
      .to(sheenRef.current, {
        xPercent: -120,
        duration: 0.46,
        ease: 'power4.inOut',
      }, 0.02)
      .set(overlayRefs, { display: 'none' })
  }, [location.pathname])

  return (
    <>
      <div ref={stageRef} className="page-stage" data-route={location.pathname}>
        {children}
      </div>
      <div ref={wipeRef} className="page-wipe" aria-hidden="true" />
      <div ref={sheenRef} className="page-sheen" aria-hidden="true" />
    </>
  )
}
