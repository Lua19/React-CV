import { useState, useEffect } from 'react';
import { apiClient } from './apiService';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPython, faJava, faJs, faPhp, faTypescript, 
  faReact, faAngular, faNodeJs, faDocker, faAws, faDrupal 
} from '@fortawesome/free-brands-svg-icons';
import { 
  faDatabase, faServer, faTerminal, faCogs, faUsers, faCode 
} from '@fortawesome/free-solid-svg-icons';
import type { Skill } from './assets/Interfaces/Skills.interface';

// Static mappings moved outside to avoid re-creation on every render
const iconMap: Record<string, any> = {
  'C++': faCode, 'C#': faCode, 'Python': faPython, 'JavaScript': faJs,
  'PHP': faPhp, 'Java': faJava, 'Typescript': faTypescript,
  'MySQL': faDatabase, 'MongoDB': faDatabase, 'Zuora': faDatabase, 'SQL Server': faDatabase,
  'Angular': faAngular, 'React': faReact, 'Flutter': faCode, 'RedwoodJS': faCode, 'Drupal': faDrupal,
  'ASP.NET': faServer, 'Flask': faServer, 'NodeJS': faNodeJs, 'Microservices': faCogs, 'REST APIs': faCode,
  'CI/CD': faTerminal, 'Docker': faDocker, 'AWS': faAws, 'Acquia': faCogs, 'PowerShell': faTerminal,
  'System Design': faCogs, 'Mentoring': faUsers, 'Agile/Scrum': faUsers,
};

const categories = [1, 2, 3, 4, 5, 6];

function Skills() {
  const { i18n, t } = useTranslation();
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
  }, [i18n.language]);

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

  if (loading) return <section className="section skills-section"><h2>{t('skills.loading')}</h2></section>;

  return (
    <section className="section skills-section" id="skills">
      <h2>{t('skills.title')}</h2>
      <table className="skills-table">
        <tbody>
          {
            categories.map((id) => (
              <tr key={id}>
                <td><span className="skill-category">{t(`skills.category${id}`)}</span></td>
                <td>{renderSkills(id)}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </section>
  );
}

export default Skills;