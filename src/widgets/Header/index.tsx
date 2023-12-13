import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import logo from '../../app/assets/icons/logo.svg';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import { Burger, NavMenu } from '../../shared/ui';
import { auth } from '../../app/firebase/firebaseConfig';
import { StoreProvider } from '../../app/store/StoreProvider';

export const Header = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>('');

  const onAuthChanged = () => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setIsUser(true);
        setUserEmail(currentUser?.email);
      } else {
        setIsUser(false);
        setUserEmail(null);
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
