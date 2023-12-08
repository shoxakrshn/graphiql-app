import styles from './SignIn.module.scss';
import loginImg from '../../app/assets/icons/login.svg';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button } from '../../shared/ui';
import { useNavigate } from 'react-router-dom';
import { ButtonType } from '../../shared/utils/data';
import Input from '../../shared/ui/Input';

export const userSchema = yup.object().shape({
  email: yup.string().email('It must be valid email').required('This field must not be empty'),

  password: yup
    .string()
    .required('This field must not be empty')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/, {
      message: 'Password mustone uppercase, one lowercase, one number and one special character',
    })
    .min(8, 'Password must contain at least 8 characters'),
});

export type UserType = yup.InferType<typeof userSchema>;

export const SignIn: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserType>({
    mode: 'onSubmit',
    resolver: yupResolver(userSchema),
  });

  const navigate = useNavigate();

  const onSubmitHandler = async (values: UserType) => {
    console.log(values);
    navigate('/editor');
  };

  return (
    <div className={styles.wrapper}>
      <h1>Sign in</h1>
      <div className={styles.content}>
        <div className={styles.loginIcon}>
          <img src={loginImg} alt="Login" className={styles.icon} />
        </div>
        <div className={styles.blockForm}>
          <form onSubmit={handleSubmit(onSubmitHandler)} noValidate className={styles.blockForm}>
            <label htmlFor="email">
              <Input type="email" id="email" placeholder="E-mail" register={register} />
              {errors.email && <p className={styles.error}>{errors.email.message}</p>}
            </label>
            <label htmlFor="password">
              <Input type="password" id="password" placeholder="Password" register={register} />
              {errors.password && <p className={styles.error}>{errors.password.message}</p>}
            </label>

            <Button text="Sign in" typeButton={ButtonType.Filled} type="submit" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
