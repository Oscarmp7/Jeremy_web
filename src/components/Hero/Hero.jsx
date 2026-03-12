import { useEffect, useRef } from 'react'
import { Link } from 'react-router'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { showcaseProjects, siteContent } from '../../data/siteContent'
import './Hero.css'

gsap.registerPlugin(ScrollTrigger)

export default function Hero({ ready = true }) {
  const sectionRef = useRef(null)
  const bgRef = useRef(null)

  useEffect(() => {
    if (!ready) return

    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      // Title mask reveal — each line slides up from hidden
      gsap.fromTo(
        section.querySelectorAll('.hero__title-line span'),
        { yPercent: 100 },
        {
          yPercent: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power3.out',
        }
      )

      // Subtitle fade in after title
      gsap.fromTo(
        section.querySelector('.hero__subtitle'),
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', delay: 0.3 }
      )

      // Bottom bar fade in
      gsap.fromTo(
        section.querySelector('.hero__bottom'),
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: 'power3.out', delay: 0.5 }
      )

      // Parallax on background image
      gsap.fromTo(
        bgRef.current,
        { yPercent: 0 },
        {
          yPercent: 15,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        }
      )
    }, section)

    return () => ctx.revert()
  }, [ready])

  // Split the title into lines at natural break points
  const titleLines = siteContent.hero.title.replace(/\.$/, '').split(' ')
  // Group into two lines: "IMPACTO VISUAL CON" and "VISIÓN DE MARCA"
  const line1 = titleLines.slice(0, 3).join(' ')
  const line2 = titleLines.slice(3).join(' ')

  return (
    <section id="hero" ref={sectionRef} className="hero">
      <div className="hero__bg" ref={bgRef} aria-hidden="true">
        <img
          src={showcaseProjects[0].poster}
          alt=""
          loading="eager"
        />
      </div>
      <div className="hero__overlay" aria-hidden="true" />

      <div className="hero__content">
        <h1 className="hero__title">
          <span className="hero__title-line"><span>{line1}</span></span>
          <span className="hero__title-line"><span>{line2}</span></span>
        </h1>

        <p className="hero__subtitle">
          Estudio de producción audiovisual — Santo Domingo, RD
        </p>

        <div className="hero__bottom">
          <div className="hero__ctas">
            <Link to="/proyectos" className="button button--primary">
              Ver proyectos
            </Link>
            <Link to="/contacto" className="button button--ghost">
              Empezar proyecto →
            </Link>
          </div>
          <span className="hero__copy">© Manzana Cuatro 2026</span>
        </div>
      </div>
    </section>
  )
}
