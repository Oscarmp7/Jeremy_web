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

export default function Hero() {
  const { t } = useTranslation()
  const sectionRef = useRef(null)
  const taglineRef = useRef(null)
  const barTopRef = useRef(null)
  const barBotRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
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

      tl.from(contentRef.current.querySelectorAll('.hero__sub, .hero__ctas'), {
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
  }, [])

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
