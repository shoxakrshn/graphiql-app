import { useLanguage } from '../../app/context/localizationContext/LocalizationContext';

const Main = () => {
  const { t, setLanguage, language } = useLanguage();

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'ru' : 'en';
    setLanguage(newLanguage);
  };

  return (
    <div>
      <button onClick={toggleLanguage}>{language === 'en' ? 'ru' : 'en'}</button>
      <h3>{t('sign-in')}</h3>
      <h3>{t('sign-up')}</h3>
    </div>
  );
};

export default Main;
