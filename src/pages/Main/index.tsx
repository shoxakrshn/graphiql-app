import { useLanguage } from '../../app/context/localizationContext/LocalizationContext';
import loginImg from '../../app/assets/icons/welcome.svg';
import styles from './Main.module.scss';
import { Button } from '../../shared/ui';
import { eButtonType } from '../../shared/utils/data';
import shoha from '../../app/assets/images/shoha.png';
import liza from '../../app/assets/images/liza.jpeg';
import shahzod from '../../app/assets/images/shahzod.jpeg';

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
          <div className={styles.team}>
            <div className={styles.teamMember}>
              <img src={shoha} className={styles.avatar} />
              <span>
                <h4>Shoha</h4>
                <p>Team-Lead, Frontend Developer</p>
              </span>
            </div>
            <div className={styles.teamMember}>
              <img src={liza} className={styles.avatar} />
              <span>
                <h4>Liza</h4>
                <p>Frontend Developer, Designer</p>
              </span>
            </div>
            <div className={styles.teamMember}>
              <img src={shahzod} className={styles.avatar} />
              <span>
                <h4>Shahzod</h4>
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
