import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Separator() {
  const ref = useRef(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return undefined

    gsap.fromTo(element,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 90%',
          once: true,
        },
      }
    )
    return () => ScrollTrigger.getAll().forEach(t => {
      if (t.trigger === element) t.kill()
    })
  }, [])

  return (
    <div
      ref={ref}
      style={{
        height: '1px',
        background: 'var(--separator)',
        transformOrigin: 'center',
        width: '100%',
        maxWidth: 'var(--layout-max)',
        margin: '0 auto',
      }}
      aria-hidden="true"
    />
  )
}
