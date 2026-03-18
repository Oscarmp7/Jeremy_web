import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { siteContent } from '../data/siteContent'

gsap.registerPlugin(ScrollTrigger)

// ---------------------------------------------------------------------------
// Timing constants — reel section
// ---------------------------------------------------------------------------

const reelTransitionCount = 3 // REEL_TRANSITION_COUNT = reelProjects.length - 1
const REEL_SETTLE_HOLD = 0.58

const TITLE_FADE_OUT_START = 0.38
const TITLE_FADE_OUT_END = 0.58
const TITLE_FADE_IN_START = 0.48
const TITLE_FADE_IN_END = 0.74
const TITLE_MAX_BLUR = 6
const TITLE_MAX_SHIFT = 6

// ---------------------------------------------------------------------------
// Timing constants — color / comparison section
// ---------------------------------------------------------------------------

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
export const TOTAL_TRANSITION_COUNT = reelTransitionCount + REEL_SETTLE_HOLD + COLOR_STAGE_TRANSITION_COUNT
const REEL_TRANSITION_COUNT = reelTransitionCount
const COLOR_COMPARISON_ENTRY_Y = 0
const COLOR_COMPARISON_ENTRY_SCALE = 1
const COLOR_COMPARISON_ENTRY_ROTATE = 0

// ---------------------------------------------------------------------------
// Pure math helpers
// ---------------------------------------------------------------------------

const clamp01 = (value) => Math.min(1, Math.max(0, value))
const normalizeRange = (value, start, end) => clamp01((value - start) / (end - start))
const lerp = (start, end, progress) => start + ((end - start) * progress)

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

/**
 * useHomeReelScroll
 *
 * Encapsulates the GSAP ScrollTrigger logic for the HomeReel component.
 * The hook receives all refs by ref-object (reads .current inside the effect)
 * and state-setter callbacks. It owns no state itself.
 *
 * @param {object} params
 * @param {boolean}  params.ready
 * @param {boolean}  params.reducedMotion
 * @param {object}   params.refs          - all DOM / value refs from HomeReel
 * @param {object}   params.setters       - React state setters from HomeReel
 * @param {Array}    params.titleFrames   - the titleFrames data array
 * @param {Array}    params.reelProjects  - the reel project data array
 */
export default function useHomeReelScroll({
  ready,
  reducedMotion,
  refs,
  setters,
  titleFrames,
  reelProjects,
}) {
  const {
    sectionRef,
    frameRefs,
    titleRefs,
    colorStageRef,
    comparisonStageRef,
    comparisonEntryRef,
    measurementRef,
    toneRef,
    activeReelIndexRef,
    activeComparisonIndexRef,
    comparisonInteractiveRef,
    colorStageActiveRef,
  } = refs

  const {
    setActiveReelIndex,
    setActiveComparisonIndex,
    setComparisonInteractive,
    setColorStageActive,
  } = setters

  const colorizationReels = siteContent.colorization.reels

  useEffect(() => {
    if (!ready || reducedMotion) {
      activeReelIndexRef.current = 0
      activeComparisonIndexRef.current = 0
      comparisonInteractiveRef.current = false
      colorStageActiveRef.current = false
      document.documentElement.dataset.homeReelTone = 'media'
      return undefined
    }

    const section = sectionRef.current
    const frames = frameRefs.current.filter(Boolean)
    const titles = titleRefs.current.filter(Boolean)
    const colorStage = colorStageRef.current
    const comparisonStage = comparisonStageRef.current
    const comparisonEntry = comparisonEntryRef.current
    const titleWindow = section.querySelector('.home-reel__title-window')
    const colorTitleShell = colorStage?.querySelector('.home-reel__color-title-shell')
    const comparisonFrame = comparisonEntry?.querySelector('.home-reel__comparison-stage-inner')
    const comparisonCases = comparisonEntry
      ? Array.from(comparisonEntry.querySelectorAll('.home-reel__comparison-case'))
      : []

    if (
      !section
      || !frames.length
      || !titles.length
      || !colorStage
      || !comparisonStage
      || !comparisonEntry
      || !colorTitleShell
      || !comparisonFrame
    ) {
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

    const syncReelState = (nextIndex) => {
      if (activeReelIndexRef.current !== nextIndex) {
        activeReelIndexRef.current = nextIndex
        setActiveReelIndex(nextIndex)
      }
    }

    const syncColorStageState = (nextActive) => {
      if (colorStageActiveRef.current !== nextActive) {
        colorStageActiveRef.current = nextActive
        setColorStageActive(nextActive)
      }
    }

    const syncMeasurements = () => {
      const viewportHeight = window.innerHeight || measurementRef.current.viewportHeight || 0

      measurementRef.current = {
        titleFrameHeight: colorTitleShell.offsetHeight || Math.round(viewportHeight * 0.34),
        comparisonFrameHeight: comparisonFrame.offsetHeight || Math.round(viewportHeight * 0.68),
        titleWindowHeight: titleWindow?.offsetHeight || 0,
        viewportHeight,
      }
    }

    syncMeasurements()

    const resizeObserver = typeof ResizeObserver === 'function'
      ? new ResizeObserver(() => {
        syncMeasurements()
      })
      : null

    resizeObserver?.observe(colorTitleShell)
    resizeObserver?.observe(comparisonFrame)
    if (titleWindow) resizeObserver?.observe(titleWindow)
    window.addEventListener('resize', syncMeasurements, { passive: true })

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
      const stageReelIndex = reelRaw >= REEL_TRANSITION_COUNT
        ? reelProjects.length - 1
        : Math.min(
          reelProjects.length - 1,
          transitionIndex + (localProgress >= 0.5 ? 1 : 0),
        )

      section.style.setProperty('--band-y', `${100 - (localProgress * 100)}%`)

      frames.forEach((frame, index) => {
        // Frame 1 slides over the opening frame as a physical sheet (no clip-path).
        // During the slide it needs z-index above title-window (10) so it covers the title.
        // Once settled, it drops back to z-index 2 so the title-window shows above it again.
        if (index === 1) {
          if (transitionIndex === 0) {
            frame.style.setProperty('--reveal', '100%')
            frame.style.setProperty('--frame1-slide-y', `${lerp(100, 0, localProgress).toFixed(2)}%`)
            frame.style.setProperty('--frame-title-opacity', '1')
          } else {
            frame.style.setProperty('--reveal', '100%')
            frame.style.setProperty('--frame1-slide-y', '0%')
            frame.style.setProperty('--frame-title-opacity', '0')
          }
          return
        }

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

        // During 0→1 transition: title card 1 is hidden — Frame 1 carries it physically
        if (transitionIndex === 0 && index === 1) {
          titleCard.style.setProperty('--title-opacity', '0')
          titleCard.style.setProperty('--title-blur', `${TITLE_MAX_BLUR}px`)
          titleCard.style.setProperty('--title-y', `${TITLE_MAX_SHIFT}px`)
          titleCard.style.pointerEvents = 'none'
          titleCard.setAttribute('aria-hidden', 'true')
          titleCard.querySelector('.home-reel__view')?.setAttribute('tabindex', '-1')
          return
        }

        // During 0→1 transition: opening title is static — frame 1 physically covers it
        if (transitionIndex === 0 && index === 0) {
          titleCard.style.setProperty('--title-opacity', '1')
          titleCard.style.setProperty('--title-blur', '0px')
          titleCard.style.setProperty('--title-y', '0px')
          titleCard.style.pointerEvents = 'none'
          titleCard.setAttribute('aria-hidden', 'false')
          titleCard.querySelector('.home-reel__view')?.setAttribute('tabindex', '-1')
          return
        }

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

      // Clip title-window to match frame 1's top edge as it slides up,
      // creating the effect of frame 1 physically covering the title.
      // Title-window is vertically centered: its bottom edge = vh/2 + titleWindowHeight/2.
      // Frame 1's top edge = lerp(vh, 0, localProgress).
      // We clip from the bottom by however much frame 1 overlaps the title-window.
      if (titleWindow) {
        if (transitionIndex === 0) {
          const { viewportHeight, titleWindowHeight } = measurementRef.current
          const vh = viewportHeight || window.innerHeight
          const topPx = lerp(vh, 0, localProgress)
          const titleWindowBottom = vh / 2 + titleWindowHeight / 2
          const clipFromBottom = Math.max(0, titleWindowBottom - topPx)
          titleWindow.style.clipPath = `inset(0 0 ${clipFromBottom.toFixed(2)}px 0)`
        } else {
          titleWindow.style.clipPath = ''
        }
      }

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
      const {
        titleFrameHeight,
        comparisonFrameHeight,
        viewportHeight,
      } = measurementRef.current
      const safeViewportHeight = viewportHeight || window.innerHeight || 0
      const titleEntryDistance = Math.max(
        safeViewportHeight + (titleFrameHeight * 0.7),
        safeViewportHeight * 1.12,
      )
      const comparisonStageOpacity = colorRaw > 0 ? 1 : 0
      const comparisonEntryDistance = Math.max(
        safeViewportHeight + (comparisonFrameHeight * 0.5) + 48,
        safeViewportHeight * 1.18,
      )

      announceTone(tone)
      syncReelState(stageReelIndex)
      syncComparisonState(
        activeIndex,
        comparisonCentered,
      )
      syncColorStageState(colorRaw > 0.001)

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

      if (comparisonDetailsOpacity >= 0.99 && comparisonCases[activeIndex]) {
        comparisonCases[activeIndex].classList.add('home-reel__comparison-case--revealed')
      }

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
          onRefresh: syncMeasurements,
        },
        onUpdate: applyStage,
      })
    }, section)

    return () => {
      ctx.revert()
      resizeObserver?.disconnect()
      window.removeEventListener('resize', syncMeasurements)
      frames[1]?.style.removeProperty('--frame1-slide-y')
      frames[1]?.style.removeProperty('--frame-title-opacity')
      if (titleWindow) titleWindow.style.clipPath = ''
      toneRef.current = ''
      activeReelIndexRef.current = 0
      activeComparisonIndexRef.current = 0
      comparisonInteractiveRef.current = false
      colorStageActiveRef.current = false
      announceTone('media')
    }
  }, [ready, reducedMotion]) // eslint-disable-line react-hooks/exhaustive-deps
}
