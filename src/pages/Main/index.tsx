import { useLanguage } from '../../app/context/localizationContext/LocalizationContext';
import { eButtonType } from '../../shared/utils/data';
import { Button } from '../../shared/ui';
import loginImg from '../../app/assets/icons/welcome.svg';
import styles from './Main.module.scss';
import { useNavigate } from 'react-router-dom';

const Main = () => {
  const { t, setLanguage, language } = useLanguage();
  const navigate = useNavigate();
  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'ru' : 'en';
    setLanguage(newLanguage);
  };

  const goToSignIn = () => {
    navigate('/SignIn');
  };

  const goToSignUp = () => {
    navigate('/SignUp');
  };

  return (
    <div className={styles.wrapper}>
      <h1>{t('welcome')}</h1>
      <div className={styles.content}>
        <div className={styles.blockForm}>
          <button onClick={toggleLanguage}>{language === 'en' ? 'ru' : 'en'}</button>
          <Button
            text={t('sign-in')}
            onClick={goToSignIn}
            typeButton={eButtonType.Filled}
            type="button"
          />
          <Button
            text={t('sign-up')}
            onClick={goToSignUp}
            typeButton={eButtonType.Filled}
            type="button"
          />
        </div>
        <div className={styles.loginIcon}>
          <img src={loginImg} alt="Login" className={styles.icon} />
        </div>
      </div>
    </div>
  );
};

export default Main;
