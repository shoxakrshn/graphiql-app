import { useLanguage } from '../../../app/context/localizationContext/LocalizationContext';
import { eButtonType } from '../../utils/data';
import { AppLink } from '../AppLink';
import { LanguageToggler } from '../LanguageToggler';
import styles from './NavMenu.module.scss';

type PropsType = {
  userStatus: boolean;
  layout: 'desktop' | 'mobile';
};

export const NavMenu: React.FC<PropsType> = ({ userStatus, layout }) => {
  const { t } = useLanguage();
  return (
    <div className={styles[layout]}>
      <LanguageToggler />
      {userStatus && <h3>user email</h3>}

      <AppLink to={userStatus ? '/' : '/signin'} typeButton={eButtonType.Outlined}>
        {userStatus ? t('log-out') : t('sign-in')}
      </AppLink>

      <AppLink to={userStatus ? '/editor' : '/signup'} typeButton={eButtonType.Outlined}>
        {userStatus ? t('graphiql') : t('sign-up')}
      </AppLink>
    </div>
  );
};
