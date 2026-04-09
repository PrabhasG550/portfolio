/** sRGB channel 0–255 → linear 0–1 */
function channelToLinear(c: number) {
  const x = c / 255
  return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4)
}

export function relativeLuminance(r: number, g: number, b: number) {
  const R = channelToLinear(r)
  const G = channelToLinear(g)
  const B = channelToLinear(b)
  return 0.2126 * R + 0.7152 * G + 0.0722 * B
}

function contrastRatio(lumA: number, lumB: number) {
  const L = Math.max(lumA, lumB)
  const S = Math.min(lumA, lumB)
  return (L + 0.05) / (S + 0.05)
}

const TEXT_DARK = { r: 9, g: 9, b: 9 }
const TEXT_LIGHT = { r: 246, g: 246, b: 246 }

function lumOfRgb(rgb: { r: number; g: number; b: number }) {
  return relativeLuminance(rgb.r, rgb.g, rgb.b)
}

/**
 * Average color from canvas ImageData (downsampled). Returns RGB 0–255.
 */
export function averageColorFromImageData(data: Uint8ClampedArray, width: number, height: number) {
  let r = 0
  let g = 0
  let b = 0
  let n = 0
  const step = 6
  for (let y = 0; y < height; y += step) {
    for (let x = 0; x < width; x += step) {
      const i = (y * width + x) * 4
      r += data[i]
      g += data[i + 1]
      b += data[i + 2]
      n++
    }
  }
  if (n === 0) return { r: 240, g: 240, b: 240 }
  return { r: Math.round(r / n), g: Math.round(g / n), b: Math.round(b / n) }
}

/**
 * Build a page background from dominant rgb and pick light/dark text so contrast ≥ target (WCAG-ish for body).
 */
export function themeFromAverageRgb(avg: { r: number; g: number; b: number }, minContrast = 4.5) {
  let bg = { ...avg }
  const textDarkLum = lumOfRgb(TEXT_DARK)
  const textLightLum = lumOfRgb(TEXT_LIGHT)
  let bgLum = lumOfRgb(bg)

  let useLightText = bgLum <= 0.45
  let textLum = useLightText ? textLightLum : textDarkLum
  let ratio = contrastRatio(bgLum, textLum)

  let guard = 0
  while (ratio < minContrast && guard < 24) {
    if (useLightText) {
      bg = {
        r: Math.round(bg.r * 0.88),
        g: Math.round(bg.g * 0.88),
        b: Math.round(bg.b * 0.88),
      }
    } else {
      bg = {
        r: Math.min(255, Math.round(bg.r + (255 - bg.r) * 0.12)),
        g: Math.min(255, Math.round(bg.g + (255 - bg.g) * 0.12)),
        b: Math.min(255, Math.round(bg.b + (255 - bg.b) * 0.12)),
      }
    }
    bgLum = lumOfRgb(bg)
    useLightText = bgLum <= 0.45
    textLum = useLightText ? textLightLum : textDarkLum
    ratio = contrastRatio(bgLum, textLum)
    guard++
  }

  const textRgb = useLightText ? TEXT_LIGHT : TEXT_DARK
  const mutedAlpha = useLightText ? 0.72 : 0.56

  return {
    background: `rgb(${bg.r}, ${bg.g}, ${bg.b})`,
    text: `rgb(${textRgb.r}, ${textRgb.g}, ${textRgb.b})`,
    muted: useLightText
      ? `rgba(246, 246, 246, ${mutedAlpha})`
      : `rgba(9, 9, 9, ${mutedAlpha})`,
    line: useLightText ? 'rgba(246, 246, 246, 0.35)' : 'rgba(9, 9, 9, 0.35)',
    linkUnderline: useLightText ? 'rgba(246, 246, 246, 0.95)' : 'rgba(9, 9, 9, 0.85)',
  }
}
