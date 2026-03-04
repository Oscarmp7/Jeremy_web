import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

export default function ProjectModal({ project, onClose }) {
  const { t } = useTranslation()

  // Close on Escape
  useEffect(() => {
    const handler = e => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div className="project-modal" role="dialog" aria-modal="true" aria-label={project.title}>
      <div className="project-modal__backdrop" onClick={onClose} />
      <div className="project-modal__content">
        <button className="project-modal__close" onClick={onClose}>
          {t('work.close')} ✕
        </button>

        <div className="project-modal__video">
          {project.vimeoId !== '0' ? (
            <iframe
              src={`https://player.vimeo.com/video/${project.vimeoId}?autoplay=1&color=FF4D00&title=0&byline=0&portrait=0`}
              width="100%"
              height="100%"
              allow="autoplay; fullscreen"
              style={{ border: 'none', position: 'absolute', inset: 0, width: '100%', height: '100%' }}
              title={project.title}
            />
          ) : (
            <span>▶ VIMEO EMBED — ID: {project.vimeoId}</span>
          )}
        </div>

        <div className="project-modal__info"
          style={{ borderTop: '1px solid var(--line)', marginTop: '0' }}
        >
          <div>
            <p style={{ fontFamily: 'var(--font-hud)', fontSize: '10px', letterSpacing: '0.15em', color: 'var(--muted)', marginBottom: '4px' }}>
              {t('work.client')}
            </p>
            <p style={{ color: 'var(--text)', fontFamily: 'var(--font-body)' }}>{project.client}</p>
          </div>
          <div>
            <p style={{ fontFamily: 'var(--font-hud)', fontSize: '10px', letterSpacing: '0.15em', color: 'var(--muted)', marginBottom: '4px' }}>
              {t('work.type')}
            </p>
            <p style={{ color: 'var(--text)', fontFamily: 'var(--font-body)', textTransform: 'capitalize' }}>{project.type.replace('_', ' ')}</p>
          </div>
          <div>
            <p style={{ fontFamily: 'var(--font-hud)', fontSize: '10px', letterSpacing: '0.15em', color: 'var(--muted)', marginBottom: '4px' }}>
              {t('work.duration')}
            </p>
            <p style={{ color: 'var(--text)', fontFamily: 'var(--font-body)' }}>{project.duration}</p>
          </div>
          <div>
            <p style={{ fontFamily: 'var(--font-hud)', fontSize: '10px', letterSpacing: '0.15em', color: 'var(--muted)', marginBottom: '4px' }}>
              SPECS
            </p>
            <p style={{ color: 'var(--text)', fontFamily: 'var(--font-hud)', fontSize: '12px' }}>{project.tags.join(' · ')}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
