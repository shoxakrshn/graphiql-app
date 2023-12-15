import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { Burger, NavMenu } from '../../shared/ui';
import { StoreProvider } from '../../app/store/StoreProvider';
import { AuthState, cleanAuth, createAuth } from '../../app/store/slices/authSlices';
import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../app/firebase/firebaseConfig';
import { useLanguage } from '../../app/context/localizationContext/LocalizationContext';
import logo from '../../app/assets/icons/logo.svg';
import styles from './Header.module.scss';

export const Header = () => {
  const { t } = useLanguage();
  const [isSticky, setIsSticky] = useState(false);
  const isUser = useSelector((state: { auth: AuthState }) => state.auth.isUser);
  const userEmail = useSelector((state: { auth: AuthState }) => state.auth.userEmail);
  const expirationTimeToken = useSelector(
    (state: { auth: AuthState }) => state.auth.expirationTimeToken,
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    setIsSticky(scrollPosition > 0);
  };

  const onAuthChanged = () => {
    onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        dispatch(
          createAuth({
            email: currentUser.email,
          }),
        );
      }
    });
  };

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      dispatch(cleanAuth());
      navigate('/');
    } catch (error) {
      toast.error(t('error-sing-out'));
    }
  };

  const handleTokenExpiration = () => {
    handleSignOut();
  };

  useEffect(() => {
    onAuthChanged();
    if (expirationTimeToken) {
      const timeToExpiration = new Date(expirationTimeToken).getTime() - new Date().getTime();

      const expirationTimer = setTimeout(() => {
        handleTokenExpiration();
      }, timeToExpiration);

      return () => clearTimeout(expirationTimer);
    }
  }, [isUser, expirationTimeToken]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <StoreProvider>
      <header className={`${styles.header} ${isSticky ? styles.scrolled : ''}`}>
        <div className={styles.container}>
          <Link to={'/'}>
            <img src={logo} alt="Logo" />
          </Link>

          <NavMenu userStatus={isUser} layout={'desktop'} email={userEmail} />

          <Burger>
            <NavMenu userStatus={isUser} layout={'mobile'} email={userEmail} />
          </Burger>
        </div>
      </header>
    </StoreProvider>
  );
};
