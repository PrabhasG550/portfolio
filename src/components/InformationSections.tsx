import { useState } from 'react'
import { portfolioOwner, type InformationSection } from '../data/portfolio'

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
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')
  const showContactForm = section.label.toLowerCase() === 'information'

  function sendEmail() {
    const params = new URLSearchParams()
    if (subject.trim()) params.set('subject', subject.trim())
    if (body.trim()) params.set('body', body.trim())
    const query = params.toString()
    window.location.href = `mailto:${portfolioOwner.email}${query ? `?${query}` : ''}`
  }

  return (
    <article
      className="information-block"
      data-information-section={section.label}
    >
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

        {showContactForm ? (
          <form
            className="information-contact-form"
            onSubmit={(e) => {
              e.preventDefault()
              sendEmail()
            }}
          >
            <label className="information-contact-form__label">
              Subject
              <input
                className="information-contact-form__input"
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Subject"
              />
            </label>
            <label className="information-contact-form__label">
              Body
              <textarea
                className="information-contact-form__textarea"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Write your message..."
                rows={6}
              />
            </label>
            <button type="submit" className="information-contact-form__submit">
              Send
            </button>
          </form>
        ) : null}
      </div>
    </article>
  )
}
