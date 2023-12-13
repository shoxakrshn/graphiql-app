import React, { useEffect, useState } from 'react';
import logo from '../../app/assets/icons/logo.svg';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import { Burger, NavMenu } from '../../shared/ui';
import { StoreProvider } from '../../app/store/StoreProvider';
import { AuthState, createAuth } from '../../app/store/slices/authSlices';
import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../app/firebase/firebaseConfig';

export const Header = () => {
  const [isSticky, setIsSticky] = useState(false);
  const isUser = useSelector((state: { auth: AuthState }) => state.auth.isUser);
  const userEmail = useSelector((state: { auth: AuthState }) => state.auth.userEmail);
  const dispatch = useDispatch();

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    setIsSticky(scrollPosition > 0);
  };
  const onAuthChanged = () => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        dispatch(createAuth({ email: currentUser.email }));
      }
    });
  };

  useEffect(() => {
    onAuthChanged();
  }, [isUser]);

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
