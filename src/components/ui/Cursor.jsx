import { useCursor } from '../../hooks/useCursor'

export default function Cursor() {
  const { cursorRef, dotRef } = useCursor()

  return (
    <>
      {/* Crosshair ring */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2"
        style={{ willChange: 'transform' }}
      >
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          {/* Crosshair lines */}
          <line x1="16" y1="0" x2="16" y2="10" stroke="var(--text)" strokeWidth="1" opacity="0.6"/>
          <line x1="16" y1="22" x2="16" y2="32" stroke="var(--text)" strokeWidth="1" opacity="0.6"/>
          <line x1="0" y1="16" x2="10" y2="16" stroke="var(--text)" strokeWidth="1" opacity="0.6"/>
          <line x1="22" y1="16" x2="32" y2="16" stroke="var(--text)" strokeWidth="1" opacity="0.6"/>
          {/* Corner brackets */}
          <path d="M6 10 L6 6 L10 6" stroke="var(--accent)" strokeWidth="1.5" fill="none"/>
          <path d="M22 6 L26 6 L26 10" stroke="var(--accent)" strokeWidth="1.5" fill="none"/>
          <path d="M6 22 L6 26 L10 26" stroke="var(--accent)" strokeWidth="1.5" fill="none"/>
          <path d="M22 26 L26 26 L26 22" stroke="var(--accent)" strokeWidth="1.5" fill="none"/>
        </svg>
      </div>
      {/* Orange dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] w-1.5 h-1.5 rounded-full -translate-x-1/2 -translate-y-1/2"
        style={{ backgroundColor: 'var(--accent)', willChange: 'transform' }}
      />
    </>
  )
}
