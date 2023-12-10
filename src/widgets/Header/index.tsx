import React, { useEffect, useState } from 'react';
import logo from '../../app/assets/icons/logo.svg';
import burger from '../../app/assets/icons/burger.svg';
import close from '../../app/assets/icons/close.svg';
import { Link } from 'react-router-dom';
import { Registration } from '../../shared/ui/Header Elements/Registration';
import { SignedUserHeader } from '../../shared/ui/Header Elements/SignedUserHeader';
import { LanguageToggler } from '../../shared/ui/Header Elements/LanguageTogler';
import styles from './Header.module.scss';

export const Header = () => {
  //temporary indicator of signed user
  const isUserSigned = true;
  //temporary indicator of signed user

  const [menuOpen, setMenuOpen] = useState(false);
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

        <div className={styles.desktopMenu}>
          <LanguageToggler />
          {isUserSigned ? <SignedUserHeader /> : <Registration />}
        </div>

        {menuOpen ? (
          <div className={styles.mobileMenuContent}>
            <button className={styles.closeButton} onClick={() => setMenuOpen(false)}>
              <img src={close} alt="Close Menu" />
            </button>
            <LanguageToggler />
            {isUserSigned ? <SignedUserHeader /> : <Registration />}
          </div>
        ) : (
          <div className={styles.mobileMenu}>
            <button className={styles.menuButton} onClick={() => setMenuOpen(true)}>
              <img src={burger} alt="Burger Menu" />
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
