import { useTranslation } from 'react-i18next';
import selfie from './assets/selfie.jpg';

function AboutMe() {
  const { t } = useTranslation();
  return (
    <section className="section about-me-section" id="aboutme">
      <div className="about-me-grid">
        <div className="about-text">
          <h2>{t('aboutme.title')}</h2>
          <p>{t('aboutme.description')}</p>
          <div className="contact-details">
            <p><a href="https://www.linkedin.com/in/ivan-lua-montes/" target="_blank" rel="noopener noreferrer">{t('aboutme.linkedin')}</a> | <a href="https://github.com/Lua19">{t('aboutme.github')}</a></p>
            <p></p>
          </div>
        </div>
        <div className="about-image">
          <div className="profile-circle">
            <img src={selfie} alt="Miguel Ivan Lua Montes" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutMe;