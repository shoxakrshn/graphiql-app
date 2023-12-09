import React from 'react';
import { eButtonType } from '../../utils/data';
import styles from './Button.module.scss';

interface ButtonProps {
  text: string;
  onClick?: () => void;
  typeButton: eButtonType;
  type?: 'button' | 'submit';
}

export const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  typeButton = eButtonType.Filled,
  type = 'button',
}) => {
  return (
    <button
      className={typeButton === eButtonType.Filled ? styles.filled : styles.outlined}
      onClick={onClick}
      type={type}
    >
      {text}
    </button>
  );
};
