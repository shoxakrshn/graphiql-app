import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import logo from '../../app/assets/icons/logo.svg';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import { Burger, NavMenu } from '../../shared/ui';
import { auth } from '../../app/firebase/firebaseConfig';
import { StoreProvider } from '../../app/store/StoreProvider';
import { AuthState, cleanAuth, createAuth } from '../../app/store/slices/authSlices';
import { useDispatch, useSelector } from 'react-redux';

export const Header = () => {
  const [isSticky, setIsSticky] = useState(false);
  const isUser = useSelector((state: { auth: AuthState }) => state.auth.isUser);
  const userEmail = useSelector((state: { auth: AuthState }) => state.auth.userEmail);
  const dispatch = useDispatch();

  const onAuthChanged = () => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        dispatch(createAuth());
      } else {
        dispatch(cleanAuth());
      }
    });
  };

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    setIsSticky(scrollPosition > 0);
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
