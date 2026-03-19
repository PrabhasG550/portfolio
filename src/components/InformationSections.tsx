import type { InformationSection } from '../data/portfolio'

interface InformationSectionsProps {
  sections: InformationSection[]
  viewport: 'desktop' | 'tablet' | 'mobile'
}

export function InformationSections({ sections, viewport }: InformationSectionsProps) {
  return (
    <section className={`information-sections information-sections--${viewport}`}>
      {sections.map((section) => (
        <InformationBlock key={section.label} section={section} />
      ))}
    </section>
  )
}

function InformationBlock({ section }: { section: InformationSection }) {
  return (
    <article className="information-block">
      <div className="information-block__header">
        <div className="information-block__divider" aria-hidden="true" />
        <p
          className={`information-block__label${
            section.headingSize === 'body' ? ' information-block__label--body' : ''
          }`}
        >
          {section.label.toUpperCase()}
        </p>
      </div>
      <div className="information-block__body">
        {section.paragraphs.map((paragraph, index) => {
          const isLastParagraph = index === section.paragraphs.length - 1
          const flushAfter = Boolean(section.links?.length) && isLastParagraph

          return (
            <p
              key={paragraph}
              className={[
                'information-block__paragraph',
                flushAfter ? 'information-block__paragraph--flush' : null,
              ]
                .filter(Boolean)
                .join(' ')}
            >
              {paragraph}
            </p>
          )
        })}
        {section.links?.length ? (
          <div className="information-block__links">
            {section.links.map((link) => {
              const isExternal = link.href.startsWith('http')
              const isResume = link.label.toLowerCase() === 'view resume' || link.href.toLowerCase().endsWith('.pdf')
              const shouldNewTab = isExternal || isResume

              return (
                <div key={link.label}>
                  {isResume ? (
                    <span className="information-block__links-spacer" aria-hidden="true" />
                  ) : null}
                  <a
                    href={link.href}
                    target={shouldNewTab ? '_blank' : undefined}
                    rel={shouldNewTab ? 'noreferrer' : undefined}
                  >
                    {link.label}
                  </a>
                  {link.href.startsWith('mailto:') ? (
                    <span className="information-block__links-spacer" aria-hidden="true" />
                  ) : null}
                </div>
              )
            })}
          </div>
        ) : null}
      </div>
    </article>
  )
}
