import { useLanguage } from '../../app/context/localizationContext/LocalizationContext';
import loginImg from '../../app/assets/icons/welcome.svg';
import styles from './Main.module.scss';

const Main = () => {
  const { t, setLanguage, language } = useLanguage();

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'ru' : 'en';
    setLanguage(newLanguage);
  };

  return (
    <div className={styles.wrapper}>
      <h1>Welcome</h1>
      <div className={styles.content}>
        <div className={styles.blockForm}>
          <button onClick={toggleLanguage}>{language === 'en' ? 'ru' : 'en'}</button>
          <h3>{t('sign-in')}</h3>
          <h3>{t('sign-up')}</h3>
        </div>
        <div className={styles.loginIcon}>
          <img src={loginImg} alt="Login" className={styles.icon} />
        </div>
      </div>
    </div>
  );
};

export default Main;
