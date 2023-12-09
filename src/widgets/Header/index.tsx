import React, { useEffect, useState } from 'react';
import logo from '../../app/assets/icons/logo.svg';
import burger from '../../app/assets/icons/burger.svg';
import close from '../../app/assets/icons/close.svg';
import { Button } from '../../shared/ui';
import { eButtonType } from '../../shared/utils/data';
import { useNavigate } from 'react-router-dom';
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
        <div>
          <img src={logo} alt="Logo" />
        </div>

        <div className={styles.desktopMenu}>
          <Registration />
        </div>

        {!menuOpen && (
          <div className={styles.mobileMenu}>
            <button className={styles.menuButton} onClick={() => setMenuOpen(!menuOpen)}>
              <img src={burger} alt="Burger Menu" />
            </button>
          </div>
        )}

        {menuOpen && (
          <div className={styles.mobileMenuContent}>
            <button className={styles.closeButton} onClick={() => setMenuOpen(false)}>
              <img src={close} alt="Close Menu" />
            </button>
            <Registration />
          </div>
        )}
      </div>
    </header>
  );
};

const Registration = () => {
  const navigate = useNavigate();
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
      <Button
        text={t('sign-in')}
        typeButton={eButtonType.Outlined}
        onClick={() => navigate('/signin')}
      />
      <Button
        text={t('sign-up')}
        typeButton={eButtonType.Outlined}
        onClick={() => navigate('/signup')}
      />
    </>
  );
};
