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
    <div className={styles.wrapper}>
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
                  <a href="https://github.com/shoxakrshn">Shoha</a>
                </h4>
                <p>Team-Lead, Frontend Developer</p>
              </span>
            </div>
            <div className={styles.teamMember}>
              <img src={liza} className={styles.avatar} />
              <span>
                <h4 className={styles.name}>
                  <a href="https://github.com/LizavetaNik">Liza</a>
                </h4>
                <p>Frontend Developer, Designer</p>
              </span>
            </div>
            <div className={styles.teamMember}>
              <img src={shahzod} className={styles.avatar} />
              <span>
                <h4 className={styles.name}>
                  <a href="https://github.com/shahzod222">Shahzod</a>
                </h4>
                <p>Frontend Developer, Tech-Lead</p>
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
