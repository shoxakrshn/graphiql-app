import { ToastContainer, toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useLanguage } from '../../../app/context/localizationContext/LocalizationContext';
import { eButtonType } from '../../utils/data';
import { AppLink } from '../AppLink';
import { Button } from '../Button';
import { LanguageToggler } from '../LanguageToggler';
import { cleanAuth } from '../../../app/store/slices/authSlices';
import { auth } from '../../../app/firebase/firebaseConfig';
import styles from './NavMenu.module.scss';

type PropsType = {
  userStatus: boolean;
  layout: 'desktop' | 'mobile';
  email?: string | null;
};

export const NavMenu: React.FC<PropsType> = ({ userStatus, layout, email }) => {
  const { t } = useLanguage();
  const dispatch = useDispatch();

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      toast.success(t('success-sing-out'), {
        closeButton: false,
        onClick: () => {
          toast.dismiss();
        },
      });
      dispatch(cleanAuth());
    } catch (error) {
      toast.error(t('error-sing-out'), {
        closeButton: false,
        onClick: () => {
          toast.dismiss();
        },
      });
    }
  };

  return (
    <div className={styles[layout]} data-testid="nav-menu">
      {userStatus && <h3 className={styles.email}>{email}</h3>}

      {userStatus ? (
        <AppLink to={'/'} typeButton={eButtonType.Outlined}>
          {t('main-page')}
        </AppLink>
      ) : null}

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

      <LanguageToggler />

      <ToastContainer />
    </div>
  );
};
