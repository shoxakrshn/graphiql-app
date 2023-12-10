import { Button } from '../Button';
import { Link } from 'react-router-dom';
import { eButtonType } from '../../utils/data';
import { useLanguage } from '../../../app/context/localizationContext/LocalizationContext';

export const Registration = () => {
  const { t } = useLanguage();

  return (
    <>
      <Link to="/signin">
        <Button text={t('sign-in')} typeButton={eButtonType.Outlined} />
      </Link>
      <Link to="/signup">
        <Button text={t('sign-up')} typeButton={eButtonType.Outlined} />
      </Link>
    </>
  );
};
