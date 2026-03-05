import { useEffect, useRef } from 'react'

const GRAIN_SCALE = 0.28
const TARGET_FPS = 14

export default function FilmGrain() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    let raf = 0
    let lastFrame = 0

    const resize = () => {
      canvas.width = Math.max(1, Math.floor(window.innerWidth * GRAIN_SCALE))
      canvas.height = Math.max(1, Math.floor(window.innerHeight * GRAIN_SCALE))
      ctx.imageSmoothingEnabled = false
    }

    const draw = now => {
      const frameInterval = 1000 / TARGET_FPS
      if (now - lastFrame >= frameInterval) {
        const imageData = ctx.createImageData(canvas.width, canvas.height)
        const data = imageData.data

        for (let i = 0; i < data.length; i += 4) {
          const value = Math.random() * 255
          data[i] = value
          data[i + 1] = value
          data[i + 2] = value
          data[i + 3] = 14
        }

        ctx.putImageData(imageData, 0, 0)
        lastFrame = now
      }

      raf = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="film-grain fixed inset-0 pointer-events-none z-[100] mix-blend-overlay w-full h-full"
      style={{ opacity: 0.32 }}
      aria-hidden="true"
    />
  )
}
