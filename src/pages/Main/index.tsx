import { useLanguage } from '../../app/context/LocalizationContext/LocalizationContext';

const Main = () => {
  const { t, setLanguage } = useLanguage();

  const onEnClickHandler = () => {
    setLanguage('en');
  };

  const onRuClickHandler = () => {
    setLanguage('ru');
  };

  return (
    <div>
      <button onClick={onEnClickHandler}>en</button>
      <button onClick={onRuClickHandler}>ru</button>
      <h3>{t('sign-in')}</h3>
    </div>
  );
};

export default Main;
