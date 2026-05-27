import { useState } from 'react';

const experiences = [
  {
    company: "Linguatec",
    role: "Leading English Professor",
    period: "February 2019 - August 2022",
    highlights: ["Manage 5+ teachers as a team", "Resolve and attend customer complaint", "Schedule meetings, design workplans and accomodate personnel needs"],
    image: "https://i.ytimg.com/vi/MyUft7zfBXg/maxresdefault.jpg"
  },
  {
    company: "Moneta Market",
    role: "Junior Software Engineer",
    period: "Jan 2022 - November 2022",
    highlights: [
      "Architected a full stack application for e-commerce with integrated payments of $10k+ per month",
      "Development of mobile applications for user authentication",
      "Creating a CI/CD pipeline for easy deployment to production (less than 1% downtime on deployments) using Github Actions and Docker"],
    image: "https://www.monetamarket.com/index/_next/static/media/Landing.9c4a46aa30879bf5.9c4a46aa.jpg"
  },
  {
    company: "Autozone",
    role: "Programmer Analyst",
    period: "January 2023 - July 2025",
    highlights: [
    "Work within SCRUM framework",
    "Meeting deadlines and QA requirements with at least 95% acceptance rate",
    "Performing code reviews, attending releases and solving production issues",
    "Leading and contributing to software architecture decisions",
    "Developing software focused on customer experience and time optimization"],
    image: "https://media.licdn.com/dms/image/v2/D5612AQECOmDhMrz0hQ/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1710519579053?e=2147483647&v=beta&t=PC8PaCLvaewfkBlBEB3KcqXC2grv4hRlH9zJl_2msow"
  },
  {
    company: "Oracle",
    role: "Senior Applications Developer",
    period: "July 2025 - April 2026",
    highlights: [
    "Develop functions to generate Excel reports of up to 50k rows",
    "Creating RedwoodJS elements (UI and UX)",
    "Create automated Playwright tests",
    "Design and implement REST endpoints on Oracle ADF"],
    image: "https://cloudfront-us-east-1.images.arcpublishing.com/eluniversal/KJA5XWKSBRETFDJZQ23L3M2QKY.jpg"
  }
];

function Experience() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');

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

  return (
    <section className="section experience-section" id="experience">
      <h2>Employment History</h2>
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
          style={{ backgroundImage: `url(${experiences[currentIndex].image})` }}
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