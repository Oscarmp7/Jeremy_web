import { useRef, useCallback } from 'react'
import gsap from 'gsap'
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion'
import './ThemeTransition.css'

export default function useThemeTransition(onMidpoint) {
  const veilRef = useRef(null)
  const orbRef = useRef(null)
  const animatingRef = useRef(false)
  const reducedMotion = usePrefersReducedMotion()

  const play = useCallback(() => {
    if (animatingRef.current) return

    if (reducedMotion) {
      onMidpoint?.()
      return
    }

    animatingRef.current = true

    const transitionTargets = [veilRef.current, orbRef.current].filter(Boolean)
    const tl = gsap.timeline({
      onComplete: () => {
        animatingRef.current = false
      },
    })

    tl.set(transitionTargets, { display: 'block' })
      .set(veilRef.current, {
        opacity: 0,
        '--theme-blur': '0px',
      })
      .set(orbRef.current, {
        opacity: 0,
        scale: 0.08,
        transformOrigin: '50% 50%',
      })
      .to(veilRef.current, {
        opacity: 1,
        '--theme-blur': '16px',
        duration: 0.22,
        ease: 'power2.out',
      }, 0)
      .to(orbRef.current, {
        opacity: 1,
        scale: 0.2,
        duration: 0.22,
        ease: 'power2.out',
      })
      .to(orbRef.current, {
        scale: 1,
        duration: 0.52,
        ease: 'power4.inOut',
      }, 0.08)
      .call(() => onMidpoint?.(), null, 0.3)
      .to(veilRef.current, {
        opacity: 0,
        '--theme-blur': '0px',
        duration: 0.46,
        ease: 'power2.inOut',
      }, 0.34)
      .to(orbRef.current, {
        opacity: 0,
        scale: 1.08,
        duration: 0.44,
        ease: 'power3.out',
      }, 0.34)
      .set(transitionTargets, { display: 'none' })
  }, [onMidpoint, reducedMotion])

  const curtain = (
    <>
      <div ref={veilRef} className="theme-veil" aria-hidden="true" />
      <div ref={orbRef} className="theme-orb" aria-hidden="true" />
    </>
  )

  return { curtain, play }
}
