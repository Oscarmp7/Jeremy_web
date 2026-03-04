import { useState, useEffect } from 'react'

function toTimecode(date) {
  const h = String(date.getHours()).padStart(2, '0')
  const m = String(date.getMinutes()).padStart(2, '0')
  const s = String(date.getSeconds()).padStart(2, '0')
  const f = String(Math.floor(date.getMilliseconds() / 41.67)).padStart(2, '0') // 24fps frames
  return `${h}:${m}:${s}:${f}`
}

export function useLiveTimecode() {
  const [timecode, setTimecode] = useState(toTimecode(new Date()))

  useEffect(() => {
    const id = setInterval(() => setTimecode(toTimecode(new Date())), 1000 / 24)
    return () => clearInterval(id)
  }, [])

  return timecode
}
