import { useRef, useCallback } from 'react'
import gsap from 'gsap'
import './ThemeTransition.css'

export default function useThemeTransition(onMidpoint) {
  const gradeRef = useRef(null)
  const glowRef = useRef(null)
  const animatingRef = useRef(false)

  const play = useCallback(() => {
    if (animatingRef.current) return
    animatingRef.current = true

    const sweepTargets = [gradeRef.current, glowRef.current].filter(Boolean)
    const tl = gsap.timeline({
      onComplete: () => {
        animatingRef.current = false
      },
    })

    tl.set(sweepTargets, { xPercent: 100, display: 'block' })
      .to(gradeRef.current, {
        xPercent: 0,
        duration: 0.28,
        ease: 'power4.inOut',
      })
      .to(glowRef.current, {
        xPercent: 0,
        duration: 0.34,
        ease: 'power4.inOut',
      }, 0)
      .call(() => onMidpoint?.())
      .to(gradeRef.current, {
        xPercent: -100,
        duration: 0.3,
        ease: 'power4.inOut',
      })
      .to(glowRef.current, {
        xPercent: -120,
        duration: 0.36,
        ease: 'power4.inOut',
      }, 0.06)
      .set(sweepTargets, { display: 'none' })
  }, [onMidpoint])

  const curtain = (
    <>
      <div ref={gradeRef} className="theme-grade" aria-hidden="true" />
      <div ref={glowRef} className="theme-grade__glow" aria-hidden="true" />
    </>
  )

  return { curtain, play }
}
