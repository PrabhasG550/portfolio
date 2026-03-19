import { useNavigate } from 'react-router-dom'
import type { ProjectEntry } from '../data/portfolio'

interface ProjectGalleryProps {
  projects: ProjectEntry[]
  sectionSlug: string
  viewport: 'desktop' | 'tablet' | 'mobile'
}

export function ProjectGallery({ projects, sectionSlug, viewport }: ProjectGalleryProps) {
  return (
    <section className={`project-gallery project-gallery--${viewport}`}>
      {projects.map((project) => (
        <ProjectCard
          key={`${project.title}-${project.year}`}
          project={project}
          sectionSlug={sectionSlug}
        />
      ))}
      {viewport !== 'desktop' ? <div className="project-gallery__fade" aria-hidden="true" /> : null}
    </section>
  )
}

function ProjectCard({
  project,
  sectionSlug,
}: {
  project: ProjectEntry
  sectionSlug: string
}) {
  const navigate = useNavigate()

  return (
    <article
      className="project-card"
      id={project.slug}
      onClick={() => navigate(`/category/${sectionSlug}/${project.slug}`)}
    >
      <div className="project-card__artwork" style={{ background: project.artwork }} />
      <div className="project-card__footer">
        <p className="project-card__title">{project.title}</p>
        <p className="project-card__details">{project.details}</p>
      </div>
    </article>
  )
}
