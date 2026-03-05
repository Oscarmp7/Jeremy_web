import { useRef, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Services.css'

gsap.registerPlugin(ScrollTrigger)

export default function Services() {
  const { t } = useTranslation()
  const sectionRef = useRef(null)
  const [expanded, setExpanded] = useState(null)
  const items = t('services.items', { returnObjects: true })

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      const lines = section.querySelectorAll('.service-line')
      gsap.from(lines, {
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: { trigger: section, start: 'top 80%' },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section id="services" ref={sectionRef} className="services">
      <div className="services__inner">
        <h2 className="services__title">{t('services.title')}</h2>
        {items.map((item, index) => {
          const isExpanded = expanded === index
          return (
            <button
              key={index}
              type="button"
              className="service-line"
              data-cursor="expand"
              onMouseEnter={() => setExpanded(index)}
              onMouseLeave={() => setExpanded(null)}
              onClick={() => setExpanded(prev => (prev === index ? null : index))}
              aria-expanded={isExpanded}
            >
              <span className="service-line__num">{item.number} -</span>
              <div>
                <div className="service-line__title">{item.title}</div>
                <div
                  className="service-line__desc"
                  style={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
                >
                  {item.desc}
                </div>
              </div>
              <span className="service-line__arrow">?</span>
            </button>
          )
        })}
      </div>
    </section>
  )
}
