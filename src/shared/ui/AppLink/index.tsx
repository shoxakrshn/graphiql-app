import React from 'react';
import { Link } from 'react-router-dom';
import { eButtonType } from '../../utils/data';
import styles from './AppLink.module.scss';

interface LinkProps {
  to: string;
  children?: React.ReactNode;
  typeButton: eButtonType;
}

export const AppLink: React.FC<LinkProps> = ({ to, children, typeButton = eButtonType.Filled }) => {
  return (
    <Link to={to} className={styles[typeButton]}>
      {children}
    </Link>
  );
};
