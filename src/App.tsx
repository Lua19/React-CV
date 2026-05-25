import { useState, useEffect } from 'react'
import Experience from './Experience.tsx'
import Skills from './Skills.tsx'
import Contact from './Contact.tsx'
import AboutMe from './AboutMe.tsx'
import './App.css'

function App() {
  // Routing state based on the current URL hash, defaulting to #aboutme
  const [activeTab, setActiveTab] = useState(window.location.hash || '#aboutme')

  useEffect(() => {
    const handleHashChange = () => {
      setActiveTab(window.location.hash || '#aboutme')
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  return (
    <div className="cv-app">
      {/* Navigation Bar */}
      <nav className="top-nav">
        <a href="#aboutme" className="nav-name">Miguel Ivan Lua Montes</a>
        <div className="nav-links">
          <a href="#experience" className={activeTab === '#experience' ? 'active' : ''}>Experience</a>
          <a href="#skills" className={activeTab === '#skills' ? 'active' : ''}>Skills</a>
          <a href="#contact" className={activeTab === '#contact' ? 'active' : ''}>Contact</a>
        </div>
      </nav>

      {/* Main Content Area - Component swapped based on activeTab */}
      <main className="main-content">
        {activeTab === '#aboutme' && <AboutMe />}
        {activeTab === '#experience' && <Experience />}
        {activeTab === '#skills' && <Skills />}
        {activeTab === '#contact' && <Contact />}
      </main>
    </div>
  )
}

export default App
