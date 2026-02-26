import { useLanguage } from '../../../app/context/localizationContext/LocalizationContext';
import { eButtonType } from '../../utils/data';
import { Button } from '../Button';

export const LanguageToggler = () => {
  const { setLanguage, language } = useLanguage();

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'ru' : 'en';
    setLanguage(newLanguage);
  };

  return (
    <Button
      text={language === 'en' ? 'ru' : 'en'}
      typeButton={eButtonType.Filled}
      onClick={toggleLanguage}
    />
  );
};
