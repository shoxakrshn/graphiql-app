import { useLanguage } from '../../app/context/localizationContext/LocalizationContext';
import loginImg from '../../app/assets/icons/welcome.svg';
import styles from './Main.module.scss';
import { Button } from '../../shared/ui';
import { eButtonType } from '../../shared/utils/data';

const Main = () => {
  const { t } = useLanguage();

  return (
    <div className={styles.wrapper}>
      <h1>{t('welcome')}</h1>
      <div className={styles.content}>
        <div className={styles.info}>
          <h2>{t('welcome-header')}</h2>
          <h3>{t('welcome-subheader')}</h3>
          <p>{t('welcome-info')}</p>
          <Button text={t('welcome-start')} typeButton={eButtonType.Filled} />
        </div>
        <div className={styles.loginIcon}>
          <img src={loginImg} alt="Login" className={styles.icon} />
        </div>
      </div>
    </div>
  );
};

export default Main;
