import { useEffect, useRef } from 'react'

export function useCursor() {
  const cursorRef = useRef(null)
  const dotRef = useRef(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const dot = dotRef.current
    if (!cursor || !dot) return

    let x = 0, y = 0
    let raf

    const move = (e) => {
      x = e.clientX
      y = e.clientY
    }

    const animate = () => {
      cursor.style.transform = `translate(${x}px, ${y}px)`
      dot.style.transform = `translate(${x}px, ${y}px)`
      raf = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', move)
    raf = requestAnimationFrame(animate)

    // Expand on interactive elements
    const expand = () => cursor.classList.add('cursor--expand')
    const shrink = () => cursor.classList.remove('cursor--expand')

    const targets = document.querySelectorAll('a, button, [data-cursor="expand"]')
    targets.forEach(el => {
      el.addEventListener('mouseenter', expand)
      el.addEventListener('mouseleave', shrink)
    })

    return () => {
      window.removeEventListener('mousemove', move)
      cancelAnimationFrame(raf)
    }
  }, [])

  return { cursorRef, dotRef }
}
