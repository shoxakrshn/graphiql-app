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
    <div className={styles.footer}>
      <div className={styles.gitIcons}>
        <GithubLink name={eGits.liza} />
        <GithubLink name={eGits.shahzod} />
        <GithubLink name={eGits.shoha} />
      </div>

      <a href="https://rs.school/react/" target="_blank" rel="noreferrer">
        <img src={rslogo} alt="RSSCHOOL" />
      </a>

      <p>© 2023 QraphiQL All Rights Reserved.</p>
    </div>
  );
};

const GithubLink = (props: { name: string }) => {
  return (
    <a href={`https://github.com/${props.name}`} target="_blank" rel="noreferrer">
      <img src={gitIcon} />
    </a>
  );
};
