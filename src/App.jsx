import { useState } from 'react'
import { Routes, Route } from 'react-router'
import MainLayout from './layouts/MainLayout'
import HomePage from './pages/HomePage'
import ProjectsPage from './pages/ProjectsPage'
import ProjectDetailPage from './pages/ProjectDetailPage'
import StudioPage from './pages/StudioPage'
import ContactPage from './pages/ContactPage'
import Loader from './components/Loader/Loader'
import useTheme from './hooks/useTheme'
import useThemeTransition from './components/ThemeTransition/ThemeTransition'

export default function App() {
  const [loaded, setLoaded] = useState(false)
  const { theme, toggle } = useTheme()
  const { curtain, play } = useThemeTransition(toggle)

  const handleThemeToggle = () => play()

  return (
    <>
      {!loaded && <Loader onComplete={() => setLoaded(true)} />}
      {curtain}
      <div className={`app-shell ${loaded ? 'app-shell--ready' : ''}`}>
        <Routes>
          <Route element={<MainLayout theme={theme} toggleTheme={handleThemeToggle} />}>
            <Route index element={<HomePage ready={loaded} />} />
            <Route path="proyectos" element={<ProjectsPage />} />
            <Route path="proyectos/:slug" element={<ProjectDetailPage />} />
            <Route path="studio" element={<StudioPage />} />
            <Route path="contacto" element={<ContactPage />} />
          </Route>
        </Routes>
      </div>
    </>
  )
}
