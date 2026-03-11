import { useRef, useCallback } from 'react'
import gsap from 'gsap'
import './ThemeTransition.css'

export default function useThemeTransition(onMidpoint) {
  const curtainRef = useRef(null)
  const animatingRef = useRef(false)

  const play = useCallback(() => {
    if (animatingRef.current) return
    animatingRef.current = true

    const tl = gsap.timeline({
      onComplete: () => { animatingRef.current = false },
    })

    tl.set(curtainRef.current, { yPercent: 100, display: 'block' })
      .to(curtainRef.current, {
        yPercent: 0,
        duration: 0.25,
        ease: 'power4.inOut',
      })
      .call(() => onMidpoint?.())
      .to(curtainRef.current, {
        yPercent: -100,
        duration: 0.25,
        ease: 'power4.inOut',
      })
      .set(curtainRef.current, { display: 'none' })
  }, [onMidpoint])

  const curtain = (
    <div ref={curtainRef} className="theme-curtain" aria-hidden="true" />
  )

  return { curtain, play }
}
