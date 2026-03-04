import { useTranslation } from 'react-i18next'

export default function ProjectCard({ project, onClick }) {
  const { t } = useTranslation()

  return (
    <article
      className="project-card"
      onClick={onClick}
      data-cursor="expand"
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onClick()}
      aria-label={`View project: ${project.title}`}
    >
      <span className="project-card__scene">
        {t('work.scene')} {project.scene}
      </span>

      <img
        src={project.poster}
        alt={project.title}
        className="project-card__img"
        loading="lazy"
        width="520"
        height="640"
      />

      <div className="project-card__overlay" />

      <div className="project-card__meta">
        <h3 className="project-card__title">{project.title}</h3>
        <div className="project-card__hud">
          <span>{project.client}</span>
          <span>·</span>
          <span>{project.duration}</span>
          <span>·</span>
          <span>{project.tags[0]}</span>
        </div>
      </div>
    </article>
  )
}
