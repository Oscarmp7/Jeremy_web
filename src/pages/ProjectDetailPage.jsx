import { useRef, useEffect } from 'react'
import { useParams, Link } from 'react-router'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { showcaseProjects, siteContent } from '../data/siteContent'
import './ProjectDetailPage.css'

gsap.registerPlugin(ScrollTrigger)

export default function ProjectDetailPage() {
  const { slug } = useParams()

  const heroImgRef = useRef(null)
  const titleRef = useRef(null)
  const metaRef = useRef(null)
  const scopeRef = useRef(null)
  const processRef = useRef(null)

  const projectIndex = showcaseProjects.findIndex((p) => p.slug === slug)
  const project = showcaseProjects[projectIndex]

  useEffect(() => {
    if (!project) return

    const ctx = gsap.context(() => {
      // Hero parallax
      if (heroImgRef.current) {
        gsap.fromTo(
          heroImgRef.current,
          { yPercent: -5 },
          {
            yPercent: 5,
            ease: 'none',
            scrollTrigger: {
              trigger: heroImgRef.current.parentElement,
              start: 'top top',
              end: 'bottom top',
              scrub: true,
            },
          }
        )
      }

      // Title mask reveal
      if (titleRef.current) {
        gsap.from(titleRef.current.querySelector('.project-detail__title-inner'), {
          yPercent: 100,
          duration: 0.8,
          ease: 'power3.out',
          delay: 0.2,
        })
      }

      // Meta fade-in
      if (metaRef.current) {
        gsap.from(metaRef.current, {
          opacity: 0,
          y: 10,
          duration: 0.6,
          ease: 'power2.out',
          delay: 0.5,
        })
      }

      // Scope tags stagger
      if (scopeRef.current) {
        gsap.from(scopeRef.current.querySelectorAll('.project-detail__scope-tag'), {
          opacity: 0,
          y: 15,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: scopeRef.current,
            start: 'top 85%',
          },
        })
      }

      // Process steps stagger
      if (processRef.current) {
        gsap.from(processRef.current.querySelectorAll('.project-detail__process-step'), {
          opacity: 0,
          y: 15,
          duration: 0.5,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: processRef.current,
            start: 'top 85%',
          },
        })
      }
    })

    return () => ctx.revert()
  }, [project])

  // Scroll to top on slug change
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  if (!project) {
    return (
      <div className="page project-detail__not-found">
        <h2>Proyecto no encontrado</h2>
        <Link to="/proyectos">← Volver a proyectos</Link>
      </div>
    )
  }

  const total = showcaseProjects.length
  const prevProject = showcaseProjects[(projectIndex - 1 + total) % total]
  const nextProject = showcaseProjects[(projectIndex + 1) % total]

  return (
    <div className="page page--project-detail">
      {/* Hero */}
      <section className="project-detail__hero">
        <img
          ref={heroImgRef}
          className="project-detail__hero-img"
          src={project.poster}
          alt={project.title}
        />
        <div className="project-detail__hero-overlay" />
      </section>

      {/* Body */}
      <div className="project-detail__body">
        {/* Header */}
        <h1 className="project-detail__title" ref={titleRef}>
          <span className="project-detail__title-inner">{project.title}</span>
        </h1>

        <div className="project-detail__meta" ref={metaRef}>
          <span>{project.client}</span>
          <span className="project-detail__meta-sep">&middot;</span>
          <span>{project.year}</span>
          <span className="project-detail__meta-sep">&middot;</span>
          <span>{project.category}</span>
        </div>

        {/* Separator */}
        <div className="project-detail__separator" />

        {/* Scope */}
        <div ref={scopeRef}>
          <p className="project-detail__section-label">Alcance</p>
          <div className="project-detail__scope-list">
            {project.scope.map((tag) => (
              <span key={tag} className="project-detail__scope-tag">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Process */}
        <div className="project-detail__process" ref={processRef}>
          <p className="project-detail__section-label">Proceso</p>
          <ol className="project-detail__process-list">
            {project.details.map((step, i) => (
              <li key={i} className="project-detail__process-step">
                <span className="project-detail__process-num">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Separator */}
        <div className="project-detail__separator" />

        {/* CTA */}
        <div className="project-detail__cta">
          <p className="project-detail__cta-title">Solicita una cotización</p>
          <a
            className="project-detail__cta-btn"
            href={siteContent.brand.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
          >
            Escríbenos por WhatsApp
          </a>
        </div>

        {/* Project navigation */}
        <nav className="project-detail__nav">
          <Link
            className="project-detail__nav-link project-detail__nav-link--prev"
            to={`/proyectos/${prevProject.slug}`}
          >
            ← {prevProject.title}
          </Link>
          <Link
            className="project-detail__nav-link project-detail__nav-link--next"
            to={`/proyectos/${nextProject.slug}`}
          >
            {nextProject.title} →
          </Link>
        </nav>
      </div>
    </div>
  )
}
