import { useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import './Hero.css'

gsap.registerPlugin(ScrollTrigger, SplitText)

const HERO_VIDEO_ID = 'aqz-KE-bpKQ'

const HUD_DATA = {
  tl: ['PROJECT: JA-2026', 'CLIENT: OPEN'],
  tr: ['ISO 800', '1/48 | 35MM T2.8', '23.976 FPS'],
  bl: ['4KDCI | RAW | 2.39:1'],
  br: ['AUDIO: STEREO 48KHZ'],
}

const SOCIAL_LINKS = [
  { id: 'ig', label: 'Instagram', href: '#' },
  { id: 'yt', label: 'YouTube', href: '#' },
  { id: 'vm', label: 'Vimeo', href: '#' },
  { id: 'wa', label: 'WhatsApp', href: '#' },
]

function SocialIcon({ id }) {
  if (id === 'ig') {
    return (
      <svg viewBox="0 0 24 24" className="hero__social-icon" aria-hidden="true">
        <rect x="4" y="4" width="16" height="16" rx="4.5" />
        <circle cx="12" cy="12" r="3.8" />
        <circle cx="17" cy="7.2" r="1.2" />
      </svg>
    )
  }

  if (id === 'yt') {
    return (
      <svg viewBox="0 0 24 24" className="hero__social-icon" aria-hidden="true">
        <rect x="3.5" y="6.5" width="17" height="11" rx="3.2" />
        <path d="M10 9.5L15 12L10 14.5Z" />
      </svg>
    )
  }

  if (id === 'vm') {
    return (
      <svg viewBox="0 0 24 24" className="hero__social-icon" aria-hidden="true">
        <path d="M4.8 9.4C6.6 7.2 8.4 7 9.4 9.1L11.1 13.5L13.3 9C14 7.5 15.3 6.7 16.8 6.7C17.5 6.7 18.1 6.8 18.8 7.1L14.4 17H11.8L8.4 9.8C8.1 9.1 7.5 9 6.9 9.5L5.7 10.5Z" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" className="hero__social-icon" aria-hidden="true">
      <path d="M12 3.8A8.2 8.2 0 0 0 5 16.4L3.9 20L7.6 19A8.2 8.2 0 1 0 12 3.8Z" />
      <path d="M9.3 8.7C9.5 8.2 9.6 8.1 9.9 8.1H10.5C10.8 8.1 10.9 8.2 11 8.4L11.8 10.2C11.9 10.4 11.9 10.6 11.8 10.8L11.2 11.6C11.1 11.8 11.1 11.9 11.2 12.1C11.6 12.8 12.2 13.4 12.9 13.8C13.1 13.9 13.2 13.9 13.4 13.8L14.2 13.2C14.4 13.1 14.6 13.1 14.8 13.2L16.6 14C16.8 14.1 16.9 14.2 16.9 14.5V15.1C16.9 15.4 16.8 15.6 16.4 15.7C15.2 16.1 13.8 15.6 12.7 14.7C11.2 13.6 9.9 11.8 9.3 10.2C9.1 9.6 9.1 9.2 9.3 8.7Z" />
    </svg>
  )
}

export default function Hero({ ready }) {
  const { t } = useTranslation()
  const sectionRef = useRef(null)
  const taglineRef = useRef(null)
  const barTopRef = useRef(null)
  const barBotRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    if (!ready) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 })

      tl.to(barTopRef.current, { scaleY: 0, duration: 1, ease: 'power3.inOut' }, 0)
        .to(barBotRef.current, { scaleY: 0, duration: 1, ease: 'power3.inOut' }, 0)

      const split = new SplitText(taglineRef.current, { type: 'lines' })
      tl.from(split.lines, {
        y: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: 'power3.out',
      }, 0.4)

      tl.from(sectionRef.current.querySelectorAll('.hero__sub, .hero__ctas, .hero__socials'), {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
      }, 0.8)

      gsap.to(sectionRef.current.querySelector('.hero__bg'), {
        yPercent: 14,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [ready])

  return (
    <section id="hero" ref={sectionRef} className="hero">
      <div ref={barTopRef} className="hero__bar hero__bar--top" />
      <div ref={barBotRef} className="hero__bar hero__bar--bottom" />

      <div className="hero__bg" aria-hidden="true">
        <div className="hero__video-shell">
          <iframe
            className="hero__video-iframe"
            src={`https://www.youtube.com/embed/${HERO_VIDEO_ID}?autoplay=1&mute=1&controls=0&loop=1&playlist=${HERO_VIDEO_ID}&modestbranding=1&rel=0&playsinline=1`}
            title="Hero reel preview"
            allow="autoplay; fullscreen; picture-in-picture"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
      </div>
      <div className="hero__bg-overlay" />

      <div className="hero__hud hero__hud--tl">
        {HUD_DATA.tl.map(line => <div key={line}>{line}</div>)}
      </div>
      <div className="hero__hud hero__hud--tr">
        {HUD_DATA.tr.map(line => <div key={line}>{line}</div>)}
      </div>
      <div className="hero__hud hero__hud--bl">
        {HUD_DATA.bl.map(line => <div key={line}>{line}</div>)}
      </div>
      <div className="hero__hud hero__hud--br">
        {HUD_DATA.br.map(line => <div key={line}>{line}</div>)}
      </div>

      <div className="hero__socials" aria-label="Social media links">
        {SOCIAL_LINKS.map(item => (
          <a
            key={item.id}
            href={item.href}
            aria-label={item.label}
            className="hero__social-link"
            data-cursor="expand"
          >
            <SocialIcon id={item.id} />
          </a>
        ))}
      </div>

      <div className="hero__content" ref={contentRef}>
        <h1 ref={taglineRef} className="hero__tagline">
          {t('hero.tagline')}
        </h1>
        <p className="hero__sub">{t('hero.sub')}</p>
        <div className="hero__ctas">
          <a href="#work" className="hero__btn hero__btn--primary" data-cursor="expand">
            {t('hero.cta_work')}
          </a>
          <a href="#contact" className="hero__btn hero__btn--ghost" data-cursor="expand">
            {t('hero.cta_contact')} {'->'}
          </a>
        </div>
      </div>
    </section>
  )
}
