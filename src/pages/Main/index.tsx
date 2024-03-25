import { useLanguage } from '../../app/context/localizationContext/LocalizationContext';
import loginImg from '../../app/assets/icons/welcome.svg';
import styles from './Main.module.scss';
import { AppLink } from '../../shared/ui';
import { eButtonType } from '../../shared/utils/data';
import shoha from '../../app/assets/images/shoha.png';
import liza from '../../app/assets/images/liza.jpeg';
import shahzod from '../../app/assets/images/shahzod.jpeg';
import { useAppSelector } from '../../app/store/hooks/hooks';
import { selectIsUser } from '../../app/store/slices/authSlices';

const Main = () => {
  const isUser = useAppSelector(selectIsUser);
  const { t } = useLanguage();

  return (
    <div className={styles.wrapper} data-testid="main-page">
      <h1 className={styles.title}>{t('welcome')}</h1>

      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.header}>{t('welcome-header')}</h2>
          <h3 className={styles.subheader}>{t('welcome-subheader')}</h3>
          <p className={styles.info}>{t('welcome-info')}</p>
          <AppLink typeButton={eButtonType.Filled} to={isUser ? '/editor' : '/signin'}>
            {t('welcome-start')}
          </AppLink>
          <div className={styles.team}>
            <div className={styles.teamMember}>
              <img src={shoha} className={styles.avatar} />
              <span>
                <h4 className={styles.name}>
                  <a href="https://github.com/shoxakrshn">{t('shoha.name')}</a>
                </h4>
                <h5 className={styles.role}>Team-Lead, Frontend Developer</h5>
                <p>{t('shoha.description')}</p>
              </span>
            </div>
            <div className={styles.teamMember}>
              <img src={liza} className={styles.avatar} />
              <span>
                <h4 className={styles.name}>
                  <a href="https://github.com/LizavetaNik">{t('liza.name')}</a>
                </h4>
                <h5 className={styles.role}>Frontend Developer</h5>
                <p>{t('liza.description')}</p>
              </span>
            </div>
            <div className={styles.teamMember}>
              <img src={shahzod} className={styles.avatar} />
              <span>
                <h4 className={styles.name}>
                  <a href="https://github.com/shahzod222">{t('shahzod.name')}</a>
                </h4>
                <h6 className={styles.role}>Frontend Developer</h6>
                <p>{t('shahzod.description')}</p>
              </span>
            </div>
          </div>
        </div>

        <div className={styles.image}>
          <img src={loginImg} alt="Login" className={styles.icon} />
        </div>
      </div>
    </div>
  );
};

export default Main;
