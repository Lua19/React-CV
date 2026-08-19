import { useState, useEffect, useRef } from 'react';
import { useLocation, Routes, Route, NavLink, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import Experience from './pages/Experience'
import Skills from './pages/Skills'
import Manage from './pages/Manage'
import AboutMe from './pages/AboutMe'
import Agent from './pages/Agent'
import Certificates from './pages/Certificates'
import Login from './Login'
import { DataCacheProvider } from './DataCacheContext'
import './App.css'
import US_flag from './assets/US-16px.png';
import MX_flag from './assets/MX-16px.png';

const languages = [
  // The emoji is kept for potential fallback or other uses.
  { code: 'EN', name: 'English', flag: '🇺🇸', image: US_flag },
  { code: 'ES', name: 'Español', flag: '🇲🇽', image: MX_flag },
  // { code: 'FR', name: 'Français', flag: '🇫🇷', image: FR_flag },
  // { code: 'DE', name: 'Deutsch', flag: 'DE', image: DE_flag },
];

function App() {
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState(languages[0]);
  const [showLogin, setShowLogin] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setLangMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const changeLanguage = (lang: typeof selectedLang) => {
    setSelectedLang(lang);
    setLangMenuOpen(false);
    i18n.changeLanguage(lang.code.toLowerCase());
  };

  return (
    <DataCacheProvider>
    <div className="cv-app">
      <nav className="top-nav">
        <div className="nav-section nav-name-section">
          <NavLink to="/" className="nav-name">{t('nav.name')}</NavLink>
        </div>

        <div className={`nav-section links-section ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          <div className="nav-links" onClick={() => setIsMobileMenuOpen(false)}>
            <NavLink to="/experience">{t('nav.experience')}</NavLink>

            <NavLink to="/skills">{t('nav.skills')}</NavLink>
            {/* <NavLink to="/certificates">Certificates</NavLink> */}
            {/* <NavLink to="/agent">Agent</NavLink> */}
          </div>

          <div className="lang-switcher" ref={dropdownRef}>
            <button className="lang-trigger" onClick={() => setLangMenuOpen(!langMenuOpen)}>
              <img src={selectedLang.image} alt={selectedLang.code} className="current-flag-img" />
              <FontAwesomeIcon icon={faChevronDown} className={`chevron ${langMenuOpen ? 'open' : ''}`} />
            </button>

            {langMenuOpen && (
              <ul className="lang-dropdown">
                {languages.map((lang) => (
                  <li key={lang.code} onClick={() => changeLanguage(lang)} className={selectedLang.code === lang.code ? 'active' : ''}>
                    <img src={lang.image} alt={lang.code} className="flag-img" />
                    <span className="name">{lang.name}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* <div className="login-trigger-section">
            <button onClick={() => setShowLogin(true)} className="login-icon-link" aria-label="Login">
              <FontAwesomeIcon icon={faUser} />
            </button>
          </div> */}
        </div>

        <div className="nav-section burger-section">
          <button 
            className="burger-menu-btn" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} />
          </button>
        </div>
      </nav>

      <main className="main-content" key={location.pathname}>
        <Routes>
          <Route path="/" element={<AboutMe />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/agent" element={<Agent />} />
          <Route path="/certificates" element={<Certificates />} />
          <Route 
            path="/manage" 
            element={sessionStorage.getItem('token') ? <Manage /> : <Navigate to="/aboutme" replace />} 
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {showLogin && <Login onClose={() => setShowLogin(false)} />}
    </div>
    </DataCacheProvider>
  )
}

export default App
