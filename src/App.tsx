import { useEffect, useMemo, useState } from 'react'
import { Navigate, Route, Routes, useLocation, useParams, useSearchParams } from 'react-router-dom'
import { DesktopNavigation, MobileMenuOverlay, MobileTopBar, NavigationMenu } from './components/Navigation'
import { RainIntro } from './components/RainIntro'
// import { WordRain } from './components/WordRain'
import { InformationSections } from './components/InformationSections'
import { ProjectDetail } from './components/ProjectDetail'
import { ProjectGallery } from './components/ProjectGallery'
import { MobileStatusBar, TabletStatusBar } from './components/StatusBar'
import { StudioLogPage } from './components/StudioLogPage'
import {
  getProjectBySlug,
  portfolioInfoSections,
  portfolioProjects,
  type Discipline,
} from './data/portfolio'
import { useProjectDetailTheme } from './hooks/useProjectDetailTheme'
import {
  parseDisciplinesFromSearch,
  toggleDisciplineInSearchParams,
} from './lib/workFilterSearchParams'

function App() {
  const [showIntro, setShowIntro] = useState(true)

  return (
    <>
      <ScrollToTop />
      {showIntro ? <RainIntro onComplete={() => setShowIntro(false)} /> : null}
      <AppRoutes />
    </>
  )
}

function AppRoutes() {
  return (
    <div className="site-shell">
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/work" element={<WorkScreen />} />
        <Route path="/work/:projectSlug" element={<ProjectDetailScreen />} />
        <Route path="/in-progress" element={<InProgressScreen />} />
        <Route path="/in-progress/:projectSlug" element={<ProjectDetailScreen />} />
        <Route path="/category/:slug/:projectSlug" element={<LegacyProjectRedirect />} />
        <Route path="/category/:slug" element={<LegacyCategoryRedirect />} />
        <Route path="/info" element={<InformationScreen />} />
        <Route path="/wiki" element={<WikiScreen />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}

function ScrollToTop() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [location.pathname])

  return null
}

function ScreenTransition({ children }: { children: React.ReactNode }) {
  return (
    <main className="screen-root">
      {children}
    </main>
  )
}

function HomeScreen() {
  return (
    <ScreenTransition>
      <section className="desktop-only desktop-shell home-screen">
        <DesktopNavigation activeWiki />
        <div className="desktop-content">
          <StudioLogPage viewport="desktop" />
        </div>
      </section>

      <section className="tablet-only tablet-home-screen">
        <TabletStatusBar />
        <div className="tablet-home-layout">
          <NavigationMenu variant="tablet" showInfo />
          <div className="tablet-home-blank" aria-hidden="true" />
        </div>
        {/* <WordRain interactive={false} floorInset={80} /> */}
      </section>

      <section className="mobile-only mobile-home-screen">
        <MobileStatusBar />
        <div className="mobile-home-layout">
          <NavigationMenu variant="mobile" showInfo />
        </div>
        {/* <WordRain interactive={false} floorInset={80} /> */}
      </section>
    </ScreenTransition>
  )
}

function useMenuLock(menuOpen: boolean) {
  useEffect(() => {
    if (!menuOpen) {
      document.body.style.overflow = ''
      return
    }
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])
}

function LegacyCategoryRedirect() {
  return <Navigate to="/work" replace />
}

function LegacyProjectRedirect() {
  const { projectSlug = '' } = useParams()
  const project = getProjectBySlug(projectSlug)
  if (!project) {
    return <Navigate to="/work" replace />
  }
  return <Navigate to={`${project.navCategory === 'in-progress' ? '/in-progress' : '/work'}/${projectSlug}`} replace />
}

function WorkScreen() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()
  useMenuLock(menuOpen)

  const disciplineKey = searchParams.toString()
  const selectedDisciplines = useMemo(
    () => parseDisciplinesFromSearch(searchParams),
    [disciplineKey],
  )

  const visibleProjects = useMemo(() => {
    const workOnly = portfolioProjects.filter((p) => p.navCategory !== 'in-progress')
    if (selectedDisciplines.length === 0) return workOnly
    return workOnly.filter((p) => selectedDisciplines.every((d) => p.disciplines.includes(d)))
  }, [selectedDisciplines])

  function toggleDiscipline(d: Discipline) {
    setSearchParams(toggleDisciplineInSearchParams(searchParams, d), { replace: true })
  }

  const workDisciplineFilters = { selected: selectedDisciplines, onToggle: toggleDiscipline }

  return (
    <ScreenTransition>
      <section className="desktop-only desktop-shell category-screen">
        <DesktopNavigation activeWork workDisciplineFilters={workDisciplineFilters} />
        <div className="desktop-content">
          <ProjectGallery projects={visibleProjects} viewport="desktop" />
        </div>
      </section>

      <section className="tablet-only tablet-category-screen">
        <TabletStatusBar />
        <MobileTopBar menuOpen={menuOpen} onToggle={() => setMenuOpen((o) => !o)} />
        <ProjectGallery projects={visibleProjects} viewport="tablet" />
        <MobileMenuOverlay
          activeWork
          workDisciplineFilters={workDisciplineFilters}
          open={menuOpen}
          onClose={() => setMenuOpen(false)}
        />
      </section>

      <section className="mobile-only mobile-category-screen">
        <MobileStatusBar />
        <MobileTopBar menuOpen={menuOpen} onToggle={() => setMenuOpen((o) => !o)} />
        <ProjectGallery projects={visibleProjects} viewport="mobile" />
        <MobileMenuOverlay
          activeWork
          workDisciplineFilters={workDisciplineFilters}
          open={menuOpen}
          onClose={() => setMenuOpen(false)}
        />
      </section>
    </ScreenTransition>
  )
}

function InProgressScreen() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()
  useMenuLock(menuOpen)

  const disciplineKey = searchParams.toString()
  const selectedDisciplines = useMemo(
    () => parseDisciplinesFromSearch(searchParams),
    [disciplineKey],
  )

  const visibleProjects = useMemo(() => {
    const inProgress = portfolioProjects.filter((p) => p.navCategory === 'in-progress')
    if (selectedDisciplines.length === 0) return inProgress
    return inProgress.filter((p) => selectedDisciplines.every((d) => p.disciplines.includes(d)))
  }, [selectedDisciplines])

  function toggleDiscipline(d: Discipline) {
    setSearchParams(toggleDisciplineInSearchParams(searchParams, d), { replace: true })
  }

  const workDisciplineFilters = { selected: selectedDisciplines, onToggle: toggleDiscipline }

  return (
    <ScreenTransition>
      <section className="desktop-only desktop-shell category-screen">
        <DesktopNavigation activeInProgress workDisciplineFilters={workDisciplineFilters} />
        <div className="desktop-content">
          <ProjectGallery projects={visibleProjects} viewport="desktop" />
        </div>
      </section>

      <section className="tablet-only tablet-category-screen">
        <TabletStatusBar />
        <MobileTopBar menuOpen={menuOpen} onToggle={() => setMenuOpen((o) => !o)} />
        <ProjectGallery projects={visibleProjects} viewport="tablet" />
        <MobileMenuOverlay
          activeInProgress
          workDisciplineFilters={workDisciplineFilters}
          open={menuOpen}
          onClose={() => setMenuOpen(false)}
        />
      </section>

      <section className="mobile-only mobile-category-screen">
        <MobileStatusBar />
        <MobileTopBar menuOpen={menuOpen} onToggle={() => setMenuOpen((o) => !o)} />
        <ProjectGallery projects={visibleProjects} viewport="mobile" />
        <MobileMenuOverlay
          activeInProgress
          workDisciplineFilters={workDisciplineFilters}
          open={menuOpen}
          onClose={() => setMenuOpen(false)}
        />
      </section>
    </ScreenTransition>
  )
}

function ProjectDetailScreen() {
  const { projectSlug = '' } = useParams()
  const project = getProjectBySlug(projectSlug)
  const [menuOpen, setMenuOpen] = useState(false)
  const [thumbFailed, setThumbFailed] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()
  useMenuLock(menuOpen)

  const disciplineKey = searchParams.toString()
  const selectedDisciplines = useMemo(
    () => parseDisciplinesFromSearch(searchParams),
    [disciplineKey],
  )

  function toggleDiscipline(d: Discipline) {
    setSearchParams(toggleDisciplineInSearchParams(searchParams, d), { replace: true })
  }

  const workDisciplineFilters = { selected: selectedDisciplines, onToggle: toggleDiscipline }

  useEffect(() => {
    setThumbFailed(false)
  }, [projectSlug])

  const themeEnabled =
    Boolean(project?.useTechnologyPresentation) &&
    Boolean(project?.thumbnailSrc) &&
    !project?.disableThumbnailShellTheme &&
    !thumbFailed
  const themeStyle = useProjectDetailTheme(project?.thumbnailSrc, themeEnabled)
  const hasShellBackground = Boolean(project?.shellBackgroundColor)
  const themed =
    Boolean(project?.useTechnologyPresentation) &&
    Boolean(project?.thumbnailSrc) &&
    !project?.disableThumbnailShellTheme &&
    !thumbFailed &&
    Object.keys(themeStyle).length > 0

  if (!project) {
    return <Navigate to="/work" replace />
  }

  const shellThemed = themed ? ' project-shell--themed' : ''
  const shellBackgroundClass = hasShellBackground ? ' project-shell--bg' : ''
  const shellStyle = themed
    ? {
        ...themeStyle,
        ...(project?.shellBackgroundColor
          ? {
              '--project-surface': project.shellBackgroundColor,
              backgroundColor: project.shellBackgroundColor,
            }
          : {}),
      }
    : project?.shellBackgroundColor
      ? { backgroundColor: project.shellBackgroundColor }
      : undefined
  const inProgressProject = project.navCategory === 'in-progress'

  return (
    <ScreenTransition>
      <section className={`desktop-only desktop-shell${shellThemed}${shellBackgroundClass}`} style={shellStyle}>
        <DesktopNavigation
          activeWork={!inProgressProject}
          activeInProgress={inProgressProject}
          activeProjectSlug={project.slug}
          workDisciplineFilters={workDisciplineFilters}
        />
        <div className="desktop-content">
          <ProjectDetail
            project={project}
            viewport="desktop"
            thumbFailed={thumbFailed}
            onThumbnailError={() => setThumbFailed(true)}
          />
        </div>
      </section>

      <section className={`tablet-only tablet-category-screen${shellThemed}${shellBackgroundClass}`} style={shellStyle}>
        <TabletStatusBar />
        <MobileTopBar menuOpen={menuOpen} onToggle={() => setMenuOpen((o) => !o)} />
        <ProjectDetail
          project={project}
          viewport="tablet"
          thumbFailed={thumbFailed}
          onThumbnailError={() => setThumbFailed(true)}
        />
        <MobileMenuOverlay
          activeWork={!inProgressProject}
          activeInProgress={inProgressProject}
          activeProjectSlug={project.slug}
          workDisciplineFilters={workDisciplineFilters}
          open={menuOpen}
          onClose={() => setMenuOpen(false)}
        />
      </section>

      <section className={`mobile-only mobile-category-screen${shellThemed}${shellBackgroundClass}`} style={shellStyle}>
        <MobileStatusBar />
        <MobileTopBar menuOpen={menuOpen} onToggle={() => setMenuOpen((o) => !o)} />
        <ProjectDetail
          project={project}
          viewport="mobile"
          thumbFailed={thumbFailed}
          onThumbnailError={() => setThumbFailed(true)}
        />
        <MobileMenuOverlay
          activeWork={!inProgressProject}
          activeInProgress={inProgressProject}
          activeProjectSlug={project.slug}
          workDisciplineFilters={workDisciplineFilters}
          open={menuOpen}
          onClose={() => setMenuOpen(false)}
        />
      </section>
    </ScreenTransition>
  )
}

function InformationScreen() {
  return (
    <ScreenTransition>
      <section className="desktop-only desktop-shell information-screen">
        <DesktopNavigation activeInfo />
        <div className="desktop-content">
          <InformationSections sections={portfolioInfoSections} viewport="desktop" />
        </div>
      </section>

      <section className="tablet-only tablet-information-screen">
        <TabletStatusBar />
        <MobileTopBar mode="home" />
        <InformationSections sections={portfolioInfoSections} viewport="tablet" />
      </section>

      <section className="mobile-only mobile-information-screen">
        <MobileStatusBar />
        <MobileTopBar mode="home" />
        <InformationSections sections={portfolioInfoSections} viewport="mobile" />
      </section>
    </ScreenTransition>
  )
}

function WikiScreen() {
  return (
    <ScreenTransition>
      <section className="desktop-only desktop-shell information-screen">
        <DesktopNavigation activeWiki />
        <div className="desktop-content">
          <StudioLogPage viewport="desktop" />
        </div>
      </section>

      <section className="tablet-only tablet-information-screen">
        <TabletStatusBar />
        <MobileTopBar mode="home" />
        <StudioLogPage viewport="tablet" />
      </section>

      <section className="mobile-only mobile-information-screen">
        <MobileStatusBar />
        <MobileTopBar mode="home" />
        <StudioLogPage viewport="mobile" />
      </section>
    </ScreenTransition>
  )
}

export default App
