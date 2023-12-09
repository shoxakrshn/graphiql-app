import loginImg from '../../app/assets/icons/welcome.svg';
import styles from './Main.module.scss';

const Main = () => {
  return (
    <div className={styles.wrapper}>
      <h1>Welcome</h1>
      <div className={styles.content}>
        <div className={styles.blockForm}>
          <>TODO content</>
        </div>
        <div className={styles.loginIcon}>
          <img src={loginImg} alt="Login" className={styles.icon} />
        </div>
      </div>
    </div>  
  )
  
};

export default Main;
