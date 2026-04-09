import { useEffect, useState, type CSSProperties } from 'react'
import { averageColorFromImageData, themeFromAverageRgb } from '../lib/thumbnailTheme'

export function useProjectDetailTheme(thumbnailSrc: string | undefined, enabled: boolean) {
  const [vars, setVars] = useState<CSSProperties>({})

  useEffect(() => {
    if (!enabled || !thumbnailSrc) {
      setVars({})
      return
    }

    const img = new Image()
    img.decoding = 'async'
    img.src = thumbnailSrc

    const apply = () => {
      const w = 72
      const h = 72
      const canvas = document.createElement('canvas')
      canvas.width = w
      canvas.height = h
      const ctx = canvas.getContext('2d', { willReadFrequently: true })
      if (!ctx) return
      try {
        ctx.drawImage(img, 0, 0, w, h)
        const { data } = ctx.getImageData(0, 0, w, h)
        const avg = averageColorFromImageData(data, w, h)
        const t = themeFromAverageRgb(avg)
        setVars({
          '--project-surface': t.background,
          '--project-text': t.text,
          '--project-muted': t.muted,
          '--project-line': t.line,
          '--project-link': t.linkUnderline,
          backgroundColor: t.background,
          color: t.text,
        } as CSSProperties)
      } catch {
        setVars({})
      }
    }

    img.onload = apply
    img.onerror = () => setVars({})

    return () => {
      img.onload = null
      img.onerror = null
    }
  }, [thumbnailSrc, enabled])

  return vars
}
