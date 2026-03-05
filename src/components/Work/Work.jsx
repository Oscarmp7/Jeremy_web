import { useRef, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { projects } from '../../data/projects'
import ProjectCard from './ProjectCard'
import ProjectModal from './ProjectModal'
import './Work.css'

gsap.registerPlugin(ScrollTrigger, SplitText)

const FILTERS = ['all', 'commercial', 'film', 'music_video', 'brand']

export default function Work() {
  const { t } = useTranslation()
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const [activeFilter, setActiveFilter] = useState('all')
  const [selectedProject, setSelectedProject] = useState(null)

  const filtered = activeFilter === 'all'
    ? projects
    : projects.filter(project => project.type === activeFilter)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      const title = section.querySelector('.work__title')
      const split = new SplitText(title, { type: 'lines' })

      gsap.from(split.lines, {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.06,
        ease: 'power3.out',
        scrollTrigger: { trigger: title, start: 'top 85%' },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()

      mm.add('(min-width: 1024px)', () => {
        const getShift = () => Math.max(0, track.scrollWidth - track.parentElement.clientWidth)

        const tween = gsap.to(track, {
          x: () => -getShift(),
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top+=92',
            end: () => `+=${Math.max(getShift() * 1.25, 1)}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })

        const refresh = () => ScrollTrigger.refresh()
        const images = track.querySelectorAll('img')

        images.forEach(img => {
          if (!img.complete) {
            img.addEventListener('load', refresh, { once: true })
          }
        })

        window.addEventListener('resize', refresh)
        requestAnimationFrame(refresh)

        return () => {
          images.forEach(img => img.removeEventListener('load', refresh))
          window.removeEventListener('resize', refresh)
          tween.scrollTrigger?.kill()
          tween.kill()
          gsap.set(track, { clearProps: 'transform' })
        }
      })

      mm.add('(max-width: 1023px)', () => {
        gsap.set(track, { clearProps: 'transform' })
        ScrollTrigger.refresh()
      })

      return () => mm.revert()
    }, section)

    return () => ctx.revert()
  }, [filtered.length])

  return (
    <section id="work" ref={sectionRef} className="work">
      <div className="work__header">
        <h2 className="work__title">{t('work.title')}</h2>
        <div className="work__filters" role="group" aria-label="Filter projects">
          {FILTERS.map(filter => (
            <button
              key={filter}
              type="button"
              className={`work__filter ${activeFilter === filter ? 'work__filter--active' : ''}`}
              onClick={() => setActiveFilter(filter)}
              data-cursor="expand"
              aria-pressed={activeFilter === filter}
            >
              {t(`work.filters.${filter}`)}
            </button>
          ))}
        </div>
      </div>

      <div className="work__scroll-wrap">
        <div ref={trackRef} className="work__track">
          {filtered.map(project => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </div>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  )
}
