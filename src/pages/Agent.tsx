import { useTranslation } from 'react-i18next';

function Agent() {
  const { t } = useTranslation();

  return (
    <section className="section agent-section" id="agent">
      <h2>{t('agent.title', 'Agent')}</h2>
      <p>{t('agent.content', 'This is the agent page.')}</p>
    </section>
  );
}

export default Agent;