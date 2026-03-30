import { useEffect, useState } from 'react'

const RAIN_FRAMES = ['/raintext/rain1.svg', '/raintext/rain2.svg', '/raintext/rain3.svg', '/raintext/rain4.svg', '/raintext/rain5.svg']
const CYCLE_DURATION_MS = 1000
const FRAME_DURATION_MS = 100
const FADE_DURATION_MS = 500

interface RainIntroProps {
  onComplete: () => void
}

export function RainIntro({ onComplete }: RainIntroProps) {
  const [frameIndex, setFrameIndex] = useState(0)
  const [isFading, setIsFading] = useState(false)
  const frameCount = RAIN_FRAMES.length

  useEffect(() => {
    const tick = window.setInterval(() => {
      setFrameIndex((current) => (current + 1) % frameCount)
    }, FRAME_DURATION_MS)

    const fadeTimer = window.setTimeout(() => {
      setIsFading(true)
    }, CYCLE_DURATION_MS)

    const doneTimer = window.setTimeout(() => {
      onComplete()
    }, CYCLE_DURATION_MS + FADE_DURATION_MS)

    return () => {
      window.clearInterval(tick)
      window.clearTimeout(fadeTimer)
      window.clearTimeout(doneTimer)
    }
  }, [frameCount, onComplete])

  return (
    <div className={`rain-intro${isFading ? ' rain-intro--fading' : ''}`} aria-hidden="true">
      <img className="rain-intro__image" src={RAIN_FRAMES[frameIndex]} alt="" />
    </div>
  )
}
