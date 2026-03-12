import { useEffect, useRef } from 'react'
import { Link } from 'react-router'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { showcaseProjects, siteContent } from '../../data/siteContent'
import './HomeReel.css'

gsap.registerPlugin(ScrollTrigger)

const reelProjects = showcaseProjects.slice(0, 4)
const TITLE_FADE_OUT_START = 0.38
const TITLE_FADE_OUT_END = 0.58
const TITLE_FADE_IN_START = 0.48
const TITLE_FADE_IN_END = 0.74
const TITLE_MAX_BLUR = 6
const TITLE_MAX_SHIFT = 6

const titleFrames = [
  {
    title: 'MANZANA CUATRO',
    meta: siteContent.hero.eyebrow,
    href: siteContent.hero.primaryCta.href,
    action: siteContent.hero.primaryCta.label,
  },
  ...reelProjects.slice(1).map((project) => ({
    title: project.title,
    meta: `${project.year} · ${project.category}`,
    href: `/proyectos/${project.slug}`,
    action: 'Ver caso',
  })),
]

const clamp01 = (value) => Math.min(1, Math.max(0, value))
const normalizeRange = (value, start, end) => clamp01((value - start) / (end - start))

export default function HomeReel({ ready = true }) {
  const sectionRef = useRef(null)
  const frameRefs = useRef([])
  const titleRefs = useRef([])

  useEffect(() => {
    if (!ready) return undefined

    const section = sectionRef.current
    const frames = frameRefs.current.filter(Boolean)
    const titles = titleRefs.current.filter(Boolean)
    if (!section || !frames.length || !titles.length) return undefined

    const transitionCount = frames.length - 1
    const state = { progress: 0 }

    const applyStage = () => {
      const raw = state.progress * transitionCount
      const transitionIndex = state.progress >= 1
        ? transitionCount - 1
        : Math.min(transitionCount - 1, Math.max(0, Math.floor(raw)))
      const localProgress = state.progress >= 1 ? 1 : raw - transitionIndex
      const currentTitleIndex = Math.min(titleFrames.length - 1, transitionIndex)
      const nextTitleIndex = Math.min(titleFrames.length - 1, transitionIndex + 1)
      const fadeOutProgress = normalizeRange(
        localProgress,
        TITLE_FADE_OUT_START,
        TITLE_FADE_OUT_END,
      )
      const fadeInProgress = normalizeRange(
        localProgress,
        TITLE_FADE_IN_START,
        TITLE_FADE_IN_END,
      )

      section.style.setProperty('--band-y', `${100 - (localProgress * 100)}%`)

      frames.forEach((frame, index) => {
        let reveal = 0

        if (index === 0 || index <= transitionIndex) {
          reveal = 100
        } else if (index === transitionIndex + 1) {
          reveal = localProgress * 100
        }

        frame.style.setProperty('--reveal', `${reveal}%`)
      })

      titles.forEach((titleCard, index) => {
        let opacity = 0
        let blur = TITLE_MAX_BLUR
        let translateY = TITLE_MAX_SHIFT

        if (state.progress >= 1) {
          if (index === titleFrames.length - 1) {
            opacity = 1
            blur = 0
            translateY = 0
          }
        } else {
          if (index === currentTitleIndex) {
            opacity = 1 - fadeOutProgress
            blur = fadeOutProgress * TITLE_MAX_BLUR
            translateY = fadeOutProgress * -TITLE_MAX_SHIFT
          }

          if (index === nextTitleIndex) {
            opacity = fadeInProgress
            blur = (1 - fadeInProgress) * TITLE_MAX_BLUR
            translateY = (1 - fadeInProgress) * TITLE_MAX_SHIFT
          }

          if (localProgress <= TITLE_FADE_OUT_START && index === currentTitleIndex) {
            opacity = 1
            blur = 0
            translateY = 0
          }

          if (localProgress >= TITLE_FADE_OUT_END && index === currentTitleIndex) {
            opacity = 0
            blur = TITLE_MAX_BLUR
            translateY = -TITLE_MAX_SHIFT
          }

          if (localProgress <= TITLE_FADE_IN_START && index === nextTitleIndex) {
            opacity = 0
            blur = TITLE_MAX_BLUR
            translateY = TITLE_MAX_SHIFT
          }

          if (localProgress >= TITLE_FADE_IN_END && index === nextTitleIndex) {
            opacity = 1
            blur = 0
            translateY = 0
          }
        }

        titleCard.style.setProperty('--title-opacity', opacity.toFixed(3))
        titleCard.style.setProperty('--title-blur', `${blur.toFixed(2)}px`)
        titleCard.style.setProperty('--title-y', `${translateY.toFixed(2)}px`)
        titleCard.style.pointerEvents = opacity > 0.72 ? 'auto' : 'none'
        titleCard.setAttribute('aria-hidden', opacity > 0.12 ? 'false' : 'true')
      })
    }

    applyStage()

    const ctx = gsap.context(() => {
      gsap.to(state, {
        progress: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
        },
        onUpdate: applyStage,
      })
    }, section)

    return () => ctx.revert()
  }, [ready])

  return (
    <section
      className="home-reel"
      ref={sectionRef}
      style={{ '--reel-frames': reelProjects.length }}
    >
      <div className="home-reel__sticky">
        <div className="home-reel__viewport">
          {reelProjects.map((project, index) => (
            <article
              key={project.slug}
              className={`home-reel__frame${index === 0 ? ' home-reel__frame--opening' : ''}`}
              ref={(element) => {
                frameRefs.current[index] = element
              }}
            >
              <div className="home-reel__media">
                <img src={project.poster} alt={project.title} loading={index === 0 ? 'eager' : 'lazy'} />
              </div>
              <div className="home-reel__overlay" />
            </article>
          ))}

          <div className="home-reel__title-window">
            {titleFrames.map((item, index) => (
              <div
                className={`home-reel__title-card${index === 0 ? ' home-reel__title-card--brand' : ''}`}
                key={item.title}
                ref={(element) => {
                  titleRefs.current[index] = element
                }}
              >
                <p className="home-reel__meta">{item.meta}</p>
                <h1 className="home-reel__title">{item.title}</h1>
                <Link to={item.href} className="home-reel__view">
                  {item.action}
                </Link>
              </div>
            ))}
          </div>

          <div className="home-reel__band">
            <div className="home-reel__band-fill" />
          </div>

          <div className="home-reel__baseline">
            <span>{siteContent.brand.location}</span>
            <span>{siteContent.brand.instagramLabel}</span>
            <span>{siteContent.hero.availability}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
