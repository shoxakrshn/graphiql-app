import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../app/context/localizationContext/LocalizationContext';
import { Button } from '../../shared/ui';
import { eButtonType } from '../../shared/utils/data';
import styles from './NotFound.module.scss';

const NotFound = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/');
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <h1>404</h1>
        <p>{t('error-404')}</p>
        <Button
          text={t('go-home')}
          onClick={goHome}
          typeButton={eButtonType.Filled}
          type="button"
        />
      </div>
    </div>
  );
};

export default NotFound;
