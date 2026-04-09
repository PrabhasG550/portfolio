import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { ALL_DISCIPLINES, DISCIPLINE_LABELS, portfolioProjects, type Discipline } from '../data/portfolio'
import { useWorkProjectsScrollOverflow } from '../hooks/useWorkProjectsScrollOverflow'
import {
  parseDisciplinesFromSearch,
  toggleDisciplineInSearchParams,
  workLinkSearchFromParams,
} from '../lib/workFilterSearchParams'

function BrandMark() {
  return (
    <span className="brand-mark">
      <span className="brand-mark__name">Studio Rain</span>
      <span className="brand-mark__byline">by Prabhas Gade</span>
    </span>
  )
}

function WorkFilterIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width={18}
      height={18}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M4 6h16M7 12h10M10 18h4"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </svg>
  )
}

export interface WorkDisciplineFiltersProps {
  selected: Discipline[]
  onToggle: (d: Discipline) => void
}

interface DesktopNavigationProps {
  activeWork?: boolean
  activeInProgress?: boolean
  activeProjectSlug?: string
  activeInfo?: boolean
  activeWiki?: boolean
  workDisciplineFilters?: WorkDisciplineFiltersProps
}

interface NavigationMenuProps {
  variant: 'tablet' | 'mobile'
  showInfo?: boolean
}

interface MobileTopBarProps {
  mode?: 'toggle' | 'home'
  menuOpen?: boolean
  onToggle?: () => void
}

interface MobileMenuOverlayProps {
  open: boolean
  activeWork?: boolean
  activeInProgress?: boolean
  activeProjectSlug?: string
  onClose: () => void
  workDisciplineFilters?: WorkDisciplineFiltersProps
}

interface SectionLinksProps {
  activeWork?: boolean
  activeInProgress?: boolean
  activeProjectSlug?: string
  activeInfo?: boolean
  activeWiki?: boolean
  workDisciplineFilters?: WorkDisciplineFiltersProps
  onNavigate?: () => void
  interaction?: 'hover' | 'tap'
}

export function DesktopNavigation({
  activeWork,
  activeInProgress,
  activeProjectSlug,
  activeInfo,
  activeWiki,
  workDisciplineFilters,
}: DesktopNavigationProps) {
  return (
    <aside className="desktop-navigation">
      <Link className="site-title" to="/">
        <BrandMark />
      </Link>
      <div className="desktop-navigation__stack">
        <SectionLinks
          activeWork={activeWork}
          activeInProgress={activeInProgress}
          activeProjectSlug={activeProjectSlug}
          activeInfo={activeInfo}
          activeWiki={activeWiki}
          workDisciplineFilters={workDisciplineFilters}
          interaction="hover"
        />
      </div>
    </aside>
  )
}

export function NavigationMenu({ variant, showInfo = false }: NavigationMenuProps) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <div className={`navigation-menu navigation-menu--${variant}`}>
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <Link className="site-title" to="/">
          <BrandMark />
        </Link>
      </motion.div>
      <SectionLinks interaction="tap" />
      {showInfo ? (
        <motion.div
          className="navigation-menu__info"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.55,
            delay: prefersReducedMotion ? 0 : 0.12,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <Link className="site-title site-title--footer" to="/info">
            Info/Contact
          </Link>
        </motion.div>
      ) : null}
    </div>
  )
}

export function MobileTopBar({
  mode = 'toggle',
  menuOpen = false,
  onToggle,
}: MobileTopBarProps) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <header className="mobile-topbar">
      <Link className="site-title mobile-topbar__title" to="/">
        <BrandMark />
      </Link>
      {mode === 'home' ? (
        <motion.div
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          whileHover={prefersReducedMotion ? undefined : { rotate: 90 }}
          whileTap={prefersReducedMotion ? undefined : { scale: 0.92 }}
        >
          <Link aria-label="Go back to navigation" className="menu-toggle" to="/">
            <span className="menu-toggle__icon">+</span>
          </Link>
        </motion.div>
      ) : (
        <motion.button
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          className="menu-toggle"
          onClick={onToggle}
          whileHover={prefersReducedMotion ? undefined : { rotate: 90 }}
          whileTap={prefersReducedMotion ? undefined : { scale: 0.92 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          type="button"
        >
          <motion.span
            animate={{ rotate: menuOpen ? 45 : 0 }}
            className="menu-toggle__icon"
            transition={{ duration: prefersReducedMotion ? 0 : 0.42, ease: [0.22, 1, 0.36, 1] }}
          >
            +
          </motion.span>
        </motion.button>
      )}
    </header>
  )
}

export function MobileMenuOverlay({
  open,
  activeWork,
  activeInProgress,
  activeProjectSlug,
  onClose,
  workDisciplineFilters,
}: MobileMenuOverlayProps) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          animate={{ opacity: 1 }}
          className="mobile-menu-overlay"
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
        >
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="mobile-menu-overlay__panel"
            exit={{ opacity: 0, y: 18 }}
            initial={{ opacity: 0, y: 18 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <SectionLinks
              activeWork={activeWork}
              activeInProgress={activeInProgress}
              activeProjectSlug={activeProjectSlug}
              workDisciplineFilters={workDisciplineFilters}
              onNavigate={onClose}
              interaction="tap"
            />
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

function SectionLinks({
  activeWork,
  activeInProgress,
  activeProjectSlug,
  activeInfo,
  activeWiki,
  workDisciplineFilters,
  onNavigate,
  interaction = 'tap',
}: SectionLinksProps) {
  const prefersReducedMotion = useReducedMotion()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [workHovered, setWorkHovered] = useState(false)
  const [workTappedOpen, setWorkTappedOpen] = useState(false)
  const [workTreeExpandedSettled, setWorkTreeExpandedSettled] = useState(false)
  const workTreeSettleRafRef = useRef<number | null>(null)
  const [inProgressHovered, setInProgressHovered] = useState(false)
  const [inProgressTappedOpen, setInProgressTappedOpen] = useState(false)
  const [inProgressTreeExpandedSettled, setInProgressTreeExpandedSettled] = useState(false)
  const inProgressTreeSettleRafRef = useRef<number | null>(null)

  const isHoverMode = interaction === 'hover'

  useEffect(() => {
    if (activeWork) {
      setWorkTappedOpen(true)
      setInProgressTappedOpen(false)
    }
  }, [activeWork])
  useEffect(() => {
    if (activeInProgress) {
      setInProgressTappedOpen(true)
      setWorkTappedOpen(false)
    }
  }, [activeInProgress])

  const workTreeOpen = isHoverMode ? workHovered || !!activeWork : workTappedOpen
  const inProgressTreeOpen = isHoverMode ? inProgressHovered || !!activeInProgress : inProgressTappedOpen

  useEffect(() => {
    if (!workTreeOpen) {
      if (workTreeSettleRafRef.current !== null) {
        window.cancelAnimationFrame(workTreeSettleRafRef.current)
        workTreeSettleRafRef.current = null
      }
      setWorkTreeExpandedSettled(false)
      return
    }
    if (prefersReducedMotion) {
      setWorkTreeExpandedSettled(true)
      return
    }
    const firstFrame = window.requestAnimationFrame(() => {
      const secondFrame = window.requestAnimationFrame(() => {
        setWorkTreeExpandedSettled(true)
        workTreeSettleRafRef.current = null
      })
      workTreeSettleRafRef.current = secondFrame
    })
    workTreeSettleRafRef.current = firstFrame
    return () => {
      if (workTreeSettleRafRef.current !== null) {
        window.cancelAnimationFrame(workTreeSettleRafRef.current)
        workTreeSettleRafRef.current = null
      }
    }
  }, [prefersReducedMotion, workTreeOpen])
  useEffect(() => {
    if (!inProgressTreeOpen) {
      if (inProgressTreeSettleRafRef.current !== null) {
        window.cancelAnimationFrame(inProgressTreeSettleRafRef.current)
        inProgressTreeSettleRafRef.current = null
      }
      setInProgressTreeExpandedSettled(false)
      return
    }
    if (prefersReducedMotion) {
      setInProgressTreeExpandedSettled(true)
      return
    }
    const firstFrame = window.requestAnimationFrame(() => {
      const secondFrame = window.requestAnimationFrame(() => {
        setInProgressTreeExpandedSettled(true)
        inProgressTreeSettleRafRef.current = null
      })
      inProgressTreeSettleRafRef.current = secondFrame
    })
    inProgressTreeSettleRafRef.current = firstFrame
    return () => {
      if (inProgressTreeSettleRafRef.current !== null) {
        window.cancelAnimationFrame(inProgressTreeSettleRafRef.current)
        inProgressTreeSettleRafRef.current = null
      }
    }
  }, [inProgressTreeOpen, prefersReducedMotion])

  useEffect(
    () => () => {
      if (workTreeSettleRafRef.current !== null) {
        window.cancelAnimationFrame(workTreeSettleRafRef.current)
      }
      if (inProgressTreeSettleRafRef.current !== null) {
        window.cancelAnimationFrame(inProgressTreeSettleRafRef.current)
      }
    },
    [],
  )

  function handleWorkMobileTap() {
    if (workTappedOpen) {
      navigate(`/work${workLinkSearchFromParams(searchParams)}`)
      onNavigate?.()
    } else {
      setWorkTappedOpen(true)
      setInProgressTappedOpen(false)
    }
  }
  function handleInProgressMobileTap() {
    if (inProgressTappedOpen) {
      navigate(`/in-progress${workLinkSearchFromParams(searchParams)}`)
      onNavigate?.()
    } else {
      setInProgressTappedOpen(true)
      setWorkTappedOpen(false)
    }
  }

  const workSearchSuffix = workLinkSearchFromParams(searchParams)

  const derivedWorkDisciplineFilters = useMemo<WorkDisciplineFiltersProps>(
    () => ({
      selected: parseDisciplinesFromSearch(searchParams),
      onToggle: (d: Discipline) => {
        setSearchParams(toggleDisciplineInSearchParams(searchParams, d), { replace: true })
      },
    }),
    [searchParams, setSearchParams],
  )
  const effectiveWorkDisciplineFilters = workDisciplineFilters ?? derivedWorkDisciplineFilters

  const [workProjects, inProgressProjects] = useMemo(() => {
    const work: typeof portfolioProjects = []
    const inProgress: typeof portfolioProjects = []
    for (const project of portfolioProjects) {
      if (project.navCategory === 'in-progress') inProgress.push(project)
      else work.push(project)
    }
    return [work, inProgress]
  }, [])

  const visibleWorkProjects = useMemo(() => {
    const sel = effectiveWorkDisciplineFilters.selected
    if (sel.length === 0) return workProjects
    return workProjects.filter((p) => sel.every((d) => p.disciplines.includes(d)))
  }, [effectiveWorkDisciplineFilters.selected, workProjects])
  const visibleInProgressProjects = useMemo(() => {
    const sel = effectiveWorkDisciplineFilters.selected
    if (sel.length === 0) return inProgressProjects
    return inProgressProjects.filter((p) => sel.every((d) => p.disciplines.includes(d)))
  }, [effectiveWorkDisciplineFilters.selected, inProgressProjects])

  const workProjectsScrollRef = useRef<HTMLDivElement>(null)
  const [workMeasurePulse, setWorkMeasurePulse] = useState(0)
  const workScrollMeasureKey = useMemo(
    () => `${visibleWorkProjects.map((p) => p.slug).join('|')}::${workMeasurePulse}`,
    [visibleWorkProjects, workMeasurePulse],
  )
  const workProjectsNeedScroll = useWorkProjectsScrollOverflow(
    workProjectsScrollRef,
    workTreeOpen && workTreeExpandedSettled,
    workScrollMeasureKey,
  )
  const inProgressProjectsScrollRef = useRef<HTMLDivElement>(null)
  const [inProgressMeasurePulse, setInProgressMeasurePulse] = useState(0)
  const inProgressScrollMeasureKey = useMemo(
    () => `${visibleInProgressProjects.map((p) => p.slug).join('|')}::${inProgressMeasurePulse}`,
    [visibleInProgressProjects, inProgressMeasurePulse],
  )
  const inProgressProjectsNeedScroll = useWorkProjectsScrollOverflow(
    inProgressProjectsScrollRef,
    inProgressTreeOpen && inProgressTreeExpandedSettled,
    inProgressScrollMeasureKey,
  )

  return (
    <nav className="section-links" aria-label="Primary">
      <motion.div
        className={`section-links__work-block${workTreeOpen ? ' section-links__work-block--expanded' : ''}`}
        animate={{ opacity: 1, y: 0 }}
        initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
        transition={{
          duration: prefersReducedMotion ? 0 : 0.45,
          delay: prefersReducedMotion ? 0 : 0,
          ease: [0.22, 1, 0.36, 1],
        }}
        onMouseEnter={isHoverMode ? () => setWorkHovered(true) : undefined}
        onMouseLeave={isHoverMode ? () => setWorkHovered(false) : undefined}
        whileHover={prefersReducedMotion ? undefined : { x: 6 }}
        whileTap={prefersReducedMotion ? undefined : { scale: 0.99 }}
      >
        <LayoutGroup>
          <div className={`section-tree${workTreeOpen ? ' section-tree--work-expanded' : ''}`}>
            {isHoverMode ? (
              <Link
                className={`section-link${activeWork && !activeProjectSlug ? ' is-active' : ''}`}
                to={`/work${workSearchSuffix}`}
                onClick={() => onNavigate?.()}
              >
                Work
              </Link>
            ) : (
              <button
                className={`section-link${activeWork && !activeProjectSlug ? ' is-active' : ''}`}
                onClick={handleWorkMobileTap}
                type="button"
              >
                Work
              </button>
            )}
            {workTreeOpen && effectiveWorkDisciplineFilters ? (
              <div className="work-filter-row" role="group" aria-label="Filter work by discipline">
                <WorkFilterIcon className="work-filter-row__icon" />
                <div className="work-filter-row__list">
                  {ALL_DISCIPLINES.map((d) => {
                    const on = effectiveWorkDisciplineFilters.selected.includes(d)
                    return (
                      <button
                        key={d}
                        type="button"
                        className={`work-filter-link${on ? ' is-active' : ''}`}
                        aria-pressed={on}
                        onClick={() => effectiveWorkDisciplineFilters.onToggle(d)}
                      >
                        {DISCIPLINE_LABELS[d]}
                      </button>
                    )
                  })}
                </div>
              </div>
            ) : null}
            <AnimatePresence initial={false}>
              {workTreeOpen ? (
                <motion.div
                  animate={{ height: 'auto', opacity: 1 }}
                  className="section-tree__children section-tree__children--work"
                  exit={{ height: 0, opacity: 0 }}
                  initial={prefersReducedMotion ? false : { height: 0, opacity: 0 }}
                  onAnimationComplete={() => {
                    if (workTreeOpen) {
                      setWorkTreeExpandedSettled(true)
                      setWorkMeasurePulse((n) => n + 1)
                    }
                  }}
                  transition={
                    prefersReducedMotion
                      ? { duration: 0 }
                      : {
                          height: {
                            type: 'spring',
                            stiffness: 300,
                            damping: 32,
                            mass: 0.85,
                          },
                          opacity: { duration: 0.32, ease: [0.22, 1, 0.36, 1] },
                        }
                  }
                >
                  <div
                    ref={workProjectsScrollRef}
                    className={`work-projects-scroll${workProjectsNeedScroll ? ' work-projects-scroll--overflows' : ''}`}
                  >
                    {visibleWorkProjects.map((project, projectIndex) => (
                      <motion.div
                        key={project.slug}
                        animate={{ opacity: 1, x: 0 }}
                        initial={prefersReducedMotion ? false : { opacity: 0, x: -6 }}
                        transition={{
                          duration: prefersReducedMotion ? 0 : 0.24,
                          delay: prefersReducedMotion ? 0 : 0.025 * projectIndex,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      >
                        <Link
                          className={`project-subsection-link${
                            activeWork && activeProjectSlug === project.slug ? ' is-active' : ''
                          }`}
                          onClick={onNavigate}
                          to={`/work/${project.slug}${workSearchSuffix}`}
                        >
                          {project.title}
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </LayoutGroup>
      </motion.div>
      <motion.div
        className={`section-links__work-block${inProgressTreeOpen ? ' section-links__work-block--expanded' : ''}`}
        animate={{ opacity: 1, y: 0 }}
        initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
        transition={{
          duration: prefersReducedMotion ? 0 : 0.45,
          delay: prefersReducedMotion ? 0 : 0.06,
          ease: [0.22, 1, 0.36, 1],
        }}
        onMouseEnter={isHoverMode ? () => setInProgressHovered(true) : undefined}
        onMouseLeave={isHoverMode ? () => setInProgressHovered(false) : undefined}
        whileHover={prefersReducedMotion ? undefined : { x: 6 }}
        whileTap={prefersReducedMotion ? undefined : { scale: 0.99 }}
      >
        <LayoutGroup>
          <div className={`section-tree${inProgressTreeOpen ? ' section-tree--work-expanded' : ''}`}>
            {isHoverMode ? (
              <Link
                className={`section-link${activeInProgress && !activeProjectSlug ? ' is-active' : ''}`}
                to={`/in-progress${workSearchSuffix}`}
                onClick={() => onNavigate?.()}
              >
                In Progress
              </Link>
            ) : (
              <button
                className={`section-link${activeInProgress && !activeProjectSlug ? ' is-active' : ''}`}
                onClick={handleInProgressMobileTap}
                type="button"
              >
                In Progress
              </button>
            )}
            {inProgressTreeOpen && effectiveWorkDisciplineFilters ? (
              <div className="work-filter-row" role="group" aria-label="Filter in progress by discipline">
                <WorkFilterIcon className="work-filter-row__icon" />
                <div className="work-filter-row__list">
                  {ALL_DISCIPLINES.map((d) => {
                    const on = effectiveWorkDisciplineFilters.selected.includes(d)
                    return (
                      <button
                        key={d}
                        type="button"
                        className={`work-filter-link${on ? ' is-active' : ''}`}
                        aria-pressed={on}
                        onClick={() => effectiveWorkDisciplineFilters.onToggle(d)}
                      >
                        {DISCIPLINE_LABELS[d]}
                      </button>
                    )
                  })}
                </div>
              </div>
            ) : null}
            <AnimatePresence initial={false}>
              {inProgressTreeOpen ? (
                <motion.div
                  animate={{ height: 'auto', opacity: 1 }}
                  className="section-tree__children section-tree__children--work"
                  exit={{ height: 0, opacity: 0 }}
                  initial={prefersReducedMotion ? false : { height: 0, opacity: 0 }}
                  onAnimationComplete={() => {
                    if (inProgressTreeOpen) {
                      setInProgressTreeExpandedSettled(true)
                      setInProgressMeasurePulse((n) => n + 1)
                    }
                  }}
                  transition={
                    prefersReducedMotion
                      ? { duration: 0 }
                      : {
                          height: {
                            type: 'spring',
                            stiffness: 300,
                            damping: 32,
                            mass: 0.85,
                          },
                          opacity: { duration: 0.32, ease: [0.22, 1, 0.36, 1] },
                        }
                  }
                >
                  <div
                    ref={inProgressProjectsScrollRef}
                    className={`work-projects-scroll${
                      inProgressProjectsNeedScroll ? ' work-projects-scroll--overflows' : ''
                    }`}
                  >
                    {visibleInProgressProjects.map((project, projectIndex) => (
                      <motion.div
                        key={project.slug}
                        animate={{ opacity: 1, x: 0 }}
                        initial={prefersReducedMotion ? false : { opacity: 0, x: -6 }}
                        transition={{
                          duration: prefersReducedMotion ? 0 : 0.24,
                          delay: prefersReducedMotion ? 0 : 0.025 * projectIndex,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      >
                        <Link
                          className={`project-subsection-link${
                            activeInProgress && activeProjectSlug === project.slug ? ' is-active' : ''
                          }`}
                          onClick={onNavigate}
                          to={`/in-progress/${project.slug}${workSearchSuffix}`}
                        >
                          {project.title}
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </LayoutGroup>
      </motion.div>
      <motion.div
        layout={prefersReducedMotion ? false : 'position'}
        animate={{ opacity: 1, y: 0 }}
        className="section-links__wiki-inline"
        initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
        transition={
          prefersReducedMotion
            ? { duration: 0 }
            : {
                layout: {
                  type: 'spring',
                  stiffness: 420,
                  damping: 36,
                  mass: 0.75,
                },
                opacity: { duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.06 },
                y: { duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.06 },
              }
        }
        whileHover={prefersReducedMotion ? undefined : { x: 6 }}
        whileTap={prefersReducedMotion ? undefined : { scale: 0.99 }}
      >
        <Link
          className={`section-link section-link--wiki${activeWiki ? ' is-active' : ''}`}
          onClick={onNavigate}
          to="/wiki"
        >
          Lore
        </Link>
      </motion.div>
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="section-links__info-inline"
        initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
        transition={{
          duration: prefersReducedMotion ? 0 : 0.45,
          delay: prefersReducedMotion ? 0 : 0.18,
          ease: [0.22, 1, 0.36, 1],
        }}
        whileHover={prefersReducedMotion ? undefined : { x: 6 }}
        whileTap={prefersReducedMotion ? undefined : { scale: 0.99 }}
      >
        <Link
          className={`section-link section-link--info${activeInfo ? ' is-active' : ''}`}
          onClick={onNavigate}
          to="/info"
        >
          Info/Contact
        </Link>
      </motion.div>
    </nav>
  )
}
