import { useState } from 'react'
import { Link } from 'react-router'
import { showcaseProjects } from '../../data/siteContent'
import './ProjectShowcase.css'

export default function ProjectShowcase() {
  const [activeIndex, setActiveIndex] = useState(0)
  const total = showcaseProjects.length

  const prev = () => setActiveIndex((i) => (i - 1 + total) % total)
  const next = () => setActiveIndex((i) => (i + 1) % total)

  return (
    <section className="showcase">
      <h1 className="showcase__heading">PROYECTOS</h1>

      <div className="showcase__grid">
        {/* Visual Panel */}
        <div>
          <div className="showcase__card">
            {showcaseProjects.map((p, i) => (
              <img
                key={p.slug}
                src={p.poster}
                alt={p.title}
                className={`showcase__card-img${
                  i !== activeIndex ? ' showcase__card-img--hidden' : ''
                }`}
              />
            ))}
          </div>

          <div className="showcase__nav">
            <button
              className="showcase__arrow"
              onClick={prev}
              aria-label="Proyecto anterior"
            >
              &larr;
            </button>
            <button
              className="showcase__arrow"
              onClick={next}
              aria-label="Proyecto siguiente"
            >
              &rarr;
            </button>
          </div>
        </div>

        {/* Typographic List */}
        <div className="showcase__list">
          {showcaseProjects.map((p, i) => (
            <div
              key={p.slug}
              className={`showcase__item${
                i === activeIndex ? ' showcase__item--active' : ''
              }`}
              onClick={() => setActiveIndex(i)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  setActiveIndex(i)
                }
              }}
            >
              <div className="showcase__item-title">{p.title}</div>
              <div className="showcase__item-meta">
                {p.year} &middot; {p.category}
              </div>
              {i === activeIndex && (
                <Link
                  to={`/proyectos/${p.slug}`}
                  className="showcase__item-link"
                  onClick={(e) => e.stopPropagation()}
                >
                  Ver caso &rarr;
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
