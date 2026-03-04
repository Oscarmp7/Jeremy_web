import { useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import './Hero.css'

gsap.registerPlugin(ScrollTrigger, SplitText)

const HUD_DATA = {
  tl: ['PROJECT: JA-2026', 'CLIENT: OPEN'],
  tr: ['ISO 800', '1/48 · 35MM T2.8', '23.976 FPS'],
  bl: ['4KDCI · RAW · 2.39:1'],
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

      // Letterbox open
      tl.to(barTopRef.current, { scaleY: 0, duration: 1, ease: 'power3.inOut' }, 0)
        .to(barBotRef.current, { scaleY: 0, duration: 1, ease: 'power3.inOut' }, 0)

      // Tagline split reveal
      const split = new SplitText(taglineRef.current, { type: 'lines' })
      tl.from(split.lines, {
        y: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: 'power3.out',
      }, 0.4)

      // Sub + CTAs
      tl.from(contentRef.current.querySelectorAll('.hero__sub, .hero__ctas'), {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
      }, 0.8)

      // Parallax on scroll
      gsap.to(sectionRef.current.querySelector('.hero__bg'), {
        yPercent: 20,
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
      {/* Letterbox bars */}
      <div ref={barTopRef} className="hero__bar hero__bar--top" />
      <div ref={barBotRef} className="hero__bar hero__bar--bottom" />

      {/* Background */}
      <div className="hero__bg">
        <div className="hero__bg-placeholder">
          ▶ SHOWREEL PLACEHOLDER — VIMEO EMBED GOES HERE
        </div>
      </div>
      <div className="hero__bg-overlay" />

      {/* HUD overlays */}
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

      {/* Content */}
      <div className="hero__content" ref={contentRef}>
        <h1 ref={taglineRef} className="hero__tagline">
          {t('hero.tagline')}
        </h1>
        <p className="hero__sub">{t('hero.sub')}</p>
        <div className="hero__ctas">
          <a href="#work" className="hero__btn hero__btn--primary" data-cursor="expand">
            ▶ {t('hero.cta_reel')}
          </a>
          <a href="#work" className="hero__btn hero__btn--ghost" data-cursor="expand">
            {t('hero.cta_work')} →
          </a>
        </div>
      </div>
    </section>
  )
}
