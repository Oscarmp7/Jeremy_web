import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import './ComparisonSlider.css'

const clamp = (value, min, max) => Math.min(max, Math.max(min, value))
const VIDEO_SYNC_DRIFT_THRESHOLD = 0.08

const syncFollowerToLeader = (leader, follower) => {
  let rafId = 0

  const syncTiming = () => {
    if (!Number.isFinite(leader.currentTime) || !Number.isFinite(follower.currentTime)) {
      return
    }

    if (Math.abs(follower.currentTime - leader.currentTime) <= VIDEO_SYNC_DRIFT_THRESHOLD) {
      return
    }

    try {
      follower.currentTime = leader.currentTime
    } catch {
      // Ignore browsers that temporarily block currentTime writes before metadata is ready.
    }
  }

  const queueTimingSync = () => {
    window.cancelAnimationFrame(rafId)
    rafId = window.requestAnimationFrame(syncTiming)
  }

  const syncPlayback = () => {
    follower.defaultMuted = true
    follower.muted = true
    follower.playbackRate = leader.playbackRate
    follower.loop = leader.loop

    queueTimingSync()

    if (leader.paused || leader.ended) {
      follower.pause()
      return
    }

    const playAttempt = follower.play()
    playAttempt?.catch(() => {})
  }

  leader.addEventListener('loadedmetadata', queueTimingSync)
  leader.addEventListener('canplay', syncPlayback)
  leader.addEventListener('play', syncPlayback)
  leader.addEventListener('pause', syncPlayback)
  leader.addEventListener('seeking', queueTimingSync)
  leader.addEventListener('seeked', queueTimingSync)
  leader.addEventListener('ratechange', syncPlayback)
  leader.addEventListener('timeupdate', syncTiming)

  syncPlayback()

  return () => {
    window.cancelAnimationFrame(rafId)
    leader.removeEventListener('loadedmetadata', queueTimingSync)
    leader.removeEventListener('canplay', syncPlayback)
    leader.removeEventListener('play', syncPlayback)
    leader.removeEventListener('pause', syncPlayback)
    leader.removeEventListener('seeking', queueTimingSync)
    leader.removeEventListener('seeked', queueTimingSync)
    leader.removeEventListener('ratechange', syncPlayback)
    leader.removeEventListener('timeupdate', syncTiming)
  }
}

export default function ComparisonSlider({
  before,
  after,
  beforeLabel = 'Antes',
  afterLabel = 'Despues',
  defaultValue = 50,
  interactive = true,
  className = '',
}) {
  const containerRef = useRef(null)
  const beforeLayerRef = useRef(null)
  const afterLayerRef = useRef(null)
  const [value, setValue] = useState(defaultValue)
  const [dragging, setDragging] = useState(false)

  useEffect(() => {
    const beforeVideo = beforeLayerRef.current?.querySelector('video')
    const afterVideo = afterLayerRef.current?.querySelector('video')

    if (!(beforeVideo instanceof HTMLVideoElement) || !(afterVideo instanceof HTMLVideoElement)) {
      return undefined
    }

    beforeVideo.defaultMuted = true
    beforeVideo.muted = true
    afterVideo.defaultMuted = true
    afterVideo.muted = true

    return syncFollowerToLeader(beforeVideo, afterVideo)
  }, [after, before])

  const updateValueFromClientX = useCallback((clientX) => {
    const container = containerRef.current
    if (!container) return

    const rect = container.getBoundingClientRect()
    const nextValue = clamp(((clientX - rect.left) / rect.width) * 100, 0, 100)
    setValue(nextValue)
  }, [])

  const handlePointerDown = useCallback((event) => {
    if (!interactive) {
      return
    }

    if (event.button !== 0 && event.pointerType !== 'touch') {
      return
    }

    event.currentTarget.setPointerCapture?.(event.pointerId)
    setDragging(true)
    updateValueFromClientX(event.clientX)
  }, [interactive, updateValueFromClientX])

  const handlePointerMove = useCallback((event) => {
    if (!interactive) return
    if (!dragging) return
    updateValueFromClientX(event.clientX)
  }, [dragging, interactive, updateValueFromClientX])

  const stopDragging = useCallback((event) => {
    if (event?.currentTarget?.hasPointerCapture?.(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }

    setDragging(false)
  }, [])

  const handleKeyDown = useCallback((event) => {
    if (!interactive) return

    if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
      event.preventDefault()
      setValue((current) => clamp(current - 4, 0, 100))
    }

    if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
      event.preventDefault()
      setValue((current) => clamp(current + 4, 0, 100))
    }

    if (event.key === 'Home') {
      event.preventDefault()
      setValue(0)
    }

    if (event.key === 'End') {
      event.preventDefault()
      setValue(100)
    }
  }, [interactive])

  const rootClassName = useMemo(
    () => `comparison-slider${dragging ? ' comparison-slider--dragging' : ''}${interactive ? '' : ' comparison-slider--disabled'}${className ? ` ${className}` : ''}`,
    [className, dragging, interactive],
  )

  return (
    <div
      ref={containerRef}
      className={rootClassName}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={stopDragging}
      onPointerCancel={stopDragging}
      onPointerLeave={stopDragging}
    >
      <div className="comparison-slider__before" ref={beforeLayerRef} aria-hidden="true">
        {before}
      </div>

      <div
        className="comparison-slider__after"
        ref={afterLayerRef}
        style={{ clipPath: `inset(0 ${100 - value}% 0 0)` }}
        aria-hidden="true"
      >
        {after}
      </div>

      <span className="comparison-slider__label comparison-slider__label--before">
        {beforeLabel}
      </span>
      <span className="comparison-slider__label comparison-slider__label--after">
        {afterLabel}
      </span>

      <span className="comparison-slider__line" style={{ left: `${value}%` }} aria-hidden="true" />

      <button
        type="button"
        className="comparison-slider__handle"
        style={{ left: `${value}%` }}
        role="slider"
        aria-label="Ajustar comparacion de colorizacion"
        aria-disabled={!interactive}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(value)}
        aria-valuetext={`${Math.round(value)} por ciento colorizado`}
        disabled={!interactive}
        tabIndex={interactive ? 0 : -1}
        onKeyDown={handleKeyDown}
      >
        <span className="comparison-slider__handle-icon" aria-hidden="true">
          <span />
          <span />
        </span>
      </button>
    </div>
  )
}
