import React from 'react';
import { ButtonType } from '../../utils/data';
import styles from './Button.module.scss';

interface ButtonProps {
  text: string;
  onClick?: () => void;
  typeButton: ButtonType;
  type?: 'button' | 'submit';
}

export const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  typeButton = ButtonType.Filled,
  type = 'button'
}) => {
  
  return (
    <button
      className={typeButton === ButtonType.Filled ? styles.filled : styles.outlined}
      onClick={onClick}
      type={type}
    >
      {text}
    </button>
  );
};
