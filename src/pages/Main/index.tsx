import { useLocalizationContext } from '../../app/context/localizationContext/LocalizationContext';

const Main = () => {
  const { localizationData, updateLanguage, language } = useLocalizationContext();

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'ru' : 'en';
    updateLanguage(newLanguage);
  };

  return (
    <div>
      <button onClick={toggleLanguage}>{language === 'en' ? 'ru' : 'en'}</button>
      <h3>{localizationData['sign-in']}</h3>
    </div>
  );
};

export default Main;
