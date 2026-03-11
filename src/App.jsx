import { useState } from 'react'
import { Routes, Route } from 'react-router'
import MainLayout from './layouts/MainLayout'
import HomePage from './pages/HomePage'
import ProjectsPage from './pages/ProjectsPage'
import ProjectDetailPage from './pages/ProjectDetailPage'
import StudioPage from './pages/StudioPage'
import ContactPage from './pages/ContactPage'
import Loader from './components/Loader/Loader'

export default function App() {
  const [loaded, setLoaded] = useState(false)

  return (
    <>
      {!loaded && <Loader onComplete={() => setLoaded(true)} />}
      <div className={`app-shell ${loaded ? 'app-shell--ready' : ''}`}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route index element={<HomePage />} />
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
