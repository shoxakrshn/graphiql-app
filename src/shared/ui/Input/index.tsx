import React from 'react';
import styles from './Input.module.scss';

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> { 
  type: string; 
  id: string; 
  placeholder?: string; 
  label?: string;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, IInputProps>(
  ({ type, id, placeholder, label, error, ...restProps }, ref) => {
  return (
    <div>
        {label && <label htmlFor={id}></label>}
        <input
          type={type}
          id={id}
          placeholder={placeholder}
          className={`${styles.formInput} ${error ? styles.errorInput : ''}`}
          ref={ref}
          {...restProps}
        />
        {error && <p className={styles.error}>{error}</p>}
    </div>
  );
});

export default Input;
