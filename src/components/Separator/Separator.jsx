import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Separator() {
  const ref = useRef(null)

  useEffect(() => {
    gsap.fromTo(ref.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 90%',
          once: true,
        },
      }
    )
    return () => ScrollTrigger.getAll().forEach(t => {
      if (t.trigger === ref.current) t.kill()
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
