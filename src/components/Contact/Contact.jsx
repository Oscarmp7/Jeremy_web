import { useRef, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import './Contact.css'

gsap.registerPlugin(ScrollTrigger, SplitText)

export default function Contact() {
  const { t } = useTranslation()
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const [status, setStatus] = useState('idle') // idle | sending | success

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const ctx = gsap.context(() => {
      const split = new SplitText(titleRef.current, { type: 'lines' })
      gsap.from(split.lines, {
        y: 80, opacity: 0, duration: 0.9, stagger: 0.06, ease: 'power3.out',
        scrollTrigger: { trigger: titleRef.current, start: 'top 85%' },
      })
    }, section)
    return () => ctx.revert()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    // Simulate send (replace with real endpoint later)
    await new Promise(r => setTimeout(r, 1200))
    setStatus('success')
  }

  return (
    <section id="contact" ref={sectionRef} className="contact">
      <div className="contact__inner">
        <h2 ref={titleRef} className="contact__title">{t('contact.title')}</h2>
        <p className="contact__sub">{t('contact.sub')}</p>

        {status === 'success' ? (
          <p className="contact__success">{t('contact.success')}</p>
        ) : (
          <form className="contact__form" onSubmit={handleSubmit} noValidate>
            <div className="contact__field">
              <label className="contact__label" htmlFor="name">{t('contact.name')}</label>
              <input id="name" type="text" className="contact__input" placeholder={t('contact.name')} required />
            </div>
            <div className="contact__field">
              <label className="contact__label" htmlFor="email">{t('contact.email')}</label>
              <input id="email" type="email" className="contact__input" placeholder={t('contact.email')} required />
            </div>
            <div className="contact__field contact__span-2">
              <label className="contact__label" htmlFor="project">{t('contact.project')}</label>
              <textarea id="project" rows={5} className="contact__textarea" placeholder={t('contact.project')} />
            </div>
            <button
              type="submit"
              className="contact__submit"
              disabled={status === 'sending'}
              data-cursor="expand"
            >
              {status === 'sending' ? t('contact.sending') : t('contact.send')}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
