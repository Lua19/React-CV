import { useTranslation } from 'react-i18next';

function Contact() {
  const { t } = useTranslation();
  return (
    <section className="section contact-section" id="contact">
      <h2>{t('contact.title')}</h2>
      <div className="contact-details">
        <p>{t('contact.description')}</p>
        <p><strong>{t('contact.email')}:</strong> miguellua100@gmail.com</p>
        <p><strong>{t('contact.linkedin')}:</strong> linkedin.com/in/ivan-lua-montes</p>
      </div>
    </section>
  );
}

export default Contact;