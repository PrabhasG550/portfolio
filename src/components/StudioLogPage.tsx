interface StudioLogPageProps {
  viewport: 'desktop' | 'tablet' | 'mobile'
}

type LogUpdate = {
  timestamp: string
  title: string
  details: string[]
}

// Monthly reflections (edit this array as you add new months).
// One entry per month works best with the month grouping UI.
const updates: LogUpdate[] = [
  {
    timestamp: '2026-03-31T10:00:00-05:00',
    title: 'Monthly reflection',
    details: [
      'Updates & layout: turned the wiki panel into a clean monthly log and balanced the right-side space.',
      'Typography: aligned nav sizing and kept the log typography consistent.',
      'Next focus: keep refining the log readability (spacing, headings, and navigation flow).',
    ],
  },
  {
    timestamp: '2026-02-29T12:15:00-05:00',
    title: 'Monthly reflection',
    details: [
      'Updates & layout: introduced the log structure and ensured the wiki/category experience still works on mobile.',
      'Typography: switched section/body styling away from wiki defaults and toward your site fonts.',
      'Next focus: improve the visual hierarchy of the timeline (month group headers and entry titles).',
    ],
  },
  {
    timestamp: '2025-12-15T18:30:00-05:00',
    title: 'Monthly reflection',
    details: [
      'Updates & layout: started building the two-column navigation + right-panel content wireframes.',
      'Typography: established consistent font loading so headings and body text match the site style.',
      'Next focus: continue iterating on spacing and responsiveness.',
    ],
  },
]

function formatLogTimestamp(isoTimestamp: string) {
  const date = new Date(isoTimestamp)
  const time = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
    .format(date)
    .replace(' AM', 'AM')
    .replace(' PM', 'PM')

  const day = new Intl.DateTimeFormat('en-US', {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
  }).format(date)

  return `${time} ${day}`
}

export function StudioLogPage({ viewport }: StudioLogPageProps) {
  const sortedUpdates = [...updates].sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1))
  const currentYear = new Date().getFullYear()

  const monthGroups = new Map<string, { year: number; monthIndex: number; entries: LogUpdate[] }>()
  for (const entry of sortedUpdates) {
    const d = new Date(entry.timestamp)
    const year = d.getFullYear()
    const monthIndex = d.getMonth() // 0-11
    const key = `${year}-${monthIndex}`

    const group = monthGroups.get(key)
    if (group) {
      group.entries.push(entry)
    } else {
      monthGroups.set(key, { year, monthIndex, entries: [entry] })
    }
  }

  const monthGroupList = Array.from(monthGroups.values())
  // Ensure group order is descending by year+month
  monthGroupList.sort((a, b) => (a.year !== b.year ? b.year - a.year : b.monthIndex - a.monthIndex))

  const monthLabel = (year: number, monthIndex: number) => {
    const monthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date(year, monthIndex, 1))
    return year === currentYear ? monthName : `${monthName} ${year}`
  }

  return (
    <section className={`log-page log-page--${viewport}`}>
      <div className="log-page__main">
        <section className="log-page__block" aria-label="Current updates">
          <h2 className="log-page__block-title">Live updates</h2>
          <div className="log-timeline">
            {monthGroupList.map((group) => (
              <div className="log-month-group" key={`${group.year}-${group.monthIndex}`}>
                <p className="log-month-header">{monthLabel(group.year, group.monthIndex)}</p>

                {group.entries.map((entry) => (
                  <article className="log-timeline__entry" key={`${entry.timestamp}-${entry.title}`}>
                    <p className="log-timeline__date">
                      <time dateTime={entry.timestamp}>{formatLogTimestamp(entry.timestamp)}</time>
                    </p>
                    <h3 className="log-timeline__title">{entry.title}</h3>
                    {entry.details.length ? (
                      <ul className="log-timeline__list">
                        {entry.details.map((detail) => (
                          <li key={detail}>{detail}</li>
                        ))}
                      </ul>
                    ) : null}
                  </article>
                ))}
              </div>
            ))}
          </div>
        </section>
      </div>
    </section>
  )
}
