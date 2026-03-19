import { useEffect, useState } from 'react'
import { Navigate, Route, Routes, useLocation, useParams } from 'react-router-dom'
import { DesktopNavigation, MobileMenuOverlay, MobileTopBar, NavigationMenu } from './components/Navigation'
import { WordRain } from './components/WordRain'
import { InformationSections } from './components/InformationSections'
import { ProjectDetail } from './components/ProjectDetail'
import { ProjectGallery } from './components/ProjectGallery'
import { MobileStatusBar, TabletStatusBar } from './components/StatusBar'
import { getSectionBySlug, portfolioInfoSections, portfolioSections } from './data/portfolio'

function App() {
  return (
    <>
      <ScrollToTop />
      <AppRoutes />
    </>
  )
}

function AppRoutes() {
  return (
    <div className="site-shell">
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/category/:slug/:projectSlug" element={<ProjectDetailScreen />} />
        <Route path="/category/:slug" element={<CategoryScreen />} />
        <Route path="/info" element={<InformationScreen />} />
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
        <DesktopNavigation />
        <div className="home-canvas" aria-hidden="true">
          <div className="home-canvas__ambient" />
          <WordRain usePegboard />
        </div>
      </section>

      <section className="tablet-only tablet-home-screen">
        <TabletStatusBar />
        <div className="tablet-home-layout">
          <NavigationMenu variant="tablet" showInfo />
          <div className="tablet-home-blank" aria-hidden="true" />
        </div>
        <WordRain interactive={false} floorInset={80} />
      </section>

      <section className="mobile-only mobile-home-screen">
        <MobileStatusBar />
        <div className="mobile-home-layout">
          <NavigationMenu variant="mobile" showInfo />
        </div>
        <WordRain interactive={false} floorInset={80} />
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

function CategoryScreen() {
  const { slug = '' } = useParams()
  const section = getSectionBySlug(slug)
  const [menuOpen, setMenuOpen] = useState(false)
  useMenuLock(menuOpen)

  if (!section) {
    return <Navigate to={`/category/${portfolioSections[0].slug}`} replace />
  }

  return (
    <ScreenTransition>
      <section className="desktop-only desktop-shell category-screen">
        <DesktopNavigation activeSection={section.slug} />
        <div className="desktop-content">
          <ProjectGallery projects={section.projects} sectionSlug={section.slug} viewport="desktop" />
        </div>
      </section>

      <section className="tablet-only tablet-category-screen">
        <TabletStatusBar />
        <MobileTopBar menuOpen={menuOpen} onToggle={() => setMenuOpen((o) => !o)} />
        <ProjectGallery projects={section.projects} sectionSlug={section.slug} viewport="tablet" />
        <MobileMenuOverlay
          activeSection={section.slug}
          open={menuOpen}
          onClose={() => setMenuOpen(false)}
        />
      </section>

      <section className="mobile-only mobile-category-screen">
        <MobileStatusBar />
        <MobileTopBar menuOpen={menuOpen} onToggle={() => setMenuOpen((o) => !o)} />
        <ProjectGallery projects={section.projects} sectionSlug={section.slug} viewport="mobile" />
        <MobileMenuOverlay
          activeSection={section.slug}
          open={menuOpen}
          onClose={() => setMenuOpen(false)}
        />
      </section>
    </ScreenTransition>
  )
}

function ProjectDetailScreen() {
  const { slug = '', projectSlug = '' } = useParams()
  const section = getSectionBySlug(slug)
  const project = section?.projects.find((p) => p.slug === projectSlug)
  const [menuOpen, setMenuOpen] = useState(false)
  useMenuLock(menuOpen)

  if (!section || !project) {
    return <Navigate to={section ? `/category/${section.slug}` : '/'} replace />
  }

  return (
    <ScreenTransition>
      <section className="desktop-only desktop-shell">
        <DesktopNavigation activeSection={section.slug} activeProjectSlug={project.slug} />
        <div className="desktop-content">
          <ProjectDetail project={project} viewport="desktop" />
        </div>
      </section>

      <section className="tablet-only tablet-category-screen">
        <TabletStatusBar />
        <MobileTopBar menuOpen={menuOpen} onToggle={() => setMenuOpen((o) => !o)} />
        <ProjectDetail project={project} viewport="tablet" />
        <MobileMenuOverlay
          activeSection={section.slug}
          activeProjectSlug={project.slug}
          open={menuOpen}
          onClose={() => setMenuOpen(false)}
        />
      </section>

      <section className="mobile-only mobile-category-screen">
        <MobileStatusBar />
        <MobileTopBar menuOpen={menuOpen} onToggle={() => setMenuOpen((o) => !o)} />
        <ProjectDetail project={project} viewport="mobile" />
        <MobileMenuOverlay
          activeSection={section.slug}
          activeProjectSlug={project.slug}
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

export default App
