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
        {section.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        {section.links?.length ? (
          <div className="information-block__links">
            {section.links.map((link) => (
              <>
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
                >
                  {link.label}
                </a>
                {link.label === 'LinkedIn' ? (
                  <span className="information-block__links-spacer" aria-hidden="true" />
                ) : null}
              </>
            ))}
          </div>
        ) : null}
      </div>
    </article>
  )
}
