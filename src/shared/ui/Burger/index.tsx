import { PropsWithChildren, useState } from 'react';
import burger from '../../../app/assets/icons/burger.svg';
import close from '../../../app/assets/icons/close.svg';
import styles from './Burger.module.scss';

export const Burger: React.FC<PropsWithChildren> = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className={styles.mobileMenu}>
      <div className={menuOpen ? `${styles.menuOpen}` : styles.menuClose}>
        {menuOpen ? (
          <>
            <button className={styles.closeButton} onClick={() => setMenuOpen(false)}>
              <img src={close} alt="Close Menu" />
            </button>
            {children}
          </>
        ) : (
          <button className={styles.menuButton} onClick={() => setMenuOpen(true)}>
            <img src={burger} alt="Open Menu" />
          </button>
        )}
      </div>
    </div>
  );
};
