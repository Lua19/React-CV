import { useTranslation } from 'react-i18next';

function Manage() {
  const { t } = useTranslation();
  return (
    <section className="section manage-section" id="manage">
      <h2>{t('contact.title')}</h2>
      <div className="manage-dashboard">
        <p>Sample text</p>
      </div>
    </section>
  );
}

export default Manage;