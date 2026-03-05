import { useRef, useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import './About.css'

gsap.registerPlugin(ScrollTrigger, SplitText)

// Placeholder BTS image
const BTS_IMG = 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=900&q=80'

function animateCount(el, target, duration = 1.5) {
  const isPlus = target.endsWith('+')
  const num = parseInt(target)
  gsap.fromTo(
    { val: 0 },
    { val: num, duration, ease: 'power2.out',
      onUpdate: function () {
        el.textContent = Math.round(this.targets()[0].val) + (isPlus ? '+' : '')
      }
    }
  )
}

export default function About() {
  const { t } = useTranslation()
  const sectionRef = useRef(null)
  const statsRef = useRef([])

  const stats = useMemo(
    () => [
      t('about.stats.years', { returnObjects: true }),
      t('about.stats.projects', { returnObjects: true }),
      t('about.stats.countries', { returnObjects: true }),
    ],
    [t],
  )

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      // Statement split
      const statement = section.querySelector('.about__statement')
      const split = new SplitText(statement, { type: 'lines' })
      gsap.from(split.lines, {
        y: 60, opacity: 0, duration: 0.8, stagger: 0.07, ease: 'power3.out',
        scrollTrigger: { trigger: statement, start: 'top 85%' },
      })

      // Image clip-path wipe
      const imgWrap = section.querySelector('.about__img-clip')
      gsap.from(imgWrap, {
        clipPath: 'inset(0 100% 0 0)',
        duration: 1.2, ease: 'power3.inOut',
        scrollTrigger: { trigger: imgWrap, start: 'top 80%' },
      })

      // Bio fade
      gsap.from(section.querySelector('.about__bio'), {
        y: 30, opacity: 0, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: section.querySelector('.about__bio'), start: 'top 85%' },
      })

      // Stats count up
      statsRef.current.forEach((el, i) => {
        if (!el) return
        ScrollTrigger.create({
          trigger: el,
          start: 'top 85%',
          once: true,
          onEnter: () => animateCount(el, stats[i].value),
        })
      })
    }, section)

    return () => ctx.revert()
  }, [stats])

  return (
    <section id="about" ref={sectionRef} className="about" style={{ background: 'var(--surface)' }}>
      <div className="about__inner">
        <div className="about__text">
          <span className="about__label">{t('about.title')}</span>
          <h2 className="about__statement">{t('about.statement')}</h2>
          <p className="about__bio">{t('about.bio')}</p>

          <div className="about__stats">
            {stats.map((stat, i) => (
              <div key={i}>
                <span
                  ref={el => (statsRef.current[i] = el)}
                  className="about__stat-value"
                >
                  0
                </span>
                <span className="about__stat-label">{stat.label}</span>
              </div>
            ))}
          </div>

          <p className="about__coordinates">{t('about.coordinates')}</p>
        </div>

        <div className="about__media">
          <div className="about__img-clip">
            <img
              src={BTS_IMG}
              alt="Jeremy Adonai on set — behind the scenes"
              className="about__img"
              loading="lazy"
              width="900"
              height="1125"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
