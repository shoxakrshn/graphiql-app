import styles from './Input.module.scss';
import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

interface InputProps<TFieldValues extends FieldValues> {
  type: string;
  id: keyof TFieldValues;
  placeholder?: string;
  register?: UseFormRegister<TFieldValues>;
}

const Input = <TFieldValues extends FieldValues>({
  type,
  id,
  placeholder,
  register,
}: InputProps<TFieldValues>) => {
  return (
    <input
      type={type}
      id="name"
      placeholder={placeholder}
      className={styles.formInput}
      {...(register ? register(id as Path<TFieldValues>) : {})}
    />
  );
};

export default Input;
