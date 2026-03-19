import { motion, useReducedMotion } from 'framer-motion'
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
      {projects.map((project, index) => (
        <ProjectCard
          key={`${project.title}-${project.year}`}
          index={index}
          project={project}
          sectionSlug={sectionSlug}
        />
      ))}
      {viewport === 'tablet' ? <div className="project-gallery__fade" aria-hidden="true" /> : null}
    </section>
  )
}

function ProjectCard({
  index,
  project,
  sectionSlug,
}: {
  index: number
  project: ProjectEntry
  sectionSlug: string
}) {
  const prefersReducedMotion = useReducedMotion()
  const navigate = useNavigate()

  return (
    <motion.article
      animate={{ opacity: 1, y: 0 }}
      className="project-card"
      id={project.slug}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
      onClick={() => navigate(`/category/${sectionSlug}/${project.slug}`)}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.6,
        delay: prefersReducedMotion ? 0 : 0.05 * index,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={prefersReducedMotion ? undefined : { y: -8 }}
      whileTap={prefersReducedMotion ? undefined : { scale: 0.995 }}
    >
      <div className="project-card__artwork" style={{ background: project.artwork }}>
        <div className="project-card__veil" aria-hidden="true" />
        <div className="project-card__content">
          <div className="project-card__meta">
            <p>{project.year}</p>
            <p>{project.tags.join(' / ')}</p>
          </div>
          <p className="project-card__summary">{project.summary}</p>
        </div>
      </div>
      <div className="project-card__footer">
        <p className="project-card__title">{project.title}</p>
      </div>
    </motion.article>
  )
}
