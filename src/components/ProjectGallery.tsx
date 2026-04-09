import { useNavigate, useSearchParams } from 'react-router-dom'
import { formatDisciplines, youtubeEmbedSrc, type ProjectEntry } from '../data/portfolio'
import { workLinkSearchFromParams } from '../lib/workFilterSearchParams'
import { TechnologyCardArtwork } from './TechnologyProjectMedia'

interface ProjectGalleryProps {
  projects: ProjectEntry[]
  viewport: 'desktop' | 'tablet' | 'mobile'
}

export function ProjectGallery({ projects, viewport }: ProjectGalleryProps) {
  return (
    <section className={`project-gallery project-gallery--${viewport}`}>
      {projects.map((project) => (
        <ProjectCard key={`${project.title}-${project.year}`} project={project} />
      ))}
      {viewport !== 'desktop' ? <div className="project-gallery__fade" aria-hidden="true" /> : null}
    </section>
  )
}

function ProjectCard({ project }: { project: ProjectEntry }) {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const richTech = Boolean(project.useTechnologyPresentation)
  const hasVideo = Boolean(project.youtubeVideoId)

  return (
    <article
      className="project-card"
      id={project.slug}
      onClick={() => navigate(`/work/${project.slug}${workLinkSearchFromParams(searchParams)}`)}
    >
      {richTech ? (
        <TechnologyCardArtwork
          title={project.title}
          artwork={project.artwork}
          thumbnailSrc={project.thumbnailSrc}
          youtubeVideoId={project.youtubeVideoId}
        />
      ) : hasVideo && project.youtubeVideoId ? (
        <div
          className="project-card__artwork project-card__artwork--video"
          onClick={(e) => e.stopPropagation()}
          role="presentation"
        >
          <iframe
            className="project-card__iframe"
            title={`${project.title} demo video`}
            src={youtubeEmbedSrc(project.youtubeVideoId)}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      ) : (
        <div className="project-card__artwork" style={{ background: project.artwork }} />
      )}
      <div className="project-card__footer">
        <div className="project-card__footer-left">
          <p className="project-card__title">{project.title}</p>
          {project.tags.length ? (
            <p className="project-card__tags">{project.tags.join(' · ')}</p>
          ) : null}
        </div>
        <p className="project-card__disciplines">{formatDisciplines(project.disciplines)}</p>
      </div>
    </article>
  )
}
