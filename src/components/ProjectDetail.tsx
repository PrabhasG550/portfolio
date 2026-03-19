import type { ProjectEntry } from '../data/portfolio'

interface ProjectDetailProps {
  project: ProjectEntry
  viewport: 'desktop' | 'tablet' | 'mobile'
}

export function ProjectDetail({ project, viewport }: ProjectDetailProps) {
  return (
    <article className={`project-detail project-detail--${viewport}`}>
      <div
        className="project-detail__hero"
        style={{ background: project.artwork }}
      >
        <div className="project-detail__hero-veil" />
      </div>

      <div className="project-detail__header">
        <h1 className="project-detail__title">{project.title}</h1>
      </div>

      <div className="project-detail__meta">
        <span>{project.year}</span>
        <span className="project-detail__meta-sep" aria-hidden="true">
          ·
        </span>
        <span>{project.tags.join(' / ')}</span>
      </div>

      <hr className="project-detail__rule" />

      <div className="project-detail__body">
        <p>{project.summary}</p>
      </div>

      <div className="project-detail__gallery">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="project-detail__gallery-item"
            style={{
              background: project.artwork,
              filter: `hue-rotate(${i * 6}deg) brightness(${1 + i * 0.02})`,
            }}
          />
        ))}
      </div>

      <div className="project-detail__writing">
        <p>
          This project explores the intersection of form, function, and feeling
          &mdash; building a visual language that moves quietly but deliberately
          across surfaces and screens.
        </p>
        <p>
          Every element is considered: spacing, weight, rhythm. The result is a
          system that breathes, invites pause, and rewards attention.
        </p>
      </div>
    </article>
  )
}
