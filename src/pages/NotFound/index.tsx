import { useLanguage } from '../../app/context/localizationContext/LocalizationContext';
import { eButtonType } from '../../shared/utils/data';
import styles from './NotFound.module.scss';
import { AppLink } from '../../shared/ui/AppLink';

const NotFound = () => {
  const { t } = useLanguage();

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <h1 className={styles.title}>404</h1>
        <p className={styles.text}>{t('error-404')}</p>
        <AppLink to="/" typeButton={eButtonType.Filled}>
          {t('go-home')}
        </AppLink>
      </div>
    </div>
  );
};

export default NotFound;
