import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { portfolioOwner, portfolioSections, type SectionSlug } from '../data/portfolio'

interface DesktopNavigationProps {
  activeSection?: SectionSlug
  activeProjectSlug?: string
  activeInfo?: boolean
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
  activeSection?: SectionSlug
  activeProjectSlug?: string
  onClose: () => void
}

interface SectionLinksProps {
  activeSection?: SectionSlug
  activeProjectSlug?: string
  activeInfo?: boolean
  onNavigate?: () => void
  interaction?: 'hover' | 'tap'
}

export function DesktopNavigation({ activeSection, activeProjectSlug, activeInfo }: DesktopNavigationProps) {
  return (
    <aside className="desktop-navigation">
      <Link className="site-title" to="/">
        {portfolioOwner.name}
      </Link>
      <div className="desktop-navigation__stack">
        <SectionLinks
          activeSection={activeSection}
          activeProjectSlug={activeProjectSlug}
          activeInfo={activeInfo}
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
          {portfolioOwner.name}
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
            Info
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
        {portfolioOwner.name}
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

export function MobileMenuOverlay({ open, activeSection, activeProjectSlug, onClose }: MobileMenuOverlayProps) {
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
              activeSection={activeSection}
              activeProjectSlug={activeProjectSlug}
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
  activeSection,
  activeProjectSlug,
  activeInfo,
  onNavigate,
  interaction = 'tap',
}: SectionLinksProps) {
  const prefersReducedMotion = useReducedMotion()
  const navigate = useNavigate()
  const [hoveredSection, setHoveredSection] = useState<SectionSlug | null>(null)
  const [tappedSection, setTappedSection] = useState<SectionSlug | null>(activeSection ?? null)

  const isHoverMode = interaction === 'hover'

  function isSectionExpanded(slug: SectionSlug): boolean {
    if (isHoverMode) {
      return slug === hoveredSection || slug === activeSection
    }
    return slug === tappedSection
  }

  function handleMobileTap(slug: SectionSlug) {
    if (tappedSection === slug) {
      navigate(`/category/${slug}`)
      onNavigate?.()
    } else {
      setTappedSection(slug)
    }
  }

  return (
    <nav className="section-links" aria-label="Primary">
      {portfolioSections.map((section, index) => (
        <motion.div
          key={section.slug}
          animate={{ opacity: 1, y: 0 }}
          initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.45,
            delay: prefersReducedMotion ? 0 : 0.04 * index,
            ease: [0.22, 1, 0.36, 1],
          }}
          onMouseEnter={isHoverMode ? () => setHoveredSection(section.slug) : undefined}
          onMouseLeave={isHoverMode ? () => setHoveredSection(null) : undefined}
          whileHover={prefersReducedMotion ? undefined : { x: 6 }}
          whileTap={prefersReducedMotion ? undefined : { scale: 0.99 }}
        >
          <div className="section-tree">
            {isHoverMode ? (
              <Link
                className={`section-link${activeSection === section.slug ? ' is-active' : ''}`}
                to={`/category/${section.slug}`}
                onClick={() => onNavigate?.()}
              >
                {section.label}
              </Link>
            ) : (
              <button
                className={`section-link${activeSection === section.slug ? ' is-active' : ''}`}
                onClick={() => handleMobileTap(section.slug)}
                type="button"
              >
                {section.label}
              </button>
            )}
            <AnimatePresence initial={false}>
              {isSectionExpanded(section.slug) ? (
                <motion.div
                  animate={{ height: 'auto', opacity: 1 }}
                  className="section-tree__children"
                  exit={{ height: 0, opacity: 0 }}
                  initial={prefersReducedMotion ? false : { height: 0, opacity: 0 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  {section.projects.map((project, projectIndex) => (
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
                          activeSection === section.slug && activeProjectSlug === project.slug
                            ? ' is-active'
                            : ''
                        }`}
                        onClick={onNavigate}
                        to={`/category/${section.slug}/${project.slug}`}
                      >
                        {project.title}
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </motion.div>
      ))}
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
          Info
        </Link>
      </motion.div>
    </nav>
  )
}
