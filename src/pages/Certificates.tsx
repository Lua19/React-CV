import { useTranslation } from 'react-i18next';

function Certificates() {
  const { t } = useTranslation();

  return (
    <section className="section certificates-section" id="certificates">
      <h2>{t('certificates.title', 'Certificates')}</h2>
      <p>{t('certificates.content', 'This is the certificates page.')}</p>
    </section>
  );
}

export default Certificates;