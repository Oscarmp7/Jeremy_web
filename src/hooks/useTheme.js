import { useState, useEffect, useCallback } from 'react'

export default function useTheme() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('m4-theme') || 'dark'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('m4-theme', theme)
  }, [theme])

  const toggle = useCallback(() => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'))
  }, [])

  return { theme, toggle }
}
