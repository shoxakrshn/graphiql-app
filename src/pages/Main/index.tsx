import { useAppContext } from '../../app/context/AppContext';

const Main = () => {
  const { localizationData, updateLanguage, language } = useAppContext();

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
