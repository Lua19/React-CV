import { useState } from 'react';

const experiences = [
  {
    company: "Current Company Name",
    role: "Senior Software Engineer",
    period: "Jan 2022 - Present",
    highlights: ["Leading frontend development", "Mentoring junior devs", "Optimizing CI/CD pipelines"]
  },
  {
    company: "Previous Tech Inc.",
    role: "Full Stack Developer",
    period: "Mar 2019 - Dec 2021",
    highlights: ["Built scalable REST APIs", "Migrated legacy code to React", "Reduced load times by 40%"]
  },
  {
    company: "Innovative Startups",
    role: "Junior Developer",
    period: "Jun 2017 - Feb 2019",
    highlights: ["Developed responsive UI components", "Maintained unit test coverage", "Collaborated on UX design"]
  }
];

function Experience() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextExperience = () => {
    setCurrentIndex((prev) => (prev + 1) % experiences.length);
  };

  const prevExperience = () => {
    setCurrentIndex((prev) => (prev - 1 + experiences.length) % experiences.length);
  };

  return (
    <section className="section experience-section" id="experience">
      <h2>Employment History</h2>
      <div className="carousel-container">
        <button className="carousel-btn prev" onClick={prevExperience}>&lt;</button>
        <div className="experience-card">
          <h3>{experiences[currentIndex].role}</h3>
          <p className="company-name">{experiences[currentIndex].company}</p>
          <p className="period">{experiences[currentIndex].period}</p>
          <ul className="highlights">
            {experiences[currentIndex].highlights.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
        <button className="carousel-btn next" onClick={nextExperience}>&gt;</button>
      </div>
    </section>
  );
}

export default Experience;