import { useState } from 'react'
import { Link } from 'react-router'
import { showcaseProjects, siteContent } from '../../data/siteContent'
import './ProjectShowcase.css'

export default function ProjectShowcase() {
  const [activeFilter, setActiveFilter] = useState('all')
  const { projectsPage } = siteContent

  const visibleProjects = showcaseProjects.filter(
    (project) => activeFilter === 'all' || project.disciplines.includes(activeFilter),
  )

  const projectCount = String(visibleProjects.length).padStart(2, '0')
  const disciplineLabels = Object.fromEntries(
    projectsPage.filters
      .filter((filter) => filter.id !== 'all')
      .map((filter) => [filter.id, filter.label]),
  )

  return (
    <section className="projects-showcase">
      <header className="projects-showcase__hero">
        <div className="projects-showcase__hero-copy">
          <p className="projects-showcase__eyebrow">{projectsPage.eyebrow}</p>
          <h1 className="projects-showcase__title">{projectsPage.title}</h1>
        </div>

        <div className="projects-showcase__hero-side">
          <p className="projects-showcase__intro">{projectsPage.intro}</p>
          <div className="projects-showcase__rail" aria-label="Resumen de proyectos">
            <span className="projects-showcase__rail-count">{projectCount}</span>
            <span className="projects-showcase__rail-copy">{projectsPage.rail}</span>
          </div>
        </div>
      </header>

      <div className="projects-showcase__filters" role="toolbar" aria-label="Filtrar proyectos">
        {projectsPage.filters.map((filter) => (
          <button
            key={filter.id}
            type="button"
            className={`projects-showcase__filter${
              filter.id === activeFilter ? ' projects-showcase__filter--active' : ''
            }`}
            onClick={() => setActiveFilter(filter.id)}
            aria-pressed={filter.id === activeFilter}
          >
            <span className="projects-showcase__filter-label">{filter.label}</span>
            <span className="projects-showcase__filter-description">
              {filter.description}
            </span>
          </button>
        ))}
      </div>

      <div className="projects-showcase__list">
        {visibleProjects.map((project, index) => (
          <article key={project.slug} className="projects-showcase__case">
            <div className="projects-showcase__case-media">
              <Link
                to={`/proyectos/${project.slug}`}
                className="projects-showcase__case-link projects-showcase__case-link--media"
                aria-label={`Abrir proyecto ${project.title}`}
              >
                <div className="projects-showcase__case-frame">
                  <img
                    src={project.poster}
                    alt={project.title}
                    className="projects-showcase__case-image"
                    loading={index === 0 ? 'eager' : 'lazy'}
                    fetchPriority={index === 0 ? 'high' : 'auto'}
                    decoding="async"
                  />
                </div>
              </Link>
            </div>

            <div className="projects-showcase__case-body">
              <div className="projects-showcase__case-topline">
                <span className="projects-showcase__case-index">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span>{project.client}</span>
                <span className="projects-showcase__case-dot" aria-hidden="true" />
                <span>{project.year}</span>
              </div>

              <p className="projects-showcase__case-category">{project.category}</p>

              <h2 className="projects-showcase__case-title">
                <Link
                  to={`/proyectos/${project.slug}`}
                  className="projects-showcase__case-link"
                >
                  {project.title}
                </Link>
              </h2>

              <p className="projects-showcase__case-objective">{project.objective}</p>
              <p className="projects-showcase__case-summary">{project.summary}</p>

              <div className="projects-showcase__case-meta">
                <span className="projects-showcase__case-meta-label">Entrega</span>
                <p className="projects-showcase__case-deliverable">{project.deliverable}</p>
              </div>

              <ul className="projects-showcase__case-chips" aria-label="Servicios aplicados">
                {project.disciplines.map((discipline) => (
                  <li key={discipline} className="projects-showcase__case-chip">
                    {disciplineLabels[discipline] ?? discipline}
                  </li>
                ))}
                {project.scope.map((item) => (
                  <li key={item} className="projects-showcase__case-chip">
                    {item}
                  </li>
                ))}
              </ul>

              <div className="projects-showcase__case-footer">
                <span className="projects-showcase__case-footer-copy">
                  Caso completo y proceso de ejecucion.
                </span>
                <Link
                  to={`/proyectos/${project.slug}`}
                  className="projects-showcase__case-link projects-showcase__case-link--cta"
                >
                  Abrir proyecto
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
