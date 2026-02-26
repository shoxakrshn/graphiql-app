import * as yup from 'yup';

export const userSchema = (t: (key: string) => string) =>
  yup.object().shape({
    email: yup.string().email(t('invalid-email')).required(t('empty-field')),
    password: yup
      .string()
      .required(t('empty-field'))
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/, {
        message: t('password-requirements'),
      })
      .min(8, t('password-min-length')),
  });
