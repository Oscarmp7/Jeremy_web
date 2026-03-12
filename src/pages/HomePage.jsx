import { useRef, useEffect } from 'react'
import { Link } from 'react-router'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Hero from '../components/Hero/Hero'
import Marquee from '../components/Marquee/Marquee'
import ProjectsPreview from '../components/ProjectsPreview/ProjectsPreview'
import Separator from '../components/Separator/Separator'

gsap.registerPlugin(ScrollTrigger)

export default function HomePage({ ready }) {
  const ctaRef = useRef(null)

  useEffect(() => {
    const el = ctaRef.current
    if (!el) return

    gsap.fromTo(el,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true,
        },
      }
    )

    return () => ScrollTrigger.getAll().forEach(t => {
      if (t.trigger === el) t.kill()
    })
  }, [])

  return (
    <div className="page--home">
      <Hero ready={ready} />
      <Marquee />
      <ProjectsPreview />
      <Separator />

      <section ref={ctaRef} className="home-cta">
        <h2 className="home-cta__title">COMIENZA TU HISTORIA</h2>
        <Link to="/contacto" className="button button--primary home-cta__button">
          Hablemos &rarr;
        </Link>
      </section>
    </div>
  )
}
