import { useState, useEffect, useCallback, useRef } from 'react'

export function useTheme() {
  const timeoutRef = useRef(null)

  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('ja-theme')
    if (saved === 'light' || saved === 'dark') return saved
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('ja-theme', theme)
  }, [theme])

  useEffect(() => {
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current)
      document.documentElement.classList.remove('theme-switching')
    }
  }, [])

  const toggle = useCallback(() => {
    const root = document.documentElement
    if (root.classList.contains('theme-switching')) return

    root.classList.add('theme-switching')
    setTheme(t => (t === 'dark' ? 'light' : 'dark'))

    if (timeoutRef.current) window.clearTimeout(timeoutRef.current)
    timeoutRef.current = window.setTimeout(() => {
      root.classList.remove('theme-switching')
      timeoutRef.current = null
    }, 260)
  }, [])

  return { theme, toggle }
}
