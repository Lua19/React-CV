import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { apiClient } from '../services/apiService';
import { useDataCache } from '../DataCacheContext';

interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  imageURL: string;
  highlights: string[];
}

function Experience() {
  const { t } = useTranslation();
  const { cache, updateCache } = useDataCache();
  const [experiences, setExperiences] = useState<ExperienceItem[]>(cache.experiences || []);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [loading, setLoading] = useState(!cache.experiences);

  useEffect(() => {
      // Use cached data if available
      if (cache.experiences) return;

      setLoading(true);
      apiClient.getAllExperiences()
        .then(data => {
          setExperiences(data);
          setLoading(false);
          updateCache('experiences', data);
        })
        .catch((error) => {
          console.error("Error fetching experiences:", error);
          setLoading(false);
        });
    }, []);

  const nextExperience = () => {
    if (currentIndex < experiences.length - 1) {
      setDirection('next');
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const prevExperience = () => {
    if (currentIndex > 0) {
      setDirection('prev');
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const goToIndex = (index: number) => {
    setDirection(index > currentIndex ? 'next' : 'prev');
    setCurrentIndex(index);
  };

  if (loading) return <section className="section experience-section"><h2>{t('experience.loading')}</h2></section>;

  return (
    <section className="section experience-section" id="experience">
      <h2>{t('experience.title')}</h2>
      <div className="carousel-container">
        <button 
          className="carousel-btn prev" 
          onClick={prevExperience} 
          disabled={currentIndex === 0}
        >
          &lt;
        </button>
        <div 
          key={`card-${currentIndex}`}
          className={`experience-card slide-in-${direction}`} 
          style={{ backgroundImage: `url(${experiences[currentIndex].imageURL})` }}
        >
          <div className="experience-info-box">
            <h3>{experiences[currentIndex].role}</h3>
            <p className="company-name">{experiences[currentIndex].company}</p>
            <p className="period">{experiences[currentIndex].period}</p>
          </div>
        </div>
        <button 
          className="carousel-btn next" 
          onClick={nextExperience} 
          disabled={currentIndex === experiences.length - 1}
        >
          &gt;
        </button>
      </div>
      <div className="carousel-indicators">
        {experiences.map((_, index) => (
          <button
            key={index}
            className={`indicator-dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goToIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <ul className={`highlights-list slide-in-${direction}`} key={`list-${currentIndex}`}>
        {experiences[currentIndex].highlights.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

export default Experience;