import { motion, useReducedMotion } from 'framer-motion'
import type { InformationSection } from '../data/portfolio'

interface InformationSectionsProps {
  sections: InformationSection[]
  viewport: 'desktop' | 'tablet' | 'mobile'
}

export function InformationSections({ sections, viewport }: InformationSectionsProps) {
  return (
    <section className={`information-sections information-sections--${viewport}`}>
      {sections.map((section, index) => (
        <InformationBlock key={section.label} index={index} section={section} />
      ))}
    </section>
  )
}

function InformationBlock({ index, section }: { index: number; section: InformationSection }) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.article
      animate={{ opacity: 1, y: 0 }}
      className="information-block"
      initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.55,
        delay: prefersReducedMotion ? 0 : 0.06 * index,
        ease: [0.22, 1, 0.36, 1],
      }}
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
    </motion.article>
  )
}
