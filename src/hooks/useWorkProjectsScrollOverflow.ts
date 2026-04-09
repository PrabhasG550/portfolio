import { useLayoutEffect, useState, type RefObject } from 'react'

/** Enables overflow-y scrolling only when content is taller than the box (avoids a scrollbar on load / when there is no overflow). */
export function useWorkProjectsScrollOverflow(
  ref: RefObject<HTMLElement | null>,
  enabled: boolean,
  measureKey: string,
): boolean {
  const [needsScroll, setNeedsScroll] = useState(false)

  useLayoutEffect(() => {
    if (!enabled) {
      setNeedsScroll(false)
      return
    }

    const el = ref.current
    if (!el) {
      setNeedsScroll(false)
      return
    }

    const measure = () => {
      const node = ref.current
      if (!node) {
        setNeedsScroll(false)
        return
      }
      const ch = node.clientHeight
      if (ch < 12) {
        return
      }
      const hasOverflow = node.scrollHeight > ch + 2
      setNeedsScroll(hasOverflow)
    }

    let rafId = 0
    const runMeasureInNextFrame = () => {
      if (rafId) cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(measure)
    }

    const settleTimeoutMs = [120, 240, 420, 700]
    const settleTimeoutIds = settleTimeoutMs.map((ms) => window.setTimeout(runMeasureInNextFrame, ms))

    runMeasureInNextFrame()
    const ro = new ResizeObserver(runMeasureInNextFrame)
    ro.observe(el)
    window.addEventListener('resize', runMeasureInNextFrame)
    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      settleTimeoutIds.forEach((id) => window.clearTimeout(id))
      ro.disconnect()
      window.removeEventListener('resize', runMeasureInNextFrame)
    }
  }, [enabled, measureKey])

  return needsScroll
}
