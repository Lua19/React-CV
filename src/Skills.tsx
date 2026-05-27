import { useState, useEffect } from 'react';
import { apiClient } from './apiService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPython, faJava, faJs, faPhp, faTypescript, 
  faReact, faAngular, faNodeJs, faDocker, faAws, faDrupal 
} from '@fortawesome/free-brands-svg-icons';
import { 
  faDatabase, faServer, faTerminal, faCogs, faUsers, faCode 
} from '@fortawesome/free-solid-svg-icons';
import type { Skill } from './assets/Interfaces/Skills.interface';

function Skills() {
  const [skillList, setSkillList] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient.getAllSkills()
      .then(data => {
        setSkillList(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching skills:", error);
        setLoading(false);
      });
  }, []);

  // Mapping for all icons across all categories
  const iconMap: Record<string, any> = {
    // Languages
    'C++': faCode,
    'C#': faCode,
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
    'REST APIs': faCode,
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
  var SkillMap = {
    1:"Languages",
    2:"Database Systems",
    3:"Front-end Frameworks",
    4:"Back-end Frameworks",
    5:"DevOps Tools",
    6:"Leadership Skills"
  }

const renderSkills = (categoryId: number) => {
  return skillList
    .filter(skill => skill.skillCategoryId === categoryId)
    .map((skill, index) => (
      <span key={index} className="skill-item">
        <FontAwesomeIcon icon={iconMap[skill.name] || faCode} className="skill-icon" />
        {skill.name}
      </span>
    ));
};

  if (loading) return <section className="section skills-section"><h2>Loading Skills...</h2></section>;

  return (
    <section className="section skills-section" id="skills">
      <h2>Core Skills</h2>
      <table className="skills-table">
        <tbody>
          {
            Object.entries(SkillMap).map(([index, categoryName]) => (
              <tr key={index}>
                <td><span className="skill-category">{categoryName}</span></td>
                <td>{renderSkills(Number(index))}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </section>
  );
}

export default Skills;