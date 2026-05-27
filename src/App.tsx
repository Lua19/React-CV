import { useLocation, Routes, Route, NavLink, Navigate } from 'react-router-dom';
import Experience from './Experience'
import Skills from './Skills'
import Contact from './Contact'
import AboutMe from './AboutMe'
import './App.css'

function App() {
  const location = useLocation();

  return (
    <div className="cv-app">
      <nav className="top-nav">
        <NavLink to="/aboutme" className="nav-name">Miguel Ivan Lua Montes</NavLink>
        <div className="nav-links">
          <NavLink to="/experience">Experience</NavLink>
          <NavLink to="/skills">Skills</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </div>
      </nav>

      <main className="main-content" key={location.pathname}>
        <Routes>
          <Route path="/aboutme" element={<AboutMe />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Navigate to="/aboutme" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
