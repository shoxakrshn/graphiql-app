import React from 'react';
import { NavLink } from 'react-router-dom';
import { eButtonType } from '../../utils/data';
import styles from './AppLink.module.scss';

interface LinkProps {
  to: string;
  children?: React.ReactNode;
  typeButton: eButtonType;
}

export const AppLink: React.FC<LinkProps> = ({ to, children, typeButton = eButtonType.Filled }) => {
  return (
    <NavLink
      to={to}
      className={typeButton === eButtonType.Filled ? styles.filled : styles.outlined}
    >
      {children}
    </NavLink>
  );
};
