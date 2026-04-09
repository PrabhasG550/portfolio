import { ALL_DISCIPLINES, type Discipline } from '../data/portfolio'

const DISC_SET = new Set<string>(ALL_DISCIPLINES)

function normalizeDisciplineToken(token: string): string {
  return token.trim().toLowerCase()
}

export function parseDisciplinesFromSearch(searchParams: URLSearchParams): Discipline[] {
  const rawValues = searchParams.getAll('d')
  if (rawValues.length === 0) return []
  const picked = new Set(
    rawValues
      .flatMap((raw) => raw.split(','))
      .map(normalizeDisciplineToken)
      .filter((s): s is Discipline => DISC_SET.has(s)),
  )
  return ALL_DISCIPLINES.filter((d) => picked.has(d))
}

export function serializeDisciplinesForSearch(list: Discipline[]): string {
  const set = new Set(list)
  return ALL_DISCIPLINES.filter((d) => set.has(d)).join(',')
}

export function toggleDisciplineInSearchParams(prev: URLSearchParams, d: Discipline): URLSearchParams {
  const next = new URLSearchParams(prev)
  const current = parseDisciplinesFromSearch(next)
  const set = new Set(current)
  if (set.has(d)) set.delete(d)
  else set.add(d)
  const serialized = serializeDisciplinesForSearch([...set])
  if (!serialized) next.delete('d')
  else next.set('d', serialized)
  return next
}

/** Query suffix for `/work` and `/work/:slug` links (only `d`). */
export function workLinkSearchFromParams(searchParams: URLSearchParams): string {
  const parsed = parseDisciplinesFromSearch(searchParams)
  if (parsed.length === 0) return ''
  return `?d=${encodeURIComponent(serializeDisciplinesForSearch(parsed))}`
}
