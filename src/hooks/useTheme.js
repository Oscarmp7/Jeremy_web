import { useState, useEffect, useCallback } from 'react'

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('ja-theme')
    if (saved === 'light' || saved === 'dark') return saved
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('ja-theme', theme)
  }, [theme])

  const toggle = useCallback(() => {
    const flash = document.querySelector('.theme-flash')
    if (flash) {
      flash.style.opacity = '1'
      setTimeout(() => {
        setTheme(t => (t === 'dark' ? 'light' : 'dark'))
        flash.style.opacity = '0'
      }, 80)
    } else {
      setTheme(t => (t === 'dark' ? 'light' : 'dark'))
    }
  }, [])

  return { theme, toggle }
}
