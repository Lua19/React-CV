import selfie from './assets/selfie.jpg';

function AboutMe() {
  return (
    <section className="section about-me-section" id="aboutme">
      <div className="about-me-grid">
        <div className="about-text">
          <h2>About Me</h2>
          <p>Senior Full-stack developer with 5+ years of experience designing scalable systems in Angular, .NET, and mobile technologies, specializing in scalable REST APIs and CI/CD pipelines. Proven leadership in Agile teams, mentoring junior developers, and driving architectural decisions.</p>
          <div className="contact-details">
            <p><a href="https://www.linkedin.com/in/miguel-lua-montes-101355217/" target="_blank" rel="noopener noreferrer">LinkedIn</a></p>
            <p><a href="https://github.com/Lua19">Github</a></p>
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