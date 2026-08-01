import { useState } from 'react';
import { useTranslation } from 'react-i18next';

function Agent() {
  const { t } = useTranslation();
  const [question, setQuestion] = useState('');

  const handleSend = () => {
    // You can handle the question submission logic here
    console.log('Question asked:', question);
    setQuestion('');
  };

  return (
    <section className="section agent-section" id="agent">
      <h2>{t('agent.title', 'Agent')}</h2>
      <div className="agent-card">
        <img src="https://cdn.sanity.io/images/9u514z6s/production/d1ab6e8aba08df9961ad9b46eddd00b9b48663b4-2624x1440.png" alt="AI Agent" className="agent-card-image" />
        <p className="agent-card-tagline">{t('agent.sampleText', 'Hello! I am an AI Agent powered by Claude but i don\'t work just yet :c ')}</p>
        <div className="agent-card-interaction">
          <textarea
            className="agent-card-textarea"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder={t('agent.placeholder', 'Ask a question...')}
          />
          <button onClick={handleSend} className="agent-card-button">
            {t('agent.send', 'Send')}
          </button>
        </div>
      </div>
    </section>
  );
}

export default Agent;