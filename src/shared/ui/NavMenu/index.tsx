import { ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useLanguage } from '../../../app/context/localizationContext/LocalizationContext';
import { eButtonType } from '../../utils/data';
import { AppLink } from '../AppLink';
import { Button } from '../Button';
import { LanguageToggler } from '../LanguageToggler';
import styles from './NavMenu.module.scss';
import { cleanAuth } from '../../../app/store/slices/authSlices';

type PropsType = {
  userStatus: boolean;
  layout: 'desktop' | 'mobile';
  email?: string | null;
};

export const NavMenu: React.FC<PropsType> = ({ userStatus, layout, email }) => {
  const { t } = useLanguage();
  const dispatch = useDispatch();

  const handleSignOut = async () => {
    dispatch(cleanAuth());
  };

  return (
    <div className={styles[layout]}>
      <LanguageToggler />
      {userStatus && <h3>{email}</h3>}

      {userStatus ? (
        <Button
          text={t('log-out')}
          onClick={handleSignOut}
          typeButton={eButtonType.Outlined}
          type="button"
        />
      ) : (
        <AppLink to={'/signin'} typeButton={eButtonType.Outlined}>
          {t('sign-in')}
        </AppLink>
      )}

      <AppLink to={userStatus ? '/editor' : '/signup'} typeButton={eButtonType.Outlined}>
        {userStatus ? t('graphiql') : t('sign-up')}
      </AppLink>

      <ToastContainer />
    </div>
  );
};
