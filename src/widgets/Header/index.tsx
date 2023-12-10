import React, { useEffect, useState } from 'react';
import logo from '../../app/assets/icons/logo.svg';
import burger from '../../app/assets/icons/burger.svg';
import close from '../../app/assets/icons/close.svg';
import { Button } from '../../shared/ui';
import { eButtonType } from '../../shared/utils/data';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../app/context/localizationContext/LocalizationContext';
import styles from './Header.module.scss';

export const Header = () => {
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
          <Registration />
        </div>

        {menuOpen ? (
          <div className={styles.mobileMenuContent}>
            <button className={styles.closeButton} onClick={() => setMenuOpen(false)}>
              <img src={close} alt="Close Menu" />
            </button>
            <Registration />
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

const Registration = () => {
  const { setLanguage, language, t } = useLanguage();

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'ru' : 'en';
    setLanguage(newLanguage);
  };

  return (
    <>
      <Button
        text={language === 'en' ? 'ru' : 'en'}
        typeButton={eButtonType.Filled}
        onClick={toggleLanguage}
      />
      <Link to="/signin">
        <Button text={t('sign-in')} typeButton={eButtonType.Outlined} />
      </Link>
      <Link to="/signup">
        <Button text={t('sign-up')} typeButton={eButtonType.Outlined} />
      </Link>
    </>
  );
};
