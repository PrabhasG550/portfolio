import { useEffect, useState } from 'react'
import {
  formatDisciplines,
  type ProjectDetailFigure,
  type ProjectDetailGallery,
  type ProjectEntry,
} from '../data/portfolio'
import { TechnologyDetailHero } from './TechnologyProjectMedia'

interface ProjectDetailProps {
  project: ProjectEntry
  viewport: 'desktop' | 'tablet' | 'mobile'
  thumbFailed: boolean
  onThumbnailError: () => void
}

export function ProjectDetail({
  project,
  viewport,
  thumbFailed,
  onThumbnailError,
}: ProjectDetailProps) {
  const isTechnology = Boolean(project.useTechnologyPresentation)
  const sections = project.detailSections ?? []
  const links = project.externalLinks ?? []
  const [videoPlaying, setVideoPlaying] = useState(false)

  useEffect(() => {
    setVideoPlaying(false)
  }, [project.slug])

  return (
    <article className={`project-detail project-detail--${viewport}`}>
      {isTechnology ? (
        <TechnologyDetailHero
          title={project.title}
          artwork={project.artwork}
          thumbnailSrc={project.thumbnailSrc}
          youtubeVideoId={project.youtubeVideoId}
          videoPlaying={videoPlaying}
          onPlayVideo={() => setVideoPlaying(true)}
          thumbFailed={thumbFailed}
          onThumbError={onThumbnailError}
        />
      ) : (
        <div className="project-detail__hero" style={{ background: project.artwork }}>
          <div className="project-detail__hero-veil" />
        </div>
      )}

      <div className="project-detail__header">
        <h1 className="project-detail__title">{project.title}</h1>
      </div>

      <div className="project-detail__meta">
        <span>{project.year}</span>
        <span className="project-detail__meta-sep" aria-hidden="true">
          ·
        </span>
        <span>{formatDisciplines(project.disciplines)}</span>
      </div>
      {project.tags.length ? (
        <p className="project-detail__tags-secondary">{project.tags.join(' · ')}</p>
      ) : null}

      <hr className="project-detail__rule" />

      <div className="project-detail__body">
        <p>{project.summary}</p>
      </div>

      {links.length > 0 ? (
        <ul className="project-detail__links">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} target="_blank" rel="noopener noreferrer">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      ) : null}

      {sections.length > 0 ? (
        <div className="project-detail__sections">
          {sections.map((section, i) => (
            <section key={i} className="project-detail__section">
              {section.heading ? (
                <h2 className="project-detail__section-heading">{section.heading}</h2>
              ) : null}
              {section.paragraphs.map((p, j) => (
                <p
                  key={j}
                  className={
                    section.preserveParagraphLineBreaks
                      ? 'project-detail__section-paragraph project-detail__section-paragraph--preline'
                      : undefined
                  }
                >
                  {p}
                </p>
              ))}
              {(section.figures ?? []).map((fig, k) => (
                <SectionFigure key={`${fig.src}-${k}`} figure={fig} />
              ))}
              {(section.galleries ?? []).map((gallery, k) => (
                <SectionGallery key={`${gallery.heading ?? 'gallery'}-${k}`} gallery={gallery} />
              ))}
            </section>
          ))}
        </div>
      ) : null}
    </article>
  )
}

function SectionFigure({ figure }: { figure: ProjectDetailFigure }) {
  const [hidden, setHidden] = useState(false)
  if (hidden) return null
  return (
    <figure className="project-detail__figure">
      <img
        className="project-detail__figure-img"
        src={figure.src}
        alt={figure.caption}
        loading="lazy"
        decoding="async"
        onError={() => setHidden(true)}
      />
    </figure>
  )
}

function SectionGallery({ gallery }: { gallery: ProjectDetailGallery }) {
  const layout = gallery.layout ?? 'mosaic'
  const mosaic = layout === 'mosaic'
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  useEffect(() => {
    if (activeIndex === null) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveIndex(null)
        return
      }
      if (!mosaic) return
      if (e.key === 'ArrowRight') {
        setActiveIndex((i) => (i === null ? 0 : (i + 1) % gallery.images.length))
      }
      if (e.key === 'ArrowLeft') {
        setActiveIndex((i) =>
          i === null ? 0 : (i - 1 + gallery.images.length) % gallery.images.length,
        )
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [activeIndex, gallery.images.length, mosaic])

  return (
    <div className="project-detail__gallery">
      {gallery.heading ? <h3 className="project-detail__gallery-heading">{gallery.heading}</h3> : null}
      <div className={`project-detail__gallery-grid project-detail__gallery-grid--${layout}`}>
        {gallery.images.map((figure, i) => (
          <div key={`${figure.src}-${i}`} className={layout === 'mosaic' ? 'project-detail__gallery-item' : undefined}>
            {mosaic ? (
              <button
                type="button"
                className="project-detail__lightbox-trigger"
                onClick={() => setActiveIndex(i)}
                aria-label="Open photo"
              >
                <SectionFigure figure={figure} />
              </button>
            ) : (
              <SectionFigure figure={figure} />
            )}
          </div>
        ))}
      </div>

      {mosaic && activeIndex !== null ? (
        <div
          className="project-detail__lightbox"
          role="dialog"
          aria-modal="true"
          onClick={() => setActiveIndex(null)}
        >
          <div className="project-detail__lightbox-inner" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="project-detail__lightbox-close"
              onClick={() => setActiveIndex(null)}
              aria-label="Close"
            >
              Close
            </button>
            <img
              className="project-detail__lightbox-img"
              src={gallery.images[activeIndex]?.src}
              alt=""
              decoding="async"
            />
            {gallery.images.length > 1 ? (
              <>
                <button
                  type="button"
                  className="project-detail__lightbox-nav project-detail__lightbox-nav--prev"
                  onClick={() =>
                    setActiveIndex((i) =>
                      i === null ? 0 : (i - 1 + gallery.images.length) % gallery.images.length,
                    )
                  }
                  aria-label="Previous"
                >
                  Prev
                </button>
                <button
                  type="button"
                  className="project-detail__lightbox-nav project-detail__lightbox-nav--next"
                  onClick={() =>
                    setActiveIndex((i) => (i === null ? 0 : (i + 1) % gallery.images.length))
                  }
                  aria-label="Next"
                >
                  Next
                </button>
              </>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  )
}
