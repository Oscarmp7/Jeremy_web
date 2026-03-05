import { useEffect, useRef } from 'react'

const INTERACTIVE_SELECTOR = 'a, button, input, textarea, select, [data-cursor="expand"]'

export function useCursor() {
  const cursorRef = useRef(null)
  const dotRef = useRef(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const dot = dotRef.current
    if (!cursor || !dot) return

    let targetX = window.innerWidth / 2
    let targetY = window.innerHeight / 2
    let cursorX = targetX
    let cursorY = targetY
    let raf = 0

    cursor.style.opacity = '0'
    dot.style.opacity = '0'

    const onMove = event => {
      targetX = event.clientX
      targetY = event.clientY
      cursor.style.opacity = '1'
      dot.style.opacity = '1'
    }

    const onMouseOver = event => {
      if (event.target.closest(INTERACTIVE_SELECTOR)) {
        cursor.classList.add('cursor--expand')
      }
    }

    const onMouseOut = event => {
      const next = event.relatedTarget
      if (!next || !next.closest(INTERACTIVE_SELECTOR)) {
        cursor.classList.remove('cursor--expand')
      }
    }

    const onMouseDown = () => cursor.classList.add('cursor--expand')
    const onMouseUp = () => cursor.classList.remove('cursor--expand')
    const onLeaveViewport = () => {
      cursor.style.opacity = '0'
      dot.style.opacity = '0'
      cursor.classList.remove('cursor--expand')
    }

    const animate = () => {
      cursorX += (targetX - cursorX) * 0.2
      cursorY += (targetY - cursorY) * 0.2

      const transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`
      cursor.style.transform = transform
      dot.style.transform = transform

      raf = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mouseup', onMouseUp)
    window.addEventListener('mouseleave', onLeaveViewport)
    document.addEventListener('mouseover', onMouseOver)
    document.addEventListener('mouseout', onMouseOut)

    raf = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mouseup', onMouseUp)
      window.removeEventListener('mouseleave', onLeaveViewport)
      document.removeEventListener('mouseover', onMouseOver)
      document.removeEventListener('mouseout', onMouseOut)
      cancelAnimationFrame(raf)
    }
  }, [])

  return { cursorRef, dotRef }
}
