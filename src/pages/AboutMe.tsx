import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import selfie from '../assets/selfie.jpg'
import { GitHubCalendar } from 'react-github-calendar';

function AboutMe() {
  const { t } = useTranslation();
  return (
    <section className="section about-me-section" id="aboutme">
      <div className="about-me-grid">
        <div className="about-text">
          <h2>{t('aboutme.title')}</h2>
          <p>{t('aboutme.description')}</p>
          <div className="contact-details">
            <a href="https://www.linkedin.com/in/ivan-lua-montes/" target="_blank" rel="noopener noreferrer" className="skill-item">
              <FontAwesomeIcon icon={faLinkedin} className="skill-icon" />
              {t('aboutme.linkedin')}
            </a>
            <a href="https://github.com/Lua19" target="_blank" rel="noopener noreferrer" className="skill-item">
              <FontAwesomeIcon icon={faGithub} className="skill-icon" />
              {t('aboutme.github')}
            </a>
          </div>
        </div>
        <div className="about-image">
          <div className="profile-circle">
            <img src={selfie} alt="Miguel Ivan Lua Montes" />
          </div>
        </div>
      </div>
      <div className="current-projects">
        <h3>{t('aboutme.projects')}</h3>
        <div className="github-calendar-wrapper">
          <GitHubCalendar username="Lua19" />
        </div>
      </div>
    </section>
  );
}

export default AboutMe;