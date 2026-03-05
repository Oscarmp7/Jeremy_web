import { useCursor } from '../../hooks/useCursor'

export default function Cursor() {
  const { cursorRef, dotRef } = useCursor()

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null
  }

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2"
        style={{ willChange: 'transform, opacity' }}
      >
        <div className="cursor-ring" />
      </div>

      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"
        style={{ willChange: 'transform, opacity' }}
      >
        <div className="cursor-dot" />
      </div>
    </>
  )
}
