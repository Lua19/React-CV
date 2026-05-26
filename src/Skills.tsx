import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPython, faJava, faJs, faPhp, faTypescript, faLeetcode, 
  faReact, faAngular, faNodeJs, faDocker, faAws, faDrupal 
} from '@fortawesome/free-brands-svg-icons';
import { 
  faDatabase, faServer, faTerminal, faCogs, faUsers, faCode 
} from '@fortawesome/free-solid-svg-icons';

function Skills() {
  const languages = ['C++', 'C#', 'Python', 'JavaScript', 'PHP', 'Java', 'Typescript'];
  const databases = ['MySQL', 'MongoDB', 'Zuora', 'SQL Server'];
  const frontEnd = ['Angular', 'React', 'Flutter', 'RedwoodJS', 'Drupal'];
  const backEnd = ['ASP.NET', 'Flask', 'NodeJS', 'Microservices', 'REST APIs'];
  const devOps = ['CI/CD', 'Docker', 'AWS', 'Acquia', 'PowerShell'];
  const leadership = ['System Design', 'Mentoring', 'Agile/Scrum'];

  // Mapping for all icons across all categories
  const iconMap: Record<string, any> = {
    // Languages
    'C++': faLeetcode,
    'C#': faLeetcode,
    'Python': faPython,
    'JavaScript': faJs,
    'PHP': faPhp,
    'Java': faJava,
    'Typescript': faTypescript,
    // Databases
    'MySQL': faDatabase,
    'MongoDB': faDatabase,
    'Zuora': faDatabase,
    'SQL Server': faDatabase,
    // Front-end
    'Angular': faAngular,
    'React': faReact,
    'Flutter': faCode,
    'RedwoodJS': faCode,
    'Drupal': faDrupal,
    // Back-end
    'ASP.NET': faServer,
    'Flask': faServer,
    'NodeJS': faNodeJs,
    'Microservices': faCogs,
    'REST APIs': faTerminal,
    // DevOps
    'CI/CD': faTerminal,
    'Docker': faDocker,
    'AWS': faAws,
    'Acquia': faCogs,
    'PowerShell': faTerminal,
    // Leadership
    'System Design': faCogs,
    'Mentoring': faUsers,
    'Agile/Scrum': faUsers,
  };

  // Helper function to render a list of skills as badges
  const renderSkillList = (list: string[]) => (
    list.map((skill, index) => (
      <span key={index} className="skill-item">
        <FontAwesomeIcon icon={iconMap[skill] || faCode} className="skill-icon" />
        {skill}
      </span>
    ))
  );

  return (
    <section className="section skills-section" id="skills">
      <h2>Core Skills</h2>
      <table className="skills-table">
        <tbody>
          <tr>
            <td>Languages</td>
            <td>{renderSkillList(languages)}</td>
          </tr>
          <tr>
            <td>Databases</td>
            <td>{renderSkillList(databases)}</td>
          </tr>
          <tr>
            <td>Front-end Frameworks</td>
            <td>{renderSkillList(frontEnd)}</td>
          </tr>
          <tr>
            <td>Back-end Frameworks</td>
            <td>{renderSkillList(backEnd)}</td>
          </tr>
          <tr>
            <td>DevOps Tools</td>
            <td>{renderSkillList(devOps)}</td>
          </tr>
          <tr>
            <td>Leadership Skills</td>
            <td>{renderSkillList(leadership)}</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}

export default Skills;