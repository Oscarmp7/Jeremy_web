import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { showcaseProjects, siteContent } from '../../data/siteContent'
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion'
import ComparisonSlider from '../ComparisonSlider/ComparisonSlider'
import './HomeReel.css'

gsap.registerPlugin(ScrollTrigger)

const reelProjects = showcaseProjects.slice(0, 4)
const colorizationStory = siteContent.colorization
const colorizationReels = colorizationStory.reels
const REEL_TRANSITION_COUNT = reelProjects.length - 1
const REEL_SETTLE_HOLD = 0.58

const TITLE_FADE_OUT_START = 0.38
const TITLE_FADE_OUT_END = 0.58
const TITLE_FADE_IN_START = 0.48
const TITLE_FADE_IN_END = 0.74
const TITLE_MAX_BLUR = 6
const TITLE_MAX_SHIFT = 6

const COLOR_STAGE_FADE_IN_START = 0.04
const COLOR_STAGE_FADE_IN_END = 0.26
const COLOR_WASH_START = 0.06
const COLOR_WASH_END = 0.34
const LEGACY_UI_FADE_OUT_START = 0.04
const LEGACY_UI_FADE_OUT_END = 0.18
const COLOR_TONE_SWITCH_START = 0.14
const COLOR_TITLE_DROP_START = 0.08
const COLOR_TITLE_DROP_END = 0.56
const COLOR_TITLE_FILL_START = 0.66
const COLOR_TITLE_FILL_END = 1
const COLOR_TITLE_ENTRY_SCALE = 1.76
const COLOR_TITLE_ENTRY_BLUR = 18
const COLOR_TITLE_ENTRY_Y = -240
const COLOR_TITLE_ENTRY_ROTATE = -28
const COLOR_TITLE_COVER_START = 0.74
const COLOR_TITLE_COVER_END = 1
const COLOR_TITLE_COVER_Y = -42
const COLOR_TITLE_COVER_SCALE = 0.968
const COLOR_TITLE_SUPPRESS_START = 0.44
const COLOR_TITLE_SUPPRESS_END = 0.92
const COLOR_METADATA_REVEAL_START = 0.06
const COLOR_METADATA_REVEAL_END = 0.42
const COLOR_COMPARISON_ENTRY_START = 1.12
const COLOR_COMPARISON_ENTRY_END = 2.38
const COLOR_COMPARISON_FIRST_HOLD = 1.04
const COLOR_COMPARISON_TRAVEL_DURATION = 1.08
const COLOR_COMPARISON_CENTER_HOLD = 0.98
const COLOR_COMPARISON_FINAL_HOLD = 1.1
const COLOR_COMPARISON_FIRST_HOLD_END = COLOR_COMPARISON_ENTRY_END + COLOR_COMPARISON_FIRST_HOLD
const COLOR_COMPARISON_SECOND_CENTER_START = COLOR_COMPARISON_FIRST_HOLD_END + COLOR_COMPARISON_TRAVEL_DURATION
const COLOR_COMPARISON_SECOND_HOLD_END = COLOR_COMPARISON_SECOND_CENTER_START + COLOR_COMPARISON_CENTER_HOLD
const COLOR_COMPARISON_THIRD_CENTER_START = COLOR_COMPARISON_SECOND_HOLD_END + COLOR_COMPARISON_TRAVEL_DURATION
const COLOR_COMPARISON_FINAL_HOLD_END = COLOR_COMPARISON_THIRD_CENTER_START + COLOR_COMPARISON_FINAL_HOLD
const COLOR_STAGE_TRANSITION_COUNT = COLOR_COMPARISON_FINAL_HOLD_END
const TOTAL_TRANSITION_COUNT = REEL_TRANSITION_COUNT + REEL_SETTLE_HOLD + COLOR_STAGE_TRANSITION_COUNT
const COLOR_COMPARISON_ENTRY_Y = 0
const COLOR_COMPARISON_ENTRY_SCALE = 1
const COLOR_COMPARISON_ENTRY_ROTATE = 0

const titleFrames = [
  {
    title: 'MANZANA CUATRO',
    meta: siteContent.hero.eyebrow,
    href: siteContent.hero.primaryCta.href,
    action: siteContent.hero.primaryCta.label,
  },
  ...reelProjects.slice(1).map((project) => ({
    title: project.title,
    meta: `${project.year} · ${project.category}`,
    href: `/proyectos/${project.slug}`,
    action: 'Ver caso',
  })),
]

const clamp01 = (value) => Math.min(1, Math.max(0, value))
const normalizeRange = (value, start, end) => clamp01((value - start) / (end - start))
const lerp = (start, end, progress) => start + ((end - start) * progress)

function StoryMedia({ item, reducedMotion, className = '' }) {
  if (!reducedMotion && item.video) {
    return (
      <video
        className={className}
        src={item.video}
        poster={item.poster}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      />
    )
  }

  return (
    <img
      className={className}
      src={item.poster}
      alt=""
      loading="lazy"
      decoding="async"
      aria-hidden="true"
    />
  )
}

function ReelMedia({ project, index, reducedMotion }) {
  if (!reducedMotion && project.video) {
    return (
      <video
        src={project.video}
        poster={project.poster}
        autoPlay
        muted
        loop
        playsInline
        preload={index === 0 ? 'auto' : 'metadata'}
        aria-hidden="true"
      />
    )
  }

  return (
    <img
      src={project.poster}
      alt={project.title}
      loading={index === 0 ? 'eager' : 'lazy'}
      fetchPriority={index === 0 ? 'high' : 'auto'}
      decoding="async"
    />
  )
}

export default function HomeReel({ ready = true }) {
  const sectionRef = useRef(null)
  const frameRefs = useRef([])
  const titleRefs = useRef([])
  const colorStageRef = useRef(null)
  const comparisonStageRef = useRef(null)
  const comparisonEntryRef = useRef(null)
  const toneRef = useRef('')
  const activeComparisonIndexRef = useRef(0)
  const comparisonInteractiveRef = useRef(false)
  const [activeComparisonIndex, setActiveComparisonIndex] = useState(0)
  const [comparisonInteractive, setComparisonInteractive] = useState(false)
  const reducedMotion = usePrefersReducedMotion()
  const safeActiveComparisonIndex = ready && !reducedMotion ? activeComparisonIndex : 0
  const safeComparisonInteractive = ready && !reducedMotion ? comparisonInteractive : false

  useEffect(() => {
    if (!ready || reducedMotion) {
      activeComparisonIndexRef.current = 0
      comparisonInteractiveRef.current = false
      document.documentElement.dataset.homeReelTone = 'media'
      return undefined
    }

    const section = sectionRef.current
    const frames = frameRefs.current.filter(Boolean)
    const titles = titleRefs.current.filter(Boolean)
    const colorStage = colorStageRef.current
    const comparisonStage = comparisonStageRef.current
    const comparisonEntry = comparisonEntryRef.current
    const colorTitleShell = colorStage?.querySelector('.home-reel__color-title-shell')

    if (!section || !frames.length || !titles.length || !colorStage || !comparisonStage || !comparisonEntry || !colorTitleShell) {
      return undefined
    }

    const announceTone = (tone) => {
      if (toneRef.current === tone) return

      toneRef.current = tone
      document.documentElement.dataset.homeReelTone = tone
      window.dispatchEvent(new CustomEvent('home-reel-stagechange', { detail: { tone } }))
    }

    const syncComparisonState = (nextIndex, nextInteractive) => {
      if (activeComparisonIndexRef.current !== nextIndex) {
        activeComparisonIndexRef.current = nextIndex
        setActiveComparisonIndex(nextIndex)
      }

      if (comparisonInteractiveRef.current !== nextInteractive) {
        comparisonInteractiveRef.current = nextInteractive
        setComparisonInteractive(nextInteractive)
      }
    }

    const state = { progress: 0 }

    const applyStage = () => {
      const raw = state.progress * TOTAL_TRANSITION_COUNT
      const reelRaw = Math.min(REEL_TRANSITION_COUNT, raw)
      const transitionIndex = reelRaw >= REEL_TRANSITION_COUNT
        ? REEL_TRANSITION_COUNT - 1
        : Math.min(REEL_TRANSITION_COUNT - 1, Math.max(0, Math.floor(reelRaw)))
      const localProgress = reelRaw >= REEL_TRANSITION_COUNT ? 1 : reelRaw - transitionIndex
      const currentTitleIndex = Math.min(titleFrames.length - 1, transitionIndex)
      const nextTitleIndex = Math.min(titleFrames.length - 1, transitionIndex + 1)
      const fadeOutProgress = normalizeRange(
        localProgress,
        TITLE_FADE_OUT_START,
        TITLE_FADE_OUT_END,
      )
      const fadeInProgress = normalizeRange(
        localProgress,
        TITLE_FADE_IN_START,
        TITLE_FADE_IN_END,
      )

      section.style.setProperty('--band-y', `${100 - (localProgress * 100)}%`)

      frames.forEach((frame, index) => {
        let reveal = 0

        if (index === 0 || index <= transitionIndex) {
          reveal = 100
        } else if (index === transitionIndex + 1) {
          reveal = localProgress * 100
        }

        frame.style.setProperty('--reveal', `${reveal}%`)
      })

      titles.forEach((titleCard, index) => {
        let opacity = 0
        let blur = TITLE_MAX_BLUR
        let translateY = TITLE_MAX_SHIFT

        if (reelRaw >= REEL_TRANSITION_COUNT) {
          if (index === titleFrames.length - 1) {
            opacity = 1
            blur = 0
            translateY = 0
          }
        } else {
          if (index === currentTitleIndex) {
            opacity = 1 - fadeOutProgress
            blur = fadeOutProgress * TITLE_MAX_BLUR
            translateY = fadeOutProgress * -TITLE_MAX_SHIFT
          }

          if (index === nextTitleIndex) {
            opacity = fadeInProgress
            blur = (1 - fadeInProgress) * TITLE_MAX_BLUR
            translateY = (1 - fadeInProgress) * TITLE_MAX_SHIFT
          }

          if (localProgress <= TITLE_FADE_OUT_START && index === currentTitleIndex) {
            opacity = 1
            blur = 0
            translateY = 0
          }

          if (localProgress >= TITLE_FADE_OUT_END && index === currentTitleIndex) {
            opacity = 0
            blur = TITLE_MAX_BLUR
            translateY = -TITLE_MAX_SHIFT
          }

          if (localProgress <= TITLE_FADE_IN_START && index === nextTitleIndex) {
            opacity = 0
            blur = TITLE_MAX_BLUR
            translateY = TITLE_MAX_SHIFT
          }

          if (localProgress >= TITLE_FADE_IN_END && index === nextTitleIndex) {
            opacity = 1
            blur = 0
            translateY = 0
          }
        }

        titleCard.style.setProperty('--title-opacity', opacity.toFixed(3))
        titleCard.style.setProperty('--title-blur', `${blur.toFixed(2)}px`)
        titleCard.style.setProperty('--title-y', `${translateY.toFixed(2)}px`)
        titleCard.style.pointerEvents = opacity > 0.72 ? 'auto' : 'none'
        titleCard.setAttribute('aria-hidden', opacity > 0.12 ? 'false' : 'true')
        titleCard
          .querySelector('.home-reel__view')
          ?.setAttribute('tabindex', opacity > 0.72 ? '0' : '-1')
      })

      const colorRaw = Math.max(0, raw - REEL_TRANSITION_COUNT - REEL_SETTLE_HOLD)
      const colorIntroProgress = clamp01(colorRaw)
      const colorStageOpacity = colorRaw > 0.001 ? 1 : 0
      const washProgress = normalizeRange(colorIntroProgress, COLOR_WASH_START, COLOR_WASH_END)
      const legacyUiOpacity = 1 - normalizeRange(
        colorIntroProgress,
        LEGACY_UI_FADE_OUT_START,
        LEGACY_UI_FADE_OUT_END,
      )
      const titleDropProgress = normalizeRange(
        colorIntroProgress,
        COLOR_TITLE_DROP_START,
        COLOR_TITLE_DROP_END,
      )
      const titleFillProgress = normalizeRange(
        colorIntroProgress,
        COLOR_TITLE_FILL_START,
        COLOR_TITLE_FILL_END,
      )
      const titleFillOpacity = titleFillProgress <= 0
        ? 0
        : normalizeRange(titleFillProgress, 0, 0.12)
      const comparisonEntryProgress = normalizeRange(
        colorRaw,
        COLOR_COMPARISON_ENTRY_START,
        COLOR_COMPARISON_ENTRY_END,
      )
      const titleCoverProgress = colorRaw > 1
        ? 1
        : normalizeRange(
          colorIntroProgress,
          COLOR_TITLE_COVER_START,
          COLOR_TITLE_COVER_END,
        )
      const titleSuppressProgress = normalizeRange(
        comparisonEntryProgress,
        COLOR_TITLE_SUPPRESS_START,
        COLOR_TITLE_SUPPRESS_END,
      )
      let comparisonTrackProgress = 0
      let comparisonHoldProgress = 0
      let activeIndex = 0
      let comparisonTraveling = false

      if (colorRaw < COLOR_COMPARISON_FIRST_HOLD_END) {
        activeIndex = 0
        comparisonTrackProgress = 0
        comparisonHoldProgress = normalizeRange(
          colorRaw,
          COLOR_COMPARISON_ENTRY_END,
          COLOR_COMPARISON_FIRST_HOLD_END,
        )
      } else if (colorRaw < COLOR_COMPARISON_SECOND_CENTER_START) {
        const travelProgress = normalizeRange(
          colorRaw,
          COLOR_COMPARISON_FIRST_HOLD_END,
          COLOR_COMPARISON_SECOND_CENTER_START,
        )

        comparisonTrackProgress = travelProgress
        activeIndex = travelProgress < 0.5 ? 0 : 1
        comparisonTraveling = true
      } else if (colorRaw < COLOR_COMPARISON_SECOND_HOLD_END) {
        activeIndex = 1
        comparisonTrackProgress = 1
        comparisonHoldProgress = normalizeRange(
          colorRaw,
          COLOR_COMPARISON_SECOND_CENTER_START,
          COLOR_COMPARISON_SECOND_HOLD_END,
        )
      } else if (colorRaw < COLOR_COMPARISON_THIRD_CENTER_START) {
        const travelProgress = normalizeRange(
          colorRaw,
          COLOR_COMPARISON_SECOND_HOLD_END,
          COLOR_COMPARISON_THIRD_CENTER_START,
        )

        comparisonTrackProgress = 1 + travelProgress
        activeIndex = travelProgress < 0.5 ? 1 : 2
        comparisonTraveling = true
      } else {
        activeIndex = 2
        comparisonTrackProgress = 2
        comparisonHoldProgress = normalizeRange(
          colorRaw,
          COLOR_COMPARISON_THIRD_CENTER_START,
          COLOR_COMPARISON_FINAL_HOLD_END,
        )
      }

      const comparisonDetailsOpacity = comparisonTraveling
        ? 0
        : normalizeRange(
          comparisonHoldProgress,
          COLOR_METADATA_REVEAL_START,
          COLOR_METADATA_REVEAL_END,
        )
      const tone = colorIntroProgress >= COLOR_TONE_SWITCH_START ? 'pure' : 'media'
      const comparisonCentered = !comparisonTraveling && colorRaw >= COLOR_COMPARISON_ENTRY_END
      const titleFrameHeight = colorTitleShell.getBoundingClientRect().height || window.innerHeight * 0.34
      const titleEntryDistance = Math.max(
        window.innerHeight + (titleFrameHeight * 0.7),
        window.innerHeight * 1.12,
      )
      const comparisonStageOpacity = colorRaw > 0 ? 1 : 0
      const comparisonFrame = comparisonEntry.querySelector('.home-reel__comparison-stage-inner')
      const comparisonFrameHeight = comparisonFrame?.getBoundingClientRect().height ?? window.innerHeight * 0.68
      const comparisonEntryDistance = Math.max(
        window.innerHeight + (comparisonFrameHeight * 0.5) + 48,
        window.innerHeight * 1.18,
      )

      announceTone(tone)
      syncComparisonState(
        activeIndex,
        comparisonCentered,
      )

      section.style.setProperty('--legacy-ui-opacity', legacyUiOpacity.toFixed(3))
      section.style.setProperty('--grade-stage-opacity', colorStageOpacity.toFixed(3))
      section.style.setProperty('--color-wash-opacity', washProgress.toFixed(3))
      section.style.setProperty('--color-wash-blur', `${lerp(0, 18, washProgress).toFixed(2)}px`)
      section.style.setProperty('--grade-title-opacity', comparisonStageOpacity.toFixed(3))
      section.style.setProperty('--grade-title-scale', lerp(
        COLOR_TITLE_ENTRY_SCALE,
        1,
        titleDropProgress,
      ).toFixed(3))
      section.style.setProperty('--grade-title-blur', `${lerp(
        COLOR_TITLE_ENTRY_BLUR,
        0,
        titleDropProgress,
      ).toFixed(2)}px`)
      section.style.setProperty('--grade-title-y', `${lerp(
        -titleEntryDistance,
        0,
        titleDropProgress,
      ).toFixed(2)}px`)
      section.style.setProperty('--grade-title-rotate', `${lerp(
        COLOR_TITLE_ENTRY_ROTATE,
        0,
        titleDropProgress,
      ).toFixed(2)}deg`)
      section.style.setProperty('--grade-title-fill', `${lerp(0, 100, titleFillProgress).toFixed(2)}%`)
      section.style.setProperty('--grade-title-fill-opacity', titleFillOpacity.toFixed(3))
      section.style.setProperty('--grade-title-rest-opacity', lerp(1, 0, titleSuppressProgress).toFixed(3))
      section.style.setProperty('--grade-title-cover-y', `${lerp(
        0,
        COLOR_TITLE_COVER_Y,
        Math.max(titleCoverProgress, titleSuppressProgress),
      ).toFixed(2)}px`)
      section.style.setProperty('--grade-title-cover-scale', lerp(
        1,
        COLOR_TITLE_COVER_SCALE,
        Math.max(titleCoverProgress, titleSuppressProgress),
      ).toFixed(3))
      section.style.setProperty('--grade-title-cover-opacity', lerp(
        1,
        0.86,
        Math.max(titleCoverProgress, titleSuppressProgress),
      ).toFixed(3))
      section.style.setProperty('--comparison-stage-opacity', comparisonStageOpacity.toFixed(3))
      section.style.setProperty('--comparison-stage-y', `${lerp(
        Math.max(COLOR_COMPARISON_ENTRY_Y, comparisonEntryDistance),
        0,
        comparisonEntryProgress,
      ).toFixed(2)}px`)
      section.style.setProperty('--comparison-stage-scale', lerp(
        COLOR_COMPARISON_ENTRY_SCALE,
        1,
        comparisonEntryProgress,
      ).toFixed(3))
      section.style.setProperty('--comparison-stage-rotate', `${lerp(
        COLOR_COMPARISON_ENTRY_ROTATE,
        0,
        comparisonEntryProgress,
      ).toFixed(2)}deg`)
      section.style.setProperty(
        '--comparison-track-shift',
        `-${((comparisonTrackProgress / colorizationReels.length) * 100).toFixed(3)}%`,
      )
      section.style.setProperty('--comparison-details-opacity', comparisonDetailsOpacity.toFixed(3))

      comparisonEntry.style.pointerEvents = comparisonCentered ? 'auto' : 'none'
      colorStage.setAttribute('aria-hidden', colorStageOpacity > 0.12 ? 'false' : 'true')
      comparisonStage.setAttribute('aria-hidden', comparisonStageOpacity > 0 ? 'false' : 'true')
      comparisonStage.style.pointerEvents = comparisonCentered ? 'auto' : 'none'
    }

    announceTone('media')
    applyStage()

    const ctx = gsap.context(() => {
      gsap.to(state, {
        progress: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
        },
        onUpdate: applyStage,
      })
    }, section)

    return () => {
      ctx.revert()
      toneRef.current = ''
      activeComparisonIndexRef.current = 0
      comparisonInteractiveRef.current = false
      announceTone('media')
    }
  }, [ready, reducedMotion])

  return (
    <section
      className="home-reel"
      ref={sectionRef}
      style={{
        '--reel-frames': reducedMotion ? 1 : reelProjects.length + REEL_SETTLE_HOLD + COLOR_STAGE_TRANSITION_COUNT,
        '--comparison-count': colorizationReels.length,
      }}
    >
      <div className="home-reel__sticky">
        <div className="home-reel__viewport">
          {reelProjects.map((project, index) => (
            <article
              key={project.slug}
              className={`home-reel__frame${index === 0 ? ' home-reel__frame--opening' : ''}`}
              ref={(element) => {
                frameRefs.current[index] = element
              }}
            >
              <div className="home-reel__media">
                <ReelMedia project={project} index={index} reducedMotion={reducedMotion} />
              </div>
              <div className="home-reel__overlay" />
            </article>
          ))}

          <div className="home-reel__color-stage" ref={colorStageRef} aria-hidden="true">
            <div className="home-reel__color-wash" />

            <div className="home-reel__color-title">
              <div className="home-reel__color-title-shell">
                <span className="home-reel__color-title-copy">
                  {siteContent.colorization.title}
                </span>
                <span className="home-reel__color-title-copy home-reel__color-title-copy--fill" aria-hidden="true">
                  {siteContent.colorization.title}
                </span>
              </div>
            </div>

            <div
              className="home-reel__comparison-stage"
              ref={comparisonStageRef}
              aria-hidden="true"
            >
              <div className="home-reel__comparison-entry" ref={comparisonEntryRef}>
                <div className="home-reel__comparison-shell">
                <div className="home-reel__comparison-track">
                  {siteContent.colorization.reels.map((reel, index) => (
                    <article
                      className={`home-reel__comparison-slide home-reel__comparison-case${safeActiveComparisonIndex === index ? ' home-reel__comparison-case--active home-reel__comparison-slide--active' : ''}`}
                      key={reel.title}
                      aria-hidden={safeActiveComparisonIndex === index ? 'false' : 'true'}
                    >
                      <div className="home-reel__comparison-stage-inner">
                        <div className="home-reel__comparison-details">
                          <p className="home-reel__comparison-kicker">
                            Colorizacion / caso {String(index + 1).padStart(2, '0')}
                          </p>
                          <h2 className="home-reel__comparison-title">{reel.title}</h2>
                          <p className="home-reel__comparison-summary">{reel.summary}</p>
                          <dl className="home-reel__comparison-facts">
                            <div>
                              <dt>Cliente</dt>
                              <dd>{reel.client}</dd>
                            </div>
                            <div>
                              <dt>Tipo</dt>
                              <dd>{reel.category}</dd>
                            </div>
                            <div>
                              <dt>Ano</dt>
                              <dd>{reel.year}</dd>
                            </div>
                          </dl>
                          <ul className="home-reel__comparison-tags" aria-label="Servicios del caso">
                            {reel.tags.map((tag) => (
                              <li key={tag}>{tag}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="home-reel__comparison-device">
                          <div className="home-reel__comparison-surface">
                            <ComparisonSlider
                              beforeLabel={colorizationStory.beforeLabel}
                              afterLabel={colorizationStory.afterLabel}
                              interactive={safeComparisonInteractive && safeActiveComparisonIndex === index}
                              before={(
                                <StoryMedia
                                  item={reel}
                                  reducedMotion={reducedMotion}
                                  className="home-reel__compare-media home-reel__compare-media--before"
                                />
                              )}
                              after={(
                                <StoryMedia
                                  item={reel}
                                  reducedMotion={reducedMotion}
                                  className="home-reel__compare-media home-reel__compare-media--after"
                                />
                              )}
                            />
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
                </div>
              </div>
            </div>
          </div>

          <div className="home-reel__title-window">
            {titleFrames.map((item, index) => (
              <div
                className={`home-reel__title-card${index === 0 ? ' home-reel__title-card--brand' : ''}`}
                key={item.title}
                ref={(element) => {
                  titleRefs.current[index] = element
                }}
              >
                <p className="home-reel__meta">{item.meta}</p>
                <h1 className="home-reel__title">{item.title}</h1>
                <Link
                  to={item.href}
                  className="home-reel__view"
                  tabIndex={index === 0 ? 0 : -1}
                >
                  {item.action}
                </Link>
              </div>
            ))}
          </div>

          <div className="home-reel__band">
            <div className="home-reel__band-fill" />
          </div>

          <div className="home-reel__baseline">
            <span>{siteContent.brand.location}</span>
            <span>{siteContent.brand.instagramLabel}</span>
            <span>{siteContent.hero.availability}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
