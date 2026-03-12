import { useRef, useEffect } from 'react'
import { Link } from 'react-router'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { showcaseProjects } from '../../data/siteContent'
import './ProjectsPreview.css'

gsap.registerPlugin(ScrollTrigger)

const featured = showcaseProjects.slice(0, 3)

export default function ProjectsPreview() {
  const gridRef = useRef(null)

  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll('.projects-preview__card')
    if (!cards?.length) return

    const ctx = gsap.context(() => {
      gsap.from(cards, {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 85%',
        },
      })
    }, gridRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="projects-preview">
      <div className="projects-preview__grid" ref={gridRef}>
        {featured.map((p) => (
          <Link
            key={p.slug}
            to={`/proyectos/${p.slug}`}
            className="projects-preview__card"
          >
            <img src={p.poster} alt={p.title} loading="lazy" />
            <div className="projects-preview__overlay">
              <h3 className="projects-preview__title">{p.title}</h3>
              <p className="projects-preview__meta">
                {p.category} · {p.year}
              </p>
            </div>
          </Link>
        ))}
      </div>
      <Link to="/proyectos" className="projects-preview__more">
        Ver todos los proyectos &rarr;
      </Link>
    </section>
  )
}
