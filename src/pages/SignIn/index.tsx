import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import 'firebase/auth';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLanguage } from '../../app/context/localizationContext/LocalizationContext';
import { Button } from '../../shared/ui';
import Input from '../../shared/ui/Input';
import { eButtonType } from '../../shared/utils/data';
import { userSchema } from '../../shared/utils/validation';
import { auth } from '../../app/firebase/firebaseConfig';
import { selectIsUser } from '../../app/store/slices/authSlices';
import loginImg from '../../app/assets/icons/login.svg';
import styles from './SignIn.module.scss';

export const SignIn: React.FC = () => {
  const { t } = useLanguage();

  const schema = userSchema(t);
  type UserType = yup.InferType<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserType>({
    mode: 'onSubmit',
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();
  const isUser = useSelector(selectIsUser);

  const onSubmitHandler = async (values: UserType) => {
    try {
      const { email, password } = values;

      await signInWithEmailAndPassword(auth, email, password);

      navigate('/');
    } catch (error) {
      toast.error(t('error-sing-in'));
    }
  };

  useEffect(() => {
    if (isUser) {
      navigate('/', { replace: true });
    }
  }, []);

  return (
    <div className={styles.wrapper}>
      <h1>{t('sign-in')}</h1>
      <div className={styles.content}>
        <div className={styles.loginIcon}>
          <img src={loginImg} alt="Login" className={styles.icon} />
        </div>
        <div className={styles.blockForm}>
          <form onSubmit={handleSubmit(onSubmitHandler)} noValidate className={styles.blockForm}>
            <Input
              type="email"
              id="email"
              label="email"
              placeholder="E-mail"
              error={errors.email?.message}
              {...register('email')}
            />
            <Input
              type="password"
              id="password"
              label="password"
              placeholder={t('password')}
              error={errors.password?.message}
              {...register('password')}
            />

            <Button text={t('sign-in')} typeButton={eButtonType.Filled} type="submit" />
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignIn;
