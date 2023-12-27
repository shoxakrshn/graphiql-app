import gitIcon from '../../app/assets/icons/github.svg';
import rslogo from '../../app/assets/icons/rslogo.svg';
import styles from './Footer.module.scss';

enum eGits {
  shahzod = 'shahzod222',
  shoha = 'shoxakrshn',
  liza = 'LizavetaNik',
}

export const Footer = () => {
  return (
    <div className={styles.footer} data-testid="footer">
      <div className={styles.gitIcons}>
        <a href={`https://github.com/${eGits.liza}`} target="_blank" rel="noreferrer">
          <img src={gitIcon} alt="git-icon" />
        </a>
        <a href={`https://github.com/${eGits.shahzod}`} target="_blank" rel="noreferrer">
          <img src={gitIcon} alt="git-icon" />
        </a>
        <a href={`https://github.com/${eGits.shoha}`} target="_blank" rel="noreferrer">
          <img src={gitIcon} alt="git-icon" />
        </a>
      </div>

      <a href="https://rs.school/react/" target="_blank" rel="noreferrer">
        <img src={rslogo} alt="RSSCHOOL" />
      </a>

      <p>© 2023 QraphiQL All Rights Reserved.</p>
    </div>
  );
};
