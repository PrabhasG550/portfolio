import { motion, useReducedMotion } from 'framer-motion'
import type { ProjectEntry } from '../data/portfolio'

interface ProjectDetailProps {
  project: ProjectEntry
  viewport: 'desktop' | 'tablet' | 'mobile'
}

export function ProjectDetail({ project, viewport }: ProjectDetailProps) {
  const prefersReducedMotion = useReducedMotion()
  const stagger = (step: number) => (prefersReducedMotion ? 0 : 0.08 * step)

  return (
    <article className={`project-detail project-detail--${viewport}`}>
      <motion.div
        className="project-detail__hero"
        style={{ background: project.artwork }}
        initial={prefersReducedMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="project-detail__hero-veil" />
      </motion.div>

      <motion.div
        className="project-detail__header"
        initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: stagger(1), ease: [0.22, 1, 0.36, 1] }}
      >
        <h1 className="project-detail__title">{project.title}</h1>
      </motion.div>

      <motion.div
        className="project-detail__meta"
        initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: stagger(2), ease: [0.22, 1, 0.36, 1] }}
      >
        <span>{project.year}</span>
        <span className="project-detail__meta-sep" aria-hidden="true">
          ·
        </span>
        <span>{project.tags.join(' / ')}</span>
      </motion.div>

      <motion.hr
        className="project-detail__rule"
        initial={prefersReducedMotion ? false : { scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.6, delay: stagger(3), ease: [0.22, 1, 0.36, 1] }}
      />

      <motion.div
        className="project-detail__body"
        initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: stagger(4), ease: [0.22, 1, 0.36, 1] }}
      >
        <p>{project.summary}</p>
      </motion.div>

      <div className="project-detail__gallery">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="project-detail__gallery-item"
            style={{
              background: project.artwork,
              filter: `hue-rotate(${i * 6}deg) brightness(${1 + i * 0.02})`,
            }}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: stagger(5 + i),
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        ))}
      </div>

      <motion.div
        className="project-detail__writing"
        initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: stagger(8), ease: [0.22, 1, 0.36, 1] }}
      >
        <p>
          This project explores the intersection of form, function, and feeling
          &mdash; building a visual language that moves quietly but deliberately
          across surfaces and screens.
        </p>
        <p>
          Every element is considered: spacing, weight, rhythm. The result is a
          system that breathes, invites pause, and rewards attention.
        </p>
      </motion.div>
    </article>
  )
}
