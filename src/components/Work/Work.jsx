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
    : projects.filter(p => p.type === activeFilter)

  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return

    const ctx = gsap.context(() => {
      // Title reveal
      const title = section.querySelector('.work__title')
      const split = new SplitText(title, { type: 'lines' })
      gsap.from(split.lines, {
        y: 60, opacity: 0, duration: 0.8, stagger: 0.06, ease: 'power3.out',
        scrollTrigger: { trigger: title, start: 'top 85%' },
      })

      // Horizontal scroll
      const totalWidth = track.scrollWidth - track.parentElement.offsetWidth

      gsap.to(track, {
        x: -totalWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${totalWidth * 1.2}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      })
    }, section)

    return () => ctx.revert()
  }, [filtered])

  return (
    <section id="work" ref={sectionRef} className="work">
      <div className="work__header">
        <h2 className="work__title">{t('work.title')}</h2>
        <div className="work__filters" role="group" aria-label="Filter projects">
          {FILTERS.map(f => (
            <button
              key={f}
              className={`work__filter ${activeFilter === f ? 'work__filter--active' : ''}`}
              onClick={() => setActiveFilter(f)}
              data-cursor="expand"
            >
              {t(`work.filters.${f}`)}
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
