import { useLanguage } from '../../app/context/localizationContext/LocalizationContext';
import loginImg from '../../app/assets/icons/welcome.svg';
import styles from './Main.module.scss';
import { Button } from '../../shared/ui';
import { eButtonType } from '../../shared/utils/data';

const Main = () => {
  const { t } = useLanguage();

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>{t('welcome')}</h1>

      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.header}>{t('welcome-header')}</h2>
          <h3 className={styles.subheader}>{t('welcome-subheader')}</h3>
          <p className={styles.info}>{t('welcome-info')}</p>
          <Button text={t('welcome-start')} typeButton={eButtonType.Filled} />
        </div>

        <div className={styles.image}>
          <img src={loginImg} alt="Login" className={styles.icon} />
        </div>
      </div>
    </div>
  );
};

export default Main;
