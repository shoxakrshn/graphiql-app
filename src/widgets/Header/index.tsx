import React, { useEffect, useState } from 'react';
import logo from '../../app/assets/icons/logo.svg';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import { Burger, NavMenu } from '../../shared/ui';

export const Header = () => {
  //temporary indicator of signed user
  const isUserSigned = false;
  //temporary indicator of signed user
  const [isSticky, setIsSticky] = useState(false);

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    setIsSticky(scrollPosition > 0);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`${styles.header} ${isSticky ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <Link to={'/'}>
          <img src={logo} alt="Logo" />
        </Link>

        <NavMenu userStatus={isUserSigned} layout={'desktop'} />

        <Burger>
          <NavMenu userStatus={isUserSigned} layout={'mobile'} />
        </Burger>
      </div>
    </header>
  );
};
